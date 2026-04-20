export const botLibrary = [
  { id: 'bot-walmart', name: 'Walmart POD Upload Bot', portal: 'Walmart Retail Link', status: 'Running', successRate: 98.2, lastRun: '2m ago', docsProcessed: 8412, avgDuration: '18s', schedule: 'Continuous' },
  { id: 'bot-amazon', name: 'Amazon Portal Bot', portal: 'Amazon Vendor Central', status: 'Running', successRate: 96.5, lastRun: '5m ago', docsProcessed: 6203, avgDuration: '24s', schedule: 'Continuous' },
  { id: 'bot-target', name: 'Target Invoice Bot', portal: 'Target Partners Online', status: 'Active', successRate: 97.1, lastRun: '12m ago', docsProcessed: 4850, avgDuration: '21s', schedule: 'Continuous' },
  { id: 'bot-homedepot', name: 'Home Depot Portal Bot', portal: 'Home Depot Vendor', status: 'Idle', successRate: 95.4, lastRun: '3h ago', docsProcessed: 2140, avgDuration: '27s', schedule: 'On-demand' },
  { id: 'bot-tms', name: 'Generic TMS Sync Bot', portal: 'McLeod / TMW', status: 'Running', successRate: 99.1, lastRun: '1m ago', docsProcessed: 18402, avgDuration: '6s', schedule: 'Every 2min' },
  { id: 'bot-qb', name: 'QuickBooks Invoice Bot', portal: 'QuickBooks Online', status: 'Active', successRate: 97.8, lastRun: '18m ago', docsProcessed: 3211, avgDuration: '14s', schedule: 'Hourly' },
  { id: 'bot-insurance', name: 'Insurance Monitor Bot', portal: 'Carrier411 / MyCarrierPackets', status: 'Scheduled', successRate: 99.9, lastRun: 'Today 06:00', docsProcessed: 312, avgDuration: '45s', schedule: 'Daily 06:00' },
  { id: 'bot-fmcsa', name: 'FMCSA Verification Bot', portal: 'SAFER / FMCSA', status: 'On-demand', successRate: 99.2, lastRun: 'Yesterday', docsProcessed: 489, avgDuration: '32s', schedule: 'On-demand' },
];

export const activeRuns = [
  {
    id: 'run-001',
    botName: 'Walmart POD Upload Bot',
    portal: 'Walmart Retail Link',
    loadId: 'FQ-2026-0312',
    startTime: '14:32:01',
    progress: 72,
    currentStep: 5,
    steps: [
      { t: '14:32:01', msg: 'Connecting to Walmart Retail Link portal…', done: true },
      { t: '14:32:03', msg: 'Logging in with credentials vault token…', done: true },
      { t: '14:32:05', msg: 'Navigated to POD upload section', done: true },
      { t: '14:32:07', msg: 'Selecting load #FQ-2026-0312', done: true },
      { t: '14:32:09', msg: 'Uploading POD document (2.4MB)…', done: false, running: true },
      { t: '--:--:--', msg: 'Upload confirmation pending…', done: false },
      { t: '--:--:--', msg: 'Verify upload status', done: false },
      { t: '--:--:--', msg: 'Post reference number to TMS', done: false },
    ],
  },
  {
    id: 'run-002',
    botName: 'Amazon Portal Bot',
    portal: 'Amazon Vendor Central',
    loadId: 'FQ-2026-0298',
    startTime: '14:31:44',
    progress: 45,
    currentStep: 3,
    steps: [
      { t: '14:31:44', msg: 'Launching headless Chromium instance…', done: true },
      { t: '14:31:47', msg: 'Authenticating via SSO…', done: true },
      { t: '14:31:52', msg: 'Navigating to shipment documents', done: false, running: true },
      { t: '--:--:--', msg: 'Match ASN to load', done: false },
      { t: '--:--:--', msg: 'Upload BOL + POD bundle', done: false },
      { t: '--:--:--', msg: 'Retrieve carrier-facing confirmation', done: false },
    ],
  },
  {
    id: 'run-003',
    botName: 'QuickBooks Invoice Bot',
    portal: 'QuickBooks Online',
    loadId: 'FQ-2026-0281',
    startTime: '14:30:12',
    progress: 92,
    currentStep: 7,
    steps: [
      { t: '14:30:12', msg: 'Opening QuickBooks Online API session', done: true },
      { t: '14:30:14', msg: 'Fetching unbilled loads', done: true },
      { t: '14:30:18', msg: 'Matching BOL to customer profile', done: true },
      { t: '14:30:21', msg: 'Generating invoice line items', done: true },
      { t: '14:30:25', msg: 'Applying fuel surcharge', done: true },
      { t: '14:30:28', msg: 'Creating invoice INV-07244', done: true },
      { t: '14:30:34', msg: 'Emailing invoice to customer', done: false, running: true },
      { t: '--:--:--', msg: 'Post invoice ID back to TMS', done: false },
    ],
  },
];

export const runHistory = Array.from({ length: 34 }).map((_, i) => ({
  id: `R-${String(10000 + i).padStart(5, '0')}`,
  bot: botLibrary[i % botLibrary.length].name,
  portal: botLibrary[i % botLibrary.length].portal,
  loadId: `FQ-2026-${String(1200 + i).padStart(4, '0')}`,
  startTime: `2026-04-17 ${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
  duration: `${5 + (i * 3) % 40}s`,
  status: i % 11 === 0 ? 'Failed' : i % 7 === 0 ? 'Partial' : 'Success',
  docs: 1 + (i % 5),
  errorMsg: i % 11 === 0 ? 'Portal timeout — retrying on next cycle' : null,
}));

export const botPerfData = Array.from({ length: 14 }).map((_, i) => ({
  day: `Apr ${4 + i}`,
  success: 94 + (i * 3) % 6,
  docs: 320 + (i * 17) % 180,
  time: 12 + (i % 4),
}));
