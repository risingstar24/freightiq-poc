const names = ['Walmart', 'Amazon', 'Target', 'Home Depot', 'Costco', 'Lowes', 'Kroger', 'FedEx Ground', 'UPS Supply Chain', 'Nestle USA', 'Procter & Gamble', '3M Company', 'Unilever', 'Coca-Cola', 'PepsiCo'];
const portalTypes = ['Retail Link', 'Vendor Central', 'Partners Online', 'Vendor Portal', 'Custom EDI', 'Manhattan WMS'];

export const shippers = names.map((name, i) => ({
  id: `S${String(100 + i).padStart(3, '0')}`,
  name,
  portalType: portalTypes[i % portalTypes.length],
  portalStatus: i % 11 === 0 ? 'Credentials Expiring' : 'Connected',
  lanes: 5 + (i * 3) % 28,
  loadVolume: 80 + (i * 17) % 600,
  paymentTerms: ['Net 15', 'Net 30', 'Net 45', 'Net 30', 'Quick Pay'][i % 5],
  rateAgreement: ['Contract', 'Spot', 'Mixed', 'Contract', 'RFP Active'][i % 5],
  onTimeRequirement: 95 + (i % 5),
  ytdRevenue: 450000 + (i * 127000) % 3200000,
  contact: ['Jennifer Lee', 'Mark Thompson', 'Sarah Kim', 'David Chen', 'Amanda Patel', 'Tyler Rodriguez', 'Nicole Wu', 'Brandon Silva'][i % 8],
  contactEmail: name.toLowerCase().replace(/[^a-z]/g, '') + '.logistics@example.com',
}));
