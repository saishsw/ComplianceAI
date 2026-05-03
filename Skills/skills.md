# skills.md - Election Compliance Platform Development Guide
## For: AI Agents assisting development
## Version: 1.0

---

## 1. COMPLIANCE DOMAIN KNOWLEDGE

### 1.1 FEC Forms (Federal Election Commission)

#### **FEC Form 3X** (PAC Financial Report)
**When filed:** Quarterly pre-election, post-election
**Who files:** Political Action Committees (PACs)
**Key fields:**
```
Committee Name: [text]
Committee ID: C[7 digits] (format: /^C\d{7}$/)
Report Type: [12-day, 30-day, quarterly, year-end]
Coverage Period: Start Date - End Date
Total Receipts: [sum of contributions]
Total Disbursements: [sum of spending]
Cash on Hand: [beginning + receipts - disbursements]

Itemized Contributions: (each > $200)
  - Contributor Name
  - Contributor Address
  - Contributor Occupation
  - Amount
  - Date

Itemized Expenditures: (each > $200)
  - Payee Name
  - Payee Address
  - Purpose
  - Amount
  - Date
```

**Validation Rules:**
```
✓ Committee ID must be registered with FEC
✓ Dates must be sequential (start <= end)
✓ Totals must match transaction sums (within $1 rounding)
✓ Contributions cannot exceed $5,200 per individual per election
✓ Must include contributor address + occupation for amounts > $200
✗ Cannot accept corporate contributions
✗ Cannot solicit contributions in excess of federal limits
```

**Common Errors (that AI should catch):**
- Missing committee ID
- Invalid committee ID format
- Total receipts don't match sum of transactions
- Missing contributor address for large donations
- Negative amounts
- Duplicate transactions
- Dates outside reporting period

#### **FEC Form 3** (Candidate Committee Financial Report)
**When filed:** Quarterly + election periods
**Who files:** Individual candidate committees
**Key difference from 3X:** Includes candidate loans, personal contributions, candidate opposition committees

#### **FEC Form 990-N** (Nonprofit E-Postcard)
**When filed:** Annually (by May 15)
**Who files:** 501(c)(3) organizations with <$50K gross receipts
**Key fields:**
```
Organization Name
EIN: [9 digits]
Tax Year: [YYYY]
Gross Receipts: [total revenue]
"We are still in existence": Yes/No
Has significant change?: Yes/No

No detailed transaction reporting required - just totals.
```

**Validation:**
- EIN must be valid 501(c)(3) nonprofit
- Gross receipts must be numeric
- Must be filed by May 15 each year

---

### 1.2 Arizona State Rules (AST § 16-927)

#### **Arizona Election Spending Disclosure**
**When filed:** Quarterly during election years, additional filings if spending exceeds threshold
**Who files:** Any person/org spending > $500 on election activity in Arizona
**Key fields:**
```
Committee Name
Arizona Secretary of State Committee ID: [format varies]
Report Period: [start date - end date]
Total Contributions: [sum]
Total Expenditures: [sum]

Itemized Transactions (any amount):
  - Recipient/Payee Name
  - Address
  - Purpose
  - Amount
  - Date
```

**Arizona-Specific Rules:**
```
✓ Must disclose by name anyone donating > $25 (note: lower than federal $200)
✓ Must file electronically with Arizona Secretary of State
✓ Use BEACON system (Arizona's filing system)
✗ Cannot use corporate treasury funds (except PACs registered for that)
✗ Cannot contribute from prohibited sources
```

**Common Arizona Filing Errors:**
- Missing "Arizona Committee ID" (different from FEC ID)
- Itemizing donations <$25 (allowed but not required)
- Filing with wrong agency (County vs State)
- Misunderstanding "election" (includes ballot measures, not just candidates)

---

### 1.3 501(c)(4) Dark Money Rules

**Key concept:** 501(c)(4) nonprofits can conduct political activity BUT:
- Don't report donors to IRS (that's the whole point of "dark money")
- Must still file election-related spending with FEC if > $500 independent expenditure
- Some states require separate reporting

**Form 990-N for 501(c)(4)s:** Same as (c)(3), just different section of tax code

**Election Activity Tracking:**
- Cannot spend >50% of budget on election activity (maintains nonprofit status)
- Separate accounting required for election vs. non-election spending
- Must track "voter contact" separately

---

## 2. CODE PATTERNS & BEST PRACTICES

### 2.1 Secure File Handling

#### Pattern: Parse File Safely
```typescript
// DON'T:
const fs = require('fs');
fs.readFile(req.files.document.path, (err, data) => { ... });

// DO:
import { createReadStream } from 'fs';
import path from 'path';

async function parseUploadedFile(fileBuffer: Buffer, fileName: string) {
  // 1. Validate file type
  const allowedMimes = ['application/pdf', 'text/csv', 'application/vnd.ms-excel'];
  const mime = await fileType.fromBuffer(fileBuffer);
  if (!allowedMimes.includes(mime.mime)) {
    throw new Error('Invalid file type');
  }

  // 2. Check file size
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  if (fileBuffer.length > MAX_SIZE) {
    throw new Error('File too large');
  }

  // 3. Sanitize filename
  const safe = path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');

  // 4. Process securely (never execute, always parse)
  if (fileName.endsWith('.pdf')) {
    return await parsePdfSecurely(fileBuffer);
  } else if (fileName.endsWith('.csv')) {
    return parseCSVSecurely(fileBuffer);
  }
  // etc
}

function parsePdfSecurely(buffer: Buffer) {
  // Use PDFjs, NOT unsafe PDF libraries
  // Extract text only (no metadata, no embedded files)
  // Return: { text: string, pages: number, metadata: sanitized }
}
```

#### Pattern: Encrypt Sensitive Paths
```typescript
import crypto from 'crypto';

const encryptionKey = process.env.FILE_ENCRYPTION_KEY; // 32-byte hex

function encryptFilePath(originalPath: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
  let encrypted = cipher.update(originalPath, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Store encrypted path in DB:
INSERT INTO documents (file_path_encrypted) VALUES ($1);

// Decrypt when needed (only on backend):
function decryptFilePath(encryptedPath: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
  let decrypted = decipher.update(encryptedPath, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

### 2.2 Validation Patterns

#### Pattern: Field Validation
```typescript
// compliance-rules.ts
const FEC_FORM_3X_RULES = {
  committee_id: {
    type: 'string',
    pattern: /^C\d{7}$/,
    message: 'Committee ID must be C followed by 7 digits',
    required: true,
    errorLevel: 'error'
  },
  total_receipts: {
    type: 'number',
    min: 0,
    message: 'Total receipts cannot be negative',
    required: true,
    errorLevel: 'error'
  },
  contribution_individual: {
    type: 'number',
    max: 5200,
    message: 'Individual contribution exceeds $5,200 limit',
    required: false,
    errorLevel: 'error',
    jurisdiction: 'federal',
    reference: 'FEC § 16-914(A)'
  },
  // etc
};

// validate.ts
function validateField(
  fieldName: string,
  value: any,
  rule: ValidationRule
): ValidationError | null {
  // Type check
  if (typeof value !== rule.type) {
    return { field: fieldName, message: `Must be ${rule.type}`, severity: 'error' };
  }

  // Pattern check
  if (rule.pattern && !rule.pattern.test(value)) {
    return { field: fieldName, message: rule.message, severity: rule.errorLevel };
  }

  // Range check
  if (rule.min !== undefined && value < rule.min) {
    return { field: fieldName, message: rule.message, severity: rule.errorLevel };
  }

  if (rule.max !== undefined && value > rule.max) {
    return { field: fieldName, message: rule.message, severity: rule.errorLevel };
  }

  return null;
}

// Usage in extraction validation
async function validateExtraction(extractedData: any, filingType: string) {
  const rules = COMPLIANCE_RULES[filingType];
  const errors = [];
  const warnings = [];

  for (const [fieldName, value] of Object.entries(extractedData)) {
    const rule = rules[fieldName];
    if (!rule) continue;

    const error = validateField(fieldName, value, rule);
    if (error) {
      if (error.severity === 'error') errors.push(error);
      if (error.severity === 'warning') warnings.push(error);
    }
  }

  return { errors, warnings, isValid: errors.length === 0 };
}
```

### 2.3 API Response Patterns

#### Pattern: Consistent Error Responses
```typescript
// errors.ts
class AppError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string,
    public details?: any
  ) {
    super(message);
  }
}

// middleware
function errorHandler(err: Error, req: Request, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.errorCode,
      message: err.message,
      details: err.details,
      status: err.statusCode,
      timestamp: new Date().toISOString(),
      request_id: req.id // Correlate with logs
    });
  }

  // Unexpected error - don't leak details
  console.error('[UNEXPECTED ERROR]', err);
  res.status(500).json({
    error: 'internal_server_error',
    message: 'An unexpected error occurred',
    request_id: req.id,
    status: 500
  });
}
```

#### Pattern: Successful API Response
```typescript
// All successful responses follow this structure:
{
  "data": { /* the actual response */ },
  "meta": {
    "timestamp": "2024-05-03T10:00:00Z",
    "request_id": "req_123abc"
  }
}

// Example:
res.json({
  data: {
    id: 'filing_uuid',
    status: 'extracted',
    extracted_data: { ... }
  },
  meta: {
    timestamp: new Date().toISOString(),
    request_id: req.id
  }
});
```

### 2.4 Claude API Integration Pattern

#### Pattern: Safe Claude API Calls
```typescript
import Anthropic from '@anthropic-ai/sdk';

async function extractDataWithClaude(
  documentText: string,
  filingType: string,
  retryCount = 0
): Promise<ExtractedData> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  const systemPrompt = getSystemPromptForFilingType(filingType);

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Extract election spending data from this document:\n\n${documentText}`
        }
      ]
    });

    // Parse response
    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }

    // Extract JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Claude did not return valid JSON');
    }

    const extracted = JSON.parse(jsonMatch[0]);

    // Add confidence scores
    return {
      ...extracted,
      source: 'claude',
      extraction_confidence: calculateConfidence(extracted),
      extracted_at: new Date().toISOString()
    };

  } catch (error) {
    // Retry logic for transient failures
    if (retryCount < 3 && isTransientError(error)) {
      await delay(Math.pow(2, retryCount) * 1000); // exponential backoff
      return extractDataWithClaude(documentText, filingType, retryCount + 1);
    }

    // Log detailed error for monitoring
    logger.error('[CLAUDE_EXTRACTION_FAILED]', {
      filing_type: filingType,
      error: error.message,
      document_length: documentText.length,
      retries: retryCount
    });

    throw new AppError(422, 'extraction_failed', 'Failed to extract data from document');
  }
}

function getSystemPromptForFilingType(filingType: string): string {
  const prompts: Record<string, string> = {
    fec_form_3x: `You are an expert in FEC compliance...`,
    form_990n: `You are an expert in nonprofit tax filings...`,
    state_disclosure: `You are an expert in state election law...`
  };
  return prompts[filingType] || prompts.fec_form_3x;
}

function calculateConfidence(extracted: any): number {
  // Return 0.0 to 1.0 based on completeness and consistency
  // Missing fields = lower confidence
  // Validation errors = lower confidence
  const requiredFields = ['date', 'amount', 'payee'];
  const presentFields = requiredFields.filter(f => extracted[f] !== undefined).length;
  return presentFields / requiredFields.length;
}
```

---

## 3. SECURITY IMPLEMENTATION CHECKLIST

### 3.1 Authentication & Authorization
- [ ] Supabase Auth configured with email/password
- [ ] JWT token validation on every API request
- [ ] Row-level security (RLS) policies in PostgreSQL
- [ ] User cannot access data outside their organization
- [ ] Admin role can manage team members
- [ ] API keys hashed before storage

### 3.2 Data Protection
- [ ] All API responses over HTTPS (enforced)
- [ ] Sensitive fields (extracted data) encrypted in DB (optional column encryption)
- [ ] File paths encrypted before storage in DB
- [ ] Uploaded files encrypted in R2/S3
- [ ] No PII in logs (never log passwords, API keys, full financial data)
- [ ] Secrets stored in environment variables (not in code)

### 3.3 Input Validation
- [ ] All file uploads validated (size, type, magic bytes)
- [ ] All user input sanitized before storage
- [ ] SQL injection protection (use parameterized queries, ORM)
- [ ] XSS protection (sanitize on frontend + backend)
- [ ] CSRF tokens on forms

### 3.4 Error Handling
- [ ] Never expose internal error messages to users
- [ ] Log detailed errors to Sentry (internal only)
- [ ] Return generic error messages ("An error occurred") to frontend
- [ ] Include request ID in errors (for debugging)
- [ ] Don't reveal file paths, database structure, etc.

### 3.5 API Security
- [ ] CORS configured (whitelist frontend domain only)
- [ ] Rate limiting (100 requests/minute per user)
- [ ] Request size limits (10MB max JSON payload)
- [ ] Timeout on long-running requests (30 seconds)
- [ ] API key rotation policy (if using keys)

### 3.6 Monitoring & Audit
- [ ] All sensitive actions logged (upload, extract, export, delete)
- [ ] Audit logs immutable (can't be deleted after creation)
- [ ] Error tracking with Sentry
- [ ] Uptime monitoring (pings every 5 minutes)
- [ ] Database performance monitoring

---

## 4. TESTING PATTERNS

### 4.1 Unit Test Pattern (Jest)

```typescript
// validation.test.ts
import { validateField } from './validation';

describe('Field Validation', () => {
  it('should reject invalid FEC committee ID format', () => {
    const rule = { pattern: /^C\d{7}$/, errorLevel: 'error' };
    const result = validateField('committee_id', 'invalid', rule);
    expect(result).toBeDefined();
    expect(result.severity).toBe('error');
  });

  it('should accept valid FEC committee ID', () => {
    const rule = { pattern: /^C\d{7}$/, errorLevel: 'error' };
    const result = validateField('committee_id', 'C0012345', rule);
    expect(result).toBeNull();
  });

  it('should enforce contribution limits', () => {
    const rule = { max: 5200, errorLevel: 'error' };
    const result = validateField('contribution', 6000, rule);
    expect(result).toBeDefined();
  });
});
```

### 4.2 Integration Test Pattern (Jest with real DB)

```typescript
// filing.integration.test.ts
describe('Filing Extraction Flow', () => {
  let org: Organization;
  let filing: Filing;

  beforeAll(async () => {
    // Create test org
    org = await createTestOrganization();
  });

  afterAll(async () => {
    // Clean up
    await deleteTestOrganization(org.id);
  });

  it('should extract data from PDF and validate', async () => {
    // 1. Create filing
    filing = await db.filings.create({
      organization_id: org.id,
      filing_type: 'fec_form_3x'
    });

    // 2. Upload document
    const pdf = fs.readFileSync('./test-fixtures/sample-form-3x.pdf');
    const doc = await uploadDocument(filing.id, pdf);

    // 3. Extract
    const extracted = await extractDataWithClaude(pdf.toString(), 'fec_form_3x');

    // 4. Validate
    const validation = await validateExtraction(extracted, 'fec_form_3x');

    // 5. Assert
    expect(validation.isValid).toBe(true);
    expect(filing.status).toBe('extracted');
  });
});
```

### 4.3 E2E Test Pattern (Playwright)

```typescript
// features/filing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Filing Workflow', () => {
  test('should complete full filing from upload to export', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[name=email]', 'test@example.com');
    await page.fill('input[name=password]', 'password');
    await page.click('button:has-text("Login")');

    // Navigate to filings
    await page.goto('/filings');

    // Create new filing
    await page.click('button:has-text("New Filing")');
    await page.selectOption('select[name=filing_type]', 'fec_form_3x');
    await page.click('button:has-text("Create")');

    // Upload document
    const filePath = './test-fixtures/sample.pdf';
    await page.locator('input[type="file"]').setInputFiles(filePath);
    await expect(page.locator('text=sample.pdf')).toBeVisible();

    // Wait for extraction
    await page.waitForSelector('text=Extraction complete');

    // Review extracted data
    await expect(page.locator('[data-field=committee_id]')).toHaveValue('C0012345');

    // Export
    await page.click('button:has-text("Export PDF")');
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('FEC');
  });
});
```

---

## 5. DEPLOYMENT PROCEDURES

### 5.1 Deploying Frontend (Vercel)

```bash
# 1. Merge to main branch (this triggers automatic deployment)
git push origin main

# 2. Vercel automatically:
#    - Runs tests
#    - Builds Next.js
#    - Deploys to CDN
#    - Assigns preview URL

# 3. To promote staging to production:
#    (happens automatically when PR merged to main)

# 4. Rollback if needed:
vercel rollback --prod
```

### 5.2 Deploying Backend (Railway/Fly.io)

```bash
# 1. Create Docker image locally
docker build -t election-compliance-api:latest .

# 2. Test locally
docker run -e DATABASE_URL=... -p 3001:3001 election-compliance-api

# 3. Push to registry
docker push registry.example.com/election-compliance-api:latest

# 4. Deploy to production
railway deploy  # or fly deploy

# 5. Monitor logs
railway logs  # or fly logs --app app-name

# 6. Rollback if needed
railway rollback
```

### 5.3 Database Migrations

```bash
# Create migration
npx prisma migrate dev --name add_filing_type

# Review migration in /prisma/migrations/

# Deploy migration to production
npx prisma migrate deploy

# Emergency rollback (be careful!)
-- Manually in SQL: DROP TABLE ...
-- Then: npx prisma db push --skip-generate
```

### 5.4 Secrets Management

```bash
# 1. Add to GitHub Secrets (for CI/CD)
gh secret set ANTHROPIC_API_KEY -b "sk-ant-..."

# 2. For local development
cp .env.example .env.local
# Edit with your actual values (don't commit!)

# 3. Verify no secrets in code
git-secrets --scan

# 4. In production, Railway/Fly.io manage env vars
railway variables set ANTHROPIC_API_KEY=sk-ant-...
```

---

## 6. COMPLIANCE DOMAIN SKILLS

### 6.1 FEC Form 3X Extraction

When Claude sees a form or transaction list that looks like FEC filing data:

**Keywords to look for:**
- "Committee", "FEC ID", "C0" prefix
- "Receipts", "Disbursements", "Cash on hand"
- "Itemized contributions", "Transactions"
- "Reporting period", "Coverage dates"

**Extraction approach:**
```
1. Find the committee ID (always C + 7 digits)
2. Find the reporting period (start and end dates)
3. Find totals (receipts, disbursements, cash on hand)
4. Extract itemized transactions:
   - For contributions: Name, Address, Occupation, Amount, Date
   - For expenditures: Payee, Address, Purpose, Amount, Date
5. Flag any negative amounts (errors)
6. Flag any very large amounts (> $100K - verify)
7. Confidence should be high if you found committee ID + reporting period
```

**Output JSON format:**
```json
{
  "committee_id": "C0012345",
  "committee_name": "Friends of John Smith",
  "reporting_period_start": "2024-01-01",
  "reporting_period_end": "2024-03-31",
  "total_receipts": 50000.00,
  "total_disbursements": 35000.00,
  "cash_on_hand": 15000.00,
  "transactions": [
    {
      "type": "contribution",
      "date": "2024-01-15",
      "amount": 1000.00,
      "contributor_name": "Jane Doe",
      "contributor_address": "123 Main St, Phoenix, AZ 85001",
      "contributor_occupation": "Software Engineer",
      "confidence": 0.95
    },
    {
      "type": "expenditure",
      "date": "2024-02-01",
      "amount": 5000.00,
      "payee": "Campaign Consulting LLC",
      "payee_address": "456 Oak Ave, Phoenix, AZ 85003",
      "purpose": "Campaign strategy consulting",
      "confidence": 0.92
    }
  ],
  "source_document": "FEC Form 3X (Quarter ending 3/31/2024)"
}
```

### 6.2 Form 990-N (Nonprofit E-Postcard)

**Keywords:**
- "990-N", "E-Postcard"
- "EIN:", "Employer ID Number"
- "Gross receipts", "Total revenue"
- "501(c)(3)", "Nonprofit"

**Extraction:**
```json
{
  "form_type": "990-N",
  "organization_name": "Environmental Action Coalition",
  "ein": "123456789",
  "tax_year": 2023,
  "gross_receipts": 45000.00,
  "still_in_existence": true,
  "significant_changes": false,
  "confidence": 0.98
}
```

### 6.3 Arizona Election Spending Disclosure

**Keywords:**
- "Arizona Secretary of State", "BEACON"
- "AST 16-927", "Election spending"
- "Arizona Committee ID"

**Similar to Form 3X but state-specific**

---

## 7. COMMON PITFALLS TO AVOID

### Compliance Pitfalls
- ❌ Don't assume all transactions are election-related (some might be general org expenses)
- ❌ Don't forget that contribution limits vary (individuals: $5,200, corps: $0)
- ❌ Don't mix federal (FEC) and state (Arizona) rules
- ❌ Don't ignore the $200 threshold for itemization (FEC) vs. $25 (Arizona)

### Security Pitfalls
- ❌ Don't store file paths in plaintext (encrypt them)
- ❌ Don't log full extracted financial data (log summaries only)
- ❌ Don't trust file extensions (validate magic bytes)
- ❌ Don't use MD5/SHA1 for hashing (use bcrypt for passwords, SHA256 for signatures)
- ❌ Don't expose database IDs directly in URLs (use UUIDs)

### Code Pitfalls
- ❌ Don't use string concatenation for SQL (use parameterized queries)
- ❌ Don't store API keys in code (use environment variables)
- ❌ Don't assume extraction will always succeed (always have error handling)
- ❌ Don't retry Claude API indefinitely (set max retry count)
- ❌ Don't expose error stack traces to users

### Deployment Pitfalls
- ❌ Don't deploy without running tests first
- ❌ Don't rollback migrations without testing rollback locally
- ❌ Don't forget to rotate API keys regularly
- ❌ Don't leave debug mode on in production
- ❌ Don't commit secrets to git (even in private repos)

---

## 8. PERFORMANCE OPTIMIZATION GUIDELINES

### MVP (100 orgs, 500 filings/month)
- No optimization needed
- Single database instance is fine
- In-memory caching for compliance rules
- Basic CDN (Vercel auto-handles this)

### Scaling (500+ orgs, 5K+ filings/month)
- Add database read replica for reports
- Implement Redis caching for:
  - Compliance rules (rarely change)
  - User sessions (faster than DB lookup)
  - Job queue progress (for status checks)
- Batch process Claude API calls (don't call API for every transaction)
- Compress PDFs before storing in R2

### Queries to Optimize
```sql
-- SLOW: without index
SELECT * FROM filings 
WHERE organization_id = $1 AND created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- FAST: with index
CREATE INDEX idx_filings_org_date ON filings(organization_id, created_at DESC);
```

---

## 9. PROMPT TEMPLATES FOR CLAUDE API

### 9.1 FEC Form 3X Extraction Prompt

```
You are an expert in Federal Election Commission (FEC) compliance and campaign finance law.

Your task: Extract election spending data from financial documents (bank statements, receipts, 
transaction logs, etc.) and identify which transactions are election-related.

Election-related spending includes:
- Direct contributions to candidates
- Spending supporting or opposing ballot measures
- Voter registration activities
- Campaign polling and research
- Campaign staff salaries
- Campaign advertising (online, print, broadcast)
- Get-out-the-vote activities
- Political consulting services

NOT election-related:
- General nonprofit administrative costs
- Rent/utilities for general office
- Insurance unrelated to campaigns
- Charitable donations (unless designated for election activity)

For EACH transaction you identify as election-related, extract:
{
  "date": "YYYY-MM-DD",
  "amount": number (positive),
  "payee": "Organization or person name",
  "category": "Contribution|Expenditure|Loan|In-kind",
  "purpose": "Brief description of what this was for",
  "confidence": 0.00 to 1.00 (how certain you are this is election-related)
}

If you find transactions that MIGHT be election-related but you're unsure (confidence < 0.80), 
still include them with low confidence. The human reviewer will decide.

Return ONLY a valid JSON array. No preamble, no explanation, just:
[{ transaction }, { transaction }, ...]

If no election-related transactions found, return: []

Document to analyze:
[DOCUMENT TEXT HERE]
```

### 9.2 FEC Form 3X Field Validation Prompt

```
You are an expert in FEC Form 3X compliance.

Review this extracted filing data and identify any violations of FEC rules:

Data:
[JSON DATA HERE]

Check for:
1. Invalid committee ID format (must be C followed by exactly 7 digits)
2. Contribution amounts exceeding limits ($5,200 per individual per election)
3. Contributions from prohibited sources (corporations, foreign nationals)
4. Missing required fields (contributor occupation for contributions > $200)
5. Dates outside reporting period
6. Negative amounts (red flag for fraud)
7. Total mismatches (receipts don't equal sum of transactions)

Return a JSON object:
{
  "errors": [
    {
      "field": "field_name",
      "message": "What's wrong and FEC reference",
      "severity": "error"
    }
  ],
  "warnings": [
    {
      "field": "field_name",
      "message": "Potential issue to review",
      "severity": "warning"
    }
  ],
  "is_valid": boolean
}

Respond with ONLY valid JSON. No preamble.
```

---

## 10. UPDATING COMPLIANCE RULES

When FEC or Arizona election law changes:

```
1. Find the updated regulation
2. Update /skills/compliance-rules/ markdown files
3. Update the compliance_rules table in PostgreSQL
4. Update Claude API system prompts
5. Update validation rules in code
6. Test with historical data (should still work)
7. Deploy with feature flag (roll out gradually)
8. Announce to customers via email
```

Example: If FEC raises contribution limits from $5,200 to $5,500:

```diff
// compliance-rules/fec.json
{
  "contribution_limit_individual": {
-   "value": 5200,
+   "value": 5500,
    "effective_date": "2024-11-15",
    "reference": "FEC § 16-914(A)"
  }
}

// Update code
const FEC_RULES = {
  contribution_individual: {
    max: 5500, // Updated
    message: "Individual contribution exceeds $5,500 limit"
  }
};

// Update Claude prompt
"Contribution limits: Federal candidates $5,500 per person per election (updated Nov 2024)"
```

---

## 11. QUICK REFERENCE CHECKLISTS

### Launching New Feature Checklist
- [ ] Code written and tested locally
- [ ] Unit tests written (>80% coverage)
- [ ] Integration tests pass
- [ ] Security review completed
- [ ] E2E tests pass
- [ ] Database migration tested (+ rollback)
- [ ] Documentation updated
- [ ] Feature flag ready (for gradual rollout)
- [ ] Monitoring/alerting configured
- [ ] Merged to main (GitHub Actions runs tests)
- [ ] Deployed to staging
- [ ] QA sign-off
- [ ] Deployed to production
- [ ] Monitoring for 24 hours
- [ ] Remove feature flag (or keep for future)

### Security Checklist (Pre-Launch)
- [ ] No secrets in code or git history
- [ ] All user input validated
- [ ] All database queries parameterized
- [ ] File uploads validated (size, type, content)
- [ ] API responses sanitized
- [ ] Error messages generic (no internals exposed)
- [ ] Authentication required on sensitive endpoints
- [ ] Rate limiting enabled
- [ ] CORS configured correctly
- [ ] Audit logging in place
- [ ] Database backups tested
- [ ] Disaster recovery plan documented

### Performance Checklist
- [ ] Database queries indexed (check EXPLAIN ANALYZE)
- [ ] No N+1 queries (use JOINs not loops)
- [ ] API response times <500ms (p95)
- [ ] File uploads <10MB
- [ ] PDF generation <30 seconds
- [ ] Claude API calls don't timeout (30sec max)
- [ ] Redis cache hit rate >70%
- [ ] Database connection pool tuned

---

## FINAL NOTES FOR AI AGENTS

- **When in doubt about compliance**: Ask Claude to review, but always validate against primary sources (FEC regs, Arizona statutes)
- **When in doubt about security**: Encrypt it. Log it. Assume it will be breached.
- **When in doubt about code quality**: Write tests first (TDD), then code
- **When in doubt about performance**: Profile first (don't optimize prematurely)
- **When in doubt about anything**: Document your assumption in a comment + test it

This system handles financial data. Security and compliance must come before feature velocity.

---

