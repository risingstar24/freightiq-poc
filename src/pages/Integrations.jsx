import { Plug, Check, X, ArrowRightLeft, ArrowRight, ArrowLeft, Clock, AlertCircle } from 'lucide-react';
import { Card, Pill, Section, Button } from '../components/ui';
import { integrations } from '../data/integrations';

export default function Integrations() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integration Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Connected systems · data flow · sync status</p>
        </div>
        <Button><Plug className="w-4 h-4" /> Add integration</Button>
      </div>

      {Object.entries(integrations).map(([category, items]) => (
        <Card key={category}>
          <Section title={category}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map(it => (
                <div key={it.name} className={`rounded-lg border p-4 ${
                  it.connected === true ? 'border-green-500/20 bg-green-500/5' :
                  it.connected === 'pending' ? 'border-amber-500/20 bg-amber-500/5' :
                  'border-navy-800 bg-navy-850/40'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{it.name}</div>
                    {it.connected === true ? <Pill color="green"><Check className="w-3 h-3" /> Connected</Pill> :
                     it.connected === 'pending' ? <Pill color="amber"><Clock className="w-3 h-3" /> Pending</Pill> :
                     <Pill><X className="w-3 h-3" /> Not connected</Pill>}
                  </div>
                  <div className="mt-3 space-y-1 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Last sync</span>
                      <span className={it.lastSync === 'Real-time' ? 'text-green-400' : ''}>{it.lastSync ?? '—'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Data flow</span>
                      <span className="inline-flex items-center gap-1">
                        {it.direction === 'Bi-directional' && <ArrowRightLeft className="w-3 h-3" />}
                        {it.direction === 'Outbound' && <ArrowRight className="w-3 h-3" />}
                        {it.direction === 'Inbound' && <ArrowLeft className="w-3 h-3" />}
                        {it.direction}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Errors (24h)</span>
                      <span className={it.errors > 0 ? 'text-amber-400' : 'text-slate-500'}>
                        {it.errors > 0 && <AlertCircle className="w-3 h-3 inline mr-1" />}
                        {it.errors}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {it.connected === true ? (
                      <>
                        <Button variant="ghost" className="flex-1 text-xs">Configure</Button>
                        <Button variant="ghost" className="flex-1 text-xs">Logs</Button>
                      </>
                    ) : (
                      <Button className="w-full text-xs">Connect</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      ))}
    </div>
  );
}
