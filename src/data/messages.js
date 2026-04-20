const classifications = ['Inquiry', 'POD', 'Rate', 'Exception', 'Scheduling'];
const platforms = ['Email', 'SMS', 'Portal'];

const samples = [
  { from: 'dispatch@swiftlogistics.com', name: 'Swift Logistics Dispatch', subject: 'Load FQ-2026-1203 — confirmed 06:00 pickup', body: 'Confirming 0600 pickup tomorrow. Driver Mike J., truck #4412. Any dock assignment updates?' },
  { from: 'vendor@walmart.com', name: 'Walmart Vendor Team', subject: 'POD required — PO #88234', body: 'Please upload signed POD within 24h to avoid OTIF penalties.' },
  { from: '+1-555-204-3311', name: 'Driver: Carlos Rivera', subject: 'SMS — detention', body: 'Been at Target DC 3 hrs, waiting on dock. Do I file detention?' },
  { from: 'billing@knighttransport.com', name: 'Knight Transport Billing', subject: 'Rate confirmation signed — FQ-2026-1207', body: 'Signed RC attached. Fuel surcharge applied at $0.62/mi.' },
  { from: 'logistics@target.com', name: 'Target Logistics', subject: 'Appointment reschedule request', body: 'Can we push the Miami DC delivery to Thursday AM? Receiving is backed up.' },
  { from: 'accounts@homedepot.com', name: 'Home Depot AP', subject: 'Invoice discrepancy — INV-07231', body: 'Invoice shows accessorial $125 not on original RC. Please clarify.' },
];

export const messages = Array.from({ length: 34 }).map((_, i) => {
  const s = samples[i % samples.length];
  return {
    id: `M-${String(3000 + i).padStart(5, '0')}`,
    from: s.from,
    name: s.name,
    subject: s.subject,
    body: s.body,
    platform: platforms[i % 3],
    timestamp: `2026-04-17 ${String(6 + (i % 14)).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`,
    classification: classifications[i % 5],
    category: i % 3 === 0 ? 'Carrier' : i % 3 === 1 ? 'Shipper' : 'Driver',
    unread: i < 8,
    aiSuggested: 'Thanks for the note — I\'ve confirmed the adjustment in the TMS and your updated ETA has been pushed to the customer portal. Driver has been notified.',
  };
});
