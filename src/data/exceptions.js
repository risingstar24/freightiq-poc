const types = ['Delay', 'Damage', 'Missing POD', 'Billing Discrepancy', 'Temperature Deviation'];
const severities = ['Critical', 'High', 'Medium', 'Low'];
const statuses = ['Open', 'In Progress', 'Resolved'];

export const exceptions = Array.from({ length: 18 }).map((_, i) => ({
  id: `EX-${String(900 + i).padStart(4, '0')}`,
  loadId: `FQ-2026-${String(1200 + (i * 3) % 58).padStart(4, '0')}`,
  type: types[i % 5],
  severity: severities[i % 4],
  status: statuses[i % 3],
  detected: `2026-04-${String(10 + (i % 7)).padStart(2, '0')} ${String(8 + (i % 10)).padStart(2, '0')}:${String((i * 5) % 60).padStart(2, '0')}`,
  assignedTo: ['AI Auto-Resolve', 'Ops Team', 'Billing Team', 'Ops Manager'][i % 4],
  aiResolution: [
    'Notify customer of 2h delay, offer revised ETA, apply service credit per SLA',
    'Initiate damage claim workflow, request photos from driver, open carrier dispute',
    'Trigger automated POD reminder sequence (3 touch points over 48h)',
    'Flag invoice for human review — variance exceeds 5% threshold',
    'Alert reefer monitoring, contact driver for temperature verification',
  ][i % 5],
  similarPast: 3 + (i % 8),
  description: 'Automated detection triggered by load event stream monitoring. Confidence 92%.',
}));
