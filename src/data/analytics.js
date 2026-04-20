export const revenueMargin = [
  { month: 'Nov', revenue: 920, margin: 14.2 },
  { month: 'Dec', revenue: 980, margin: 14.8 },
  { month: 'Jan', revenue: 1040, margin: 15.1 },
  { month: 'Feb', revenue: 1080, margin: 15.9 },
  { month: 'Mar', revenue: 1160, margin: 16.4 },
  { month: 'Apr', revenue: 1210, margin: 17.1 },
];

export const loadsOverTime = Array.from({ length: 14 }).map((_, i) => ({
  day: `Apr ${4 + i}`,
  loads: 18 + (i * 3) % 12,
  delivered: 14 + (i * 2) % 10,
}));

export const revenueByLane = [
  { lane: 'CHI→LA', revenue: 284 },
  { lane: 'DAL→MIA', revenue: 241 },
  { lane: 'ATL→NYC', revenue: 198 },
  { lane: 'HOU→DEN', revenue: 164 },
  { lane: 'SEA→PHX', revenue: 148 },
  { lane: 'DET→NSH', revenue: 122 },
];

export const laneProfitability = Array.from({ length: 10 }).map((_, i) => {
  const revenue = 220 + (i * 17) % 80;
  const cost = revenue - (18 + (i * 3) % 14);
  return {
    lane: ['Chicago→LA', 'Dallas→Miami', 'Atlanta→NYC', 'Houston→Denver', 'Seattle→Phoenix', 'Detroit→Nashville', 'Portland→SLC', 'Boston→Charlotte', 'Minneapolis→KC', 'Memphis→Indianapolis'][i],
    loads: 30 + (i * 4) % 25,
    revenue,
    cost,
    margin: +((revenue - cost) / revenue * 100).toFixed(1),
  };
});

export const heatmap = Array.from({ length: 7 }).map((_, d) => Array.from({ length: 12 }).map((_, h) => (d * 3 + h * 5 + 17) % 40));

export const paymentCycle = [
  { range: '0-7d', count: 82 },
  { range: '8-14d', count: 118 },
  { range: '15-21d', count: 64 },
  { range: '22-30d', count: 31 },
  { range: '31-45d', count: 14 },
  { range: '46+d', count: 6 },
];

export const exceptionTypes = [
  { name: 'Delay', value: 42 },
  { name: 'Damage', value: 8 },
  { name: 'Missing POD', value: 19 },
  { name: 'Billing', value: 11 },
  { name: 'Temperature', value: 5 },
];

export const kpis = {
  activeLoads: 47,
  loadsMonth: 312,
  revenueMTD: 1.21,
  onTime: 94.2,
  podRate: 97.8,
  avgPayment: 8.3,
};

export const aiInsights = [
  { icon: 'trend', title: 'Rate optimization opportunity', body: 'Chicago→LA lane running 4.2% under market rate. AI suggests +$120 quote bump for contract renewal.' },
  { icon: 'alert', title: 'Capacity risk — Atlanta lane', body: '3 preferred carriers at >90% capacity next week. Pre-book now or secure backup.' },
  { icon: 'shield', title: 'POD collection trending up', body: 'Walmart POD collection improved to 97.8% (+3.1% MoM) after RPA bot deployment.' },
];
