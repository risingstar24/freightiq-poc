import { Card, Section, Pill } from '../components/ui';
import { revenueMargin, laneProfitability, paymentCycle, exceptionTypes, heatmap } from '../data/analytics';
import { carriers } from '../data/carriers';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#a855f7', '#ef4444'];

export default function Analytics() {
  const maxHeat = Math.max(...heatmap.flat());
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Operational & financial performance · last 6 months</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <Section title="Revenue & margin trend" subtitle="Monthly · last 6 months">
            <div className="h-64">
              <ResponsiveContainer>
                <LineChart data={revenueMargin}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis yAxisId="l" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis yAxisId="r" orientation="right" domain={[10, 20]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="l" type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Revenue ($K)" />
                  <Line yAxisId="r" type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Margin (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Exception breakdown">
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={exceptionTypes} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                    {exceptionTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1">
              {exceptionTypes.map((e, i) => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded" style={{ background: COLORS[i % COLORS.length] }} />
                    {e.name}
                  </div>
                  <span>{e.value}</span>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <Section title="Lane profitability" subtitle="Top 10 lanes · MTD">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-slate-500 border-b border-navy-800">
                    <th className="text-left py-2">Lane</th>
                    <th className="text-right py-2">Loads</th>
                    <th className="text-right py-2">Revenue</th>
                    <th className="text-right py-2">Cost</th>
                    <th className="text-right py-2">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {laneProfitability.map(l => (
                    <tr key={l.lane}>
                      <td className="py-2">{l.lane}</td>
                      <td className="text-right tabular-nums">{l.loads}</td>
                      <td className="text-right tabular-nums">${l.revenue}K</td>
                      <td className="text-right tabular-nums text-slate-500">${l.cost}K</td>
                      <td className="text-right tabular-nums">
                        <Pill color={l.margin > 15 ? 'green' : l.margin > 10 ? 'amber' : 'red'}>{l.margin}%</Pill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Top 10 carriers" subtitle="On-time % · completed loads">
            <div className="space-y-2">
              {carriers.slice(0, 10).map(c => (
                <div key={c.id} className="flex items-center gap-3 text-sm">
                  <div className="w-48 truncate">{c.name}</div>
                  <div className="flex-1 h-2 rounded-full bg-slate-700/30 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent-500 to-accent-400" style={{ width: `${c.onTime}%` }} />
                  </div>
                  <div className="text-xs tabular-nums w-14 text-right">{c.onTime}%</div>
                  <div className="text-xs tabular-nums text-slate-500 w-12 text-right">{c.loadsCompleted}</div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <Section title="Load volume heatmap" subtitle="Day × Hour">
            <div className="overflow-x-auto">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[10px] text-slate-500 pl-8">
                  {Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-6 text-center">{i * 2}h</div>)}
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                  <div key={d} className="flex items-center gap-1">
                    <div className="text-[10px] text-slate-500 w-7">{d}</div>
                    {heatmap[i].map((v, j) => (
                      <div key={j} className="w-6 h-6 rounded-sm" title={`${d} ${j * 2}h — ${v}`}
                        style={{ background: `rgba(249,115,22,${0.08 + (v / maxHeat) * 0.85})` }} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Payment cycle distribution">
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
          </Section>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <Section title="AI model performance" subtitle="Decisions made · accuracy">
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Carrier matching', '94.2%', '3,842'],
                ['Rate prediction', '91.8%', '5,211'],
                ['POD validation', '93.7%', '4,120'],
              ].map(([n, a, d]) => (
                <div key={n} className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="text-[11px] text-slate-500">{n}</div>
                  <div className="text-xl font-semibold mt-1">{a}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{d} decisions</div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
        <Card>
          <Section title="RPA productivity" subtitle="Automation output">
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Docs processed today', '1,248'],
                ['Hours saved (estimated)', '218'],
                ['Accuracy avg', '97.4%'],
              ].map(([n, v]) => (
                <div key={n} className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="text-[11px] text-slate-500">{n}</div>
                  <div className="text-xl font-semibold mt-1">{v}</div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      </div>
    </div>
  );
}
