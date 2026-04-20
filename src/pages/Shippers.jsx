import { useState } from 'react';
import { Building2, FileText, KeyRound, Mail, ChevronRight, Plus } from 'lucide-react';
import { Card, Pill, Section, Button, Table } from '../components/ui';
import { shippers } from '../data/shippers';

export default function Shippers() {
  const [sel, setSel] = useState(shippers[0]);

  const cols = [
    { key: 'name', label: 'Shipper', render: r => <button onClick={() => setSel(r)} className="font-medium text-accent-400 hover:underline">{r.name}</button> },
    { key: 'portalType', label: 'Portal' },
    { key: 'portalStatus', label: 'Status', render: r => <Pill color={r.portalStatus === 'Connected' ? 'green' : 'amber'}>{r.portalStatus}</Pill> },
    { key: 'lanes', label: 'Lanes' },
    { key: 'loadVolume', label: 'Volume', render: r => `${r.loadVolume}/mo` },
    { key: 'paymentTerms', label: 'Terms' },
    { key: 'rateAgreement', label: 'Agreement' },
    { key: 'ytdRevenue', label: 'YTD Rev.', render: r => `$${(r.ytdRevenue / 1000).toFixed(0)}k` },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Shipper Management</h1>
          <p className="text-sm text-slate-500 mt-1">{shippers.length} shippers · portal credentials · billing preferences</p>
        </div>
        <Button><Plus className="w-4 h-4" /> Onboard shipper</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2" padded={false}>
          <Table columns={cols} rows={shippers} onRowClick={setSel} />
        </Card>

        {sel && (
          <Card>
            <Section title={sel.name} subtitle={`${sel.id} · ${sel.portalType}`}>
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">Primary contact</div>
                  <div className="text-sm font-medium">{sel.contact}</div>
                  <div className="text-xs text-slate-500">{sel.contactEmail}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">Load volume</div>
                    <div className="text-xl font-semibold mt-1">{sel.loadVolume}/mo</div>
                  </div>
                  <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">On-time req.</div>
                    <div className="text-xl font-semibold mt-1">{sel.onTimeRequirement}%</div>
                  </div>
                </div>

                <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <KeyRound className="w-4 h-4 text-accent-500" />
                    <div className="text-sm font-medium">Portal credentials</div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">•••••••••••••• <span className="text-accent-400">(vault)</span></div>
                  <div className="text-[11px] text-slate-500 mt-1">{sel.portalStatus} · last tested 2h ago</div>
                </div>

                <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-accent-500" />
                    <div className="text-sm font-medium">Billing preferences</div>
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-slate-500">Payment terms</span>{sel.paymentTerms}</div>
                    <div className="flex justify-between"><span className="text-slate-500">Rate agreement</span>{sel.rateAgreement}</div>
                    <div className="flex justify-between"><span className="text-slate-500">Invoice channel</span>Portal + email</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Recent activity</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent-400" /> 12 loads delivered this week</div>
                    <div className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent-400" /> 3 PODs auto-uploaded today</div>
                    <div className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent-400" /> Invoice INV-07212 paid 4d early</div>
                  </div>
                </div>
              </div>
            </Section>
          </Card>
        )}
      </div>
    </div>
  );
}
