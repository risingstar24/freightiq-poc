export const aiModels = [
  { id: 'm-match', name: 'Carrier Matching', status: 'Active', accuracy: 94.2, decisions: 3842, lastTrained: '2026-03-28', threshold: 0.78 },
  { id: 'm-rate', name: 'Rate Prediction', status: 'Active', accuracy: 91.8, decisions: 5211, lastTrained: '2026-04-02', threshold: 0.72 },
  { id: 'm-eta', name: 'ETA Prediction', status: 'Active', accuracy: 88.5, decisions: 7443, lastTrained: '2026-03-30', threshold: 0.7 },
  { id: 'm-doc', name: 'Document Classification', status: 'Active', accuracy: 96.1, decisions: 12880, lastTrained: '2026-04-05', threshold: 0.85 },
  { id: 'm-pod', name: 'POD Validation', status: 'Active', accuracy: 93.7, decisions: 4120, lastTrained: '2026-04-01', threshold: 0.8 },
  { id: 'm-fraud', name: 'Fraud Detection', status: 'Active', accuracy: 97.2, decisions: 2211, lastTrained: '2026-04-08', threshold: 0.88 },
];

const decisionTypes = [
  { model: 'Carrier Matching', decision: 'Recommended Swift Logistics' },
  { model: 'Rate Prediction', decision: 'Quoted $2,845 (market +3.1%)' },
  { model: 'ETA Prediction', decision: 'Delay risk: 18% — notify shipper' },
  { model: 'Document Classification', decision: 'Classified as Bill of Lading' },
  { model: 'POD Validation', decision: 'POD validated, forward to portal upload' },
  { model: 'Fraud Detection', decision: 'Flagged carrier double-brokering risk' },
  { model: 'Carrier Matching', decision: 'Excluded 3 carriers — insurance expired' },
  { model: 'ETA Prediction', decision: 'On-time confidence 92%' },
  { model: 'POD Validation', decision: 'Low signature confidence — human review' },
];

export const decisionLog = Array.from({ length: 54 }).map((_, i) => {
  const d = decisionTypes[i % decisionTypes.length];
  return {
    id: `D-${String(80000 + i).padStart(6, '0')}`,
    timestamp: `2026-04-17 ${String(7 + (i % 12)).padStart(2, '0')}:${String((i * 11) % 60).padStart(2, '0')}:${String((i * 17) % 60).padStart(2, '0')}`,
    model: d.model,
    decision: d.decision,
    confidence: 72 + (i * 3) % 27,
    loadId: `FQ-2026-${String(1200 + i % 58).padStart(4, '0')}`,
    outcome: i % 13 === 0 ? 'Overridden' : i % 19 === 0 ? 'Pending' : 'Accepted',
    userOverride: i % 13 === 0 ? 'Ops manager selected alternate carrier' : null,
    reasoning: 'Model considered historical on-time %, lane familiarity, current capacity, rate history, equipment match, and insurance compliance. Top 3 signals weighted 62% of final score.',
  };
});

export const modelPerfData = Array.from({ length: 12 }).map((_, i) => ({
  week: `W${i + 1}`,
  carrier: 88 + (i * 2) % 10,
  rate: 85 + (i * 3) % 10,
  eta: 82 + (i * 4) % 10,
  pod: 88 + (i * 2) % 8,
}));
