# Election Compliance AI - Technical Architecture
## Version 1.0 | Complete Build Specification

---

## 1. SYSTEM OVERVIEW

### 1.1 Product Purpose
AI-powered platform that reads election spending transaction data (from bank statements, CSVs, receipts) and pre-fills compliance forms (FEC, state-level) with human review gate.

### 1.2 Core Workflow
```
User Upload → Document Parse → AI Extract → Validate → Human Review → Export PDF → User Submits
```

### 1.3 Non-Functional Requirements
- **Security**: Financial data is sensitive. Encrypt everything. Assume breach.
- **Compliance**: GDPR/CCPA ready. SOC 2 roadmap.
- **Performance**: <2 min extraction time per document
- **Reliability**: 99.5% uptime. No data loss.
- **Auditability**: Every action logged (who, what, when, for compliance audits)

---

## 2. TECHNOLOGY STACK

### Frontend
- **Framework**: Next.js 14 (React, TypeScript)
- **Hosting**: Vercel
- **Auth**: Supabase Auth (OAuth + email/password)
- **State**: TanStack Query (React Query) + Zustand
- **UI**: Shadcn/ui + Tailwind CSS
- **Forms**: React Hook Form (validation on client)
- **File Upload**: TUS (resumable uploads for large files)

### Backend
- **Runtime**: Node.js 20 (or Python 3.11 FastAPI if AI-heavy)
- **Framework**: Hono (lightweight) or Express
- **Database**: PostgreSQL 15 (Supabase or Railway)
- **Cache**: Redis (for job status, rate limiting)
- **Queue**: Bull (Redis-backed job queue)
- **File Storage**: Cloudflare R2 (S3-compatible, cheaper)

### AI / Document Processing
- **LLM**: Anthropic Claude (via SDK)
- **Prompt Library**: Git repo (version-controlled prompts)
- **Document Parsing**:
  - PDFs: PDFjs (client) + pdfjs-dist (server)
  - Excel: SheetJS (server-side)
  - CSV: native parsing
  - Word: mammoth.js

### DevOps / Infrastructure
- **Version Control**: GitHub (private repo)
- **CI/CD**: GitHub Actions
- **Frontend Deploy**: Vercel
- **Backend Deploy**: Railway or Fly.io
- **Database**: Supabase (PostgreSQL + Auth)
- **Secrets**: GitHub Secrets + environment files
- **Monitoring**: Sentry (errors), PostHog (analytics)
- **Logging**: Winston (structured logging to Supabase)

---

## 3. ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER (Browser)                              │
├─────────────────────────────────────────────────────────────────┤
│  Next.js Frontend (Vercel)                                       │
│  ├─ Upload UI (drag-drop, file picker)                          │
│  ├─ Review Interface (form fields, error display)               │
│  ├─ Dashboard (filing history, status)                          │
│  └─ Settings (org config, billing)                              │
└────────────────┬────────────────────────────────────────────────┘
                 │ HTTPS
        ┌────────▼────────┐
        │  API Gateway    │
        │  (rate limit,   │
        │   auth check)   │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    │ ┌──────────▼──────────┐ │
    │ │  REST API           │ │ Hono/Express
    │ │  (Node.js Backend)  │ │ Railway/Fly.io
    │ │                     │ │
    │ │ Routes:             │ │
    │ │ POST /auth/login    │ │
    │ │ POST /filings       │ │
    │ │ GET /filings/:id    │ │
    │ │ PUT /filings/:id    │ │
    │ │ POST /extract       │ │
    │ └──────────┬──────────┘ │
    │            │            │
    └────────────┼────────────┘
                 │
         ┌───────┴────────┐
         │                │
   ┌─────▼────────┐  ┌───▼──────────┐
   │  PostgreSQL  │  │ Redis Queue  │
   │  (Supabase)  │  │ (Bull)       │
   │              │  │              │
   │ • users      │  │ • Jobs:      │
   │ • orgs       │  │   - extract  │
   │ • filings    │  │   - validate │
   │ • documents  │  │   - export   │
   │ • audit_log  │  └──────┬───────┘
   │ • rules      │         │
   └──────────────┘    ┌────▼────────┐
                       │ Worker Pool │
                       │ (Node.js)   │
                       │             │
                       │ Processes:  │
                       │ • PDF parse │
                       │ • AI extrac │
                       │ • Validate  │
                       └────┬────────┘
                            │
                    ┌───────┴──────────┐
                    │                  │
              ┌─────▼────┐      ┌─────▼────────┐
              │ Anthropic│      │ Cloudflare   │
              │ Claude   │      │ R2 (Storage) │
              │ API      │      │              │
              └──────────┘      │ • Uploaded   │
                                │   files      │
                                │ • Generated  │
                                │   PDFs       │
                                └──────────────┘
```

---

## 4. DATABASE SCHEMA

### 4.1 Core Tables

```sql
-- Users (Managed by Supabase Auth, but extended in our DB)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  organization_id UUID NOT NULL,
  role VARCHAR(20) DEFAULT 'viewer', -- admin, editor, viewer
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Organizations (The nonprofits/PACs using our platform)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 501c3, 501c4, pac, super_pac
  ein VARCHAR(9),
  fec_committee_id VARCHAR(20),
  state VARCHAR(2) NOT NULL, -- AZ, CA, etc
  city VARCHAR(100),
  subscription_tier VARCHAR(20) DEFAULT 'tier1', -- tier1, tier2, tier3
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Filings (Individual compliance filings)
CREATE TABLE filings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  filing_type VARCHAR(50) NOT NULL, -- fec_form_3x, form_990n, state_disclosure
  filing_period_start DATE,
  filing_period_end DATE,
  status VARCHAR(20) DEFAULT 'draft', -- draft, extracting, extracted, reviewing, reviewed, exported, submitted
  
  -- Extracted data (from AI)
  extracted_data JSONB, -- Raw AI extraction result
  extracted_at TIMESTAMP,
  extraction_confidence NUMERIC(3,2), -- 0.00 to 1.00
  
  -- User edits
  user_edits JSONB, -- What customer changed from extraction
  edited_by UUID REFERENCES users(id),
  edited_at TIMESTAMP,
  
  -- Validation results
  validation_errors JSONB, -- Array of errors (field, message, severity)
  validation_warnings JSONB, -- Warnings (non-blocking)
  validated_at TIMESTAMP,
  
  -- Export
  exported_pdf_path VARCHAR(500), -- S3/R2 path
  exported_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(organization_id, filing_type, filing_period_start, filing_period_end)
);

-- Documents (Uploaded source files)
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filing_id UUID NOT NULL REFERENCES filings(id),
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(20) NOT NULL, -- pdf, excel, csv, word
  file_size_bytes INTEGER NOT NULL,
  file_path_encrypted VARCHAR(500) NOT NULL, -- Encrypted S3 path
  
  -- Content
  extracted_text TEXT, -- Full text from document (searchable)
  text_extraction_method VARCHAR(50), -- ocr, native_pdf, excel_parse, etc
  
  -- Metadata
  uploaded_by UUID NOT NULL REFERENCES users(id),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  
  CONSTRAINT file_size_check CHECK (file_size_bytes <= 52428800) -- 50MB max
);

-- Compliance Rules (Knowledge base)
CREATE TABLE compliance_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_type VARCHAR(50) NOT NULL, -- field_definition, validation_rule, deadline, contribution_limit
  jurisdiction VARCHAR(50) NOT NULL, -- federal, arizona, california, etc
  form_type VARCHAR(50), -- fec_form_3x, form_990n, etc
  rule_code VARCHAR(100), -- e.g., "FEC_FORM_3X_COMMITTEE_ID_FORMAT"
  rule_content JSONB NOT NULL, -- Structured rule definition
  
  -- Versioning
  version INTEGER DEFAULT 1,
  notes TEXT,
  last_updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Effective dates
  effective_date DATE,
  expires_date DATE
);

-- Audit Log (Compliance audit trail)
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL, -- upload, extract, edit, validate, export, view, delete
  resource_type VARCHAR(50), -- filing, document, user, organization
  resource_id UUID,
  changes JSONB, -- What changed (before/after for edits)
  ip_address INET,
  user_agent TEXT,
  status VARCHAR(20) DEFAULT 'success', -- success, failure
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  
  INDEX(organization_id, created_at),
  INDEX(user_id, created_at)
);

-- Billing (For future subscription management)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL UNIQUE REFERENCES organizations(id),
  stripe_customer_id VARCHAR(100),
  stripe_subscription_id VARCHAR(100),
  tier VARCHAR(20) NOT NULL, -- tier1, tier2, tier3
  status VARCHAR(20) DEFAULT 'active', -- active, paused, cancelled
  monthly_price NUMERIC(10,2),
  filings_per_month INTEGER,
  
  started_at TIMESTAMP DEFAULT NOW(),
  renewed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  next_billing_date DATE
);

-- API Keys (For future API access)
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  key_hash VARCHAR(255) NOT NULL UNIQUE, -- Hash of actual key (never store plaintext)
  name VARCHAR(100),
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

### 4.2 Indexes (Performance)

```sql
-- Frequently queried
CREATE INDEX idx_filings_org_status ON filings(organization_id, status);
CREATE INDEX idx_filings_created ON filings(created_at DESC);
CREATE INDEX idx_documents_filing ON documents(filing_id);
CREATE INDEX idx_audit_org_date ON audit_log(organization_id, created_at DESC);

-- Full-text search (for document content)
CREATE INDEX idx_documents_text ON documents USING GIN(to_tsvector('english', extracted_text));
```

---

## 5. API SPECIFICATION

### 5.1 Authentication

**All endpoints require authentication (Bearer token from Supabase Auth)**

```
Headers:
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### 5.2 Core Endpoints

#### **POST /api/filings**
Create a new filing

```json
Request:
{
  "organization_id": "uuid",
  "filing_type": "fec_form_3x",
  "filing_period_start": "2024-01-01",
  "filing_period_end": "2024-03-31"
}

Response (201):
{
  "id": "uuid",
  "status": "draft",
  "created_at": "2024-05-03T10:00:00Z"
}
```

#### **POST /api/filings/:id/upload**
Upload a document to a filing

```json
Request:
- Content-Type: multipart/form-data
- file: <PDF/Excel/CSV/Word file>
- max_size: 50MB

Response (202):
{
  "filing_id": "uuid",
  "document_id": "uuid",
  "status": "processing",
  "job_id": "queue_job_id"
}
```

#### **POST /api/filings/:id/extract**
Trigger AI extraction on all documents in filing

```json
Request:
{
  "filing_type": "fec_form_3x"
}

Response (202 Accepted):
{
  "filing_id": "uuid",
  "status": "extracting",
  "job_id": "queue_job_id",
  "estimated_seconds": 45
}
```

#### **GET /api/filings/:id**
Get filing details + extracted data

```json
Response (200):
{
  "id": "uuid",
  "organization_id": "uuid",
  "filing_type": "fec_form_3x",
  "status": "extracted",
  "extracted_data": {
    "committee_id": "C00123456",
    "total_receipts": 25000,
    "total_disbursements": 18500,
    "transactions": [...]
  },
  "validation_errors": [
    {
      "field": "committee_id",
      "message": "Invalid FEC committee ID format",
      "severity": "error"
    }
  ],
  "documents": [...]
}
```

#### **PUT /api/filings/:id**
Update extracted data (user edits)

```json
Request:
{
  "extracted_data": {
    "committee_id": "C00123456",
    "total_receipts": 25000,
    ...
  }
}

Response (200):
{
  "id": "uuid",
  "status": "reviewed",
  "updated_at": "2024-05-03T10:30:00Z"
}
```

#### **POST /api/filings/:id/export**
Generate PDF for submission

```json
Response (200):
{
  "filing_id": "uuid",
  "pdf_url": "https://r2.cloudflare.com/...",
  "exported_at": "2024-05-03T10:45:00Z",
  "status": "exported"
}
```

#### **GET /api/filings**
List all filings for organization

```json
Query params:
?status=extracted&limit=20&offset=0&sort=created_at

Response (200):
{
  "filings": [...],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

#### **GET /api/dashboard/summary**
Dashboard overview

```json
Response (200):
{
  "organization_id": "uuid",
  "subscription_tier": "tier1",
  "total_filings": 12,
  "filings_this_month": 3,
  "upcoming_deadlines": [...],
  "total_errors": 2,
  "total_warnings": 5
}
```

### 5.3 Error Responses

```json
400 Bad Request:
{
  "error": "invalid_request",
  "message": "Organization not found",
  "status": 400
}

401 Unauthorized:
{
  "error": "unauthorized",
  "message": "Invalid or expired token",
  "status": 401
}

422 Unprocessable Entity (Validation):
{
  "error": "validation_error",
  "messages": ["file_size exceeds 50MB"],
  "status": 422
}

500 Internal Server Error:
{
  "error": "internal_server_error",
  "message": "Something went wrong. Error ID: error_id_123",
  "status": 500
}
```

---

## 6. SECURITY ARCHITECTURE

### 6.1 Data Protection

#### **In Transit**
- All connections: HTTPS/TLS 1.3+
- API Key validation on every request
- CORS configured (whitelist frontend domain only)

#### **At Rest**
- Database: PostgreSQL with encryption at rest (Supabase default)
- Files: Encrypted in R2 (automatic encryption)
- Secrets: GitHub Secrets (never commit)
- Environment variables: .env files (gitignored)

#### **Sensitive Data**
- **Financial documents**: Encrypted file paths in DB, actual files encrypted in R2
- **User financial data**: Only in extracted_data JSONB (encrypted column option available)
- **API keys**: Hash stored (like passwords), full key only shown once at creation

#### **PII Handling**
- User names/addresses in documents: Only extracted where legally required
- IP logs: 90-day retention max
- User email: Only for auth, not shared with 3rd parties

### 6.2 Access Control

#### **Authentication**
- Supabase Auth (JWT-based)
- Email/password OR OAuth (Google, maybe)
- MFA ready (not MVP, but infrastructure prepared)

#### **Authorization**
- Row-level security (Supabase RLS)
  - Users can only access their organization's data
  - Admins can manage other users in their org
  - Finance staff can only view (not delete)
- API endpoint validation (users can only access /orgs/{their_org_id})

#### **Roles**
- **Admin**: Create org, manage users, billing, settings
- **Editor**: Upload documents, edit extractions, export
- **Viewer**: View filings, read-only access

### 6.3 Audit & Logging

- **All actions logged**: Who did what, when, from where
- **Immutable logs**: Audit log entries cannot be deleted (only soft-deleted = marked deleted_at but kept in DB)
- **Retention**: 7 years (legal requirement for nonprofits/PACs)
- **Log fields**: user_id, action, resource, changes, ip_address, user_agent, timestamp

### 6.4 Compliance Readiness

#### **GDPR**
- Right to deletion: Delete user + all their data
- Data portability: Export user data in JSON format
- Privacy policy: Clear, linked in footer

#### **CCPA** (California)
- Consumer right to know
- Right to delete
- Right to opt-out of sales (we don't do this)

#### **SOC 2 Type II** (for enterprise tier, later)
- Security controls documented
- Encryption policies
- Access controls
- Audit logging

---

## 7. AI / DOCUMENT PROCESSING PIPELINE

### 7.1 Document Processing Flow

```
Upload → Parse → Chunk → Extract → Validate → Store
```

**Step 1: Parse**
- PDF: Use PDFjs to extract text + maintain structure
- Excel: Use SheetJS to parse cells, maintain formulas
- CSV: Parse as-is (delimiter detection)
- Word: Use mammoth.js for structure

**Step 2: Chunk** (if document is long)
- Split into logical chunks (pages for PDF, ranges for Excel)
- Maintain context (page numbers, cell references)
- Max 4000 tokens per chunk (Claude's window)

**Step 3: Extract** (using Claude API)
- Send document + system prompt to Claude
- Claude identifies election-related transactions
- Claude extracts: date, amount, payee, category, purpose
- Output: JSON array of transactions

**Step 4: Validate**
- Check each transaction against compliance rules
- Flag errors: missing fields, invalid amounts, format issues
- Return: structured validation report

**Step 5: Store**
- Save extracted_data to PostgreSQL (filings table)
- Save validation results
- Delete raw file content (optionally encrypt)

### 7.2 Claude API Integration

#### **System Prompt for Extraction** (See skills.md for details)

```
You are an expert in election finance law. Your job is to read financial 
documents and identify election-related spending.

Read the attached document carefully. Extract all transactions that involve:
1. Direct spending on candidates/ballot measures
2. Voter engagement activities
3. Campaign consulting
4. Political advertising
5. Voter registration drives

For each transaction, return JSON:
{
  "date": "YYYY-MM-DD",
  "amount": 1000.00,
  "payee": "Company Name",
  "category": "Political Advertising",
  "purpose": "Description of what it's for",
  "confidence": 0.95
}

Return ONLY valid JSON. No preamble. If unsure about a transaction, set 
confidence < 0.80 and include in the output.
```

#### **Cost Model**
- Average extraction cost: $0.02-0.05 per document
- At 100 customers × 5 documents/month = $100-250/month in Claude API costs
- Totally acceptable for $1,200-5,000/month subscription

### 7.3 Error Handling

If extraction fails:
1. Log error to audit_log
2. Return to user: "Document processing failed, try again or contact support"
3. Email support team with error details
4. User can retry (won't double-charge Claude API due to job deduplication)

---

## 8. DEPLOYMENT & DEVOPS

### 8.1 Environments

**Development** (Local)
- Next.js dev server (localhost:3000)
- Node API (localhost:3001)
- PostgreSQL local (Docker)
- Redis local (Docker)

**Staging** (Pre-production)
- Vercel preview deployments
- Railway staging database
- Staging API environment
- Test Stripe/payment integration

**Production**
- Vercel (frontend)
- Railway/Fly.io (backend)
- Supabase (production database)
- R2 (production storage)

### 8.2 GitHub Actions CI/CD

#### **On Push to Main**
```yaml
1. Run tests (Jest, Playwright)
2. Lint (ESLint, TypeScript)
3. Build frontend
4. Build backend Docker image
5. Push to registry
6. Deploy to production (Vercel + Railway)
```

#### **On PR**
```yaml
1. Run tests
2. Lint
3. Type check
4. Preview deployment (Vercel)
```

### 8.3 Monitoring

- **Errors**: Sentry (get alerted immediately)
- **Performance**: PostHog (understand user flows)
- **Uptime**: Monitoring tool (ping every 5 min)
- **Database**: Supabase dashboard (query performance, backups)
- **Logs**: Structured logs to Supabase (query with SQL)

### 8.4 Backups

- **Database**: Automated daily backups (Supabase)
- **Files**: S3/R2 versioning enabled
- **Retention**: 30-day backup history

---

## 9. SCALING CONSIDERATIONS

### 9.1 Current (MVP)

**Handles:**
- 100 organizations
- 500 filings/month
- <50MB documents
- Concurrent: 10 users

**Cost:** ~$500/month

### 9.2 Near-term (Year 1 with 50+ customers)

**Optimization needed:**
- Database read replicas (for reports/analytics)
- File caching (CloudFlare KV for PDFs)
- API rate limiting (Redis)

**Cost:** ~$2,000/month

### 9.3 Future (100+ customers)

**Optimization needed:**
- Microservices (extraction service separate)
- Elasticsearch (for document search)
- CDN (for PDF delivery)
- Load balancer

**Cost:** ~$5,000+/month

---

## 10. DEVELOPMENT ROADMAP

### **Phase 1: MVP (Weeks 1-12)**
- ✅ Auth (login/signup)
- ✅ Organization setup
- ✅ File upload (drag-drop)
- ✅ Document parsing
- ✅ Claude AI extraction
- ✅ Basic validation
- ✅ Human review UI
- ✅ PDF export
- ✅ Email reminders (deadlines)
- ✅ Dashboard (basic)

### **Phase 2: Scaling (Weeks 13-26)**
- ✅ Multi-state support
- ✅ Advanced validation rules
- ✅ Batch operations (upload 10 documents at once)
- ✅ Export to FEC (automated submission option)
- ✅ Team management (invite other users)
- ✅ Audit reports (who did what)

### **Phase 3: Enterprise (Weeks 27+)**
- ✅ API access
- ✅ Zapier integration
- ✅ White-label option
- ✅ Advanced analytics
- ✅ Custom workflows
- ✅ SSO (OAuth)

---

## 11. TESTING STRATEGY

### **Unit Tests** (Jest)
- Validation rules
- Date/amount parsing
- Error messages
- Auth logic

### **Integration Tests**
- Upload → Extract → Validate flow
- Database operations
- API endpoints

### **E2E Tests** (Playwright)
- User journey: Login → Upload → Review → Export
- Error states
- Edge cases

### **Security Tests**
- SQL injection attempts
- CORS validation
- Auth bypass attempts
- File upload exploitation

### **Load Tests** (K6)
- 100 concurrent users uploading
- API rate limiting
- Database connection limits

---

## 12. TECHNICAL DEBT & FUTURE

### Smart Decisions (Low Tech Debt)
- ✅ Use Supabase Auth (don't build auth from scratch)
- ✅ Use Claude API (don't train model)
- ✅ PostgreSQL (proven, scalable)
- ✅ Vercel (no DevOps needed)

### Potential Debt (Monitor)
- Custom validation rules (might need rule engine)
- Prompt engineering (might need fine-tuning)
- Multi-state handling (will get complex fast)

### Migrations Down the Road
- Database: Switching from Supabase to self-hosted PostgreSQL (unlikely needed)
- Backend: Node to Python (only if heavy ML needed)
- Storage: R2 to S3 (API-compatible, easy switch)

---

## APPENDIX A: Configuration Management

### Environment Variables

```
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ANTHROPIC_API_KEY=sk-ant-...

# Production (GitHub Secrets)
SUPABASE_SERVICE_ROLE_KEY=...
DATABASE_URL=postgresql://...
CLAUDE_API_KEY=...
STRIPE_SECRET_KEY=...
SENTRY_DSN=...
```

### Docker Compose (Local Development)

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: election_compliance
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

---

## APPENDIX B: How to Start Development

1. Clone repo
2. `npm install`
3. `docker-compose up` (start Postgres + Redis)
4. `npm run dev` (start Next.js)
5. `npm run dev:api` (start Node API in separate terminal)
6. Visit http://localhost:3000

---

