// Arizona Compliance Rules Page
function renderAZRules(el) {
  el.innerHTML = `
<div class="page-header">
  <h1>Arizona Election Finance Rules</h1>
  <p>Key compliance requirements under Arizona Revised Statutes Title 16</p>
</div>
<div class="page-body rules-container">

  <div class="stats-grid" style="margin-bottom:20px">
    <div class="color-stat bg-blue"><div class="stat-value">$25</div><div class="stat-label">AZ Itemization Threshold</div></div>
    <div class="color-stat bg-green"><div class="stat-value">$5,200</div><div class="stat-label">State Office Limit / Election</div></div>
    <div class="color-stat bg-orange"><div class="stat-value">$2,600</div><div class="stat-label">Local Office Limit / Election</div></div>
    <div class="color-stat bg-red"><div class="stat-value">$0</div><div class="stat-label">Corporate Contribution Limit</div></div>
  </div>

  ${ruleSection('Contribution Limits (ARS § 16-905)', [
    {t:'Individual → State Candidate', v:'$5,200 per election', ref:'ARS § 16-905(A)'},
    {t:'Individual → Local Candidate', v:'$2,600 per election', ref:'ARS § 16-905(A)'},
    {t:'Individual → Leadership PAC (State)', v:'$2,600 per calendar year', ref:'ARS § 16-914(E)'},
    {t:'Individual → Leadership PAC (Local)', v:'$1,300 per calendar year', ref:'ARS § 16-914(E)'},
    {t:'PAC → Candidate', v:'Unlimited', ref:'ARS § 16-905'},
    {t:'Individual → PAC', v:'Unlimited', ref:'ARS § 16-905'},
    {t:'Per Election note', v:'Primary and General are separate elections. An individual may give $5,200 for the primary AND $5,200 for the general = $10,400 total.', ref:''},
  ], true)}

  ${ruleSection('Prohibited Contributions (ARS § 16-906)', [
    {t:'Corporate contributions', v:'PROHIBITED — $0 allowed', ref:'ARS § 16-906(A)', bad:true},
    {t:'Labor union treasury funds', v:'PROHIBITED — members may give as individuals', ref:'ARS § 16-906(B)', bad:true},
    {t:'Foreign nationals', v:'PROHIBITED — criminal charges possible', ref:'ARS § 16-906', bad:true},
    {t:'Minors (under 18)', v:'PROHIBITED — must return contribution', ref:'ARS § 16-906', bad:true},
    {t:'Anonymous contributions > $100', v:'PROHIBITED — must identify donor', ref:'ARS § 16-906', bad:true},
    {t:'Conduit contributions', v:'PROHIBITED — cannot use another person\'s name', ref:'ARS § 16-906', bad:true},
    {t:'Government contractors (> $25K contracts)', v:'PROHIBITED from contributing to relevant committees', ref:'ARS § 16-906', bad:true},
    {t:'Small business exception', v:'Corporations with < $1M revenue and < 20 shareholders may contribute under personal limits', ref:'ARS § 16-906(A)'},
  ])}

  ${ruleSection('Disclosure & Itemization Requirements (ARS § 16-914)', [
    {t:'Itemization threshold', v:'$25 — any contributor giving > $25 must be reported by name (much lower than federal $200)', ref:'ARS § 16-914'},
    {t:'Required info (> $25)', v:'Full name, address, occupation, employer, amount, date, type', ref:'ARS § 16-914'},
    {t:'Cumulative tracking', v:'If same person gives multiple donations totaling > $25, ALL must be itemized', ref:'ARS § 16-914'},
    {t:'Occupation specificity', v:'"Software Engineer" is acceptable. "Self-employed" or "Retired" alone is NOT — must describe actual work.', ref:'ARS § 16-914'},
    {t:'Expenditure reporting', v:'All expenditures > $25 must list payee name, address, amount, date, and specific purpose', ref:'ARS § 16-914'},
    {t:'Purpose descriptions', v:'"Printing campaign brochures" ✓ — "Consulting" alone ✗ — must be specific', ref:'ARS § 16-914'},
  ])}

  ${ruleSection('Committee Registration (ARS § 16-903, 16-904)', [
    {t:'PAC registration trigger', v:'Must register if receiving or spending > $1,000 in a calendar year', ref:'ARS § 16-903'},
    {t:'Registration deadline', v:'Within 3 business days of receiving first contribution or spending first money', ref:'ARS § 16-903'},
    {t:'Candidate committee', v:'Within 5 business days of accepting first contribution', ref:'ARS § 16-904'},
    {t:'Leadership committee', v:'Within 7 days of establishment', ref:'ARS § 16-904'},
    {t:'Filing system', v:'BEACON — Arizona Secretary of State electronic filing system (no paper)', ref:'ARS § 16-904'},
    {t:'Separate bank account', v:'Required — commingling funds is a violation', ref:'ARS § 16-904'},
    {t:'Penalty for not registering', v:'$250 + 3% of amount received/spent (up to $5,000)', ref:'ARS § 16-903'},
  ])}

  ${ruleSection('Filing Deadlines — Election Year (ARS § 16-914)', [
    {t:'January Report', v:'Due January 31 — covers prior December', ref:'ARS § 16-914'},
    {t:'Quarterly Reports', v:'Due April 30, July 31', ref:'ARS § 16-914'},
    {t:'Pre-Primary Report', v:'Due 12 days before primary election', ref:'ARS § 16-914'},
    {t:'Post-Primary Report', v:'Due 20 days after primary election', ref:'ARS § 16-914'},
    {t:'Pre-General Election', v:'Due 12 days before general election (Oct 24, 2024)', ref:'ARS § 16-914'},
    {t:'Post-General Election', v:'Due 20 days after general election (Nov 25, 2024)', ref:'ARS § 16-914'},
    {t:'Year-End Report', v:'Due January 31 of following year', ref:'ARS § 16-914'},
    {t:'PAC Monthly Reports', v:'Due by the 20th of each month (if active)', ref:'ARS § 16-914'},
    {t:'Late filing: 1-5 days', v:'$50 penalty', ref:'ARS § 16-924'},
    {t:'Late filing: 6-10 days', v:'$100 penalty', ref:'ARS § 16-924'},
    {t:'Late filing: 11+ days', v:'$250 + possible ballot removal', ref:'ARS § 16-924'},
  ])}

  ${ruleSection('Independent Expenditures & Electioneering (ARS § 16-913)', [
    {t:'Registration threshold', v:'Must register if spending > $1,000 on independent expenditures', ref:'ARS § 16-913'},
    {t:'Reporting deadline', v:'Within 2 business days of each expenditure', ref:'ARS § 16-913'},
    {t:'Electioneering window', v:'45 days before election — ads mentioning candidates become regulated', ref:'ARS § 16-901(20)'},
    {t:'Disclaimer requirement', v:'"Paid for by [Name]" must appear on all communications — clear and conspicuous', ref:'ARS § 16-913'},
    {t:'Coordination prohibition', v:'Independent expenditures must NOT be coordinated with candidate — violation converts to contribution', ref:'ARS § 16-913'},
    {t:'Super PACs', v:'May accept unlimited contributions but CANNOT give to candidate committees — independent expenditures only', ref:'ARS § 16-901(46)'},
  ])}

  ${ruleSection('Penalties & Enforcement (ARS § 16-924)', [
    {t:'Late filing', v:'$50 – $250 depending on days late', ref:'ARS § 16-924'},
    {t:'Failure to file', v:'$250 per month not filed', ref:'ARS § 16-924'},
    {t:'Accepting prohibited contribution', v:'Return contribution + $500 minimum penalty', ref:'ARS § 16-924'},
    {t:'Missing contributor info', v:'Cannot accept contribution > $25 without name, address, occupation, employer', ref:'ARS § 16-924'},
    {t:'Personal use violation', v:'Return of funds + $250 – $2,000 civil penalty', ref:'ARS § 16-924'},
    {t:'Coordination violation', v:'Expenditure treated as contribution + $250 – $2,000 penalty', ref:'ARS § 16-924'},
    {t:'Willful violations', v:'Up to $10,000 + possible criminal charges', ref:'ARS § 16-924'},
    {t:'Audit authority', v:'Secretary of State may audit any committee — records must be kept 4-6 years', ref:'ARS § 16-924'},
  ])}

  <div class="card" style="margin-top:20px">
    <div class="card-body" style="text-align:center;padding:24px">
      <p style="font-size:13px;color:var(--text-muted)">
        <strong>Disclaimer:</strong> This is a reference summary. Always consult the
        <a href="https://www.azleg.gov/arsDetail/?title=16" target="_blank" style="color:var(--accent)">Arizona Revised Statutes Title 16</a>
        and the <a href="https://azsos.gov/elections/campaign-finance-reporting" target="_blank" style="color:var(--accent)">Arizona Secretary of State</a>
        for authoritative guidance. Contact: Campaign.Finance@azsos.gov · 602-542-8683
      </p>
    </div>
  </div>
</div>`;

  // Accordion behavior
  el.querySelectorAll('.rule-section-header').forEach(h => {
    h.onclick = () => {
      const body = h.nextElementSibling;
      const isOpen = body.classList.contains('open');
      // Close all
      el.querySelectorAll('.rule-section-body').forEach(b => b.classList.remove('open'));
      el.querySelectorAll('.rule-section-header').forEach(h2 => { h2.classList.remove('open'); h2.querySelector('.chevron').textContent = '▸'; });
      if (!isOpen) {
        body.classList.add('open');
        h.classList.add('open');
        h.querySelector('.chevron').textContent = '▾';
      }
    };
  });

  // Open first section by default
  const first = el.querySelector('.rule-section-header');
  if (first) first.click();
}

function ruleSection(title, items, startOpen) {
  return `<div class="rule-section">
    <div class="rule-section-header"><span>${title}</span><span class="chevron" style="color:var(--text-muted);font-size:14px">▸</span></div>
    <div class="rule-section-body">${items.map(i =>
      `<div class="rule-item"><strong>${i.t}:</strong> ${i.bad ? `<span class="rule-prohibited">${i.v}</span>` : i.v.startsWith('$') || i.v === 'Unlimited' ? `<span class="rule-limit">${i.v.split(' — ')[0]}</span>${i.v.includes(' — ') ? ' — ' + i.v.split(' — ')[1] : ''}` : i.v}${i.ref ? ` <span class="ref">${i.ref}</span>` : ''}</div>`
    ).join('')}</div>
  </div>`;
}
