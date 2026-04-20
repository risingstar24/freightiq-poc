import { useState } from 'react';
import { FileBarChart, Download, Mail, Calendar } from 'lucide-react';
import { Card, Pill, Section, Button } from '../components/ui';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { revenueMargin, laneProfitability, paymentCycle } from '../data/analytics';
import { botPerfData } from '../data/bots';

const reports = [
  { id: 'monthly-ops', name: 'Monthly Operations', desc: 'Load volume, revenue, margin, on-time performance', updated: '2026-04-01', schedule: 'Monthly · 1st' },
  { id: 'carrier-scorecard', name: 'Carrier Scorecard', desc: 'Per-carrier performance, safety, compliance', updated: '2026-04-15', schedule: 'Weekly · Mon' },
  { id: 'lane-profit', name: 'Lane Profitability', desc: 'Top/bottom lanes by margin, cost analysis', updated: '2026-04-17', schedule: 'Weekly · Fri' },
  { id: 'payment-aging', name: 'Payment Aging', desc: 'AR aging buckets, DSO by customer', updated: '2026-04-17', schedule: 'Daily' },
  { id: 'pod-collection', name: 'POD Collection', desc: 'POD status funnel, aging, bot performance', updated: '2026-04-17', schedule: 'Daily' },
  { id: 'bot-perf', name: 'Bot Performance', desc: 'Success rate, docs processed, time saved', updated: '2026-04-17', schedule: 'Weekly · Sun' },
  { id: 'ai-perf', name: 'AI Model Performance', desc: 'Accuracy, decision volume, overrides', updated: '2026-04-17', schedule: 'Weekly · Sun' },
];

export default function Reports() {
  const [sel, setSel] = useState(reports[0]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
        <p className="text-sm text-slate-500 mt-1">{reports.length} standard reports · download or schedule</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="space-y-2">
          {reports.map(r => (
            <button key={r.id} onClick={() => setSel(r)}
              className={`w-full text-left rounded-xl border p-3 ${sel.id === r.id ? 'border-accent-500/40 bg-accent-500/5' : 'border-navy-800 bg-navy-900 hover:bg-navy-850/40'}`}>
              <div className="flex items-center gap-2">
                <FileBarChart className="w-4 h-4 text-accent-500" />
                <div className="font-medium text-sm">{r.name}</div>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{r.desc}</div>
              <div className="text-[10px] text-slate-600 mt-1">{r.schedule}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-5">
          <Card>
            <Section title={sel.name} subtitle={`Last updated ${sel.updated}`} right={
              <div className="flex items-center gap-2">
                <Button variant="secondary"><Calendar className="w-4 h-4" /> Schedule</Button>
                <Button variant="secondary"><Mail className="w-4 h-4" /> Email</Button>
                <Button><Download className="w-4 h-4" /> Download PDF</Button>
              </div>
            }>
              <div className="grid grid-cols-4 gap-3 mb-4">
                <Kpi label="Loads" value="312" />
                <Kpi label="Revenue" value="$1.21M" />
                <Kpi label="Margin" value="17.1%" />
                <Kpi label="On-time" value="94.2%" />
              </div>

              <div className="h-64 mb-4">
                <ResponsiveContainer>
                  <LineChart data={revenueMargin}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                    <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis yAxisId="l" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis yAxisId="r" orientation="right" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="l" type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
                    <Line yAxisId="r" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-56">
                <ResponsiveContainer>
                  <BarChart data={paymentCycle}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                    <XAxis dataKey="range" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Top lanes</div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-navy-800">
                      <th className="text-left py-1.5">Lane</th>
                      <th className="text-right">Loads</th>
                      <th className="text-right">Revenue</th>
                      <th className="text-right">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-800">
                    {laneProfitability.slice(0, 6).map(l => (
                      <tr key={l.lane}>
                        <td className="py-1.5">{l.lane}</td>
                        <td className="text-right tabular-nums">{l.loads}</td>
                        <td className="text-right tabular-nums">${l.revenue}K</td>
                        <td className="text-right">
                          <Pill color={l.margin > 15 ? 'green' : 'amber'}>{l.margin}%</Pill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value }) {
  return (
    <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
      <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}
