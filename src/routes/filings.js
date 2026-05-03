/**
 * Filing Routes — CRUD + extraction + validation + export
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { parseCSV, parsePDF, extractTransactions, extractFromText, generateSampleData } = require('../services/extraction');
const { validateExtraction, getUpcomingDeadlines } = require('../utils/compliance-rules');

// In-memory store (swap for PostgreSQL in production)
const filings = new Map();
const auditLog = [];

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../data/uploads');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}_${safe}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.csv', '.txt', '.pdf', '.xlsx', '.png', '.jpg', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${ext} not supported. Use CSV, PDF, or Excel.`));
    }
  }
});

// Helper: log audit event
function logAudit(action, resourceType, resourceId, details = {}) {
  auditLog.push({
    id: uuidv4(),
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    details,
    timestamp: new Date().toISOString()
  });
}

// ── GET /api/filings ──────────────────────────────────────────────
router.get('/', (req, res) => {
  const { status, limit = 20, offset = 0 } = req.query;
  let results = Array.from(filings.values());

  if (status) {
    results = results.filter(f => f.status === status);
  }

  results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  res.json({
    data: {
      filings: results.slice(Number(offset), Number(offset) + Number(limit)),
      total: results.length
    },
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── POST /api/filings ─────────────────────────────────────────────
router.post('/', (req, res) => {
  const { filing_type, organization_name, filing_period_start, filing_period_end } = req.body;

  if (!filing_type) {
    return res.status(400).json({
      error: 'invalid_request',
      message: 'filing_type is required'
    });
  }

  const filing = {
    id: uuidv4(),
    filing_type,
    organization_name: organization_name || 'My Organization',
    filing_period_start: filing_period_start || new Date().toISOString().split('T')[0],
    filing_period_end: filing_period_end || new Date().toISOString().split('T')[0],
    status: 'draft',
    extracted_data: null,
    validation_errors: [],
    validation_warnings: [],
    documents: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  filings.set(filing.id, filing);
  logAudit('create', 'filing', filing.id, { filing_type });

  res.status(201).json({
    data: filing,
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── GET /api/filings/:id ──────────────────────────────────────────
router.get('/:id', (req, res) => {
  const filing = filings.get(req.params.id);
  if (!filing) {
    return res.status(404).json({ error: 'not_found', message: 'Filing not found' });
  }
  res.json({ data: filing, meta: { timestamp: new Date().toISOString() } });
});

// ── POST /api/filings/:id/upload ──────────────────────────────────
router.post('/:id/upload', upload.single('file'), (req, res) => {
  const filing = filings.get(req.params.id);
  if (!filing) {
    return res.status(404).json({ error: 'not_found', message: 'Filing not found' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'no_file', message: 'No file uploaded' });
  }

  const doc = {
    id: uuidv4(),
    file_name: req.file.originalname,
    file_type: path.extname(req.file.originalname).replace('.', ''),
    file_size_bytes: req.file.size,
    file_path: req.file.path,
    uploaded_at: new Date().toISOString()
  };

  filing.documents.push(doc);
  filing.status = 'uploaded';
  filing.updated_at = new Date().toISOString();

  logAudit('upload', 'document', doc.id, { filing_id: filing.id, filename: doc.file_name });

  res.status(202).json({
    data: {
      filing_id: filing.id,
      document_id: doc.id,
      status: 'uploaded',
      file_name: doc.file_name,
      file_size: doc.file_size_bytes
    },
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── POST /api/filings/:id/extract ─────────────────────────────────
router.post('/:id/extract', async (req, res) => {
  const filing = filings.get(req.params.id);
  if (!filing) {
    return res.status(404).json({ error: 'not_found', message: 'Filing not found' });
  }

  filing.status = 'extracting';

  // If documents uploaded, parse them; otherwise use demo data
  let extractedData;

  if (filing.documents.length > 0) {
    const doc = filing.documents[filing.documents.length - 1];
    try {
      if (doc.file_type === 'csv' || doc.file_type === 'txt') {
        const buffer = fs.readFileSync(doc.file_path);
        const rows = parseCSV(buffer);
        const result = extractTransactions(rows, filing.filing_type);
        extractedData = {
          committee_id: filing.filing_type === 'fec_form_3x' ? '' : '',
          committee_name: filing.organization_name,
          reporting_period_start: filing.filing_period_start,
          reporting_period_end: filing.filing_period_end,
          ...result,
          source: 'csv_extraction'
        };
      } else if (doc.file_type === 'pdf') {
        const buffer = fs.readFileSync(doc.file_path);
        const text = await parsePDF(buffer);
        const result = extractFromText(text, filing.filing_type);
        extractedData = {
          committee_id: '',
          committee_name: filing.organization_name,
          reporting_period_start: filing.filing_period_start,
          reporting_period_end: filing.filing_period_end,
          ...result,
          source: 'pdf_extraction',
          document_name: doc.file_name
        };
      } else {
        // For images and other files, use demo data as fallback
        extractedData = generateSampleData(filing.filing_type);
        extractedData.source = 'demo_fallback';
        extractedData.document_name = doc.file_name;
      }
    } catch (err) {
      filing.status = 'error';
      filing.updated_at = new Date().toISOString();
      logAudit('extract_error', 'filing', filing.id, { error: err.message });
      return res.status(422).json({
        error: 'extraction_failed',
        message: `Failed to extract data: ${err.message}`
      });
    }
  } else {
    extractedData = generateSampleData(filing.filing_type);
  }

  // Run validation
  const validation = validateExtraction(extractedData, filing.filing_type);

  filing.extracted_data = extractedData;
  filing.validation_errors = validation.errors;
  filing.validation_warnings = validation.warnings;
  filing.extraction_confidence = extractedData.transactions
    ? (extractedData.transactions.reduce((s, t) => s + t.confidence, 0) / extractedData.transactions.length).toFixed(2)
    : 0;
  filing.status = 'extracted';
  filing.extracted_at = new Date().toISOString();
  filing.updated_at = new Date().toISOString();

  logAudit('extract', 'filing', filing.id, {
    transactions: extractedData.transactions?.length || 0,
    errors: validation.errors.length,
    warnings: validation.warnings.length
  });

  res.json({
    data: {
      filing_id: filing.id,
      status: filing.status,
      extracted_data: extractedData,
      validation: validation,
      extraction_confidence: filing.extraction_confidence
    },
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── PUT /api/filings/:id ──────────────────────────────────────────
router.put('/:id', (req, res) => {
  const filing = filings.get(req.params.id);
  if (!filing) {
    return res.status(404).json({ error: 'not_found', message: 'Filing not found' });
  }

  const { extracted_data } = req.body;

  if (extracted_data) {
    // Re-validate after user edits
    const validation = validateExtraction(extracted_data, filing.filing_type);
    filing.extracted_data = extracted_data;
    filing.validation_errors = validation.errors;
    filing.validation_warnings = validation.warnings;
    filing.status = 'reviewed';
    filing.edited_at = new Date().toISOString();

    logAudit('edit', 'filing', filing.id, {
      errors: validation.errors.length,
      warnings: validation.warnings.length
    });
  }

  filing.updated_at = new Date().toISOString();

  res.json({
    data: filing,
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── POST /api/filings/:id/export ──────────────────────────────────
router.post('/:id/export', (req, res) => {
  const filing = filings.get(req.params.id);
  if (!filing) {
    return res.status(404).json({ error: 'not_found', message: 'Filing not found' });
  }

  if (!filing.extracted_data) {
    return res.status(400).json({
      error: 'no_data',
      message: 'No extracted data to export. Run extraction first.'
    });
  }

  // Generate a simple JSON export (in production this would be PDF via a template)
  const exportDir = path.join(__dirname, '../../data/exports');
  fs.mkdirSync(exportDir, { recursive: true });

  const exportData = {
    filing_type: filing.filing_type,
    organization: filing.organization_name,
    reporting_period: `${filing.filing_period_start} to ${filing.filing_period_end}`,
    committee_id: filing.extracted_data.committee_id,
    committee_name: filing.extracted_data.committee_name,
    total_receipts: filing.extracted_data.total_receipts,
    total_disbursements: filing.extracted_data.total_disbursements,
    cash_on_hand: filing.extracted_data.cash_on_hand,
    transactions: filing.extracted_data.transactions,
    validation_status: filing.validation_errors.length === 0 ? 'PASSED' : 'ERRORS_FOUND',
    errors: filing.validation_errors,
    warnings: filing.validation_warnings,
    exported_at: new Date().toISOString(),
    generated_by: 'ComplianceAI Prototype v1.0'
  };

  const filename = `${filing.filing_type}_${filing.id.slice(0, 8)}_${Date.now()}.json`;
  const filepath = path.join(exportDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));

  filing.status = 'exported';
  filing.exported_at = new Date().toISOString();
  filing.updated_at = new Date().toISOString();

  logAudit('export', 'filing', filing.id, { filename });

  res.json({
    data: {
      filing_id: filing.id,
      status: 'exported',
      export_data: exportData,
      filename
    },
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── DELETE /api/filings/:id ───────────────────────────────────────
router.delete('/:id', (req, res) => {
  const filing = filings.get(req.params.id);
  if (!filing) {
    return res.status(404).json({ error: 'not_found', message: 'Filing not found' });
  }

  filings.delete(req.params.id);
  logAudit('delete', 'filing', req.params.id);

  res.json({
    data: { message: 'Filing deleted' },
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── GET /api/dashboard/summary ────────────────────────────────────
router.get('/dashboard/summary', (req, res) => {
  const all = Array.from(filings.values());
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const totalErrors = all.reduce((s, f) => s + (f.validation_errors?.length || 0), 0);
  const totalWarnings = all.reduce((s, f) => s + (f.validation_warnings?.length || 0), 0);

  res.json({
    data: {
      total_filings: all.length,
      filings_this_month: all.filter(f => new Date(f.created_at) > thirtyDaysAgo).length,
      by_status: {
        draft: all.filter(f => f.status === 'draft').length,
        extracted: all.filter(f => f.status === 'extracted').length,
        reviewed: all.filter(f => f.status === 'reviewed').length,
        exported: all.filter(f => f.status === 'exported').length
      },
      total_errors: totalErrors,
      total_warnings: totalWarnings,
      upcoming_deadlines: getUpcomingDeadlines(null, null, 120)
    },
    meta: { timestamp: new Date().toISOString() }
  });
});

// ── GET /api/audit-log ────────────────────────────────────────────
router.get('/audit/log', (req, res) => {
  const { limit = 50 } = req.query;
  const recent = auditLog.slice(-Number(limit)).reverse();
  res.json({
    data: { entries: recent, total: auditLog.length },
    meta: { timestamp: new Date().toISOString() }
  });
});

module.exports = router;
