/**
 * ComplianceAI Server — Election Compliance Platform
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const filingsRouter = require('./routes/filings');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static frontend
app.use(express.static(path.join(__dirname, '../public')));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    }
  });
  next();
});

// ─── API Routes ───────────────────────────────────────────────────
app.use('/api/filings', filingsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '1.0.0-prototype',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Catch-all: serve frontend for SPA
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ─── Error handler ────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('[ERROR]', err.message);
  res.status(err.status || 500).json({
    error: 'internal_server_error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
    status: err.status || 500
  });
});

// ─── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ⚡ ComplianceAI Server running on http://localhost:${PORT}`);
  console.log(`  📋 API:        http://localhost:${PORT}/api/health`);
  console.log(`  🌐 Frontend:   http://localhost:${PORT}\n`);
});
