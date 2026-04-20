import { useState } from 'react';
import { Check, X, Clock, Upload, Mail, ClipboardCheck, Bot } from 'lucide-react';
import { Card, Pill, Section, Button, PortalMock } from '../components/ui';
import { pods, podKpis } from '../data/pods';

const STAGES = ['Awaiting Delivery', 'POD Requested', 'POD Received', 'AI Validating', 'Portal Upload', 'Complete'];
const stageColors = {
  'Awaiting Delivery': 'slate',
  'POD Requested': 'blue',
  'POD Received': 'indigo',
  'AI Validating': 'accent',
  'Portal Upload': 'amber',
  'Complete': 'green',
};

export default function PODManager() {
  const [sel, setSel] = useState(pods[4]);

  const kpiItems = [
    { label: 'Pending', value: podKpis.pending, color: 'slate' },
    { label: 'Requested', value: podKpis.requested, color: 'blue' },
    { label: 'Received', value: podKpis.received, color: 'indigo' },
    { label: 'Validated', value: podKpis.validated, color: 'accent' },
    { label: 'Uploaded', value: podKpis.uploaded, color: 'green' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">POD Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Automated collection · AI validation · Portal submission</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary"><Mail className="w-4 h-4" /> Send Reminders</Button>
          <Button><Bot className="w-4 h-4" /> Run Upload Bot</Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {kpiItems.map(k => (
          <Card key={k.label} className="text-center">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">{k.label}</div>
            <div className="text-3xl font-semibold mt-2">{k.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <Section title="POD pipeline" subtitle="Kanban of in-flight PODs">
          <div className="grid grid-cols-6 gap-3">
            {STAGES.map(stage => {
              const items = pods.filter(p => p.stage === stage);
              return (
                <div key={stage} className="rounded-lg border border-navy-800 bg-navy-850/40">
                  <div className="px-3 py-2 border-b border-navy-800 flex items-center justify-between">
                    <div className="text-xs font-medium">{stage}</div>
                    <span className="text-[11px] text-slate-500">{items.length}</span>
                  </div>
                  <div className="p-2 space-y-2 max-h-[340px] overflow-y-auto scrollbar-thin">
                    {items.map(p => (
                      <button key={p.id} onClick={() => setSel(p)}
                        className={`w-full text-left rounded-md border p-2 text-xs hover:border-accent-500/40 ${sel?.id === p.id ? 'border-accent-500/60 bg-accent-500/5' : 'border-navy-700 bg-navy-900'}`}>
                        <div className="font-medium">{p.loadId}</div>
                        <div className="text-slate-500 mt-0.5 truncate">{p.carrier}</div>
                        <div className="text-slate-500 truncate">→ {p.shipper}</div>
                        <div className="text-[10px] text-slate-600 mt-1">{p.deliveryDate}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </Card>

      {sel && (
        <div className="grid lg:grid-cols-2 gap-5">
          <Card>
            <Section title={sel.id} subtitle={`Load ${sel.loadId} · ${sel.carrier}`} right={<Pill color={stageColors[sel.stage]}>{sel.stage}</Pill>}>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">AI Validation</div>
              <div className="space-y-2">
                {[
                  ['Signature detected', sel.validation.signatureDetected],
                  ['Legible', sel.validation.legible],
                  ['Complete', sel.validation.complete],
                  ['No alterations', sel.validation.noAlterations],
                ].map(([label, ok]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span>{label}</span>
                    {ok ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                  </div>
                ))}
                <div className="flex items-center justify-between text-sm pt-2 border-t border-navy-800 mt-2">
                  <span className="text-slate-400">Overall confidence</span>
                  <span className="font-semibold text-accent-400">{sel.validation.confidence}%</span>
                </div>
              </div>

              <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2 mt-6">Auto-request history</div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-500" /> Initial request · 2026-04-15 09:12</div>
                {sel.remindersSent >= 1 && <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400" /> Reminder #1 · 2026-04-16 09:00</div>}
                {sel.remindersSent >= 2 && <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400" /> Reminder #2 · 2026-04-17 09:00</div>}
                {sel.remindersSent === 0 && <div className="text-slate-500">No reminders sent yet</div>}
              </div>
            </Section>
          </Card>

          <Card>
            <Section title="Portal upload status" subtitle="RPA bot submission progress">
              <div className="grid gap-3">
                {Object.entries(sel.portalStatuses).map(([portal, status]) => (
                  <PortalMock key={portal} portal={`${portal} Portal`} status={status}>
                    <div className="flex items-center gap-2">
                      {status === 'Uploaded' && <><Check className="w-4 h-4 text-green-400" /> POD successfully uploaded</>}
                      {status === 'In Progress' && <><Bot className="w-4 h-4 text-accent-500 animate-pulse" /> Bot uploading document…</>}
                      {status === 'Queued' && <><Clock className="w-4 h-4 text-slate-500" /> Queued for next bot cycle</>}
                    </div>
                  </PortalMock>
                ))}
              </div>
            </Section>
          </Card>
        </div>
      )}
    </div>
  );
}
