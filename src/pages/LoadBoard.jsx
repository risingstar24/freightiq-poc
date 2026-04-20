import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, UserPlus, FileSignature, Filter, Download } from 'lucide-react';
import { Card, Pill, Table, Button, Section } from '../components/ui';
import { loads, statusColors } from '../data/loads';

const STATUSES = ['All', 'Booked', 'Dispatched', 'In Transit', 'Delivered', 'POD Collected', 'Invoiced', 'Paid'];

export default function LoadBoard() {
  const [status, setStatus] = useState('All');
  const [shipper, setShipper] = useState('All');
  const [search, setSearch] = useState('');

  const shippers = useMemo(() => ['All', ...new Set(loads.map(l => l.shipper))], []);

  const filtered = loads.filter(l =>
    (status === 'All' || l.status === status) &&
    (shipper === 'All' || l.shipper === shipper) &&
    (!search || l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.origin.toLowerCase().includes(search.toLowerCase()) ||
      l.destination.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { key: 'id', label: 'Load ID', render: r => <Link to={`/loads/${r.id}`} className="text-accent-400 hover:underline font-medium">{r.id}</Link> },
    { key: 'lane', label: 'Origin → Destination', render: r => <span className="text-sm">{r.origin} <span className="text-slate-500">→</span> {r.destination}</span> },
    { key: 'shipper', label: 'Shipper' },
    { key: 'status', label: 'Status', render: r => <span className={`text-[10px] border rounded-md px-2 py-0.5 ${statusColors[r.status]}`}>{r.status}</span> },
    { key: 'carrier', label: 'Carrier' },
    { key: 'rate', label: 'Rate', render: r => <span className="tabular-nums font-medium">${r.rate.toLocaleString()}</span> },
    { key: 'pickupDate', label: 'Pickup' },
    { key: 'deliveryDate', label: 'Delivery' },
    { key: 'weight', label: 'Weight', render: r => <span className="tabular-nums">{r.weight.toLocaleString()} lbs</span> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Load Board</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} of {loads.length} loads</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary"><FileSignature className="w-4 h-4" /> Generate RC</Button>
          <Button variant="secondary"><UserPlus className="w-4 h-4" /> Assign Carrier</Button>
          <Button><Plus className="w-4 h-4" /> Create Load</Button>
        </div>
      </div>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800 dark:border-navy-800 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search load ID, origin, destination…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-1.5 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none focus:border-accent-500 min-w-[300px]"
          />
          <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-1.5 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none">
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={shipper} onChange={e => setShipper(e.target.value)} className="px-3 py-1.5 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none">
            {shippers.map(s => <option key={s}>{s}</option>)}
          </select>
          <Button variant="ghost"><Filter className="w-4 h-4" /> More filters</Button>
          <div className="ml-auto"><Button variant="ghost"><Download className="w-4 h-4" /> Export</Button></div>
        </div>
        <Table columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
