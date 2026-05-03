/**
 * Compliance Rules Engine
 * Encodes FEC federal rules and Arizona state election finance regulations.
 */

const RULES = {
  fec_form_3x: {
    committee_id: {
      type: 'string',
      pattern: /^C\d{7}$/,
      message: 'Committee ID must be C followed by 7 digits',
      required: true,
      errorLevel: 'error',
      reference: 'FEC Form 3X'
    },
    total_receipts: {
      type: 'number',
      min: 0,
      message: 'Total receipts cannot be negative',
      required: true,
      errorLevel: 'error'
    },
    total_disbursements: {
      type: 'number',
      min: 0,
      message: 'Total disbursements cannot be negative',
      required: true,
      errorLevel: 'error'
    },
    contribution_individual: {
      type: 'number',
      max: 5200,
      message: 'Individual contribution exceeds $5,200 per election limit',
      required: false,
      errorLevel: 'error',
      jurisdiction: 'federal',
      reference: 'FEC § 110.1(b)(1)'
    },
    contributor_address: {
      type: 'string',
      requiredIf: (transaction) => transaction.amount > 200,
      message: 'Contributor address required for contributions > $200',
      errorLevel: 'error',
      reference: 'FEC Form 3X Instructions'
    },
    contributor_occupation: {
      type: 'string',
      requiredIf: (transaction) => transaction.amount > 200,
      message: 'Contributor occupation required for contributions > $200',
      errorLevel: 'error',
      reference: 'FEC Form 3X Instructions'
    },
    reporting_period: {
      type: 'dateRange',
      message: 'Reporting period start must precede end date',
      errorLevel: 'error'
    }
  },

  form_990n: {
    ein: {
      type: 'string',
      pattern: /^\d{9}$/,
      message: 'EIN must be exactly 9 digits',
      required: true,
      errorLevel: 'error'
    },
    gross_receipts: {
      type: 'number',
      min: 0,
      max: 50000,
      message: 'Gross receipts for 990-N must be under $50,000',
      required: true,
      errorLevel: 'error'
    },
    tax_year: {
      type: 'number',
      min: 2000,
      max: new Date().getFullYear(),
      message: 'Invalid tax year',
      required: true,
      errorLevel: 'error'
    }
  },

  arizona_disclosure: {
    committee_id: {
      type: 'string',
      required: true,
      message: 'Arizona Secretary of State Committee ID is required',
      errorLevel: 'error',
      reference: 'ARS § 16-903'
    },
    contributor_address: {
      type: 'string',
      requiredIf: (transaction) => transaction.amount > 25,
      message: 'Contributor address required for contributions > $25 (Arizona threshold)',
      errorLevel: 'error',
      reference: 'ARS § 16-914'
    },
    contributor_occupation: {
      type: 'string',
      requiredIf: (transaction) => transaction.amount > 25,
      message: 'Contributor occupation required for contributions > $25 (Arizona threshold)',
      errorLevel: 'error',
      reference: 'ARS § 16-914'
    },
    contributor_employer: {
      type: 'string',
      requiredIf: (transaction) => transaction.amount > 25,
      message: 'Contributor employer required for contributions > $25 (Arizona threshold)',
      errorLevel: 'error',
      reference: 'ARS § 16-914'
    },
    corporate_contribution: {
      type: 'boolean',
      mustBe: false,
      message: 'Corporate contributions are prohibited in Arizona',
      errorLevel: 'error',
      reference: 'ARS § 16-906'
    }
  }
};

// Contribution limits by jurisdiction and office type
const CONTRIBUTION_LIMITS = {
  federal: {
    individual_to_candidate: 5200,
    individual_to_pac: Infinity,
    pac_to_candidate: Infinity,
    corporate_to_candidate: 0,
    union_to_candidate: 0
  },
  arizona: {
    individual_to_state_candidate: 5200,
    individual_to_local_candidate: 2600,
    individual_to_leadership_pac_state: 2600,
    individual_to_leadership_pac_local: 1300,
    individual_to_pac: Infinity,
    pac_to_candidate: Infinity,
    corporate_to_candidate: 0,
    union_to_candidate: 0,
    itemization_threshold: 25 // Much lower than federal $200
  }
};

// Filing deadlines for 2024 election cycle
const FILING_DEADLINES = [
  {
    name: 'January Report',
    deadline: '2024-01-31',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee', 'pac', 'leadership_pac'],
    description: 'Annual report covering December 1 – December 31 of prior year'
  },
  {
    name: 'Q1 Report',
    deadline: '2024-04-30',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee'],
    description: 'Quarterly report covering January 1 – April 30'
  },
  {
    name: 'Pre-Primary Report',
    deadline: '2024-07-18',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee', 'pac'],
    description: '12 days before primary election. All contributions/expenditures through July 17.'
  },
  {
    name: 'Post-Primary Report',
    deadline: '2024-08-19',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee', 'pac'],
    description: '20 days after primary election.'
  },
  {
    name: 'Pre-General Election Report',
    deadline: '2024-10-24',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee', 'pac'],
    description: '12 days before general election. All spending through October 22.'
  },
  {
    name: 'Post-General Election Report',
    deadline: '2024-11-25',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee', 'pac'],
    description: '20 days after general election.'
  },
  {
    name: 'Year-End Report',
    deadline: '2025-01-31',
    jurisdiction: 'arizona',
    form_types: ['candidate_committee', 'pac', 'leadership_pac'],
    description: 'Covers Nov 25, 2024 – Dec 31, 2024'
  },
  {
    name: 'FEC Quarterly (Q1)',
    deadline: '2024-04-15',
    jurisdiction: 'federal',
    form_types: ['fec_form_3x'],
    description: 'Federal quarterly report Q1'
  },
  {
    name: 'FEC Quarterly (Q2)',
    deadline: '2024-07-15',
    jurisdiction: 'federal',
    form_types: ['fec_form_3x'],
    description: 'Federal quarterly report Q2'
  },
  {
    name: 'FEC Pre-General Report',
    deadline: '2024-10-24',
    jurisdiction: 'federal',
    form_types: ['fec_form_3x'],
    description: '12 days before general election'
  },
  {
    name: 'Form 990-N (E-Postcard)',
    deadline: '2024-05-15',
    jurisdiction: 'federal',
    form_types: ['form_990n'],
    description: 'Annual nonprofit e-postcard for orgs with < $50K gross receipts'
  }
];

/**
 * Validate a single field against a rule
 */
function validateField(fieldName, value, rule) {
  // Required check
  if (rule.required && (value === undefined || value === null || value === '')) {
    return {
      field: fieldName,
      message: `${fieldName} is required`,
      severity: rule.errorLevel || 'error',
      reference: rule.reference || null
    };
  }

  if (value === undefined || value === null || value === '') return null;

  // Type check
  if (rule.type === 'number' && typeof value !== 'number') {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      return { field: fieldName, message: `${fieldName} must be a number`, severity: 'error' };
    }
    value = parsed;
  }

  // Pattern check
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return {
      field: fieldName,
      message: rule.message,
      severity: rule.errorLevel || 'error',
      reference: rule.reference || null
    };
  }

  // Range checks
  if (rule.min !== undefined && value < rule.min) {
    return {
      field: fieldName,
      message: rule.message,
      severity: rule.errorLevel || 'error',
      reference: rule.reference || null
    };
  }

  if (rule.max !== undefined && value > rule.max) {
    return {
      field: fieldName,
      message: rule.message,
      severity: rule.errorLevel || 'error',
      reference: rule.reference || null
    };
  }

  return null;
}

/**
 * Validate an entire extraction result against the appropriate ruleset
 */
function validateExtraction(extractedData, filingType) {
  const rules = RULES[filingType];
  if (!rules) {
    return {
      errors: [{ field: 'filing_type', message: `Unknown filing type: ${filingType}`, severity: 'error' }],
      warnings: [],
      isValid: false
    };
  }

  const errors = [];
  const warnings = [];

  // Validate top-level fields
  for (const [fieldName, rule] of Object.entries(rules)) {
    const value = extractedData[fieldName];
    const error = validateField(fieldName, value, rule);
    if (error) {
      if (error.severity === 'error') errors.push(error);
      else warnings.push(error);
    }
  }

  // Validate transactions if present
  if (extractedData.transactions && Array.isArray(extractedData.transactions)) {
    const jurisdiction = filingType === 'arizona_disclosure' ? 'arizona' : 'federal';
    const limits = CONTRIBUTION_LIMITS[jurisdiction];
    const itemizationThreshold = jurisdiction === 'arizona' ? 25 : 200;

    extractedData.transactions.forEach((tx, index) => {
      // Check for negative amounts
      if (tx.amount < 0) {
        errors.push({
          field: `transactions[${index}].amount`,
          message: `Negative amount ($${tx.amount}) detected – possible error or fraud indicator`,
          severity: 'error'
        });
      }

      // Check contribution limits (individual to candidate)
      if (tx.type === 'contribution' && tx.amount > limits.individual_to_candidate) {
        errors.push({
          field: `transactions[${index}].amount`,
          message: `Contribution of $${tx.amount} exceeds individual limit of $${limits.individual_to_candidate}`,
          severity: 'error',
          reference: jurisdiction === 'federal' ? 'FEC § 110.1' : 'ARS § 16-905'
        });
      }

      // Check missing contributor info for amounts above itemization threshold
      if (tx.type === 'contribution' && tx.amount > itemizationThreshold) {
        if (!tx.contributor_address) {
          errors.push({
            field: `transactions[${index}].contributor_address`,
            message: `Contributor address required for contributions > $${itemizationThreshold}`,
            severity: 'error'
          });
        }
        if (!tx.contributor_occupation) {
          warnings.push({
            field: `transactions[${index}].contributor_occupation`,
            message: `Contributor occupation recommended for contributions > $${itemizationThreshold}`,
            severity: 'warning'
          });
        }
      }

      // Check for very large amounts (flag for manual review)
      if (tx.amount > 100000) {
        warnings.push({
          field: `transactions[${index}].amount`,
          message: `Large amount ($${tx.amount.toLocaleString()}) – verify this transaction`,
          severity: 'warning'
        });
      }

      // Check dates are within reporting period
      if (extractedData.reporting_period_start && extractedData.reporting_period_end) {
        const txDate = new Date(tx.date);
        const start = new Date(extractedData.reporting_period_start);
        const end = new Date(extractedData.reporting_period_end);
        if (txDate < start || txDate > end) {
          warnings.push({
            field: `transactions[${index}].date`,
            message: `Transaction date ${tx.date} is outside reporting period ${extractedData.reporting_period_start} to ${extractedData.reporting_period_end}`,
            severity: 'warning'
          });
        }
      }
    });

    // Check for duplicate transactions
    const seen = new Map();
    extractedData.transactions.forEach((tx, index) => {
      const key = `${tx.date}-${tx.amount}-${(tx.contributor_name || tx.payee || '')}`;
      if (seen.has(key)) {
        warnings.push({
          field: `transactions[${index}]`,
          message: `Possible duplicate transaction: same date, amount, and name as transaction #${seen.get(key) + 1}`,
          severity: 'warning'
        });
      } else {
        seen.set(key, index);
      }
    });

    // Verify totals match
    if (extractedData.total_receipts !== undefined) {
      const contributionSum = extractedData.transactions
        .filter(t => t.type === 'contribution')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
      if (Math.abs(contributionSum - extractedData.total_receipts) > 1) {
        errors.push({
          field: 'total_receipts',
          message: `Total receipts ($${extractedData.total_receipts}) doesn't match sum of contributions ($${contributionSum.toFixed(2)})`,
          severity: 'error'
        });
      }
    }
  }

  return {
    errors,
    warnings,
    isValid: errors.length === 0
  };
}

/**
 * Get upcoming deadlines for a given form type and jurisdiction
 */
function getUpcomingDeadlines(formType, jurisdiction, daysAhead = 90) {
  const now = new Date();
  const cutoff = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

  return FILING_DEADLINES.filter(d => {
    const deadlineDate = new Date(d.deadline);
    const matchesJurisdiction = !jurisdiction || d.jurisdiction === jurisdiction;
    const matchesForm = !formType || d.form_types.includes(formType);
    return deadlineDate >= now && deadlineDate <= cutoff && matchesJurisdiction && matchesForm;
  }).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
}

module.exports = {
  RULES,
  CONTRIBUTION_LIMITS,
  FILING_DEADLINES,
  validateField,
  validateExtraction,
  getUpcomingDeadlines
};
