# FreightIQ — Process Flow Diagrams

## 1. Load Lifecycle Flow

```mermaid
flowchart TD
    START([New Load Request]) --> CREATE[Create Load in System]
    CREATE --> DETAILS[Enter Load Details]
    DETAILS --> D1[Origin & Destination]
    DETAILS --> D2[Equipment Type]
    DETAILS --> D3[Pickup & Delivery Dates]
    DETAILS --> D4[Weight & Commodity]

    D1 & D2 & D3 & D4 --> RATE[AI Rate Intelligence]
    RATE --> MARKET[Check Market Rates]
    MARKET --> QUOTE[Generate Rate Quote]
    QUOTE --> APPROVE{Rate Approved?}
    APPROVE -->|No| ADJUST[Adjust Rate]
    ADJUST --> QUOTE
    APPROVE -->|Yes| MATCH[AI Carrier Matching]

    MATCH --> RANK[Rank Carriers by Score]
    RANK --> R1[Lane History]
    RANK --> R2[Equipment Match]
    RANK --> R3[Safety Score / CSA]
    RANK --> R4[Insurance Status]
    RANK --> R5[Price Competitiveness]

    R1 & R2 & R3 & R4 & R5 --> SELECT[Select Carrier]
    SELECT --> BOOK[Book Load — Status: Booked]
    BOOK --> CONFIRM[Generate Rate Confirmation]
    CONFIRM --> DISPATCH_LOAD[Assign to Dispatch]

    DISPATCH_LOAD --> PICKUP[Pickup — Status: In Transit]
    PICKUP --> TRACK[Live GPS Tracking]
    TRACK --> MONITOR{On Schedule?}
    MONITOR -->|Yes| CONTINUE[Continue Tracking]
    MONITOR -->|No| EXCEPTION[Create Exception]
    EXCEPTION --> RESOLVE_E[AI Suggest Resolution]
    RESOLVE_E --> CONTINUE

    CONTINUE --> DELIVER[Delivery — Status: Delivered]
    DELIVER --> POD_COLLECT[Collect POD]
    POD_COLLECT --> INVOICE_GEN[Generate Invoice]
    INVOICE_GEN --> PAYMENT[Payment Processing]
    PAYMENT --> CLOSE[Close Load — Complete]
```

## 2. AI Carrier Matching Flow

```mermaid
flowchart TD
    START([Open Load Needs Carrier]) --> ANALYZE[Analyze Load Requirements]
    ANALYZE --> A1[Lane: Origin → Destination]
    ANALYZE --> A2[Equipment Type]
    ANALYZE --> A3[Date Window]
    ANALYZE --> A4[Special Requirements]

    A1 & A2 & A3 & A4 --> QUERY[Query Carrier Database]
    QUERY --> FILTER[Apply Hard Filters]
    FILTER --> F1[Active Authority ✓]
    FILTER --> F2[Insurance Current ✓]
    FILTER --> F3[Equipment Available ✓]
    FILTER --> F4[Not Blacklisted ✓]

    F1 & F2 & F3 & F4 --> SCORE[AI Scoring Engine]
    SCORE --> S1[Lane History Score — 25%]
    SCORE --> S2[On-Time Performance — 20%]
    SCORE --> S3[Safety / CSA Score — 20%]
    SCORE --> S4[Rate Competitiveness — 20%]
    SCORE --> S5[Relationship Score — 15%]

    S1 & S2 & S3 & S4 & S5 --> RANK[Rank Top-N Carriers]
    RANK --> PRESENT[Present Recommendations]
    PRESENT --> REASON[Show AI Reasoning per Carrier]

    REASON --> DECIDE{Broker Decision}
    DECIDE -->|Accept AI Pick| BOOK[Book Carrier]
    DECIDE -->|Override| MANUAL[Select Different Carrier]
    DECIDE -->|Request More| EXPAND[Expand Search Criteria]
    EXPAND --> QUERY

    MANUAL --> LOG_OVERRIDE[Log Override + Reason]
    LOG_OVERRIDE --> BOOK
    BOOK --> CONFIRM[Send Rate Confirmation]
```

## 3. Document Intelligence & OCR Flow

```mermaid
flowchart TD
    START([Document Received]) --> SOURCE{Source?}
    SOURCE -->|Email Attachment| EMAIL[Extract from Email]
    SOURCE -->|Portal Download| PORTAL[Download from Portal]
    SOURCE -->|Manual Upload| UPLOAD[Upload to System]
    SOURCE -->|Fax/Scan| SCAN[Digitize Scan]

    EMAIL & PORTAL & UPLOAD & SCAN --> CLASSIFY[AI Document Classification]
    CLASSIFY --> TYPE{Document Type}
    TYPE -->|BOL| BOL_PROC[BOL Processing]
    TYPE -->|POD| POD_PROC[POD Processing]
    TYPE -->|Rate Confirmation| RC_PROC[Rate Conf Processing]
    TYPE -->|Invoice| INV_PROC[Invoice Processing]
    TYPE -->|Insurance Cert| INS_PROC[Insurance Processing]

    BOL_PROC & POD_PROC & RC_PROC & INV_PROC & INS_PROC --> OCR[OCR Engine — Field Extraction]
    OCR --> FIELDS[Extract Key Fields]
    FIELDS --> F1[Shipper / Consignee]
    FIELDS --> F2[Weight / Pieces]
    FIELDS --> F3[Freight Charges]
    FIELDS --> F4[Dates / Signatures]
    FIELDS --> F5[Load / PO Numbers]

    F1 & F2 & F3 & F4 & F5 --> CONFIDENCE[Assign Confidence Scores]
    CONFIDENCE --> VALIDATE{Confidence > Threshold?}
    VALIDATE -->|Yes| AUTO_ACCEPT[Auto-Accept Extraction]
    VALIDATE -->|No| REVIEW[Queue for Human Review]

    REVIEW --> CORRECT[Human Corrects Fields]
    CORRECT --> LEARN[Feed Back to AI Model]

    AUTO_ACCEPT & CORRECT --> LINK[Link to Load Record]
    LINK --> INDEX[Index in Document Center]
    INDEX --> AVAILABLE[Available for Reconciliation]
```

## 4. POD Collection & Portal Upload Flow

```mermaid
flowchart TD
    START([Load Delivered]) --> COLLECT{POD Received?}
    COLLECT -->|Yes| RECEIVE[Receive POD]
    COLLECT -->|No| CHASE[Auto-Send Chase Email to Driver]
    CHASE --> WAIT[Wait Period]
    WAIT --> COLLECT

    RECEIVE --> VALIDATE[Validate POD]
    VALIDATE --> V1{Signature Present?}
    VALIDATE --> V2{Legible?}
    VALIDATE --> V3{Complete Info?}

    V1 & V2 & V3 --> PASS{All Checks Pass?}
    PASS -->|No| REJECT[Reject — Request New POD]
    REJECT --> COLLECT
    PASS -->|Yes| MATCH_LOAD[Match POD to Load Record]

    MATCH_LOAD --> RECONCILE[Reconcile: POD vs BOL vs Rate Conf]
    RECONCILE --> DISCREPANCY{Discrepancies?}
    DISCREPANCY -->|Yes| FLAG[Flag for Review]
    DISCREPANCY -->|No| APPROVE[Approve for Upload]

    FLAG --> RESOLVE[Resolve Discrepancy]
    RESOLVE --> APPROVE

    APPROVE --> BOT_QUEUE[Queue for RPA Bot Upload]
    BOT_QUEUE --> PORTAL{Which Portal?}
    PORTAL -->|Walmart| WMT[Walmart Portal Bot]
    PORTAL -->|Amazon| AMZ[Amazon Freight Bot]
    PORTAL -->|Target| TGT[Target TMS Bot]
    PORTAL -->|Other| OTHER[Manual Upload]

    WMT & AMZ & TGT & OTHER --> CONFIRM_UPLOAD[Confirm Upload Success]
    CONFIRM_UPLOAD --> INVOICE_TRIGGER[Trigger Invoice Generation]
    INVOICE_TRIGGER --> COMPLETE[POD Pipeline Complete]
```

## 5. RPA Bot Execution Flow

```mermaid
flowchart TD
    START([Bot Triggered]) --> TRIGGER{Trigger Type}
    TRIGGER -->|Scheduled| SCHEDULE[Cron Schedule]
    TRIGGER -->|Manual| MANUAL[Operator Click]
    TRIGGER -->|Event| EVENT[System Event — e.g., POD Ready]

    SCHEDULE & MANUAL & EVENT --> INIT[Initialize Bot Session]
    INIT --> CREDS[Load Portal Credentials]
    CREDS --> LOGIN[Login to Portal]

    LOGIN --> AUTH{Auth Success?}
    AUTH -->|No| RETRY[Retry with Backup Creds]
    RETRY --> AUTH_2{Success?}
    AUTH_2 -->|No| FAIL[Mark Run Failed — Alert Ops]
    AUTH_2 -->|Yes| NAVIGATE[Navigate to Upload Section]
    AUTH -->|Yes| NAVIGATE

    NAVIGATE --> STEPS[Execute Step Sequence]
    STEPS --> S1[Step 1: Find Load/PO]
    S1 --> S2[Step 2: Upload Document]
    S2 --> S3[Step 3: Fill Required Fields]
    S3 --> S4[Step 4: Submit]
    S4 --> S5[Step 5: Capture Confirmation]

    S5 --> VERIFY{Upload Verified?}
    VERIFY -->|Yes| LOG_SUCCESS[Log Success + Screenshot]
    VERIFY -->|No| LOG_FAIL[Log Failure + Error Details]

    LOG_SUCCESS & LOG_FAIL --> UPDATE[Update Run History]
    UPDATE --> METRICS[Update Performance Metrics]
    METRICS --> NEXT{More Items?}
    NEXT -->|Yes| NAVIGATE
    NEXT -->|No| COMPLETE[Complete Bot Run]
```

## 6. Invoice Reconciliation Flow

```mermaid
flowchart TD
    START([Invoice Generated]) --> PULL[Pull Related Documents]
    PULL --> P1[Rate Confirmation Amount]
    PULL --> P2[BOL — Weight/Pieces]
    PULL --> P3[POD — Delivery Confirmation]
    PULL --> P4[Accessorial Charges]

    P1 & P2 & P3 & P4 --> COMPARE[AI Reconciliation Engine]
    COMPARE --> CHECK{Amounts Match?}
    CHECK -->|All Match| APPROVE[Auto-Approve Invoice]
    CHECK -->|Discrepancy| DETAIL[Detail Discrepancies]

    DETAIL --> D1[Rate Conf vs Invoice Delta]
    DETAIL --> D2[Weight Variance]
    DETAIL --> D3[Missing Accessorials]
    DETAIL --> D4[POD Signature Issues]

    D1 & D2 & D3 & D4 --> QUEUE[Queue for Human Review]
    QUEUE --> REVIEW[Operations Reviews]
    REVIEW --> DECISION{Decision}
    DECISION -->|Approve| APPROVE
    DECISION -->|Adjust| ADJUST[Adjust Invoice Amount]
    DECISION -->|Reject| REJECT[Reject — Contact Carrier]

    ADJUST --> APPROVE
    APPROVE --> SUBMIT[Submit Invoice — Status: Submitted]
    SUBMIT --> TRACK[Track Payment]
    TRACK --> PAID{Payment Received?}
    PAID -->|Yes| CLOSE[Mark Paid — Close]
    PAID -->|Overdue| FOLLOW[Auto-Follow-Up Email]
    FOLLOW --> TRACK
```

## 7. Exception Management Flow

```mermaid
flowchart TD
    START([Exception Detected]) --> TYPE{Exception Type}
    TYPE -->|Delay| DELAY[Late Pickup/Delivery]
    TYPE -->|Damage| DAMAGE[Cargo Damage Report]
    TYPE -->|Missing POD| MPOD[POD Not Received]
    TYPE -->|Billing| BILL[Billing Discrepancy]
    TYPE -->|Temperature| TEMP[Temperature Excursion]

    DELAY & DAMAGE & MPOD & BILL & TEMP --> CREATE[Create Exception Record]
    CREATE --> AI_ANALYZE[AI Analyze Exception]
    AI_ANALYZE --> SIMILAR[Find Similar Past Cases]
    SIMILAR --> SUGGEST[AI Suggest Resolution]

    SUGGEST --> ASSIGN[Assign to Handler]
    ASSIGN --> ACTION{Resolution Action}
    ACTION -->|Contact Carrier| CARRIER_CALL[Call/Email Carrier]
    ACTION -->|Contact Shipper| SHIPPER_CALL[Notify Shipper]
    ACTION -->|File Claim| CLAIM[Initiate Cargo Claim]
    ACTION -->|Adjust Rate| RATE_ADJ[Apply Rate Adjustment]
    ACTION -->|Reschedule| RESCHED[Reschedule Delivery]

    CARRIER_CALL & SHIPPER_CALL & CLAIM & RATE_ADJ & RESCHED --> RESOLVE[Mark Resolved]
    RESOLVE --> LOG[Log Resolution in History]
    LOG --> LEARN[Update AI Resolution Model]
```

## 8. Compliance & Fraud Detection Flow

```mermaid
flowchart TD
    START([Carrier Activity]) --> MONITOR[Continuous Monitoring]
    
    MONITOR --> CHECK_AUTH[Verify FMCSA Authority]
    MONITOR --> CHECK_INS[Check Insurance Expiry]
    MONITOR --> CHECK_CSA[Update CSA Scores]
    MONITOR --> CHECK_FRAUD[Double-Brokering Detection]

    CHECK_AUTH --> AUTH_OK{Authority Active?}
    AUTH_OK -->|No| SUSPEND[Suspend Carrier]
    AUTH_OK -->|Yes| CONTINUE_A[Continue]

    CHECK_INS --> INS_OK{Insurance Valid?}
    INS_OK -->|Expiring Soon| WARN[Send Renewal Warning]
    INS_OK -->|Expired| BLOCK[Block New Bookings]
    INS_OK -->|Valid| CONTINUE_I[Continue]

    CHECK_CSA --> CSA_OK{CSA Scores Safe?}
    CSA_OK -->|Alert Level| FLAG[Flag for Review]
    CSA_OK -->|Normal| CONTINUE_C[Continue]

    CHECK_FRAUD --> PATTERN[Analyze Booking Patterns]
    PATTERN --> ANOMALY{Anomaly Detected?}
    ANOMALY -->|Yes| ALERT[Generate Fraud Alert]
    ALERT --> INVESTIGATE[Queue for Investigation]
    ANOMALY -->|No| CONTINUE_F[Continue]

    CONTINUE_A & CONTINUE_I & CONTINUE_C & CONTINUE_F --> UPDATE[Update Compliance Dashboard]
    SUSPEND & BLOCK & FLAG & INVESTIGATE --> NOTIFY[Notify Operations Team]
```

## 9. Rate Intelligence Flow

```mermaid
flowchart TD
    START([Rate Quote Request]) --> INPUT[Input Parameters]
    INPUT --> I1[Origin Lane]
    INPUT --> I2[Destination Lane]
    INPUT --> I3[Equipment Type]
    INPUT --> I4[Target Date]

    I1 & I2 & I3 & I4 --> HISTORICAL[Query Historical Rate Data]
    HISTORICAL --> ANALYZE[AI Rate Analysis]

    ANALYZE --> FACTORS[Consider Factors]
    FACTORS --> F1[Seasonal Trends]
    FACTORS --> F2[Fuel Prices]
    FACTORS --> F3[Market Supply/Demand]
    FACTORS --> F4[Lane Volume]
    FACTORS --> F5[Day of Week]

    F1 & F2 & F3 & F4 & F5 --> PREDICT[Predict Optimal Rate]
    PREDICT --> RANGE[Generate Rate Range]
    RANGE --> LOW[Floor Rate — Win Rate 90%]
    RANGE --> MID[Target Rate — Win Rate 70%]
    RANGE --> HIGH[Ceiling Rate — Win Rate 40%]

    LOW & MID & HIGH --> COMPARE[Compare vs Market]
    COMPARE --> RECOMMEND[AI Recommendation]
    RECOMMEND --> DISPLAY[Display to Broker]
    DISPLAY --> DECIDE{Broker Decision}
    DECIDE -->|Accept| USE[Use Recommended Rate]
    DECIDE -->|Override| CUSTOM[Enter Custom Rate]
    USE & CUSTOM --> APPLY[Apply to Load Quote]
```
