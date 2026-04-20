import { useParams, Link } from 'react-router-dom';
import { Check, Circle, FileText, Download, MapPin, Truck, Package, AlertCircle } from 'lucide-react';
import { Card, Pill, Section, Button } from '../components/ui';
import { getLoad, statusColors } from '../data/loads';
import { exceptions } from '../data/exceptions';

const TIMELINE = [
  'Load Created', 'Carrier Assigned', 'RC Signed', 'BOL Generated',
  'Picked Up', 'In Transit', 'Delivered', 'POD Collected',
  'POD Validated', 'Invoice Generated', 'Payment Received',
];

const statusStepIndex = {
  'Booked': 2, 'Dispatched': 3, 'In Transit': 5, 'Delivered': 6,
  'POD Collected': 7, 'Invoiced': 9, 'Paid': 10,
};

export default function LoadDetail() {
  const { id } = useParams();
  const load = getLoad(id);
  if (!load) return <div>Load not found — <Link to="/loads" className="text-accent-400">back to board</Link></div>;

  const step = statusStepIndex[load.status] ?? 0;
  const loadExceptions = exceptions.filter(e => e.loadId === load.id);

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500 mb-1">Load detail</div>
          <h1 className="text-2xl font-semibold tracking-tight">{load.id}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-[10px] border rounded-md px-2 py-0.5 ${statusColors[load.status]}`}>{load.status}</span>
            <span className="text-sm text-slate-500">{load.origin} → {load.destination}</span>
            <Pill color="accent">AI confidence {load.aiConfidence}%</Pill>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">Edit</Button>
          <Button>Track Live</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <Section title="Load timeline" subtitle="Event stream from creation to payment">
            <div className="relative pl-6">
              <div className="absolute top-1 bottom-1 left-[9px] w-px bg-navy-700" />
              {TIMELINE.map((t, i) => {
                const done = i <= step;
                const current = i === step + 1;
                return (
                  <div key={t} className="flex items-start gap-3 pb-3">
                    <div className={`absolute -ml-[9px] mt-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center ${done ? 'bg-green-500' : current ? 'bg-accent-500 animate-pulse' : 'bg-navy-700'}`}>
                      {done ? <Check className="w-3 h-3 text-white" /> : <Circle className="w-2 h-2 text-slate-300 fill-current" />}
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm ${done ? 'font-medium' : 'text-slate-400'}`}>{t}</div>
                      <div className="text-[11px] text-slate-500">
                        {done ? `2026-04-${String(1 + i).padStart(2, '0')} ${String(8 + i).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}` : current ? 'In progress…' : 'Pending'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </Card>

        <div className="space-y-5">
          <Card>
            <Section title="Lane">
              <div className="rounded-lg border border-dashed border-navy-700 h-40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,#f97316_50%,transparent_50%)] bg-[length:8px_2px] bg-center bg-no-repeat" style={{ backgroundSize: 'auto 2px' }} />
                <div className="relative flex items-center gap-6 text-xs">
                  <div className="text-center"><MapPin className="w-5 h-5 text-green-400 mx-auto" /><div className="mt-1">{load.origin}</div></div>
                  <div className="h-px w-20 bg-accent-500 relative"><Truck className="w-4 h-4 text-accent-500 absolute -top-2 left-1/2 -translate-x-1/2" /></div>
                  <div className="text-center"><MapPin className="w-5 h-5 text-accent-400 mx-auto" /><div className="mt-1">{load.destination}</div></div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div><div className="text-slate-500">Miles</div><div className="font-medium">{load.miles.toLocaleString()}</div></div>
                <div><div className="text-slate-500">ETA</div><div className="font-medium">{load.eta}</div></div>
                <div><div className="text-slate-500">Last ping</div><div className="font-medium">{load.lastPing}</div></div>
                <div><div className="text-slate-500">Driver</div><div className="font-medium">{load.driver}</div></div>
              </div>
            </Section>
          </Card>

          <Card>
            <Section title="Rate details">
              <div className="space-y-1.5 text-sm">
                <Row l="Line haul" v={`$${(load.rate * 0.85).toFixed(0)}`} />
                <Row l="Fuel surcharge" v={`$${(load.rate * 0.12).toFixed(0)}`} />
                <Row l="Accessorials" v={`$${(load.rate * 0.03).toFixed(0)}`} />
                <div className="h-px bg-navy-800 my-2" />
                <Row l="Total rate" v={`$${load.rate.toLocaleString()}`} bold />
                <Row l="Carrier pay" v={`$${(load.rate * 0.82).toFixed(0)}`} muted />
                <Row l="Margin" v={`18.0%`} muted />
              </div>
            </Section>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <Section title="Documents" right={<Button variant="ghost">Upload</Button>}>
            <div className="space-y-2">
              {['Rate Confirmation', 'Bill of Lading', 'Proof of Delivery', 'Invoice'].map((d, i) => (
                <div key={d} className="flex items-center justify-between p-3 rounded-lg border border-navy-800 hover:bg-navy-850/40">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-accent-500" />
                    <div>
                      <div className="text-sm font-medium">{d}</div>
                      <div className="text-[11px] text-slate-500">{i < step - 1 ? `Validated · 2026-04-${String(3 + i).padStart(2, '0')}` : 'Pending'}</div>
                    </div>
                  </div>
                  <Button variant="ghost"><Download className="w-3.5 h-3.5" /></Button>
                </div>
              ))}
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Exception history">
            {loadExceptions.length === 0 ? (
              <div className="text-sm text-slate-500 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> No exceptions recorded</div>
            ) : (
              <div className="space-y-2">
                {loadExceptions.map(e => (
                  <div key={e.id} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{e.type}</div>
                      <Pill color={e.severity === 'Critical' ? 'red' : 'amber'}>{e.severity}</Pill>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{e.aiResolution}</div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </Card>
      </div>
    </div>
  );
}

function Row({ l, v, bold, muted }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'font-semibold' : ''} ${muted ? 'text-slate-500' : ''}`}>
      <span>{l}</span><span className="tabular-nums">{v}</span>
    </div>
  );
}
