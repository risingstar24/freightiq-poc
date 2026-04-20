const stages = ['Awaiting Delivery', 'POD Requested', 'POD Received', 'AI Validating', 'Portal Upload', 'Complete'];

export const pods = Array.from({ length: 34 }).map((_, i) => ({
  id: `POD-${String(4500 + i).padStart(5, '0')}`,
  loadId: `FQ-2026-${String(1200 + i).padStart(4, '0')}`,
  carrier: ['Swift Logistics', 'Knight Transport', 'Schneider', 'J.B. Hunt', 'Werner'][i % 5],
  shipper: ['Walmart', 'Amazon', 'Target', 'Home Depot', 'Costco'][i % 5],
  stage: stages[i % stages.length],
  deliveryDate: `2026-04-${String(1 + (i % 17)).padStart(2, '0')}`,
  receivedDate: i % 6 >= 2 ? `2026-04-${String(2 + (i % 15)).padStart(2, '0')}` : null,
  remindersSent: i % 4,
  validation: {
    signatureDetected: i % 7 !== 0,
    legible: i % 11 !== 0,
    complete: i % 13 !== 0,
    noAlterations: true,
    confidence: 85 + (i % 14),
  },
  portalStatuses: {
    'Walmart': i % 5 === 0 ? 'Uploaded' : i % 5 === 1 ? 'In Progress' : 'Queued',
    'Amazon': i % 4 === 0 ? 'Uploaded' : 'Queued',
    'Target': 'Queued',
  },
}));

export const podKpis = {
  pending: 12,
  requested: 8,
  received: 5,
  validated: 3,
  uploaded: 2,
};
