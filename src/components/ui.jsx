import { useOutletContext } from 'react-router-dom';

export function useTheme() {
  const ctx = useOutletContext();
  return ctx?.dark ?? true;
}

export function Card({ className = '', children, padded = true }) {
  const dark = useTheme();
  return (
    <div className={`rounded-xl border ${dark ? 'bg-navy-900 border-navy-800' : 'bg-white border-slate-200'} ${padded ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function Section({ title, subtitle, right, children, className = '' }) {
  return (
    <div className={className}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

export function Pill({ children, color = 'slate', className = '' }) {
  const dark = useTheme();
  const map = {
    slate: dark ? 'bg-slate-500/15 text-slate-300 border-slate-500/25' : 'bg-slate-100 text-slate-700 border-slate-200',
    green: dark ? 'bg-green-500/15 text-green-300 border-green-500/25' : 'bg-green-50 text-green-700 border-green-200',
    red: dark ? 'bg-red-500/15 text-red-300 border-red-500/25' : 'bg-red-50 text-red-700 border-red-200',
    amber: dark ? 'bg-amber-500/15 text-amber-300 border-amber-500/25' : 'bg-amber-50 text-amber-700 border-amber-200',
    blue: dark ? 'bg-blue-500/15 text-blue-300 border-blue-500/25' : 'bg-blue-50 text-blue-700 border-blue-200',
    indigo: dark ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25' : 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accent: dark ? 'bg-accent-500/15 text-accent-300 border-accent-500/30' : 'bg-accent-50 text-accent-700 border-accent-200',
    teal: dark ? 'bg-teal-500/15 text-teal-300 border-teal-500/25' : 'bg-teal-50 text-teal-700 border-teal-200',
    cyan: dark ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' : 'bg-cyan-50 text-cyan-700 border-cyan-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${map[color] ?? map.slate} ${className}`}>
      {children}
    </span>
  );
}

export function Kpi({ label, value, sub, tone = 'slate', icon: Icon }) {
  const dark = useTheme();
  const toneMap = {
    slate: 'from-slate-500/20 to-slate-500/0',
    green: 'from-green-500/20 to-green-500/0',
    amber: 'from-amber-500/20 to-amber-500/0',
    accent: 'from-accent-500/20 to-accent-500/0',
    blue: 'from-blue-500/20 to-blue-500/0',
    indigo: 'from-indigo-500/20 to-indigo-500/0',
  };
  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${toneMap[tone]} pointer-events-none`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className={`text-[11px] font-medium tracking-wider uppercase ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
          {sub && <div className="mt-1 text-[11px] text-slate-500">{sub}</div>}
        </div>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${dark ? 'bg-navy-800' : 'bg-slate-100'}`}>
            <Icon className="w-4 h-4 text-accent-500" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors';
  const variants = {
    primary: 'bg-accent-500 text-white hover:bg-accent-600',
    secondary: 'bg-navy-800 text-slate-200 hover:bg-navy-700 border border-navy-700 dark:bg-navy-800 dark:border-navy-700',
    ghost: 'hover:bg-navy-800/50',
    outline: 'border border-slate-700/50 hover:bg-navy-800/50',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

export function Table({ columns, rows, onRowClick, empty = 'No data' }) {
  const dark = useTheme();
  return (
    <div className={`rounded-xl border overflow-hidden ${dark ? 'border-navy-800' : 'border-slate-200'}`}>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead className={dark ? 'bg-navy-850' : 'bg-slate-50'}>
            <tr>
              {columns.map(c => (
                <th key={c.key} className={`text-left font-medium px-4 py-2.5 text-[11px] uppercase tracking-wider ${dark ? 'text-slate-400' : 'text-slate-500'}`} style={c.style}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={dark ? 'divide-y divide-navy-800' : 'divide-y divide-slate-100'}>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">{empty}</td></tr>
            ) : rows.map((row, i) => (
              <tr
                key={row.id ?? i}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`${onRowClick ? 'cursor-pointer' : ''} ${dark ? 'hover:bg-navy-850/60' : 'hover:bg-slate-50'}`}
              >
                {columns.map(c => (
                  <td key={c.key} className="px-4 py-2.5 whitespace-nowrap">
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ProgressBar({ value, max = 100, color = 'accent' }) {
  const map = {
    accent: 'bg-accent-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  };
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-700/30 overflow-hidden">
      <div className={`h-full ${map[color] ?? map.accent} transition-all`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function ScoreBar({ value }) {
  const color = value >= 90 ? 'bg-green-500' : value >= 75 ? 'bg-accent-500' : value >= 60 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 rounded-full bg-slate-700/30 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium tabular-nums">{value}</span>
    </div>
  );
}

export function PortalMock({ portal, status = 'active', children }) {
  const dark = useTheme();
  return (
    <div className={`rounded-lg border ${dark ? 'bg-navy-850 border-navy-700' : 'bg-slate-50 border-slate-200'} p-4`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{portal}</span>
        </div>
        <span className="text-[10px] text-slate-500">{status}</span>
      </div>
      <div className={`rounded-md border-2 border-dashed ${dark ? 'border-navy-700 bg-navy-900/50' : 'border-slate-300 bg-white'} h-32 flex items-center justify-center text-xs text-slate-500`}>
        {children || 'Portal viewport — bot active'}
      </div>
    </div>
  );
}

export function EmptyState({ title, subtitle }) {
  return (
    <div className="py-16 text-center">
      <div className="text-lg font-medium">{title}</div>
      {subtitle && <div className="text-sm text-slate-500 mt-1">{subtitle}</div>}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  const dark = useTheme();
  return (
    <div className={`inline-flex rounded-lg p-0.5 ${dark ? 'bg-navy-850' : 'bg-slate-100'}`}>
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            active === t
              ? dark ? 'bg-navy-700 text-white' : 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
