export const rateTrends = Array.from({ length: 12 }).map((_, i) => ({
  week: `W${i + 1}`,
  chiLa: 2400 + (i * 37) % 400,
  dalMia: 2100 + (i * 29) % 320,
  atlNyc: 2600 + (i * 41) % 380,
}));

export const rateComparison = [
  { lane: 'Chicago→LA', yours: 2845, market: 2780, low: 2550, high: 3100, equipment: 'Dry Van' },
  { lane: 'Dallas→Miami', yours: 2240, market: 2310, low: 2100, high: 2580, equipment: 'Reefer' },
  { lane: 'Atlanta→NYC', yours: 2710, market: 2680, low: 2480, high: 2950, equipment: 'Dry Van' },
  { lane: 'Houston→Denver', yours: 1980, market: 2050, low: 1820, high: 2340, equipment: 'Flatbed' },
  { lane: 'Seattle→Phoenix', yours: 2410, market: 2390, low: 2180, high: 2680, equipment: 'Dry Van' },
  { lane: 'Detroit→Nashville', yours: 1420, market: 1480, low: 1320, high: 1640, equipment: 'Dry Van' },
  { lane: 'Portland→SLC', yours: 1340, market: 1360, low: 1200, high: 1520, equipment: 'Dry Van' },
  { lane: 'Boston→Charlotte', yours: 1890, market: 1920, low: 1750, high: 2100, equipment: 'Reefer' },
];

export const seasonalFactor = Array.from({ length: 12 }).map((_, i) => ({
  month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  factor: [0.94, 0.92, 0.98, 1.02, 1.05, 1.08, 1.06, 1.04, 1.03, 1.07, 1.12, 1.15][i],
}));
