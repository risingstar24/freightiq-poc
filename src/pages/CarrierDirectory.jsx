import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Card, Pill, Table, Button, ScoreBar } from '../components/ui';
import { carriers } from '../data/carriers';

export default function CarrierDirectory() {
  const [search, setSearch] = useState('');
  const [equipment, setEquipment] = useState('All');
  const equipments = useMemo(() => ['All', ...new Set(carriers.map(c => c.equipment))], []);

  const filtered = carriers.filter(c =>
    (!search || c.name.toLowerCase().includes(search.toLowerCase()) || c.mc.toLowerCase().includes(search.toLowerCase())) &&
    (equipment === 'All' || c.equipment === equipment)
  );

  const columns = [
    { key: 'name', label: 'Carrier', render: r => <Link to={`/carriers/${r.id}`} className="text-accent-400 hover:underline font-medium">{r.name}</Link> },
    { key: 'mc', label: 'MC#' },
    { key: 'dot', label: 'DOT#' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'lanes', label: 'Lanes' },
    { key: 'aiScore', label: 'AI Score', render: r => <ScoreBar value={r.aiScore} /> },
    { key: 'insuranceStatus', label: 'Insurance', render: r => (
      <Pill color={r.insuranceStatus === 'Active' ? 'green' : r.insuranceStatus === 'Expiring' ? 'amber' : 'red'}>
        {r.insuranceStatus}
      </Pill>
    )},
    { key: 'compliance', label: 'Compliance', render: r => (
      <Pill color={r.compliance === 'Compliant' ? 'green' : 'red'}>
        {r.compliance === 'Compliant' ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
        {r.compliance}
      </Pill>
    )},
    { key: 'loadsCompleted', label: 'Completed', render: r => r.loadsCompleted.toLocaleString() },
    { key: 'onTime', label: 'On-Time %', render: r => `${r.onTime}%` },
    { key: 'activeLoads', label: 'Active' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Carrier Directory</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} carriers · AI-scored and ranked</p>
        </div>
        <Button><Plus className="w-4 h-4" /> Onboard Carrier</Button>
      </div>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search by name or MC#"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-1.5 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none min-w-[280px]"
          />
          <select value={equipment} onChange={e => setEquipment(e.target.value)} className="px-3 py-1.5 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none">
            {equipments.map(e => <option key={e}>{e}</option>)}
          </select>
          <Button variant="ghost"><Filter className="w-4 h-4" /> More filters</Button>
        </div>
        <Table columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
