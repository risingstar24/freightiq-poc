import { useEffect, useState } from 'react';
import { Bot, Play, Pause, Check, AlertTriangle, Loader2, X, RefreshCw } from 'lucide-react';
import { Card, Pill, Section, Button, Table, ProgressBar, Tabs, PortalMock } from '../components/ui';
import { botLibrary, activeRuns as initialRuns, runHistory, botPerfData } from '../data/bots';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const statusPill = (s) => ({
  'Running': 'green', 'Active': 'green', 'Idle': 'slate', 'Scheduled': 'blue', 'On-demand': 'slate', 'Error': 'red',
}[s] ?? 'slate');

export default function BotManager() {
  const [runs, setRuns] = useState(initialRuns);
  const [tab, setTab] = useState('Active Runs');

  // Simulated live progress
  useEffect(() => {
    const i = setInterval(() => {
      setRuns(prev => prev.map(r => {
        const nextStep = r.currentStep + 1;
        if (nextStep > r.steps.length) return r;
        const newSteps = r.steps.map((s, i) => {
          if (i === r.currentStep) return { ...s, done: true, running: false };
          if (i === nextStep - 1 && i < r.steps.length) return { ...s, running: true, t: timeNow() };
          return s;
        });
        const newProgress = Math.min(100, Math.round((nextStep / r.steps.length) * 100));
        return { ...r, steps: newSteps, currentStep: Math.min(nextStep, r.steps.length - 1), progress: newProgress };
      }));
    }, 3000);
    return () => clearInterval(i);
  }, []);

  const historyCols = [
    { key: 'id', label: 'Run ID' },
    { key: 'bot', label: 'Bot' },
    { key: 'portal', label: 'Portal' },
    { key: 'loadId', label: 'Load' },
    { key: 'startTime', label: 'Started' },
    { key: 'duration', label: 'Duration' },
    { key: 'docs', label: 'Docs' },
    { key: 'status', label: 'Status', render: r => (
      <Pill color={r.status === 'Success' ? 'green' : r.status === 'Failed' ? 'red' : 'amber'}>
        {r.status === 'Success' ? <Check className="w-3 h-3" /> : r.status === 'Failed' ? <X className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
        {r.status}
      </Pill>
    )},
    { key: 'errorMsg', label: 'Details', render: r => r.errorMsg ? <span className="text-xs text-red-300">{r.errorMsg}</span> : <span className="text-xs text-slate-500">—</span> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">RPA Bot Manager</h1>
          <p className="text-sm text-slate-500 mt-1">{botLibrary.filter(b => b.status === 'Running' || b.status === 'Active').length} bots active · {runs.length} live runs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary"><RefreshCw className="w-4 h-4" /> Refresh</Button>
          <Button><Play className="w-4 h-4" /> Trigger Run</Button>
        </div>
      </div>

      <Tabs tabs={['Active Runs', 'Bot Library', 'Run History', 'Performance']} active={tab} onChange={setTab} />

      {tab === 'Active Runs' && (
        <div className="grid lg:grid-cols-3 gap-4">
          {runs.map(run => (
            <Card key={run.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent-500/15 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{run.botName}</div>
                    <div className="text-[11px] text-slate-500">{run.portal} · {run.loadId}</div>
                  </div>
                </div>
                <Pill color="green"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Running</Pill>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-400 tabular-nums">{run.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-navy-800 overflow-hidden">
                  <div className="h-full progress-stripes bg-accent-500" style={{ width: `${run.progress}%` }} />
                </div>
              </div>

              <PortalMock portal={run.portal} status="Live session">
                <div className="text-center">
                  <Loader2 className="w-5 h-5 animate-spin text-accent-500 mx-auto" />
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">Bot working</div>
                </div>
              </PortalMock>

              <div className="mt-3 rounded-lg border border-navy-800 bg-black/50 p-3 max-h-64 overflow-y-auto scrollbar-thin">
                <div className="bot-log space-y-1">
                  {run.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-slate-600">{s.t}</span>
                      {s.done && <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />}
                      {s.running && <Loader2 className="w-3.5 h-3.5 text-accent-500 animate-spin shrink-0 mt-0.5" />}
                      {!s.done && !s.running && <span className="w-3.5 h-3.5 shrink-0 mt-0.5 flex items-center justify-center text-slate-600">○</span>}
                      <span className={s.done ? 'text-slate-300' : s.running ? 'text-accent-300' : 'text-slate-600'}>{s.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'Bot Library' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {botLibrary.map(b => (
            <Card key={b.id}>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-accent-500/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-500" />
                </div>
                <Pill color={statusPill(b.status)}>
                  {(b.status === 'Running' || b.status === 'Active') && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                  {b.status}
                </Pill>
              </div>
              <div className="mt-3">
                <div className="font-semibold text-sm">{b.name}</div>
                <div className="text-[11px] text-slate-500">{b.portal}</div>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between"><span className="text-slate-500">Success rate</span><span className="font-medium text-green-400">{b.successRate}%</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Avg duration</span><span>{b.avgDuration}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Docs processed</span><span className="tabular-nums">{b.docsProcessed.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Last run</span><span>{b.lastRun}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Schedule</span><span>{b.schedule}</span></div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" className="flex-1"><Pause className="w-3 h-3" /> Pause</Button>
                <Button className="flex-1"><Play className="w-3 h-3" /> Run now</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'Run History' && (
        <Card padded={false}>
          <Table columns={historyCols} rows={runHistory} />
        </Card>
      )}

      {tab === 'Performance' && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <Section title="Success rate over time" subtitle="Last 14 days · all bots">
              <div className="h-64">
                <ResponsiveContainer>
                  <LineChart data={botPerfData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                    <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis domain={[90, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Section>
          </Card>
          <Card>
            <Section title="Documents processed / day">
              <div className="h-64">
                <ResponsiveContainer>
                  <BarChart data={botPerfData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                    <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="docs" fill="#f97316" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Section>
          </Card>
          <Card className="lg:col-span-2">
            <Section title="Time saved through automation" subtitle="Estimated vs manual baseline">
              <div className="grid grid-cols-4 gap-4">
                {[
                  ['Docs processed today', '1,248'],
                  ['Bot hours logged', '72.4 hrs'],
                  ['Manual equivalent', '218 hrs'],
                  ['FTE equivalent saved', '5.2 FTE'],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">{l}</div>
                    <div className="text-2xl font-semibold mt-2">{v}</div>
                  </div>
                ))}
              </div>
            </Section>
          </Card>
        </div>
      )}
    </div>
  );
}

function timeNow() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
}
