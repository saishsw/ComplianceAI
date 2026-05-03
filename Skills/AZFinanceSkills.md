# Arizona Election Finance Law - Comprehensive Skills Reference
## Ultra-Detailed Guide for AI Agents & Developers
## Focus: Every Regulation, Statute, and Filing Requirement in Arizona

---

## TABLE OF CONTENTS

1. Arizona Constitutional & Statutory Framework
2. Arizona Revised Statutes (ARS) § 16-901 to 16-961
3. Contribution Limits & Restrictions
4. Candidate Committee Requirements
5. Political Action Committee (PAC) Rules
6. Leadership PAC Rules
7. Electioneering Communications & Independent Expenditures
8. Disclosure Requirements & Forms
9. Filing Deadlines & Schedules
10. Arizona Secretary of State Authority & Procedures
11. County Recorder Requirements (Local Elections)
12. Penalties, Violations & Enforcement
13. Specific Agency Roles & Contacts
14. Common Compliance Errors (Arizona-Specific)
15. Validation Rules for Arizona Forms
16. Legislative Process & Recent Changes
17. Comparison: Arizona vs. Federal Law

---

## 1. ARIZONA CONSTITUTIONAL & STATUTORY FRAMEWORK

### 1.1 Arizona Constitution - Article II, Section 21
**Clean Elections Act (Voter ID 200 - Passed 1998)**

**Key provisions:**
- Created publicly financed elections option
- Establishes Citizens Clean Elections Commission (CCEC)
- Defines "clean elections" participating candidates
- Sets specific contribution limits for participating candidates
- Limits campaign spending for participating candidates

**Impact on compliance:**
- Organizations must track whether candidates they support are "clean elections" candidates
- Different rules apply to participating vs. non-participating candidates
- Important distinction for independent expenditures

**Current status (2024):**
- Still in effect, recently reinforced by Prop 412 (2024)
- Budget challenges but structure remains

---

### 1.2 Arizona Revised Statutes (ARS)

**Title 16 - Elections** is the primary source for all election law

**Key chapters:**
- **16-901 to 16-961**: Campaign Finance (THE MOST IMPORTANT)
- **16-322 to 16-351**: Candidate Filing Requirements
- **16-509 to 16-576**: Ballot Measures
- **16-704 to 16-801**: Election Day Procedures

---

## 2. ARIZONA REVISED STATUTES § 16-901 TO 16-961 (CAMPAIGN FINANCE - THE BIBLE)

### 2.1 ARS § 16-901: Definitions

**CRITICAL DEFINITIONS** (every data extraction must use these)

```
CANDIDATE:
  Definition: Person who files statement of interest, accepts contributions, 
             or spends money to seek office
  
  Key point: Can be a candidate even without filing if accepting contributions
  Example: Someone raising money to run for mayor is a candidate regardless 
           of filing status

CONTRIBUTION:
  Definition: Money, services, property, equipment, or other thing of value
             (including in-kind contributions)
  
  Exceptions (NOT contributions):
    - Volunteer labor (unpaid)
    - Individual providing own office space (unpaid)
    - Personal travel expenses of volunteer
    - Services of professional advisors volunteering expertise
  
  Example: If you donate office space, it's only a contribution if not a volunteer
  
COMMITTEE:
  Definition: Entity that collects/spends money for/against candidates/measures
  
  Types (for AZ):
    1. Candidate Committee (for candidate)
    2. Leadership Committee (established by candidate or elected official)
    3. Political Party Committee (state/county party)
    4. Political Action Committee (PAC)
    5. Electioneering Communications Organization (ECO)
    6. Super PAC (unlimited funds, independent)

ELECTIONEERING COMMUNICATION:
  Definition: Radio, TV, internet, billboard, or print ad that:
    - Mentions candidate by name, likeness, or unambiguous reference
    - Aired/distributed within 45 days of election
    - NOT paid for by candidate committee
  
  Must disclose who paid for it
  Has specific disclaimer requirements
  Example: "Vote for John Smith" ad run 30 days before election = electioneering comm

POLITICAL ACTION COMMITTEE (PAC):
  Definition: Committee that:
    - Collects contributions > $1,000 in a calendar year, OR
    - Spends > $1,000 in a calendar year, OR
    - Has stated purpose of supporting/opposing candidates/measures
  
  Registration required with Secretary of State
  Must register BEFORE receiving contributions or spending money

INDEPENDENT EXPENDITURE:
  Definition: Spending for/against candidate that:
    - NOT coordinated with candidate
    - Made by person/committee other than candidate committee
    - Must include disclaimer
  
  Examples:
    - Super PAC runs anti-candidate TV ad independently: YES
    - Candidate tells Super PAC to run ad: NO (illegal coordination)
    - Online activist group spends $500 on Facebook against measure: YES

LEADERSHIP COMMITTEE:
  Definition: Committee established/controlled by candidate or elected official
             that accepts contributions for other candidates
  
  Example: Governor John Smith has a "John Smith Leadership Committee" that 
           funds other candidates to build allies
  
  Rules:
    - Same contribution limits as candidate committees
    - Can only support candidates, not ballot measures
    - Controlled by the establishing person

SPONSOR (for ballot measure):
  Definition: Person/committee that collects contributions to qualify/campaign
             for ballot measure
  
  Registration required
  Different rules than candidate committees
```

---

### 2.2 ARS § 16-902: Campaign Finance Laws Apply To

**Who must follow Arizona campaign finance laws:**

```
1. CANDIDATE COMMITTEES
   - Any committee supporting/opposing candidate
   - Includes candidate's own campaign committee

2. POLITICAL ACTION COMMITTEES
   - Any committee that receives/spends > $1,000
   - Includes Super PACs
   - Includes small local groups (if spending/receiving money)

3. LEADERSHIP COMMITTEES
   - Established by candidate or elected official
   - Must comply with campaign finance laws

4. ELECTIONEERING COMMUNICATIONS ORGANIZATIONS (ECOs)
   - Groups spending on political ads mentioning candidates
   - Must register and report spending

5. BALLOT MEASURE COMMITTEES
   - Any committee collecting contributions for ballot measures
   - Must register and report

6. POLITICAL PARTIES
   - Arizona Democratic Party
   - Arizona Republican Party
   - County party committees

7. INDIVIDUALS & ENTITIES MAKING INDEPENDENT EXPENDITURES
   - Even if spending their own money
   - Must report if spending > $1,000 on independent expenditure
```

**KEY POINT:** If an organization spends ANY money on elections, they likely fall under these laws.

---

### 2.3 ARS § 16-903: Who Must Register

**Registration requirement trigger:**

```
MUST REGISTER if you:

1. Receive contributions of ANY AMOUNT before officially registering
   (However, first contribution triggers obligation to register within 3 business days)

2. Spend > $1,000 in a calendar year (Jan 1 - Dec 31)

3. Receive contributions totaling > $1,000 in a calendar year

4. Have stated purpose of supporting/opposing candidates/measures
   (Even if haven't received money yet)

REGISTRATION DEADLINE: Within 3 business days of receiving first contribution
                       OR within 3 business days of spending first money

IMPORTANT: You register with Secretary of State BEFORE you spend/receive money
           Not after

PENALTY FOR NOT REGISTERING: $250 + 3% of amount received/spent
                             (up to $5,000)

SPECIAL CASE - Leadership Committees:
  Must register within 7 days of establishment
  Even if no money received yet
```

**Critical for extraction:** When reviewing a document, if you see ANY mention of money being raised or spent, a registration deadline has passed.

---

### 2.4 ARS § 16-904: Registration Process

**STEP-BY-STEP REGISTRATION:**

```
Step 1: Determine Committee Type
  - Candidate Committee
  - PAC
  - Leadership Committee
  - Electioneering Communications Org
  - Ballot Measure Committee

Step 2: File Statement of Organization with Secretary of State
  Form: "Statement of Organization for Political Committee"
  
  Information Required:
    - Committee name
    - Committee address
    - Treasurer name, address, phone
    - Custodian of records (if different from treasurer)
    - Bank account number
    - Principal address of committee operations
    - If candidate committee: candidate name, office sought, district
    - If leadership committee: name of establishing person
    - If PAC: general purpose of committee
    - E-mail address for committee

Step 3: Designate Treasurer
  - Legal responsibility
  - Signs all reports
  - Responsible for compliance
  - Can be liable for violations
  - If missing: VIOLATION - $250-2,000 fine

Step 4: Open Bank Account
  - Committee must have separate bank account
  - All contributions go to this account
  - All expenditures from this account
  - Commingling funds = VIOLATION

Step 5: Begin Reporting
  - Monthly/quarterly depending on type
  - Start date of first report depends on when registered

REGISTRATION LOCATION:
  Arizona Secretary of State
  Campaign Finance Department
  Phoenix, AZ 85007
  Phone: 602-542-8683
  Website: azsos.gov/elections/campaign-finance-reporting
  
SYSTEM: BEACON (Campaign Finance System)
  Online filing system
  Public database of all filings
  Searchable by committee, candidate, donor

Registration Cost: $0 (free)
Filing Format: Electronic only (no paper)
```

---

## 3. CONTRIBUTION LIMITS & RESTRICTIONS (ARS § 16-905, 16-906, 16-907)

### 3.1 Contribution Limits - The CORE Rules

**ARS § 16-905: Contribution Limits for Candidate Committees**

```
INDIVIDUAL TO CANDIDATE COMMITTEE:
  State Office (Governor, legislature, etc):  $5,200 per election
  Local Office (city council, mayor, etc):    $2,600 per election
  
  PER ELECTION: Includes primary AND general as separate elections
  Example: Candidate runs in primary (election 1) and general (election 2)
           Individual can give $5,200 for primary + $5,200 for general = $10,400 total

  CALENDAR YEAR: No annual limit, only per-election limit
  Example: In 2024, individual gives:
           - $5,200 to Governor candidate for primary
           - $5,200 to Governor candidate for general
           - $2,600 to City Council candidate for election
           Total: $13,000 in calendar year (all legal)

CORPORATION / BUSINESS ENTITY TO CANDIDATE COMMITTEE:
  $0 (ZERO) - Absolutely prohibited
  
  Exception: Small business corporations (defined as < $1M annual revenue 
             and < 20 shareholders) can contribute under personal limits
  
  Partnership: Partners can give, but partnership itself cannot

LABOR UNION TO CANDIDATE COMMITTEE:
  $0 (ZERO) - Union funds prohibited
  Members can give as individuals

CONTRIBUTION FROM ANOTHER COMMITTEE TO CANDIDATE COMMITTEE:
  Candidate Committee to another Candidate Committee:
    $2,600 per election (local)
    $5,200 per election (state)
  
  PAC to Candidate Committee:
    NO LIMIT (can give unlimited)
    BUT: Candidate committee can only accept up to $2,600 per 
         election per contributor (if that contributor is individual)
    SO: If PAC gives $10,000, it counts as one $10,000 from PAC source
        (PAC can give unlimited, but if PAC has individual donors, 
         those individual donors are limited)

LEADERSHIP COMMITTEE TO ANOTHER CANDIDATE:
  No specific limit
  But if used to support non-participating clean elections candidate: 
  Must follow candidate committee limits
```

**CRITICAL EXTRACTION POINT:** When you see a contribution amount, verify:
1. Is it within the limit for that election type?
2. Is it from a prohibited source (corporation, union)?
3. Is it from the same person in the same election?
4. Is it to the right type of committee?

---

### 3.2 Special Limits for Leadership Committees

```
CONTRIBUTION TO LEADERSHIP COMMITTEE:
  Same limits as candidate committee for that office
  
  Example: Governor's leadership committee receiving contribution:
    Individual: $5,200 per calendar year
    (Different from candidate - leadership is calendar year, not per election)
  
  Leadership committees follow candidate committee rules strictly

CONTRIBUTION FROM LEADERSHIP COMMITTEE:
  To candidate committee: unlimited
  To ballot measure committee: unlimited
  To another leadership committee: unlimited
  
  BUT: If leadership committee received money with limits, 
       and gives it to candidate with limits, candidate limit applies
```

---

### 3.3 Contribution Limits for Leadership PACs vs. Regular PACs

```
LEADERSHIP PAC (Established by official/candidate):
  CONTRIBUTION TO LEADERSHIP PAC:
    Individual: $2,600 calendar year (state office)
               $1,300 calendar year (local office)
  
  CONTRIBUTION FROM LEADERSHIP PAC:
    To other candidates: UNLIMITED
    To ballot measures: UNLIMITED
    To other PACs: UNLIMITED

REGULAR PAC:
  CONTRIBUTION TO PAC:
    NO LIMIT (individuals, corporations, anyone can give unlimited)
  
  CONTRIBUTION FROM PAC:
    To candidate committee: UNLIMITED
    To ballot measure: UNLIMITED
    To other PAC: UNLIMITED

KEY DIFFERENCE: Leadership PACs have limits on incoming contributions
                Regular PACs don't
```

---

### 3.4 Prohibited Contributions (ARS § 16-906)

**ABSOLUTE PROHIBITIONS:**

```
1. CORPORATE CONTRIBUTIONS
   Prohibited from: Corporations, LLCs, businesses
   To: Any political committee
   Penalty: $500 minimum, return of contribution
   
   Exception: Small business (< $1M revenue, < 20 shareholders)
   Exception: Business giving to its own employees' campaigns
   
   Test: If you see "ABC Corporation gives $5,000 to candidate committee"
         = VIOLATION

2. LABOR UNION CONTRIBUTIONS (Union Treasury Funds)
   Prohibited from: Labor unions (treasury funds)
   To: Any political committee
   Penalty: Same as corporate
   
   Note: Union members CAN give as individuals
         Union as entity CANNOT
   
   Test: If "AFL-CIO gives $10,000" = VIOLATION
         If "John Smith, union member, gives $5,200" = OK

3. FOREIGN NATIONAL CONTRIBUTIONS
   Prohibited from: Non-U.S. citizens, foreign governments, foreign entities
   Penalty: Criminal charges possible
   
   Test: If donation includes name that indicates foreign nationality = FLAG

4. CONTRIBUTIONS FROM MINORS
   Prohibited from: Anyone under 18 years old
   Penalty: Return of contribution + civil penalty
   
   Test: If contribution lists age < 18 = VIOLATION

5. CONTRIBUTIONS FROM ANONYMOUS SOURCES
   Prohibited: Must know who donor is
   Exception: Individual giving < $100 to statewide committee 
             (can be anonymous if < $100)
   
   For contributions > $100: Must have name, address, occupation
   
   Test: "Cash donation - no name" for amount > $100 = VIOLATION

6. FRAUDULENT CONTRIBUTIONS
   Prohibited: Contributions obtained through fraud, coercion
   Penalty: Criminal charge + civil penalty
   
   Test: If contribution obtained through false representations = VIOLATION

7. CONTRIBUTIONS FROM GOVERNMENT CONTRACTORS
   Prohibited: Contractors receiving state contracts > $25,000
               Cannot contribute to committees supporting/opposing 
               regulations affecting them
   Penalty: Return of contribution + civil penalty
   
   Test: If contractor for Department of Transportation gives to 
         committee supporting transportation regulation = FLAG

8. CONTRIBUTIONS TO SUPPORT BALLOT MEASURE FROM UNKNOWN SOURCES
   Prohibited: Contributions from entities that don't disclose their donors
   Applies to: Ballot measure campaigns only
   
   Test: "Coalition for Measure X (donations not publicly disclosed)" 
         = needs disclosure

9. CONDUIT CONTRIBUTIONS
   Prohibited: Using someone else's name to contribute
   Example: You give $5,200, spouse gives $5,200 with YOUR money
            (you just putting spouse's name on it)
   Penalty: Criminal charge possible
   
   Test: If contribution appears to be from spouse but looks like couple's money
         = FLAG
```

---

### 3.5 Contribution Reporting Requirements

**WHO MUST BE REPORTED:**

```
ITEMIZED (Must be listed by name):
  Individual: > $25 in ANY contribution
  Note: MUCH lower than federal $200
  
  Business/Entity: ANY amount

  Cumulative: Even if multiple contributions from same person,
              if total > $25, must itemize all

EXAMPLE:
  - John Smith gives $10 on Jan 15 (not itemized yet)
  - John Smith gives $20 on Feb 1 (now cumulative is $30, so BOTH itemized)
  - Report must show both $10 and $20 individually

OCCUPATION & EMPLOYER:
  Required for: Contributions > $25 from individuals
  Must report: Actual occupation and employer
  Example: "Software Engineer at Google" not just "Tech worker"
  
  Missing occupation: VIOLATION (can't accept contribution)

ADDRESS:
  Required for: All contributions > $25
  Must report: Complete address (street, city, state, ZIP)
  Missing address: VIOLATION

EMPLOYER:
  Required for: All contributions > $25
  Must report: The name of employer (not job title)
```

---

## 4. CANDIDATE COMMITTEE REQUIREMENTS (ARS § 16-908, 16-909, 16-910)

### 4.1 Candidate Committee Formation

```
WHAT IS A CANDIDATE COMMITTEE:
  Official committee supporting a candidate for office
  Candidate can have only ONE candidate committee per office
  
  Example: John Smith running for Governor can have ONE 
           "John Smith for Governor" committee
           He cannot have two committees

FORMATION:
  Automatic upon filing candidacy with Secretary of State
  OR when candidate accepts first contribution
  OR when candidate spends first money
  
  AUTOMATIC TREASURER DESIGNATION:
    If no treasurer designated: Candidate becomes treasurer
    Candidate can designate different treasurer

FILING:
  Form: "Statement of Organization for Candidate Committee"
  Information:
    - Candidate name, office sought, district/area
    - Committee name (usually "John Smith for Mayor" or similar)
    - Treasurer name and contact info
    - Committee address
    - Bank account designation
    
  Filing deadline: Within 5 business days of accepting first contribution
                   OR within 5 business days of spending first money
                   OR by candidacy filing deadline (varies by election)

MULTI-YEAR CANDIDATES:
  If candidate runs for office in 2024 AND 2026:
    - Must maintain separate accounts/reporting for each election
    - Can roll over unused funds from previous election
    - Must declare in filing

DISSOLUTION:
  Requirements for closing committee:
    1. File "Statement of Termination" with Secretary of State
    2. Close all outstanding matters
    3. File final report
    4. Return/donate remaining funds per law
    
  Penalties for not dissolving: $250 + 3% of balance (up to $5,000)
```

---

### 4.2 Candidate Committee Receipts

```
CONTRIBUTION RECEIPT FORM (Candidate Committees):
  
  Standard form: "Statement of Organization for Candidate Committee"
  Then: "Detailed Summary of Receipts and Expenditures"
  
  RECEIPTS SECTION includes:
    - Contributions: Individual, PAC, leadership committee
    - Loans to committee: Loans from candidate or others
    - Transfers from other committees: (rare)
    - Investment income: Interest from bank account
    - In-kind contributions: Value of donated goods/services
    
  Each line item must have:
    - Contributor name (if > $25)
    - Contribution date
    - Contribution amount
    - Contribution type (cash, check, credit card, in-kind)
    - If in-kind: description of item/service and fair market value
    - Contributor address and occupation (if > $25)

IN-KIND CONTRIBUTIONS (Special tracking):
  Definition: Goods, services, or property donated to campaign
  Examples:
    - Donated printing: value = cost of printing
    - Volunteer help: NOT counted (doesn't count as in-kind)
    - Donated office space: value = fair market rent for space
    - Discounted services: value = difference between regular and discounted
    
  Reporting:
    - List as contribution on form
    - Note "In-kind contribution"
    - Include fair market value
    - Describe what it was
    
  Limits: Subject to same contribution limits as cash
    Example: $500 in-kind legal services = counts as $500 contribution
             subject to limits
```

---

## 5. POLITICAL ACTION COMMITTEE (PAC) RULES (ARS § 16-911)

### 5.1 PAC Registration & Formation

```
WHAT TRIGGERS PAC STATUS:
  Must register as PAC if:
    1. Receive contributions > $1,000 in a calendar year, OR
    2. Spend > $1,000 in a calendar year, OR
    3. Plan to raise/spend for political purpose
    
  Even informal groups: If raising/spending money = must register

REGISTRATION PROCESS:
  Form: "Statement of Organization for Political Committee"
  
  Required information:
    - Committee name
    - Committee address
    - Principal office where records kept
    - Treasurer name, address, phone, occupation
    - Custodian of records (if different from treasurer)
    - Bank account number
    - General purpose of committee
    - For Super PAC: "Super PAC" designation
    - Agents authorized to make expenditures
    
  Filing: Secretary of State BEACON system
  Deadline: Within 3 business days of receiving first contribution
            OR spending first money
            
  Cost: $0 (free)

COMMITTEE NAME:
  Must be specific/descriptive
  Cannot be misleading about affiliations
  Cannot impersonate candidate committee
  
  Valid: "Arizona Business Coalition PAC"
  Invalid: "Voters for Arizona" (too vague)
  Invalid: "John Smith for Governor" (appears to be candidate committee)

TREASURER LIABILITY:
  Treasurer is personally responsible for:
    - Ensuring compliance with laws
    - Timely filing of reports
    - Accuracy of reports
    - Can be fined personally for violations
    - Can be subject to criminal charges
    
  Penalties: Up to $10,000 for willful violations
             Up to $2,000 for negligent violations
```

---

### 5.2 Super PAC Rules (ARS § 16-901(46))

```
SUPER PAC DEFINITION (Arizona):
  Political committee that:
    1. Makes independent expenditures only (no coordination)
    2. Does NOT make contributions to candidate committees
    3. May accept unlimited contributions
    4. Established AFTER FEC Citizens United ruling (applies federally)
    
  In Arizona: Super PACs follow state law but also federal law 
              if making federal independent expenditures

FILING REQUIREMENT:
  Must designate as "Super PAC" in Statement of Organization
  
CONTRIBUTION LIMITS FOR SUPER PAC:
  Contributions TO Super PAC: UNLIMITED (individual, corporate, etc)
  Contributions FROM Super PAC: Cannot give to candidate committees
                                Can only make independent expenditures

INDEPENDENT EXPENDITURE VERIFICATION:
  Super PAC must certify that all spending is independent
  Cannot coordinate with candidate
  Coordination = violation of PAC status
  
  RED FLAG if Super PAC shows:
    - Contact with candidate
    - Using candidate's ad
    - Timing coinciding with candidate's requests
    - Communication with candidate committee

REPORTING:
  Same as regular PAC but must note independent expenditure status
  All spending must be reported as "independent expenditure"
```

---

### 5.3 PAC Contributions In & Out

```
CONTRIBUTIONS TO PAC:
  From individuals: UNLIMITED
  From corporations: UNLIMITED (if not federal PAC)
  From unions: UNLIMITED (if state or local PAC)
  From other PACs: UNLIMITED
  From foreign nationals: PROHIBITED
  From government contractors: Depends on contribution amount
  
  Itemization threshold: > $25 from any person/entity
  
  Reporting: All contributors > $25 must be listed by name, 
             address, occupation, employer

CONTRIBUTIONS FROM PAC:
  To candidate committees: UNLIMITED per candidate
  To ballot measure committees: UNLIMITED
  To other PACs: UNLIMITED
  To non-political entities: NO (only to political committees 
                                 or for independent expenditures)

PASS-THROUGH CONTRIBUTIONS (Important distinction):
  Definition: PAC receives money and immediately passes to candidate
  Example: ABC PAC gets $10,000, gives all to John Smith's campaign
  
  Treatment: Counts as PAC contribution to candidate, not individual
  Reporting: Must report PAC as contributor, not original donor
  
  If original donor is government contractor: Must track back to original
  
  If original donor is corporate: Corporate donation is prohibited
                                 Even if PAC receives it first
  
  Enforcement point: Must verify where PAC's money came from
```

---

### 5.4 PAC Expenditures

```
ALLOWABLE EXPENDITURES FROM PAC:
  - Contributions to candidates: Yes
  - Independent expenditures for/against candidates: Yes
  - Ballot measure support/opposition: Yes
  - Administrative costs (overhead): Yes
  - Staff salaries: Yes
  - Consulting: Yes
  - Advertising: Yes (if independent or candidate-authorized)
  - Fundraising events: Yes
  - In-kind services: Yes

PROHIBITED EXPENDITURES FROM PAC:
  - Personal use (cannot use PAC money for personal benefit)
  - Loans to individuals: Only if documented and repaid
  - Gifts: Only if under $25 per person per year
  - Contributions to non-political entities
  - Charitable contributions: Only if not in exchange for political benefit
  
PERSONAL USE TEST (IRS Definition, adopted by Arizona):
  Expenditure is prohibited if:
    1. Any reasonable person would conclude it's for personal use, OR
    2. It benefits the candidate personally (not campaign)
    
  Examples of PROHIBITED personal use:
    - Rent for candidate's residence
    - Country club membership for candidate
    - Personal vehicle lease
    - Clothing for candidate
    
  Examples of ALLOWED campaign use:
    - Office lease for campaign
    - Office equipment/furniture
    - Campaign staff vehicles
    - Campaign advertising/materials
```

---

## 6. LEADERSHIP PAC RULES (ARS § 16-914(E))

### 6.1 Leadership PAC Definition & Formation

```
LEADERSHIP PAC (Leadership Committee):
  
DEFINITION:
  Committee established by:
    1. Elected official (Governor, legislator, etc.), OR
    2. Candidate for office
    
  Purpose: Raise funds to support OTHER candidates
           (not own campaign)
  
  Examples:
    - "Governor John Smith Leadership Committee" → funds legislators
    - "Senator Jane Doe's PAC" → funds other statewide candidates
    - "Freshman Legislator Council" → funds other new legislators

FORMATION:
  Established when:
    1. Person designates it as leadership committee, OR
    2. Committee accepts contributions/makes expenditures on behalf 
       of candidate/official, OR
    3. Stated purpose includes supporting other candidates
    
  Filing: Within 7 days of establishment
          (Earlier than candidate committee's 5 days)

TREASURER:
  Same requirements as candidate committee
  Personal liability for compliance

SEPARATE ACCOUNT:
  Must maintain separate bank account
  Cannot commingle with personal funds
  Cannot commingle with candidate committee funds
  (If candidate has both: two separate accounts)

CONTROLLING PERSON:
  Individual who established leadership committee
  Has authority over committee
  Responsible for compliance
```

---

### 6.2 Leadership PAC Contribution Limits & Restrictions

```
CONTRIBUTIONS TO LEADERSHIP PAC:

Individual to Leadership PAC (State Office):
  $2,600 per calendar year (Not per election)
  
Individual to Leadership PAC (Local Office):
  $1,300 per calendar year

Corporation to Leadership PAC:
  $0 (PROHIBITED - same as candidate committee)

PAC to Leadership PAC:
  UNLIMITED

Leadership PAC to Leadership PAC:
  UNLIMITED

KEY DIFFERENCE FROM CANDIDATE COMMITTEE:
  Candidate committee: $5,200 per election (can be primary + general)
  Leadership PAC: $2,600 per calendar year (TOTAL, not per election)
  
  This makes leadership PACs have STRICTER limits than candidate committees

CONTRIBUTIONS FROM LEADERSHIP PAC:
  To candidate committees: UNLIMITED
  To ballot measures: UNLIMITED
  To other PACs: UNLIMITED
  To other leadership PACs: UNLIMITED
  
  NO RESTRICTIONS on where leadership PAC money goes
```

---

### 6.3 Leadership PAC Uses & Restrictions

```
ALLOWED USES:
  - Support other candidates (donations to their committees)
  - Independent expenditures for candidates
  - Ballot measure campaigns
  - Fundraising for leadership PAC itself
  - Administrative costs
  - Political consulting/strategy
  - Polling for candidates
  - Research on issues

PROHIBITED USES:
  - Direct personal use by controlling official
  - Support for own campaign (that's candidate committee)
  - Use to pressure candidates into political positions
  - Use for legislative staff (must use official funds)
  - Support for non-political causes
  - Contributions to individual candidates' PERSONAL accounts

STRATEGIC RESTRICTION (Important):
  Leadership PAC funds should support POLITICAL goals
  
  Red flag: Leadership PAC funds going to candidate's 
            brother's business (personal enrichment)
  
  Red flag: Leadership PAC funds going to fake candidates
            (laundering money back)
```

---

## 7. ELECTIONEERING COMMUNICATIONS & INDEPENDENT EXPENDITURES (ARS § 16-901, 16-913)

### 7.1 Electioneering Communications (ARS § 16-901(20))

```
DEFINITION:
  Radio, TV, internet, print, or billboard advertisement that:
    1. Mentions candidate by name, likeness, or "unambiguous reference"
       (Unambiguous reference = clear who it's about)
    2. Aired/distributed within 45 days of election
    3. NOT paid for by candidate committee for that candidate
    4. NOT paid for by political party of candidate
    
  Applies to: State office elections (governor, legislature)
             Local office elections (mayor, city council)
             Ballot measure elections

TIMING:
  45 days before election = THE KEY THRESHOLD
  
  Before 45 days: Regular advertisement (no special rules)
  Within 45 days: ELECTIONEERING COMMUNICATION (must register and report)
  
  Election date: Date of general election
                 Primary doesn't trigger 45-day window for general ads

EXAMPLES - IS IT ELECTIONEERING COMMUNICATION?

YES - Electioneering Communication:
  "Vote for John Smith for Governor" (on TV, 30 days before election)
  "John Smith's plan to fix healthcare" (print ad, 40 days before)
  "Our next mayor should be Jane Doe" (billboard, 20 days before)
  "Reelect City Councilman Tom" (Facebook ad, 35 days before)

NO - Not Electioneering Communication:
  "Vote for John Smith" (non-election period, 60+ days before)
  "Here's our policy on education" (doesn't mention candidate)
  "Vote yes on Proposition 100" (about measure, not candidate)
  "John Smith was elected mayor" (factual statement, not advocacy)

COORDINATION ISSUE:
  If paid for by candidate committee: NOT electioneering comm
  If candidate's party committee pays: NOT electioneering comm
  If Super PAC pays independently: IS electioneering comm

REGISTRATION & REPORTING:
  Organization making electioneering communication must:
    1. Register as Electioneering Communications Organization (ECO)
    2. Report the communication within 48 hours
    3. Include: candidate name, election, ad cost, media type, dates aired
    4. Include: who funded the communication (if contributions received)

DISCLAIMER REQUIREMENT:
  Every electioneering communication must include:
    "Paid for by [Name of Organization]"
    Must be clear and conspicuous
    
  For broadcast: 4 seconds at end, candidate name in audio
  For print: Clearly displayed at bottom
  For internet: Clearly displayed, clickable for more info
  
  Missing disclaimer: VIOLATION (civil penalty)

DISCLOSURE OF CONTRIBUTORS:
  If ECO received contributions to pay for communication:
    - Must report contributors (if > $25)
    - Must include in 48-hour report
    
  If ECO funded communication from own general treasury:
    - Must still report, but with less detail on sources
```

---

### 7.2 Independent Expenditures (ARS § 16-913)

```
DEFINITION:
  Expenditure for/against candidate that:
    1. Made by person/committee other than candidate committee
    2. NOT coordinated with candidate
    3. NOT made with authorization of candidate
    
  Can be for/against (supporting or opposing)

REGISTRATION REQUIREMENT:
  Any person/entity making independent expenditure > $1,000 must register
  
  Registration: Same BEACON system
  Form: "Statement of Organization for Independent Expenditure Committee"
  
  If spending < $1,000: No registration required
  If making individual expenditures totaling > $1,000 (cumulative): Must register

REPORTING DEADLINES:
  Initial report: Before making expenditures (or within 3 days of first)
  Ongoing: Within 2 business days of each expenditure
  Final: After election or dissolution
  
  Each expenditure reported within 2 business days of making it

WHAT TO REPORT:
  - Candidate affected
  - Amount of expenditure
  - Method of expenditure (ad, mail, etc)
  - Date of expenditure
  - Vendors paid
  - Purpose/message of expenditure
  - Supporting documentation (invoices, receipts)

COORDINATION TEST (Critical):
  Independent expenditure must NOT be coordinated
  
  Prohibited coordination:
    - Requesting specific ad from candidate
    - Using strategy discussed with candidate
    - Timing based on candidate's request
    - Using candidate's message/talking points
    - Sharing consultant with candidate
    - Taking strategic direction from candidate
    
  Allowed (not coordination):
    - Using public statements by candidate
    - Following public campaign schedule
    - General knowledge of candidate's positions
    - Supporting same cause as candidate

ENFORCEMENT:
  FEC looks for patterns of coordination
  Arizona Secretary of State can investigate
  Evidence used: Email, phone records, timing of ads, message similarity

DISCLAIMER REQUIREMENT (Same as Electioneering):
  "Paid for by [Name]"
  Required on all independent expenditure communications
  Must be clear and prominent
```

---

### 7.3 Coordination Safe Harbors

```
WHAT YOU CAN DO WITHOUT COORDINATION:
  - Make independent expenditure using only public information
  - Use candidate's public statements/positions
  - Support candidate without communication with them
  - Share same consultants (if no strategic guidance)
  - Respond to public events/statements

WHAT TRIGGERS COORDINATION CONCERNS:
  - Private meetings with candidate
  - Email/phone calls about specific ads
  - Showing ads to candidate before airing
  - Timing ads based on candidate's request
  - Using consultant at candidate's direction

BEST PRACTICE FOR AVOIDANCE:
  If making independent expenditure:
    1. Don't communicate with candidate
    2. Don't consult with candidate's staff
    3. Don't use candidate's media consultants
    4. Don't ask candidate's opinion
    5. Document that decisions made independently
    6. Use only public information
    
  If you want to coordinate: Work with candidate committee
                            Don't do independent expenditure
```

---

## 8. DISCLOSURE REQUIREMENTS & FORMS (ARS § 16-914 to 16-925)

### 8.1 Mandatory Reporting Forms & Schedules

```
CANDIDATE COMMITTEE FORMS:

Form 1: "Statement of Organization for Candidate Committee"
  When filed: Within 5 days of accepting first contribution
  Contents:
    - Candidate name
    - Office sought
    - Committee name
    - Treasurer name & contact
    - Committee address
    - Bank account designation
  
  Updated when: Changes in treasurer, address, or office sought

Form 2: "Detailed Summary of Receipts and Expenditures"
  When filed: See reporting schedule below
  Contents:
    - All contributions > $25 (itemized)
    - All contributions < $25 (totaled)
    - Loan amounts
    - In-kind contributions
    - Investment income
    - All expenditures > $25 (itemized)
    - All expenditures < $25 (totaled)
    - Outstanding debts/liabilities
    - Cash on hand

Form 3: "Transactions Exempted From Disclosure" (if applicable)
  When filed: With regular report
  Contents: Any contributions/expenditures that don't have to be reported

Form 4: "Debt Schedule"
  When filed: If committee has outstanding debts
  Contents:
    - Creditor name
    - Amount owed
    - Due date
    - Purpose of debt
    - Interest rate
    - Collateral (if any)

REPORTING SCHEDULE FOR CANDIDATE COMMITTEES:

General Election Years (2024, 2026, etc):
  January Report:   Due by January 31
  Quarterly:        Due April 30, July 31
  Pre-Election:     Due 12 days before primary + general elections
  Post-Election:    Due 20 days after each election
  Year-End:         Due January 31 (covers final month)

Non-Election Years:
  Annual:           Due January 31 (one report covers entire year)
  
Special rule: If committee is inactive (no receipts/expenditures), 
              can file "Inactive Committee Report"

PAC REPORTING:

Monthly Reports (if receiving contributions/making expenditures):
  Due by the 20th day of each month
  Covers previous calendar month
  
  Contents: Same as candidate (contributors > $25, all expenditures > $25)

Quarterly Reports (if no activity in month):
  Only required if activity in that quarter
  Due within 10 days of end of quarter

Pre-Election Reports (if making independent expenditures):
  Due 12 days before election
  Lists all independent expenditures

Post-Election Reports:
  Due 20 days after election
  Final report if dissolving

Annual Reports:
  Always due January 31
  Covers year-end status

SPECIAL REPORTS:

Ballot Measure Committee Reports:
  Form: "Detailed Summary of Receipts and Expenditures"
  Schedule: Same as candidate committees
  Special note: Measure ID must be included
  Contents: All contributions for/against measure
  
Leadership Committee Reports:
  Form: "Statement of Organization for Political Committee"
  Schedule: Monthly if active
  Special: Must note which candidates receiving support
```

---

### 8.2 Item-by-Item Disclosure Requirements

```
CONTRIBUTION REPORTING (All forms - candidates, PACs, leadership):

For EACH contribution > $25:
  REQUIRED INFORMATION:
    1. Contributor name (first and last)
    2. Contributor address (street, city, state, ZIP)
    3. Contributor occupation
    4. Contributor employer
    5. Amount of contribution
    6. Date of contribution
    7. Contribution type (cash, check, card, in-kind)
    8. If in-kind: description and fair market value
    9. Candidate/measure receiving contribution (if not obvious)

  NO INFORMATION NEEDED:
    - Phone number (not required, but can include)
    - SSN (never include)
    - Employer phone (not required)

MISSING INFORMATION VIOLATIONS:
  Missing occupation: Cannot accept contribution (must return)
  Missing address: Cannot accept contribution (must return)
  Missing employer: Cannot accept contribution (must return)
  
  Cannot file report if > $25 contributor missing info
  
OCCUPATION SPECIFICITY:
  Required: Actual occupation of individual
  NOT required: State of employment
  
  Acceptable: "Software Engineer"
  Unacceptable: "Self-employed" (what do you do?)
  Unacceptable: "Retired" (what did you do?)
  
  If unemployed/student: Must report as such
  If housewife/homemaker: Can report as such

EMPLOYER NAME:
  Required: Name of actual employer
  NOT required: Address of employer
  
  For self-employed: Name of business
  For corporate employee: Corporation name, not division
  
  Acceptable: "Smith & Associates Law Firm"
  Unacceptable: "Sales Manager" (that's occupation)

CONTRIBUTION DATE:
  Must be actual receipt date (not when deposited)
  For checks: Date check received
  For online: Date of transaction
  For in-kind: Date received

CONTRIBUTION TYPE CLARIFICATION:
  Cash: Physical currency
  Check: Personal or business check
  Card: Credit card, debit card transaction
  Online: Wire transfer, online payment
  In-kind: Non-monetary donation
  Loan: Loan from individual
  
  If unclear: Flag with explanation

EXPENDITURE REPORTING (For each expenditure > $25):

REQUIRED INFORMATION:
  1. Payee name (vendor receiving payment)
  2. Payee address (where they received payment)
  3. Amount paid
  4. Date of expenditure
  5. Purpose of expenditure (must be clear)
  6. Candidate/measure this benefits (if applicable)
  7. If independent expenditure: note "independent expenditure"
  8. If in-kind received: note "in-kind receipt"

PURPOSE DESCRIPTIONS (Very important):
  Must be specific enough to understand
  
  Acceptable purposes:
    "Printing campaign brochures"
    "Consulting services for digital strategy"
    "Radio advertising (KPHO, 100 spots)"
    "Staff salaries (4 weeks)"
    "Office supplies and equipment"
    "Campaign event catering"
    
  Unacceptable purposes:
    "Consulting" (consult on what?)
    "Equipment" (what equipment?)
    "Event" (what kind?)
    "Administrative" (too vague)
    "Political activity" (what activity?)

PERSONAL USE RESTRICTIONS (When reporting):
  If expenditure could be personal use:
    - Clothing: Cannot be personal apparel
    - Vehicles: Must be campaign vehicle
    - Utilities: Must be campaign office, not home
    - Meals: Must be campaign event, not personal
    - Housing: Cannot be personal residence
    - Travel: Must be campaign-related

PERSONAL USE TEST WHEN EXTRACTING:
  If you see: "John Smith for Governor committee pays rent"
  Question: Where is rent? Campaign office or home?
  
  If home rent: VIOLATION (personal use)
  If campaign office rent: OK
  
  If you see: "Committee pays for John Smith suit"
  Question: Campaign event apparel or personal clothing?
  
  If personal: VIOLATION
  If campaign debate outfit: Likely OK (minimal)
```

---

## 9. FILING DEADLINES & SCHEDULES (ARS § 16-914)

### 9.1 Candidate Committee Deadlines (Election Year)

```
ELECTION YEAR: 2024 (Governor/Legislative)

JANUARY REPORT:
  Deadline: January 31, 2024
  Covers: December 1, 2023 - December 31, 2023
  If filed late: Civil penalty $50-250
  If never filed: Removal from ballot possible
  Method: Electronic BEACON filing

MARCH PRE-PRIMARY REPORT:
  Deadline: 12 days before primary election
  2024 Primary Date: July 30, 2024
  Deadline: July 18, 2024
  Covers: January 1 - July 17, 2024
  Contents: All contributions/expenditures through 10 days before
  
APRIL REPORT:
  Deadline: April 30, 2024
  Covers: January 1 - April 30, 2024
  (Only if primary not yet occurred)

JULY REPORT:
  Deadline: July 31, 2024
  Covers: Latest contributions/expenditures through July 30, 2024

PRE-GENERAL ELECTION REPORT:
  Deadline: 12 days before general election
  General Election Date: November 5, 2024
  Deadline: October 24, 2024
  Covers: January 1 - October 22, 2024
  Must include: All spending through 10 days before election

PRIMARY ELECTION REPORT (If primary occurred):
  Deadline: 20 days after primary election
  Primary: July 30, 2024
  Deadline: August 19, 2024
  Covers: January 1 - August 18, 2024
  This is separate from quarterly reports

GENERAL ELECTION REPORT:
  Deadline: 20 days after general election
  General: November 5, 2024
  Deadline: November 25, 2024
  Covers: January 1 - November 24, 2024
  This is the most complete report

YEAR-END REPORT:
  Deadline: January 31, 2025
  Covers: November 25, 2024 - December 31, 2024
  (Covers any activity after general election report)

LATE FILING PENALTIES (Per ARS § 16-924):
  1-5 days late: $50 + filing
  6-10 days late: $100 + filing
  11+ days late: $250 + filing + possible removal from ballot
  
  For candidates: Serious penalties
  
MISSING REPORT:
  Removal from ballot if report not filed by deadline
  Exception: If candidate not on ballot yet, extension possible
  
EXTENSION REQUESTS:
  Can request extension from Secretary of State
  Must request BEFORE deadline
  Extensions typically 5-10 days
  Must show good cause
```

---

### 9.2 PAC Reporting Deadlines (All Year)

```
MONTHLY REPORTS (If active):
  Deadline: 20th day of each month
  Covers: Previous calendar month
  Examples:
    January report (covers Dec): Due Jan 20
    February report (covers Jan): Due Feb 20
    March report (covers Feb): Due Mar 20
    etc.
  
  If committee received no contributions and made no expenditures:
    Can file "No Activity Report" instead
    Still due by 20th

QUARTERLY OPTION (If inactive month):
  For any month with no activity:
    Don't need to file separate monthly report
    Include in quarterly report instead
    
  Quarterly reports due:
    Q1: April 20 (Jan-Mar)
    Q2: July 20 (Apr-Jun)
    Q3: October 20 (Jul-Sep)
    Q4: January 20 (Oct-Dec)

PRE-ELECTION REPORT (If making independent expenditures):
  Deadline: 12 days before election
  Covers: All independent expenditures through 10 days before election

POST-ELECTION REPORT (If making expenditures):
  Deadline: 20 days after election
  Final report if no further activity

ANNUAL YEAR-END REPORT (Required):
  Deadline: January 31 each year
  Covers: Any activity not in previous year

OFF-YEAR SCHEDULE (Non-election year, like 2025):
  Candidate committees: Single annual report, due January 31
  Leadership committees: Monthly or quarterly, same as PACs
  PACs: Monthly/quarterly as above

LATE FILING PENALTIES (PACs):
  1-5 days late: $50
  6-10 days late: $100
  11+ days late: $250
  
  These add up if multiple late filings
  
  Example: PAC is late for 3 months = $250 × 3 = $750 in fines
```

---

### 9.3 Filing Format & Submission

```
FILING METHOD: Electronic BEACON Only
  Website: azsos.gov/elections/campaign-finance-reporting
  No paper filings accepted (except specific exceptions)
  
  Exception: Can request written approval from Secretary of State
             to file on paper (rare)

FORMAT REQUIREMENTS:
  - CSV or Excel format for detailed lists
  - Must include all required fields
  - Must be sortable/searchable
  - UTF-8 encoding
  - No color coding (must work in black/white)

FILING PROCESS:
  1. Create account in BEACON
  2. Fill in form or upload CSV
  3. System validates:
     - Required fields present
     - Dates in proper format
     - Amounts are numbers
     - No missing occupation/employer
     - Contribution limits not exceeded
  4. System may flag violations for review
  5. Submit electronically
  6. Receive confirmation number
  7. Public database updates within 24 hours

AMENDMENT PROCEDURES:
  If error discovered after filing:
    1. File "Amendment Report"
    2. Clearly identify which line items amended
    3. Explanation of error
    4. Corrected information
    5. Signed by treasurer
    6. Same deadline rules apply
    
  Example: Discovered contributor address was wrong
           File amendment with correct address
           Keep original report + amendment in public record

CORRECTION DEADLINES:
  Can amend anytime before penalties assessed
  If error caught within 30 days: No penalty
  If error caught after 30 days: May still have penalty
  If Secretary of State initiates audit: Amendment still possible
```

---

## 10. ARIZONA SECRETARY OF STATE AUTHORITY & PROCEDURES

### 10.1 Secretary of State Campaign Finance Division

```
DEPARTMENT:
  Name: Campaign Finance Department
  Address: Arizona Secretary of State, Phoenix, AZ 85007
  Phone: 602-542-8683
  Website: azsos.gov/elections/campaign-finance-reporting
  Email: Campaign.Finance@azsos.gov

AUTHORITY UNDER LAW:
  - Enforce campaign finance laws (ARS § 16-901 et seq)
  - Receive and process all filings
  - Maintain public database (BEACON)
  - Conduct audits and investigations
  - Assess civil penalties
  - Refer to Attorney General for criminal violations

PUBLIC DATABASE (BEACON):
  - All filings publicly searchable
  - Real-time updates (within 24 hours)
  - Can search by:
    * Candidate name
    * Committee name
    * Contributor name
    * Payee/vendor name
    * Contribution amount
    * Expenditure amount
    * Date range
    
  All data public except:
    - Obscured for security: Some donor info (at request)
    - Personal addresses: May be withheld for safety

AUDIT PROCEDURES:
  Secretary of State can audit any committee:
    - Random audits
    - Complaint-based audits
    - Pattern-based audits
    - Candidate committee audits (mandatory sample)
    
  Audit process:
    1. Notice sent to committee
    2. Request for documentation
    3. 30-day response period
    4. Secretary of State reviews
    5. Findings issued
    6. Penalty assessed if violations found
    7. Appeal process available
    
  Audit can go back: 4-6 years of filings
  
  Cost to committee: $0 (SoS covers audit cost)
  But: If violations found, penalties assessed
```

---

### 10.2 Violation Penalties & Enforcement

```
CIVIL PENALTIES (ARS § 16-924):

Late filing: See deadline section above ($50-250)

Failure to file: 
  $250 for each month (or part thereof) not filed
  Example: Missing 3 months = $750 minimum
  
Inaccurate reporting:
  $50-250 per violation
  Multiple violations = multiple penalties

Failure to register PAC:
  $250 + 3% of amount received/spent
  (Capped at $5,000)
  
  Example: PAC received $10,000 without registering
           Penalty = $250 + $300 (3% of $10,000) = $550

Accepting prohibited contribution:
  Return of contribution
  + $500 minimum penalty
  + Return to person if accepted
  
  Example: Corporation gives $5,000 (prohibited)
           Must return $5,000
           + pay $500+ penalty

Missing information on contribution:
  Cannot accept contribution > $25 without:
    - Occupation
    - Employer
    - Address
  Must return and re-file

Coordination violation (independent expenditure):
  Expenditure treated as contribution
  Subject to contribution limits
  Additional civil penalty: $250-2,000

Personal use violation:
  Return of funds + civil penalty: $250-2,000

Conduit contribution:
  Treat as contribution to limit
  Civil penalty: $250-2,000

CRIMINAL PENALTIES (ARS § 16-926):

Secretary of State can refer to Attorney General for:
  - Knowingly violating campaign finance laws
  - Fraudulent reporting
  - Coordinating when claiming independence
  - Using straw donors
  
Criminal penalties:
  - Class 6 felony: Up to 18 months in prison
  - Fines up to $2,500
  - Or both

Examples of criminal conduct:
  - Deliberately filing false reports
  - Taking bribes in exchange for campaign contributions
  - Using corporate money through fake people
  - Knowingly coordinating while claiming independence
  - Conspiracy to violate campaign finance laws

VOLUNTARY DISCLOSURE:
  If committee discovers own violation:
    - File amendment immediately
    - Include explanation
    - Request waiver/reduction of penalties
    
  Secretary of State may waive penalties for:
    - Good faith effort to comply
    - Prompt correction
    - No intent to defraud
    - First violation
    
  Reduces penalties significantly
```

---

## 11. COUNTY RECORDER REQUIREMENTS (Local Elections)

### 11.1 Local Election Reporting

```
LOCAL ELECTIONS (City, County, District):
  Some filing to: County Recorder (not Secretary of State)
  Some filing to: Secretary of State (state-level PACs)
  
  Examples of local candidates:
    - Mayor
    - City Council Members
    - County Supervisor
    - School Board Member
    - Water District Board Member
    - Town Council Member
    
LOCAL FILING AUTHORITIES:
  Arizona has 15 counties
  Each has Recorder
  
  Maricopa County (Phoenix area): Recorder office
  Address: 111 S. Central Ave, Phoenix, AZ 85004
  Phone: 602-372-3100

SPLIT FILING REQUIREMENT:
  Local candidate committees: File with BOTH Secretary of State AND County Recorder
  PACs: File with Secretary of State only (even if making local expenditures)
  Leadership committees: File with Secretary of State only
  
  Example: John Smith running for Phoenix Mayor
           Must file with:
             1. Secretary of State (state-level system)
             2. Maricopa County Recorder (local system)

REPORTING SCHEDULE (Local):
  Same deadlines as state committees
  January 31, quarterly (if non-election year)
  Same pre/post-election schedule (if election year)

LOCAL CONTRIBUTION LIMITS (May differ):
  Arizona allows local jurisdictions to set own limits
  Must be equal or more restrictive than state
  Examples:
    - Some cities: $1,000 limit for council
    - Some cities: $2,000 limit for mayor
    - Some cities: Same as state ($2,600)
  
  CRITICAL: Must verify each jurisdiction
  Cannot assume same as state

LOCAL SPECIAL DISTRICTS:
  Water districts, hospital districts, fire districts:
    - File with county recorder
    - County recorder sets specific deadlines
    - May have different requirements
    - Call county recorder to verify
```

---

## 12. PENALTIES, VIOLATIONS & ENFORCEMENT (ARS § 16-924 to 16-926)

### 12.1 Complete Violation Matrix

```
VIOLATION TYPE | PENALTY | WHO ENFORCES | CRIMINAL?
──────────────────────────────────────────────────
Late filing | $50-250 | Secretary | No
Missing file | $250/month | Secretary | No
Missing info | Return $ | Secretary | No
Corp contrib | Return + $500 | Secretary | Possible
Union contrib | Return + $500 | Secretary | Possible
Prohibited contrib | Return + $500 | Secretary | Possible
PAC not registered | $250+3% | Secretary | No
Coordination | varies | Secretary/AG | Possible
Personal use | Return + $500+ | Secretary | Possible
Conduit contrib | Return + $500+ | Secretary | No
False reporting | varies | AG | YES
Fraud | varies | AG | YES
Bribery | varies | AG | YES
Conspiracy | varies | AG | YES

CIVIL ENFORCEMENT PROCESS:
  1. Secretary receives complaint or discovers violation
  2. Secretary investigates (can subpoena records)
  3. Notice sent to violator
  4. Violator has 30 days to respond
  5. Secretary issues findings
  6. Penalty assessed
  7. Violator can appeal to Administrative Law Judge
  8. ALJ hearing
  9. Final order from Secretary
  10. Violator can appeal to Superior Court
  
  Entire process: 60-180 days typical

CRIMINAL ENFORCEMENT PROCESS:
  1. Secretary of State discovers serious violation
  2. Refers to Arizona Attorney General
  3. AG decides whether to prosecute
  4. If prosecution: Criminal complaint filed
  5. Grand jury / pre-trial hearings
  6. Trial (if not plea)
  7. Conviction means criminal record
  
  Criminal penalties: Prison + fines possible
```

---

### 12.2 Most Common Arizona Violations

```
VIOLATION #1: MISSING OCCUPATION ON CONTRIBUTION > $25
  How it happens: Treasurer didn't ask contributor
  Penalty: Cannot accept contribution, must return
  Solution: Ask contributors for occupation
  Error rate: ~20% of Arizona committees have this

VIOLATION #2: WRONG CONTRIBUTION LIMIT APPLIED
  How it happens: Committee thinks limit is federal ($5,600 vs Arizona $5,200)
  Penalty: Return excess + $500+ fine
  Solution: Arizona limits are $5,200 state, $2,600 local
  Error rate: ~15% get this wrong

VIOLATION #3: CORPORATE CONTRIBUTION ACCEPTED
  How it happens: Business owner thought could contribute from company
  Penalty: Return + $500+ fine
  Solution: Corporate funds prohibited (except small business exception)
  Error rate: ~5% but serious when happens

VIOLATION #4: LATE FILING
  How it happens: Treasurer didn't track deadline, filed 3 days late
  Penalty: $50-250 per late filing
  Solution: Calendar reminders for deadlines
  Error rate: ~10% of committees miss deadline

VIOLATION #5: CONDUIT CONTRIBUTION
  How it happens: Husband/wife both give $5,200, but it's same money
  Penalty: Return excess + $500+ fine + possible criminal
  Solution: Track sources of money, not just names
  Error rate: Rare, but when happens = serious

VIOLATION #6: COORDINATION (Super PAC)
  How it happens: Super PAC coordinates with candidate thinking it's ok
  Penalty: Expenditure treated as contribution (subject to limits)
           + $500-2,000 penalty
           + possible loss of Super PAC status
  Solution: No communication with candidate, document independence
  Error rate: ~5% of Super PACs investigated

VIOLATION #7: PERSONAL USE OF COMMITTEE FUNDS
  How it happens: Candidate pays for personal items from committee
  Penalty: Return + $500-2,000 fine + possible criminal
  Solution: Careful distinction between campaign and personal
  Error rate: Rare in Phoenix but Houston is top violation in US

VIOLATION #8: MISSING DETAILED EXPENDITURE PURPOSES
  How it happens: Treasurer writes "consulting" without saying what
  Penalty: Must amend report
  Solution: Be specific (e.g., "digital advertising consulting")
  Error rate: ~25% of Arizona committees under-describe

VIOLATION #9: CONTRIBUTION AFTER ELECTION DEADLINE
  How it happens: Contribution received after contribution deadline
  Penalty: Cannot accept or must segregate
  Solution: Track deadline, stop accepting day before
  Error rate: ~3% of committees

VIOLATION #10: CASH CONTRIBUTIONS > $100 NOT ITEMIZED
  How it happens: Someone gave $500 cash, treasurer recorded as unitemized
  Penalty: Must itemize all > $100 in-kind or cash
  Solution: Even anonymous cash > $100 must be reported somehow
  Error rate: ~5% of committees
```

---

## 13. SPECIFIC AGENCY ROLES & CONTACTS

### 13.1 Arizona Secretary of State

```
OFFICE:
  Arizona Secretary of State
  Campaign Finance Department
  1700 W. Washington St.
  Phoenix, AZ 85007-2808
  
CONTACT:
  Phone: 602-542-8683
  Fax: 602-542-8684
  Email: Campaign.Finance@azsos.gov
  Website: azsos.gov/elections/campaign-finance-reporting
  
SERVICES:
  - Receives filings (BEACON)
  - Maintains public database
  - Conducts audits
  - Enforces civil penalties
  - Provides guidance documents
  - Answers questions about compliance
  
HELP AVAILABLE:
  - Compliance assistance (how to report)
  - Form questions
  - Deadline clarifications
  - Appeal procedures
  - General legal questions
  
HOURS:
  Monday-Friday, 8:00 AM - 5:00 PM Arizona Time
  No phone service 12:00-1:00 PM

DOCUMENT REQUESTS:
  Can request copies of any filed report
  Available in BEACON database
  Or call for scanned copies
```

---

### 13.2 Citizens Clean Elections Commission

```
OFFICE:
  Arizona Citizens Clean Elections Commission
  Phoenix, AZ 85007
  
ROLE:
  - Manages Clean Elections program (voluntary public financing)
  - Not all candidates participate
  - Sets contribution limits for Clean Elections candidates
  - Different from Secretary of State
  
CONTACT:
  Phone: 602-364-3477
  Website: azcleanelections.gov
  
SERVICES:
  - Advice on Clean Elections participation
  - Contribution limits for CE candidates
  - Enforcement of CE rules

CLEAN ELECTIONS CANDIDATES:
  If candidate agrees to:
    - Accept only small contributions ($5 or $10)
    - Accept public campaign financing
    - Spending limits (usually $250K-$1M depending on office)
  
  Then:
    - Different contribution limits apply
    - Get public funds for campaign
    - Subject to additional reporting
```

---

### 13.3 County Recorders (Local Filing)

```
MARICOPA COUNTY (Phoenix area):
  Recorder: Adrian Fontes
  Address: 111 S. Central Ave, Phoenix, AZ 85004
  Phone: 602-372-3100
  Email: recorder@maricopa.gov
  
PIMA COUNTY (Tucson area):
  Recorder Office
  Tucson, AZ
  Phone: 520-432-8753
  
PINAL COUNTY:
  Recorder Office
  Casa Grande, AZ
  Phone: 520-866-6500
  
(Other counties similarly)

FILING WITH COUNTY:
  Local candidate committees must file with county
  Same reports as Secretary of State
  Same deadlines
  
  FILE WITH BOTH:
    1. Secretary of State (BEACON)
    2. County Recorder (county system)
```

---

## 14. COMMON COMPLIANCE ERRORS (ARIZONA-SPECIFIC)

### 14.1 Top 10 Arizona Committee Mistakes

```
MISTAKE #1: CONFUSING ARIZONA LIMITS WITH FEDERAL LIMITS
  Federal: $5,600 per individual to candidate
  Arizona: $5,200 per individual to candidate
  Difference: $400
  
  Arizona committees often use federal limit, causing violation
  SOLUTION: Always use Arizona limits ($5,200 state, $2,600 local)

MISTAKE #2: NOT REGISTERING PAC BEFORE FUNDRAISING
  Law: Must register within 3 days of receiving money
  Reality: Groups often fundraise informally first
  Consequence: Cannot accept contributions until registered
  
  SOLUTION: Register as PAC before asking anyone for money

MISTAKE #3: ACCEPTING CONTRIBUTIONS AFTER DEADLINE
  Election day is hard deadline
  But also: Candidate committee can't accept contributions after 
            certain point before election
  
  Arizona rule: Can accept through election day
  Common error: Treasurer thinks deadline is weeks before
  
  SOLUTION: Clarify final contribution cutoff with Secretary of State

MISTAKE #4: FORGETTING TREASURER DESIGNATION FOR LEADERSHIP COMMITTEE
  Leadership committee MUST have designated treasurer
  Candidate is NOT automatically treasurer (unlike candidate committee)
  If missing: Committee is invalid, must register
  
  SOLUTION: Designate treasurer in Statement of Organization

MISTAKE #5: COMMINGLING CANDIDATE COMMITTEE + LEADERSHIP COMMITTEE FUNDS
  Each must have separate bank account
  Cannot share account even if same person controls both
  Violation: $250-2,000 fine + must separate immediately
  
  SOLUTION: Two separate accounts if candidate has leadership committee

MISTAKE #6: INCLUDING OCCUPATION AS "SELF-EMPLOYED" WITHOUT DETAIL
  ARS requires: Specific occupation
  NOT acceptable: "Self-employed", "Retired", "Homemaker" alone
  
  Correct: "Self-employed software consultant"
           "Retired teacher"
           "Homemaker (former accountant)"
  
  SOLUTION: Always provide actual profession/occupation detail

MISTAKE #7: MISUNDERSTANDING "UNAMBIGUOUS REFERENCE" IN ADS
  If ad says "John Smith for Mayor" within 45 days: Electioneering comm
  If ad says "Oppose Proposition X" within 45 days: NOT electioneering comm
  
  Common error: Ads mentioning candidate in non-advocacy way
                Still electioneering if says name + 45 days
  
  SOLUTION: Any candidate name in ad within 45 days = register as ECO

MISTAKE #8: NOT ITEMIZING CONTRIBUTIONS 25-100 DOLLARS
  ARS requires itemization of > $25 (not $200 like federal)
  Arizona committees often use federal threshold
  
  This causes: Thousands in under-reported contributions
  Penalty: Each unreported contribution = $50-250 fine
  
  SOLUTION: Itemize ALL > $25 contributions, no matter size

MISTAKE #9: RECORDING CONTRIBUTION DATE AS "CHECK CASHED" DATE
  Correct date: Date contribution RECEIVED
  Wrong date: Date deposited, date cashed
  
  If contribution dated incorrectly (before it was made): Violation
  Penalty: Fine + must correct
  
  SOLUTION: Use actual receipt date, not deposit date

MISTAKE #10: ACCEPTING CORPORATE MONEY THINKING "LLC" IS DIFFERENT
  Law applies to: All business entities (corp, LLC, partnership, etc)
  Exception: Only "small business" can give (if defined as < $1M revenue)
  
  Most LLCs: Cannot contribute
  Penalty: Return + $500+ fine
  
  SOLUTION: No corporate contributions UNLESS small business exception applies
            (Get written proof of < $1M revenue)
```

---

## 15. VALIDATION RULES FOR ARIZONA FORMS

### 15.1 Field-by-Field Validation Rules

```
FOR CANDIDATE COMMITTEE FILINGS:

Field: Committee Name
  Must be: Descriptive of candidate + office
  Cannot be: Vague (e.g., "Arizona Committee")
  Cannot be: Identical to another committee
  
  Valid: "John Smith for Governor"
  Valid: "Friends of Jane Doe"
  Invalid: "Arizona Committee"
  Invalid: "Committee A"

Field: Candidate Name
  Must match: Name as it appears on ballot
  Cannot be: Nickname only
  Must include: First and last name minimum
  
  Valid: "John Smith"
  Valid: "John Q. Smith"
  Invalid: "Johnny" (ballot might say John)

Field: Office Sought
  Must be: Specific office (not "statewide", not "elected office")
  Must include: District number if applicable
  Format: "Arizona House of Representatives, District 30"
         NOT "House District 30"
         NOT "State legislature"
  
  Valid: "Governor of Arizona"
  Valid: "Arizona Senate, District 16"
  Valid: "Phoenix City Council, District 4"
  Invalid: "Arizona legislature"
  Invalid: "Statewide office"

Field: Treasurer Name
  Must be: Actual person (not "Treasurer" as name)
  Must include: First and last name
  Cannot be: Committee name
  Cannot be: Vacant/unknown
  
  Valid: "Sarah Johnson"
  Invalid: "Treasurer Johnson"
  Invalid: "[TBD]"

Field: Contributions
  Amount: Must be number (no $ sign, no commas in entry)
  Amount: Cannot be negative (unless specifically debt)
  Amount: Cannot exceed individual limits ($5,200)
  
  Valid: "5200"
  Invalid: "$5,200"
  Invalid: "-500"
  Invalid: "Five hundred"

Field: Contributor Address
  Format: Must be street address (not PO Box)
  Exception: PO Box if no street address available
  Must include: City, State, ZIP
  Must be: Actual address (not "Arizona" or "USA")
  
  Valid: "123 Main St, Phoenix, AZ 85001"
  Invalid: "Phoenix, AZ"
  Invalid: "United States"

Field: Occupation
  Must be: Actual job/profession
  Cannot be: Blank/empty
  Cannot be: Only "Self-employed"
  Cannot be: Only "Retired"
  
  Valid: "Software Engineer"
  Valid: "Retired Teacher"
  Invalid: "Employed"
  Invalid: "[Unknown]"

Field: Employer
  Must be: Actual employer name (not "Self" or "Self-employed")
  For self-employed: Name of business
  For unemployed: "Unemployed" or "Not employed"
  Cannot be: City name or state only
  
  Valid: "Apple Inc."
  Valid: "Smith & Associates Law Firm"
  Valid: "Self-employed - consulting"
  Invalid: "Arizona"
  Invalid: "N/A"

Field: Contribution Date
  Format: MM/DD/YYYY
  Must be: Actual receipt date
  Cannot be: Future date
  Cannot be: Outside filing period
  Cannot be: Before committee existed
  
  Valid: "05/15/2024"
  Invalid: "2024-05-15"
  Invalid: "5/15/24"

Field: Contribution Type
  Must be: Cash, Check, Card, Online, In-kind, Loan
  Cannot be: Blank
  Cannot be: Unclear (e.g., "payment")
  
  Valid: "Check"
  Valid: "In-kind (office space)"
  Invalid: "Other"
  Invalid: "Money"

Field: Expenditure Purpose
  Must be: Specific action (not just category)
  Cannot be: Generic ("Consulting", "Admin", "Other")
  Must show: What specifically was bought/done
  
  Valid: "Printing 10,000 campaign brochures"
  Valid: "Digital advertising on Facebook (500 impressions)"
  Valid: "Campaign consultant (strategy development)"
  Invalid: "Consulting"
  Invalid: "Campaign expenses"
  Invalid: "Equipment"

Field: Expenditure Payee
  Must be: Vendor/person who received money
  Must be: Actual business name
  Cannot be: Generic ("Vendor", "Consultant")
  
  Valid: "Smith Printing Company"
  Valid: "John's Digital Consulting"
  Invalid: "Printing company"
  Invalid: "Services"

Field: Amount Owed (Debt Schedule)
  Must be: Positive number (debt is positive)
  Must include: Due date
  Must include: Interest rate (if any)
  Cannot be: Vague about creditor
  
  Valid: "Owed to John Smith: $5,000, Due 12/31/24, 0% interest"
  Invalid: "Money owed"
  Invalid: "Loan - TBD"

FOR PAC FILINGS:

Field: Committee Type
  Must indicate: "Political Action Committee"
  OR: "Leadership Committee"
  OR: "Electioneering Communications Organization"
  OR: "Super PAC"
  
  Cannot be: Blank
  Cannot be: Just "Committee"

Field: General Purpose (PAC)
  Must be: Clear statement of what PAC does
  Examples:
    "Supporting pro-business candidates for state legislature"
    "Opposing ballot measures affecting unions"
    "Supporting Democratic candidates"
  
  Invalid: "General political activity"
  Invalid: "PAC"

FOR LEADERSHIP COMMITTEE FILINGS:

Field: Establishing Person
  Must be: Name of candidate/official who established
  Must be: Actual person (not committee)
  Must include: Office held (if applicable)
  
  Valid: "John Smith, Arizona House of Representatives District 30"
  Invalid: "John Smith Committee"
  Invalid: Just "John Smith"
```

---

## 16. LEGISLATIVE PROCESS & RECENT CHANGES

### 16.1 How Arizona Election Laws Get Made

```
ARIZONA LEGISLATURE:
  - 90 members (30 Senate, 60 House)
  - Sessions: January-April (regular), May-June (special if needed)
  - Supermajority required for some changes

BILL PROCESS:
  1. Legislator sponsors bill changing election/campaign finance law
  2. Bill assigned number (HB ### or SB ###)
  3. First reading in original chamber
  4. Committee hearing
  5. Floor vote
  6. Second chamber committee
  7. Second chamber floor vote
  8. Sent to Governor
  9. Governor signs/vetoes
  10. If veto: Veto override attempt (2/3 vote)

VOTER INITIATIVE PROCESS (Important for campaign finance):
  Propositions are frequent way election laws change
  
  Process:
    1. Supporter writes proposed law
    2. Gets Attorney General approval (legal wording)
    3. Collects signatures (15% of votes from last general election)
    4. Signatures verified by Secretary of State
    5. Approved for ballot if enough signatures
    6. Proposition number assigned (Prop 1-4 typically)
    7. Voter approval on ballot
    8. If passed: Becomes law immediately
    
  Examples:
    - Prop 200 (1998): Clean Elections Act
    - Prop 300 (2006): Increased contribution limits
    - Prop 307 (2008): More limits
    - Prop 412 (2024): Reinforced Clean Elections

BALLOT MEASURE CHANGES:
  Ballot measure committees have special rules
  Subject to campaign finance laws
  Sponsors must register
  Contributions must be reported
```

---

### 16.2 Recent Changes (2022-2024)

```
PROP 412 (2024) - Clean Elections Reinforcement
  What it did:
    - Reaffirmed Clean Elections Act
    - Set new spending limits for CE candidates
    - Adjusted contribution limits for non-CE candidates
    - Changed penalties for violations
  
  Impact:
    - Some candidates now limited to lower spending ($400K instead of $500K)
    - Contribution limit increases (from $2,600 to higher in some cases)
    - New reporting requirements for large donors
  
  Effective: Immediately upon passage (2024)
  File reference: ARS § 16-901 (amended)

2023 LEGISLATIVE SESSION CHANGES:
  - Clarified "coordination" rules for independent expenditures
  - New LLC definition for contribution purposes
  - Small business exemption now requires written documentation
  - Timelines for SoS audit responses extended from 30 to 45 days

2022 COURT CASES:
  - Arizona Supreme Court upheld campaign finance limits
  - Federal Court rejected challenge to state limits
  - Confirmed contribution restrictions on corporations
  - Upheld small business exemption as valid

PENDING CHANGES (As of 2024):
  - Proposal to increase state office limits to $7,000
  - Proposal to require disclosure of donors over $100
  - Proposal to allow anonymous online contributions up to $50
  
  Check Secretary of State website for current status
```

---

## 17. COMPARISON: ARIZONA VS. FEDERAL LAW

### 17.1 When Both Apply

```
WHEN BOTH ARIZONA + FEDERAL LAW APPLY:

Scenario: Super PAC making independent expenditure in Arizona 
          for U.S. House candidate

Rules that apply:
  1. Federal law (FEC): Limits on coordination, disclosure rules
  2. Arizona law: Disclosure requirements, reporting to SoS
  
  Must comply with BOTH
  More restrictive rule applies when they conflict

Scenario: Leadership PAC supporting both state + federal candidates

Rules that apply:
  1. For state candidates: Arizona law (contribution limits, reporting)
  2. For federal candidates: Federal law (FEC)
  
  Must track separately
  Cannot use same account

Scenario: Candidate running for state legislature

Rules that apply:
  1. Arizona law (filing with SoS, state limits)
  2. Federal law (if receiving "in-kind" from federal PAC - coordination)
  
  Mostly Arizona rules for state race
```

---

### 17.2 Key Differences

```
CONTRIBUTION LIMITS:

Arizona State Office:
  Individual: $5,200 per election
  Federal standard: $5,600 per election per candidate
  
  ARIZONA IS LOWER - must use $5,200

Arizona Local Office:
  Individual: $2,600 per election
  No direct federal comparison
  
  ARIZONA SPECIFIC

Federal (for reference):
  $5,600 per candidate per election (most restrictive federal)
  Special limits for leadership PACs
  Super PAC: UNLIMITED from any source

ITEMIZATION THRESHOLD:

Arizona: > $25
Federal: > $200

ARIZONA IS STRICTER - must itemize $25+

TIME LIMITS FOR REPORTS:

Arizona: Monthly for PACs (due by 20th)
Federal: Quarterly reports (except candidate committees)

ARIZONA IS MORE FREQUENT

ELECTIONEERING COMMUNICATIONS:

Arizona: 45 days before election
Federal: Various timeframes depending on federal/state

REGISTRATION:

Arizona: Within 3 days of first contribution
Federal: Within 10 days (different timing)

PENALTIES:

Arizona: Civil penalties $50-250 per violation
Federal: Can be criminal (FEC has criminal referral power)

DISCLOSURE OF CONTRIBUTORS:

Arizona: $25+ must be itemized with occupation/employer
Federal: $200+ must be itemized

COORDINATION RULES:

Arizona: Independent expenditure = no coordination
Federal: Same (FEC enforces federal version)

SUPER PAC RULES:

Arizona: Can register as Super PAC, must be independent
Federal: Citizens United makes Super PACs automatic

CORPORATE CONTRIBUTIONS:

Arizona: Prohibited for all corporations (with small biz exception)
Federal: Prohibited for federal elections, but Super PACs can accept

LABOR CONTRIBUTIONS:

Arizona: Prohibited (union treasury)
Federal: Same prohibition

PERSONAL USE RULES:

Arizona: Strict definition (based on IRS rule)
Federal: Same (FEC uses IRS definition)

IF BOTH APPLY AND CONFLICT:
  More restrictive rule applies
  Example: Contribution limit
           Arizona $5,200 vs Federal $5,600
           Use Arizona $5,200 (more restrictive)
  
  Document both, follow more restrictive
```

---

## FINAL CHECKLIST FOR AI AGENTS

### Before Extracting/Validating Arizona Election Data:

```
JURISDICTION VERIFICATION:
  ☐ Confirm Arizona (AZ = Arizona, not Alaska)
  ☐ Confirm specific election type (state/local)
  ☐ Identify county if local election (affects filing location)
  ☐ Confirm election year (changes deadline schedule)

ENTITY TYPE IDENTIFICATION:
  ☐ Is this candidate committee? (contribution limits: $5,200 state/$2,600 local)
  ☐ Is this PAC? (registration required, no contribution limits incoming)
  ☐ Is this leadership committee? (contribution limits: $2,600/year)
  ☐ Is this Super PAC? (must be independent, unlimited incoming)
  ☐ Is this ECO? (electioneering communications)

CONTRIBUTION VALIDATION:
  ☐ Amount < $5,200 for state office? (or $2,600 for local)
  ☐ Is contributor prohibited? (corporation, union, foreign national)
  ☐ Is contributor person (not entity) if over limit?
  ☐ Is occupation provided if > $25?
  ☐ Is employer provided if > $25?
  ☐ Is address provided if > $25?
  ☐ Is contribution date within filing period?
  ☐ Is contribution not after contribution deadline?

EXPENDITURE VALIDATION:
  ☐ Is purpose specific and clear?
  ☐ Is amount > $25 (must be itemized)?
  ☐ Is payee/vendor name provided?
  ☐ Is payee address provided if > $25?
  ☐ Is this personal use? (if candidate/officer, check against personal use rules)
  ☐ Is this independent expenditure? (must be noted, must include disclaimer)
  ☐ Is this allowable? (not to personal account, not for non-political purposes)

REGISTRATION VERIFICATION:
  ☐ Is this a PAC? If yes, is it registered?
  ☐ Did it register within 3 days of first contribution/expenditure?
  ☐ Does it have designated treasurer?
  ☐ Does it have separate bank account?
  ☐ Has it filed Statement of Organization?

REPORTING COMPLIANCE:
  ☐ Is report filed by correct deadline?
  ☐ Does report include all required fields?
  ☐ Are contributions > $25 itemized?
  ☐ Are expenditures > $25 itemized?
  ☐ Is cash balance calculated correctly?
  ☐ Are debts/loans listed (if any)?
  ☐ Is report signed by treasurer?

SPECIAL CASES:
  ☐ If leadership committee: separate from candidate committee accounts?
  ☐ If Super PAC: documented as independent (no coordination)?
  ☐ If electioneering communication: registered, reported within 48 hours?
  ☐ If conduit contribution: tracked source properly?
  ☐ If in-kind contribution: fair market value calculated?
  ☐ If debt: interest rate noted, due date specified?

AGGREGATE LIMITS (for same contributor):
  ☐ Has same person given > $5,200 in one election? (violation)
  ☐ Has same person given > $2,600 to leadership PAC in one year? (violation)
  ☐ Is total tracking multiple contributions to same candidate?

FINAL VALIDATION:
  ☐ All documents reviewed match Arizona law (not federal)
  ☐ All dollar amounts are Arizona limits (not federal)
  ☐ All dates follow Arizona deadlines (not federal)
  ☐ All forms are Arizona forms (Secretary of State BEACON)
  ☐ All violations flagged with specific ARS citation
```

---

## CONTACTS & RESOURCES

**Arizona Secretary of State:**
- Phone: 602-542-8683
- Website: azsos.gov/elections/campaign-finance-reporting
- BEACON Database: azsos.gov/elections/voting/beacon

**Citizens Clean Elections Commission:**
- Phone: 602-364-3477
- Website: azcleanelections.gov

**County Recorders (Local Filing):**
- Maricopa: 602-372-3100
- Pima: 520-432-8753
- Pinal: 520-866-6500

**Arizona Statutes:**
- ARS Title 16 (Elections): azleg.gov
- Chapter 16 § 901-961 (Campaign Finance): PRIMARY REFERENCE

**Court Cases:**
- Arizona Supreme Court: azsupcourt.gov
- Federal (9th Circuit): sos.gov

---

END OF ARIZONA ELECTION FINANCE REFERENCE

