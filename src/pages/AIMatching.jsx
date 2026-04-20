import { useState } from 'react';
import { Brain, ChevronDown, ChevronUp, Check, X, Truck } from 'lucide-react';
import { Card, Pill, Section, Button, ScoreBar } from '../components/ui';
import { carriers } from '../data/carriers';

export default function AIMatching() {
  const [expanded, setExpanded] = useState(0);
  const [load] = useState({
    id: 'FQ-2026-NEW', origin: 'Chicago, IL', destination: 'Los Angeles, CA',
    pickupDate: '2026-04-18', equipment: '53ft Dry Van', weight: 38400, miles: 2015,
  });

  const recommendations = carriers.slice(0, 6).map((c, i) => ({
    ...c,
    matchScore: 95 - (i * 3) + (i % 2),
    rateQuote: 2780 + i * 65,
    etaConfidence: 88 + (i % 10),
    capacity: ['High', 'Medium', 'High', 'Low', 'Medium', 'High'][i],
    equipmentMatch: true,
    laneRuns: 14 - i,
    reasons: [
      `Completed ${14 - i} similar loads on this lane in past 6 months`,
      `On-time ${c.onTime}% — above target threshold of 92%`,
      `${c.equipment} matches load requirement`,
      `Insurance ${c.insuranceStatus.toLowerCase()} — compliant`,
      `Current capacity: ${['High', 'Medium', 'High', 'Low', 'Medium', 'High'][i]} — driver available at origin DC`,
      `Rate ${i === 0 ? '2.1% below' : i < 3 ? 'within' : '3.1% above'} market average for this lane`,
    ],
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Carrier Matching</h1>
        <p className="text-sm text-slate-500 mt-1">Creating load · AI analyzes 32 carriers to rank the best fit</p>
      </div>

      <Card>
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Load</div>
            <div className="font-medium">{load.id}</div>
          </div>
          <div className="h-8 w-px bg-navy-800" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Lane</div>
            <div className="font-medium">{load.origin} → {load.destination}</div>
          </div>
          <div className="h-8 w-px bg-navy-800" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Pickup</div>
            <div className="font-medium">{load.pickupDate}</div>
          </div>
          <div className="h-8 w-px bg-navy-800" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Equipment</div>
            <div className="font-medium">{load.equipment}</div>
          </div>
          <div className="h-8 w-px bg-navy-800" />
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Weight · Miles</div>
            <div className="font-medium">{load.weight.toLocaleString()} lbs · {load.miles.toLocaleString()} mi</div>
          </div>
          <div className="ml-auto flex items-center gap-2 text-accent-400 text-sm">
            <Brain className="w-4 h-4" />
            Model: Carrier Matching v4.2 · 94.2% historical accuracy
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {recommendations.map((r, i) => (
          <Card key={r.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white font-bold">
                  {r.matchScore}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{r.name}</div>
                    {i === 0 && <Pill color="accent">Top pick</Pill>}
                    <Pill color="slate">{r.mc}</Pill>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{r.equipment} · {r.laneRuns} prior runs on this lane · {r.onTime}% on-time</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider">Rate quote</div>
                  <div className="text-lg font-semibold tabular-nums">${r.rateQuote.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider">ETA conf.</div>
                  <div className="text-lg font-semibold tabular-nums">{r.etaConfidence}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider">Capacity</div>
                  <Pill color={r.capacity === 'High' ? 'green' : r.capacity === 'Medium' ? 'amber' : 'red'}>{r.capacity}</Pill>
                </div>
                <div className="flex items-center gap-2 pl-4 border-l border-navy-800">
                  <Button variant="ghost"><X className="w-4 h-4" /></Button>
                  <Button><Check className="w-4 h-4" /> Accept</Button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setExpanded(expanded === i ? -1 : i)}
              className="mt-3 flex items-center gap-1 text-xs text-accent-400 hover:underline"
            >
              Why this carrier?
              {expanded === i ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {expanded === i && (
              <div className="mt-3 rounded-lg border border-navy-800 bg-navy-850/40 p-4">
                <div className="text-xs text-slate-400 mb-2">AI reasoning (6 weighted signals)</div>
                <ul className="space-y-1.5">
                  {r.reasons.map((reason, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
