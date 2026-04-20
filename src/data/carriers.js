const names = ['Swift Logistics', 'Knight Transport', 'Schneider National', 'J.B. Hunt', 'Werner Enterprises', 'Prime Inc', 'Landstar', 'XPO Freight', 'Old Dominion', 'Yellow Freight', 'ArcBest', 'Saia Inc', 'Roadrunner', 'Estes Express', 'R+L Carriers', 'Averitt Express', 'Heartland Express', 'Covenant Transport', 'US Xpress', 'Marten Transport', 'CFI Trucking', 'Hunt Transportation', 'May Trucking', 'Crete Carrier', 'Melton Truck', 'PAM Transportation', 'Stevens Transport', 'USA Truck', 'Western Express', 'TransAm Trucking', 'Roehl Transport', 'Dayton Freight'];

const equipment = ['Dry Van', 'Reefer', 'Flatbed', 'Dry Van + Reefer', 'Step Deck', 'Mixed Fleet'];
const lanes = ['Midwest→West', 'South→Northeast', 'Nationwide', 'Northeast→Southeast', 'West Coast', 'Gulf States', 'Mountain→Plains'];
const insurance = ['Active', 'Active', 'Active', 'Active', 'Expiring', 'Expired'];

export const carriers = names.map((name, i) => ({
  id: `C${String(1000 + i).padStart(4, '0')}`,
  name,
  mc: `MC-${600000 + i * 137}`,
  dot: `${1200000 + i * 1531}`,
  equipment: equipment[i % equipment.length],
  lanes: lanes[i % lanes.length],
  aiScore: 62 + ((i * 7) % 38),
  insuranceStatus: insurance[i % insurance.length],
  insuranceExpiry: `2026-${String(5 + (i % 7)).padStart(2, '0')}-${String(5 + (i % 25)).padStart(2, '0')}`,
  compliance: i % 9 === 0 ? 'Issues' : 'Compliant',
  loadsCompleted: 120 + (i * 37) % 2800,
  onTime: 82 + ((i * 3) % 17),
  activeLoads: (i * 5) % 9,
  csa: { unsafe: 10 + (i % 70), hos: 15 + ((i * 3) % 60), driver: 20 + ((i * 7) % 55), vehicle: 12 + ((i * 11) % 65) },
  totalRevenue: 180000 + (i * 27000) % 2000000,
}));

export function getCarrier(id) { return carriers.find(c => c.id === id); }

export const carrierScoreColor = (s) => s >= 90 ? 'bg-green-500' : s >= 75 ? 'bg-accent-500' : s >= 60 ? 'bg-amber-500' : 'bg-red-500';
