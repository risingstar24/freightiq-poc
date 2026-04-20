import { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { Card, Pill, Section, Button, Table } from '../components/ui';
import { rateTrends, rateComparison, seasonalFactor } from '../data/rates';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function RateIntelligence() {
  const [lane, setLane] = useState('Chicago→LA');
  const [equipment, setEquipment] = useState('Dry Van');
  const [date, setDate] = useState('2026-04-25');
  const predicted = 2780 + (lane.length * 13) + (equipment === 'Reefer' ? 320 : 0);

  const cols = [
    { key: 'lane', label: 'Lane' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'yours', label: 'Your rate', render: r => <span className="tabular-nums font-medium">${r.yours}</span> },
    { key: 'market', label: 'Market avg', render: r => <span className="tabular-nums">${r.market}</span> },
    { key: 'low', label: 'Low', render: r => <span className="tabular-nums text-slate-500">${r.low}</span> },
    { key: 'high', label: 'High', render: r => <span className="tabular-nums text-slate-500">${r.high}</span> },
    { key: 'variance', label: 'vs Market', render: r => {
      const v = ((r.yours - r.market) / r.market * 100);
      return v > 0 ? <Pill color="green"><TrendingUp className="w-3 h-3" /> +{v.toFixed(1)}%</Pill> : <Pill color="red"><TrendingDown className="w-3 h-3" /> {v.toFixed(1)}%</Pill>;
    }},
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Rate Intelligence</h1>
        <p className="text-sm text-slate-500 mt-1">AI pricing · market trends · lane recommendations</p>
      </div>

      <Card>
        <Section title="AI rate calculator" subtitle="Get a lane-specific rate recommendation">
          <div className="grid md:grid-cols-5 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-500">Lane</label>
              <select value={lane} onChange={e => setLane(e.target.value)} className="mt-1 w-full px-3 py-2 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none">
                {rateComparison.map(r => <option key={r.lane}>{r.lane}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-500">Equipment</label>
              <select value={equipment} onChange={e => setEquipment(e.target.value)} className="mt-1 w-full px-3 py-2 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none">
                <option>Dry Van</option><option>Reefer</option><option>Flatbed</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider text-slate-500">Pickup date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 w-full px-3 py-2 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none" />
            </div>
            <div className="md:col-span-2 flex items-end">
              <div className="w-full rounded-lg border border-accent-500/30 bg-accent-500/5 p-3">
                <div className="flex items-center gap-2 text-xs text-accent-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI-recommended
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-semibold tabular-nums">${predicted.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Confidence 91.8% · range ${(predicted - 180).toLocaleString()}–${(predicted + 180).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </Card>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <Section title="Market rate trends" subtitle="Spot rates · last 12 weeks">
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={rateTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="chiLa" stroke="#f97316" strokeWidth={2} name="Chi→LA" dot={false} />
                  <Line type="monotone" dataKey="dalMia" stroke="#3b82f6" strokeWidth={2} name="Dal→Mia" dot={false} />
                  <Line type="monotone" dataKey="atlNyc" stroke="#10b981" strokeWidth={2} name="Atl→NYC" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Seasonal factor" subtitle="Multiplier vs base rate">
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={seasonalFactor}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis domain={[0.85, 1.2]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="factor" fill="#f97316" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>
      </div>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800">
          <div className="font-semibold">Rate comparison</div>
          <div className="text-xs text-slate-500">Your contracted rates vs spot market benchmarks</div>
        </div>
        <Table columns={cols} rows={rateComparison} />
      </Card>

      <Card>
        <Section title="Lane pricing recommendations" right={<Pill color="accent"><Sparkles className="w-3 h-3" /> 3 opportunities</Pill>}>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { lane: 'Chicago → LA', change: '+$120', reason: 'Running 4.2% under market. Contract renewal due in 45 days — stage increase.' },
              { lane: 'Atlanta → NYC', change: '+$90', reason: 'Capacity tightening +8% WoW. Lock in higher rates before Q2.' },
              { lane: 'Dallas → Miami', change: '-$60', reason: 'Competitive pressure. Adjust to win 2 RFPs pending with Walmart.' },
            ].map((r, i) => (
              <div key={i} className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{r.lane}</div>
                  <div className={`text-sm font-semibold ${r.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{r.change}</div>
                </div>
                <div className="text-xs text-slate-400 mt-1">{r.reason}</div>
              </div>
            ))}
          </div>
        </Section>
      </Card>
    </div>
  );
}
