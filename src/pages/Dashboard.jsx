import { Link } from 'react-router-dom';
import { Truck, Package, DollarSign, Clock, ClipboardCheck, Wallet, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, Bot, Brain, ArrowRight } from 'lucide-react';
import { Card, Kpi, Pill, Section, ProgressBar } from '../components/ui';
import { kpis, loadsOverTime, revenueByLane, aiInsights } from '../data/analytics';
import { loads, statusColors } from '../data/loads';
import { exceptions } from '../data/exceptions';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

const chartStyle = { background: 'transparent', border: 'none', borderRadius: 8, color: '#e2e8f0', fontSize: 12 };

export default function Dashboard() {
  const recentLoads = loads.slice(0, 6);
  const openExceptions = exceptions.filter(e => e.status !== 'Resolved').slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Operations Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">April 17, 2026 · Signity Freight Operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Pill color="green"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> 12 bots active</Pill>
          <Pill color="accent"><Brain className="w-3 h-3" /> 6 AI models running</Pill>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Kpi label="Active Loads" value={kpis.activeLoads} sub="+4 vs yesterday" tone="accent" icon={Truck} />
        <Kpi label="Loads This Month" value={kpis.loadsMonth} sub="Run rate: 324" tone="blue" icon={Package} />
        <Kpi label="Revenue MTD" value={`$${kpis.revenueMTD}M`} sub="+8.1% MoM" tone="green" icon={DollarSign} />
        <Kpi label="On-Time Delivery" value={`${kpis.onTime}%`} sub="Target: 93%" tone="indigo" icon={Clock} />
        <Kpi label="POD Collection" value={`${kpis.podRate}%`} sub="+3.1% MoM" tone="amber" icon={ClipboardCheck} />
        <Kpi label="Avg Payment Cycle" value={`${kpis.avgPayment}d`} sub="Best in segment" tone="slate" icon={Wallet} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <Section title="Loads over time" subtitle="Last 14 days · total vs delivered">
            <div className="h-56">
              <ResponsiveContainer>
                <AreaChart data={loadsOverTime}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={chartStyle} />
                  <Area type="monotone" dataKey="loads" stroke="#f97316" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="delivered" stroke="#3b82f6" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Revenue by lane" subtitle="MTD · top 6">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={revenueByLane}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="lane" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={chartStyle} />
                  <Bar dataKey="revenue" fill="#f97316" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <Section title="Carrier performance" subtitle="On-time % by carrier (top 8)">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={[
                  { c: 'Swift', pct: 96 }, { c: 'Knight', pct: 94 }, { c: 'Schneider', pct: 92 },
                  { c: 'J.B. Hunt', pct: 91 }, { c: 'Werner', pct: 88 }, { c: 'Prime', pct: 87 },
                  { c: 'Landstar', pct: 90 }, { c: 'XPO', pct: 85 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                  <XAxis dataKey="c" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={chartStyle} />
                  <Bar dataKey="pct" fill="#3b82f6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="AI insights" subtitle="Recommended actions" right={<Sparkles className="w-4 h-4 text-accent-500" />}>
            <div className="space-y-3">
              {aiInsights.map((ins, i) => (
                <div key={i} className="rounded-lg border border-accent-500/20 bg-accent-500/5 p-3">
                  <div className="flex items-start gap-2">
                    {ins.icon === 'trend' && <TrendingUp className="w-4 h-4 text-accent-400 mt-0.5" />}
                    {ins.icon === 'alert' && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />}
                    {ins.icon === 'shield' && <ShieldCheck className="w-4 h-4 text-green-400 mt-0.5" />}
                    <div>
                      <div className="text-sm font-medium">{ins.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{ins.body}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <Section title="Recent loads" right={<Link to="/loads" className="text-xs text-accent-400 hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>}>
            <div className="divide-y divide-navy-800">
              {recentLoads.map(l => (
                <Link to={`/loads/${l.id}`} key={l.id} className="flex items-center justify-between py-2.5 hover:bg-navy-850/30 px-2 rounded">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-slate-500" />
                    <div>
                      <div className="text-sm font-medium">{l.id}</div>
                      <div className="text-xs text-slate-500">{l.origin} → {l.destination}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] border rounded-md px-2 py-0.5 ${statusColors[l.status]}`}>{l.status}</span>
                    <div className="text-sm font-medium tabular-nums">${l.rate.toLocaleString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        </Card>

        <Card>
          <Section title="Active exceptions" right={<Link to="/exceptions" className="text-xs text-accent-400 hover:underline">All</Link>}>
            <div className="space-y-2">
              {openExceptions.map(e => (
                <div key={e.id} className="rounded-lg border border-red-500/15 bg-red-500/5 p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-medium">{e.type}</div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${e.severity === 'Critical' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>{e.severity}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Load {e.loadId}</div>
                  <ProgressBar value={e.status === 'Resolved' ? 100 : e.status === 'In Progress' ? 60 : 20} color={e.severity === 'Critical' ? 'red' : 'amber'} />
                </div>
              ))}
            </div>
          </Section>
        </Card>
      </div>

      <Card>
        <Section title="Automation status" subtitle="Live bot & AI activity snapshot" right={<Link to="/bots" className="text-xs text-accent-400 hover:underline flex items-center gap-1">Bot manager <ArrowRight className="w-3 h-3" /></Link>}>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              { name: 'Walmart POD Bot', status: 'Running', color: 'green', icon: Bot, meta: 'Processing load FQ-2026-0312' },
              { name: 'Amazon Portal Bot', status: 'Running', color: 'green', icon: Bot, meta: 'Uploading BOL bundle' },
              { name: 'QuickBooks Bot', status: 'Running', color: 'green', icon: Bot, meta: 'Emailing INV-07244' },
              { name: 'Insurance Monitor', status: 'Scheduled', color: 'slate', icon: Bot, meta: 'Next run: 06:00 tomorrow' },
            ].map((b, i) => (
              <div key={i} className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <b.icon className="w-4 h-4 text-accent-500" />
                    <span className="text-sm font-medium">{b.name}</span>
                  </div>
                  <Pill color={b.color}><span className={`w-1.5 h-1.5 rounded-full ${b.color === 'green' ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`} /> {b.status}</Pill>
                </div>
                <div className="text-xs text-slate-500 mt-2">{b.meta}</div>
              </div>
            ))}
          </div>
        </Section>
      </Card>
    </div>
  );
}
