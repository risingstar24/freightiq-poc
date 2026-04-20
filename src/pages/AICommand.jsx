import { Fragment, useState } from 'react';
import { Brain, ChevronDown, ChevronUp, Settings2, RefreshCw, Cpu } from 'lucide-react';
import { Card, Pill, Section, Button, Table } from '../components/ui';
import { aiModels, decisionLog, modelPerfData } from '../data/ai';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export default function AICommand() {
  const [expanded, setExpanded] = useState(null);

  const cols = [
    { key: 'timestamp', label: 'Time', render: r => <span className="font-mono text-xs text-slate-400">{r.timestamp}</span> },
    { key: 'model', label: 'Model' },
    { key: 'decision', label: 'Decision' },
    { key: 'loadId', label: 'Load' },
    { key: 'confidence', label: 'Conf.', render: r => <span className={`${r.confidence >= 90 ? 'text-green-400' : r.confidence >= 80 ? 'text-accent-400' : 'text-amber-400'} font-medium tabular-nums`}>{r.confidence}%</span> },
    { key: 'outcome', label: 'Outcome', render: r => (
      <Pill color={r.outcome === 'Accepted' ? 'green' : r.outcome === 'Overridden' ? 'amber' : 'slate'}>{r.outcome}</Pill>
    )},
    { key: 'x', label: '', render: r => <button onClick={() => setExpanded(expanded === r.id ? null : r.id)} className="text-accent-400 text-xs hover:underline">
      {expanded === r.id ? 'Hide' : 'Why?'}
    </button> },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Command Center</h1>
        <p className="text-sm text-slate-500 mt-1">Model status · decision audit · performance</p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {aiModels.map(m => (
          <Card key={m.id}>
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-accent-500/15 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-accent-500" />
              </div>
              <Pill color="green"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> {m.status}</Pill>
            </div>
            <div className="mt-3 font-semibold text-sm">{m.name}</div>
            <div className="mt-2 text-[11px] space-y-1">
              <div className="flex justify-between"><span className="text-slate-500">Accuracy</span><span className="font-medium text-accent-400">{m.accuracy}%</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Decisions</span><span className="tabular-nums">{m.decisions.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Threshold</span><span>{m.threshold}</span></div>
            </div>
            <div className="mt-3 flex gap-1">
              <button className="flex-1 text-[10px] py-1 rounded-md bg-navy-800 hover:bg-navy-700 inline-flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3" /> Retrain</button>
              <button className="flex-1 text-[10px] py-1 rounded-md bg-navy-800 hover:bg-navy-700 inline-flex items-center justify-center gap-1"><Settings2 className="w-3 h-3" /> Tune</button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <Section title="Model accuracy over time" subtitle="Weekly · all active models">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={modelPerfData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[80, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="carrier" stroke="#f97316" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="eta" stroke="#a855f7" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pod" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </Card>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Decision audit trail</div>
              <div className="text-xs text-slate-500">{decisionLog.length} decisions · all models</div>
            </div>
            <Pill color="accent"><Brain className="w-3 h-3" /> Explainable AI active</Pill>
          </div>
        </div>
        <div>
          {/* Custom rendering so we can expand rows */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-navy-850">
                <tr>
                  {cols.map(c => <th key={c.label} className="text-left px-4 py-2.5 text-[11px] uppercase tracking-wider text-slate-400">{c.label}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800">
                {decisionLog.slice(0, 18).map(r => (
                  <Fragment key={r.id}>
                    <tr className="hover:bg-navy-850/60">
                      {cols.map(c => (
                        <td key={c.label} className="px-4 py-2.5 whitespace-nowrap">
                          {c.render ? c.render(r) : r[c.key]}
                        </td>
                      ))}
                    </tr>
                    {expanded === r.id && (
                      <tr>
                        <td colSpan={cols.length} className="bg-navy-900/70 px-4 py-3">
                          <div className="text-xs text-slate-400 mb-1">Reasoning</div>
                          <div className="text-sm text-slate-200">{r.reasoning}</div>
                          {r.userOverride && (
                            <div className="mt-2 text-xs text-amber-300">Override: {r.userOverride}</div>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
