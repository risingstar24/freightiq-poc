import { useState } from 'react';
import { AlertTriangle, Clock, Check, Brain } from 'lucide-react';
import { Card, Pill, Section, Button, Table } from '../components/ui';
import { exceptions } from '../data/exceptions';

const severityColor = { 'Critical': 'red', 'High': 'red', 'Medium': 'amber', 'Low': 'slate' };
const statusColor = { 'Open': 'red', 'In Progress': 'amber', 'Resolved': 'green' };

export default function Exceptions() {
  const [sel, setSel] = useState(exceptions[0]);

  const cols = [
    { key: 'id', label: 'ID' },
    { key: 'loadId', label: 'Load' },
    { key: 'type', label: 'Type' },
    { key: 'severity', label: 'Severity', render: r => <Pill color={severityColor[r.severity]}>{r.severity}</Pill> },
    { key: 'status', label: 'Status', render: r => <Pill color={statusColor[r.status]}>{r.status}</Pill> },
    { key: 'detected', label: 'Detected' },
    { key: 'assignedTo', label: 'Assignee' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Exception Manager</h1>
        <p className="text-sm text-slate-500 mt-1">{exceptions.filter(e => e.status !== 'Resolved').length} open · AI auto-resolution enabled</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {['Critical', 'High', 'Medium', 'Low'].map(sev => (
          <Card key={sev}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{sev}</div>
              <Pill color={severityColor[sev]}>{sev}</Pill>
            </div>
            <div className="text-3xl font-semibold mt-2">{exceptions.filter(e => e.severity === sev).length}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2" padded={false}>
          <Table columns={cols} rows={exceptions} onRowClick={setSel} />
        </Card>

        {sel && (
          <Card>
            <Section title={sel.id} subtitle={`Load ${sel.loadId} · ${sel.type}`}>
              <div className="flex items-center gap-2 mb-3">
                <Pill color={severityColor[sel.severity]}>{sel.severity}</Pill>
                <Pill color={statusColor[sel.status]}>{sel.status}</Pill>
              </div>

              <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3 text-sm">
                <div className="text-xs text-slate-500 mb-1">Description</div>
                {sel.description}
              </div>

              <div className="mt-4 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
                <div className="flex items-center gap-2 text-xs text-accent-400 mb-1">
                  <Brain className="w-3.5 h-3.5" /> AI recommended resolution
                </div>
                <div className="text-sm">{sel.aiResolution}</div>
                <div className="mt-2 flex items-center gap-2">
                  <Button><Check className="w-4 h-4" /> Accept & auto-resolve</Button>
                  <Button variant="secondary">Edit</Button>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Timeline</div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-slate-500" /> Detected · {sel.detected}</div>
                  <div className="flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> AI triage · scored severity {sel.severity}</div>
                  <div className="flex items-center gap-2"><Brain className="w-3.5 h-3.5 text-accent-500" /> Resolution suggested</div>
                  <div className="flex items-center gap-2 text-slate-500"><Clock className="w-3.5 h-3.5" /> Awaiting assignee action</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Similar past exceptions</div>
                <div className="text-xs text-slate-400">Found {sel.similarPast} similar incidents in last 90 days · avg resolution time 4.2h</div>
              </div>
            </Section>
          </Card>
        )}
      </div>
    </div>
  );
}
