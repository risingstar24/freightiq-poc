export const integrations = {
  'TMS': [
    { name: 'McLeod LoadMaster', connected: true, lastSync: '2m ago', direction: 'Bi-directional', errors: 0 },
    { name: 'TMW Suite', connected: false, lastSync: null, direction: '—', errors: 0 },
  ],
  'Load Boards': [
    { name: 'DAT', connected: true, lastSync: '45s ago', direction: 'Inbound', errors: 0 },
    { name: 'Truckstop', connected: true, lastSync: '1m ago', direction: 'Inbound', errors: 2 },
  ],
  'ELD / GPS': [
    { name: 'Samsara', connected: true, lastSync: 'Real-time', direction: 'Inbound', errors: 0 },
    { name: 'Motive (KeepTruckin)', connected: true, lastSync: 'Real-time', direction: 'Inbound', errors: 1 },
  ],
  'Accounting': [
    { name: 'QuickBooks Online', connected: true, lastSync: '18m ago', direction: 'Outbound', errors: 0 },
    { name: 'NetSuite', connected: false, lastSync: null, direction: '—', errors: 0 },
  ],
  'Shipper Portals': [
    { name: 'Walmart Retail Link', connected: true, lastSync: '3m ago', direction: 'Outbound', errors: 0 },
    { name: 'Amazon Vendor Central', connected: true, lastSync: '7m ago', direction: 'Outbound', errors: 1 },
    { name: 'Target Partners Online', connected: true, lastSync: '12m ago', direction: 'Outbound', errors: 0 },
    { name: 'Home Depot Vendor', connected: 'pending', lastSync: 'Setup in progress', direction: '—', errors: 0 },
  ],
  'Communication': [
    { name: 'SendGrid (Email)', connected: true, lastSync: 'Real-time', direction: 'Outbound', errors: 0 },
    { name: 'Twilio (SMS)', connected: true, lastSync: 'Real-time', direction: 'Bi-directional', errors: 0 },
  ],
};
