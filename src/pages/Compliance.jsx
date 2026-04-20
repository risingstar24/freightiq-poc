import { ShieldCheck, ShieldAlert, AlertTriangle, Calendar } from 'lucide-react';
import { Card, Pill, Section, Table, ScoreBar, Button } from '../components/ui';
import { carriers } from '../data/carriers';

export default function Compliance() {
  const expiring = carriers.filter(c => c.insuranceStatus === 'Expiring').slice(0, 6);
  const expired = carriers.filter(c => c.insuranceStatus === 'Expired');
  const fraudAlerts = [
    { carrier: 'Roadrunner', type: 'Double brokering signal', severity: 'High', detected: '2026-04-16 14:22' },
    { carrier: 'May Trucking', type: 'Insurance certificate anomaly', severity: 'Medium', detected: '2026-04-15 09:08' },
  ];

  const cols = [
    { key: 'name', label: 'Carrier' },
    { key: 'mc', label: 'MC#' },
    { key: 'aiScore', label: 'Compliance', render: r => <ScoreBar value={r.aiScore} /> },
    { key: 'insuranceStatus', label: 'Insurance', render: r => <Pill color={r.insuranceStatus === 'Active' ? 'green' : r.insuranceStatus === 'Expiring' ? 'amber' : 'red'}>{r.insuranceStatus}</Pill> },
    { key: 'insuranceExpiry', label: 'Expires' },
    { key: 'compliance', label: 'Status', render: r => <Pill color={r.compliance === 'Compliant' ? 'green' : 'red'}>{r.compliance}</Pill> },
    { key: 'csa', label: 'CSA (Unsafe)', render: r => <span className={r.csa.unsafe > 60 ? 'text-red-400' : 'text-slate-300'}>{r.csa.unsafe}</span> },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Compliance Center</h1>
        <p className="text-sm text-slate-500 mt-1">Carrier compliance · insurance monitoring · fraud detection</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Compliant carriers</div>
          <div className="text-3xl font-semibold mt-2">{carriers.filter(c => c.compliance === 'Compliant').length}</div>
          <div className="text-[11px] text-slate-500 mt-1">of {carriers.length} total</div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-xs text-slate-500"><Calendar className="w-3.5 h-3.5 text-amber-400" /> Expiring (30d)</div>
          <div className="text-3xl font-semibold mt-2 text-amber-400">{expiring.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Insurance renewals due</div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldAlert className="w-3.5 h-3.5 text-red-400" /> Expired / Issues</div>
          <div className="text-3xl font-semibold mt-2 text-red-400">{expired.length + carriers.filter(c => c.compliance === 'Issues').length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires action</div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-xs text-slate-500"><AlertTriangle className="w-3.5 h-3.5 text-accent-500" /> Fraud alerts</div>
          <div className="text-3xl font-semibold mt-2">{fraudAlerts.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Active today</div>
        </Card>
      </div>

      <Card>
        <Section title="Fraud & anomaly alerts" subtitle="AI-detected suspicious activity">
          <div className="space-y-2">
            {fraudAlerts.map((a, i) => (
              <div key={i} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.carrier}</div>
                  <div className="text-xs text-slate-400">{a.type} · Detected {a.detected}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill color={a.severity === 'High' ? 'red' : 'amber'}>{a.severity}</Pill>
                  <Button variant="secondary">Investigate</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Card>

      <Card>
        <Section title="Insurance renewals due" subtitle="Within 30 days">
          <div className="grid md:grid-cols-2 gap-3">
            {expiring.map(c => (
              <div key={c.id} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-slate-400">{c.mc} · Expires {c.insuranceExpiry}</div>
                </div>
                <Button variant="secondary">Request COI</Button>
              </div>
            ))}
          </div>
        </Section>
      </Card>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800"><div className="font-semibold">Compliance scorecard</div></div>
        <Table columns={cols} rows={carriers} />
      </Card>
    </div>
  );
}
