import { useParams, Link } from 'react-router-dom';
import { FileText, Download, Phone, Mail } from 'lucide-react';
import { Card, Pill, Section, ScoreBar } from '../components/ui';
import { getCarrier } from '../data/carriers';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function CarrierDetail() {
  const { id } = useParams();
  const c = getCarrier(id);
  if (!c) return <div>Carrier not found — <Link to="/carriers" className="text-accent-400">back</Link></div>;

  const perfData = Array.from({ length: 12 }).map((_, i) => ({
    month: `M${i + 1}`,
    onTime: 82 + ((c.aiScore + i * 3) % 16),
    loads: 10 + ((c.aiScore + i * 7) % 25),
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500">Carrier profile</div>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">{c.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
            <span>{c.mc}</span><span>·</span><span>DOT {c.dot}</span><span>·</span><span>{c.equipment}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Pill color={c.insuranceStatus === 'Active' ? 'green' : 'amber'}>Insurance: {c.insuranceStatus}</Pill>
          <Pill color={c.compliance === 'Compliant' ? 'green' : 'red'}>{c.compliance}</Pill>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider">AI Score</div>
          <div className="text-3xl font-semibold mt-2">{c.aiScore}</div>
          <div className="mt-2"><ScoreBar value={c.aiScore} /></div>
        </Card>
        <Card>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider">On-time</div>
          <div className="text-3xl font-semibold mt-2">{c.onTime}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Last 12 months</div>
        </Card>
        <Card>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider">Completed</div>
          <div className="text-3xl font-semibold mt-2">{c.loadsCompleted.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500 mt-1">Lifetime loads</div>
        </Card>
        <Card>
          <div className="text-[11px] text-slate-500 uppercase tracking-wider">YTD revenue</div>
          <div className="text-3xl font-semibold mt-2">${(c.totalRevenue / 1000).toFixed(0)}k</div>
          <div className="text-[11px] text-slate-500 mt-1">With Signity</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <Section title="Performance trend" subtitle="On-time % and load volume">
            <div className="h-60">
              <ResponsiveContainer>
                <LineChart data={perfData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="onTime" stroke="#f97316" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="loads" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="CSA safety scores">
            {Object.entries(c.csa).map(([k, v]) => (
              <div key={k} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="capitalize">{k === 'hos' ? 'HOS Compliance' : k}</span>
                  <span className="tabular-nums">{v}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-700/30 overflow-hidden">
                  <div className={`h-full ${v < 30 ? 'bg-green-500' : v < 60 ? 'bg-accent-500' : 'bg-red-500'}`} style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
            <div className="text-[11px] text-slate-500 mt-2">Lower is better (percentile vs fleet peers)</div>
          </Section>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <Section title="Documents">
            <div className="space-y-2">
              {['W9 Form', 'Insurance Certificate', 'Operating Authority', 'Carrier Packet', 'Drug Consortium'].map(d => (
                <div key={d} className="flex items-center justify-between p-3 rounded-lg border border-navy-800">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-accent-500" />
                    <div className="text-sm">{d}</div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Contact">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500" /> (312) 555-0188</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500" /> dispatch@{c.name.toLowerCase().replace(/[^a-z]/g, '')}.com</div>
            </div>
            <div className="h-px bg-navy-800 my-4" />
            <Section title="Lane history">
              <div className="text-xs text-slate-400 space-y-1">
                <div className="flex justify-between"><span>Chicago → LA</span><span>14 loads</span></div>
                <div className="flex justify-between"><span>Dallas → Miami</span><span>9 loads</span></div>
                <div className="flex justify-between"><span>Atlanta → NYC</span><span>7 loads</span></div>
                <div className="flex justify-between"><span>Houston → Denver</span><span>4 loads</span></div>
              </div>
            </Section>
          </Section>
        </Card>
      </div>
    </div>
  );
}
