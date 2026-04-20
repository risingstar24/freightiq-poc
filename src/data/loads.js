const statuses = ['Booked', 'Dispatched', 'In Transit', 'Delivered', 'POD Collected', 'Invoiced', 'Paid'];
const lanes = [
  ['Chicago, IL', 'Los Angeles, CA'],
  ['Dallas, TX', 'Miami, FL'],
  ['Atlanta, GA', 'New York, NY'],
  ['Seattle, WA', 'Phoenix, AZ'],
  ['Houston, TX', 'Denver, CO'],
  ['Philadelphia, PA', 'Orlando, FL'],
  ['Detroit, MI', 'Nashville, TN'],
  ['Boston, MA', 'Charlotte, NC'],
  ['Minneapolis, MN', 'Kansas City, MO'],
  ['Portland, OR', 'Salt Lake City, UT'],
  ['San Francisco, CA', 'Las Vegas, NV'],
  ['Columbus, OH', 'Pittsburgh, PA'],
  ['Memphis, TN', 'Indianapolis, IN'],
  ['Cincinnati, OH', 'St. Louis, MO'],
  ['Tampa, FL', 'Baltimore, MD'],
];

const shippers = ['Walmart', 'Amazon', 'Target', 'Home Depot', 'Costco', 'Lowes', 'Kroger', 'FedEx', 'UPS Supply', 'Nestle', 'Procter & Gamble', '3M Company', 'Unilever', 'Coca-Cola', 'PepsiCo'];
const carrierNames = ['Swift Logistics', 'Knight Transport', 'Schneider National', 'J.B. Hunt', 'Werner Enterprises', 'Prime Inc', 'Landstar', 'XPO Freight', 'Old Dominion', 'Yellow Freight', 'ArcBest', 'Saia Inc', 'Roadrunner', 'Estes Express', 'R+L Carriers'];
const equipment = ['53ft Dry Van', 'Reefer', 'Flatbed', '48ft Dry Van', 'Step Deck', 'Power Only'];

function pad(n, w = 4) { return String(n).padStart(w, '0'); }

export const loads = Array.from({ length: 58 }).map((_, i) => {
  const lane = lanes[i % lanes.length];
  const status = statuses[i % statuses.length];
  const pickupDay = 1 + (i % 28);
  const deliveryDay = Math.min(28, pickupDay + 2 + (i % 3));
  return {
    id: `FQ-2026-${pad(1200 + i)}`,
    origin: lane[0],
    destination: lane[1],
    shipper: shippers[i % shippers.length],
    status,
    carrier: carrierNames[i % carrierNames.length],
    rate: 1800 + (i * 73) % 4200,
    pickupDate: `2026-04-${pad(pickupDay, 2)}`,
    deliveryDate: `2026-04-${pad(deliveryDay, 2)}`,
    weight: 12000 + (i * 431) % 30000,
    equipment: equipment[i % equipment.length],
    miles: 400 + (i * 37) % 2400,
    driver: ['Mike Johnson', 'Carlos Rivera', 'Dan Patel', 'Sarah Chen', 'Tom Brady', 'Raj Kumar', 'Emily Foster'][i % 7],
    eta: ['On-time', 'Delayed 2h', 'Early', 'On-time', 'On-time', 'Delayed 1h'][i % 6],
    progress: Math.min(100, ((i * 13) % 100) + 5),
    aiConfidence: 80 + (i % 20),
    lastPing: `${1 + (i % 30)} min ago`,
    temperature: i % 5 === 0 ? `${34 + (i % 4)}°F` : null,
  };
});

export const statusColors = {
  'Booked': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  'Dispatched': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'In Transit': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Delivered': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'POD Collected': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Invoiced': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Paid': 'bg-green-500/20 text-green-300 border-green-500/30',
};

export function getLoad(id) { return loads.find(l => l.id === id); }
