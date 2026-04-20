const statuses = ['Draft', 'Submitted', 'Paid', 'Overdue', 'Submitted', 'Paid'];
const types = ['Shipper', 'Carrier'];

export const invoices = Array.from({ length: 44 }).map((_, i) => ({
  id: `INV-${String(7200 + i).padStart(5, '0')}`,
  type: types[i % 2],
  loadId: `FQ-2026-${String(1200 + (i * 2) % 58).padStart(4, '0')}`,
  amount: 2200 + (i * 89) % 5800,
  status: statuses[i % statuses.length],
  issueDate: `2026-04-${String(1 + (i % 17)).padStart(2, '0')}`,
  dueDate: `2026-04-${String(15 + (i % 15)).padStart(2, '0')}`,
  portalSubmitted: i % 3 === 0 ? 'Walmart Retail Link' : i % 3 === 1 ? 'Amazon Vendor Central' : 'Direct Email',
  party: ['Walmart', 'Amazon', 'Target', 'Home Depot', 'Swift Logistics', 'Knight Transport', 'Schneider'][i % 7],
  paymentDate: i % 3 === 2 ? `2026-04-${String(20 + (i % 8)).padStart(2, '0')}` : null,
  reconciled: i % 4 !== 0,
}));
