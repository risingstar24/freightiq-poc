import { useState } from 'react';
import { MapPin, Truck, Clock, Radio, Phone } from 'lucide-react';
import { Card, Pill, Section, ProgressBar } from '../components/ui';
import { loads } from '../data/loads';

const dots = loads.filter(l => ['Dispatched', 'In Transit'].includes(l.status)).slice(0, 15).map((l, i) => ({
  ...l,
  x: 10 + (i * 6.2) % 80,
  y: 15 + (i * 13) % 70,
  tone: l.eta === 'On-time' || l.eta === 'Early' ? 'green' : l.eta.startsWith('Delayed') ? 'amber' : 'red',
}));

export default function Dispatch() {
  const [sel, setSel] = useState(dots[0]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dispatch & Tracking</h1>
          <p className="text-sm text-slate-500 mt-1">{dots.length} active loads · Live GPS via Samsara + Motive</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Pill color="green"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> On-time ({dots.filter(d => d.tone === 'green').length})</Pill>
          <Pill color="amber"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Delayed ({dots.filter(d => d.tone === 'amber').length})</Pill>
          <Pill color="red"><span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Exception ({dots.filter(d => d.tone === 'red').length})</Pill>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="relative rounded-lg h-[420px] overflow-hidden border border-navy-800"
            style={{ background: 'radial-gradient(circle at 30% 40%, rgba(249,115,22,0.06), transparent 60%), linear-gradient(180deg, #0b1328 0%, #070d1b 100%)' }}>
            {/* stylized US map grid */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'linear-gradient(rgba(100,116,139,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[10px] uppercase tracking-wider text-slate-600">United States · Live map</div>
            </div>
            {dots.map(d => (
              <button key={d.id} onClick={() => setSel(d)}
                className={`absolute group -translate-x-1/2 -translate-y-1/2 ${sel?.id === d.id ? 'z-20' : 'z-10'}`}
                style={{ left: `${d.x}%`, top: `${d.y}%` }}>
                <span className={`block w-3 h-3 rounded-full ring-2 ring-offset-2 ring-offset-navy-900 ${
                  d.tone === 'green' ? 'bg-green-400 ring-green-400/50' :
                  d.tone === 'amber' ? 'bg-amber-400 ring-amber-400/50' : 'bg-red-400 ring-red-400/50'
                } animate-pulse`} />
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-5 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100">
                  {d.id}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {sel && (
          <Card>
            <Section title={sel.id} subtitle={`${sel.origin} → ${sel.destination}`}>
              <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3 space-y-2 text-sm">
                <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-accent-500" /> {sel.carrier}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500" /> Current: I-80 near Omaha, NE</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" /> ETA {sel.eta}</div>
                <div className="flex items-center gap-2"><Radio className="w-4 h-4 text-slate-500" /> Last ping: {sel.lastPing}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500" /> Driver: {sel.driver}</div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span><span>{sel.progress}%</span>
                </div>
                <ProgressBar value={sel.progress} />
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium mb-2">Event timeline</div>
                <div className="relative pl-4 space-y-2 text-xs">
                  {[
                    { t: 'Departed origin', time: '08:42' },
                    { t: 'Check call #1', time: '10:15' },
                    { t: 'Fuel stop — Des Moines', time: '12:03' },
                    { t: 'Check call #2', time: '13:47' },
                    { t: 'Current position', time: 'Now', active: true },
                  ].map((e, i) => (
                    <div key={i} className="relative">
                      <span className={`absolute -ml-3 top-1 w-1.5 h-1.5 rounded-full ${e.active ? 'bg-accent-500 animate-pulse' : 'bg-slate-600'}`} />
                      <div className="flex justify-between">
                        <span className={e.active ? 'text-accent-300' : ''}>{e.t}</span>
                        <span className="text-slate-500">{e.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-accent-500/20 bg-accent-500/5 p-3 text-xs">
                <div className="font-medium text-accent-300 mb-1">AI ETA Prediction</div>
                <div className="text-slate-400">On-time arrival confidence: <span className="text-white font-medium">92.4%</span>. Weather at destination clear; no construction alerts on route.</div>
              </div>
            </Section>
          </Card>
        )}
      </div>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800">
          <div className="text-sm font-semibold">Active loads</div>
        </div>
        <div className="divide-y divide-navy-800">
          {dots.map(d => (
            <button key={d.id} onClick={() => setSel(d)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-navy-850/40 ${sel?.id === d.id ? 'bg-navy-850/60' : ''}`}>
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${
                  d.tone === 'green' ? 'bg-green-400' : d.tone === 'amber' ? 'bg-amber-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="text-sm font-medium">{d.id}</div>
                  <div className="text-xs text-slate-500">{d.origin} → {d.destination} · {d.driver}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <span className="text-slate-500">Last ping: {d.lastPing}</span>
                <Pill color={d.tone === 'green' ? 'green' : d.tone === 'amber' ? 'amber' : 'red'}>{d.eta}</Pill>
                <div className="w-24"><ProgressBar value={d.progress} /></div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
