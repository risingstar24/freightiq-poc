const types = ['BOL', 'POD', 'RC', 'Invoice', 'Insurance'];
const ocrStatus = ['Processed', 'Pending', 'Processed', 'Processed', 'Failed'];
const validation = ['Valid', 'Issues', 'Pending', 'Valid', 'Valid'];

export const documents = Array.from({ length: 36 }).map((_, i) => ({
  id: `DOC-${String(20000 + i).padStart(6, '0')}`,
  type: types[i % 5],
  loadId: `FQ-2026-${String(1200 + i % 58).padStart(4, '0')}`,
  uploadDate: `2026-04-${String(1 + (i % 17)).padStart(2, '0')}`,
  ocrStatus: ocrStatus[i % 5],
  validation: validation[i % 5],
  uploader: ['Driver App', 'Carrier Portal', 'Email Ingest', 'Bot Upload', 'Manual'][i % 5],
  size: `${1 + (i % 5)}.${(i * 3) % 9}MB`,
  fields: [
    { name: 'Load ID', extracted: `FQ-2026-${String(1200 + i % 58).padStart(4, '0')}`, confidence: 98 },
    { name: 'Pickup Date', extracted: `2026-04-${String(1 + (i % 17)).padStart(2, '0')}`, confidence: 94 },
    { name: 'Delivery Address', extracted: '445 Freight Way, Los Angeles CA 90001', confidence: 91 },
    { name: 'Weight', extracted: `${18000 + (i * 311) % 22000} lbs`, confidence: 89 },
    { name: 'Signature', extracted: 'Present (receiver)', confidence: 87 },
    { name: 'Shipper', extracted: ['Walmart', 'Amazon', 'Target', 'Home Depot'][i % 4], confidence: 96 },
  ],
}));
