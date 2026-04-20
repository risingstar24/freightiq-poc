import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Truck, MapPin, Users, Brain, FileText, ClipboardCheck,
  Bot, Cpu, Receipt, DollarSign, BarChart3, FileBarChart, MessageSquare,
  ShieldCheck, AlertTriangle, Plug, Building2, Settings, Search, Bell,
  Moon, Sun, ChevronRight, Sparkles, Globe
} from 'lucide-react';

const NAV = [
  {
    section: 'OPERATIONS',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { to: '/loads', label: 'Load Board', icon: Truck },
      { to: '/dispatch', label: 'Dispatch & Tracking', icon: MapPin },
    ],
  },
  {
    section: 'CARRIERS',
    items: [
      { to: '/carriers', label: 'Carrier Directory', icon: Users },
      { to: '/ai-matching', label: 'AI Matching', icon: Brain },
    ],
  },
  {
    section: 'DOCUMENTS',
    items: [
      { to: '/documents', label: 'Document Center', icon: FileText },
      { to: '/pod', label: 'POD Manager', icon: ClipboardCheck },
    ],
  },
  {
    section: 'AUTOMATION',
    items: [
      { to: '/bots', label: 'RPA Bot Manager', icon: Bot },
      { to: '/ai', label: 'AI Command Center', icon: Cpu },
    ],
  },
  {
    section: 'FINANCE',
    items: [
      { to: '/invoices', label: 'Invoice Center', icon: Receipt },
      { to: '/rates', label: 'Rate Intelligence', icon: DollarSign },
    ],
  },
  {
    section: 'ANALYTICS',
    items: [
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/reports', label: 'Reports', icon: FileBarChart },
    ],
  },
  {
    section: 'SYSTEM',
    items: [
      { to: '/messages', label: 'Communication Hub', icon: MessageSquare },
      { to: '/compliance', label: 'Compliance', icon: ShieldCheck },
      { to: '/exceptions', label: 'Exception Manager', icon: AlertTriangle },
      { to: '/integrations', label: 'Integration Hub', icon: Plug },
      { to: '/shippers', label: 'Shippers', icon: Building2 },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function AppLayout() {
  const [dark, setDark] = useState(() => localStorage.getItem('fiq-theme') !== 'light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('fiq-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className={`min-h-screen ${dark ? 'bg-navy-950 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 shrink-0 h-screen sticky top-0 flex flex-col border-r ${dark ? 'bg-navy-900 border-navy-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-2 px-5 h-16 border-b border-inherit">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold tracking-tight text-[15px] leading-none">FreightIQ</div>
              <div className={`text-[10px] tracking-wider ${dark ? 'text-slate-500' : 'text-slate-500'}`}>BY SIGNITY SOLUTIONS</div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
            {NAV.map((group) => (
              <div key={group.section} className="mb-2">
                <div className={`px-5 py-2 text-[10px] font-semibold tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                  {group.section}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-5 py-2 text-[13px] border-l-2 transition-colors ${
                          isActive
                            ? dark
                              ? 'border-accent-500 bg-navy-800 text-white'
                              : 'border-accent-500 bg-accent-50 text-accent-700'
                            : dark
                              ? 'border-transparent hover:bg-navy-850 text-slate-300'
                              : 'border-transparent hover:bg-slate-50 text-slate-700'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className={`p-3 border-t ${dark ? 'border-navy-800' : 'border-slate-200'}`}>
            <div className={`rounded-lg p-3 ${dark ? 'bg-navy-850' : 'bg-slate-100'}`}>
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                <span className="font-medium">12 bots • 6 AI models</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">All systems nominal</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          <header className={`h-16 px-6 flex items-center justify-between border-b sticky top-0 z-10 ${dark ? 'bg-navy-900/80 border-navy-800 backdrop-blur' : 'bg-white/80 border-slate-200 backdrop-blur'}`}>
            <Breadcrumbs dark={dark} />
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${dark ? 'bg-navy-850 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                <Search className="w-4 h-4" />
                <input
                  placeholder="Search loads, carriers…"
                  className="bg-transparent outline-none w-56 placeholder:text-inherit"
                />
              </div>
              <a
                href="/website/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${dark ? 'border-accent-500/40 text-accent-400 hover:bg-accent-500/10' : 'border-accent-500/50 text-accent-600 hover:bg-accent-50'}`}
                title="Open FreightIQ Marketing Website"
              >
                <Globe className="w-3.5 h-3.5" />
                Website
              </a>
              <button
                onClick={() => setDark(!dark)}
                className={`p-2 rounded-lg ${dark ? 'hover:bg-navy-800' : 'hover:bg-slate-100'}`}
                title="Toggle theme"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button className={`relative p-2 rounded-lg ${dark ? 'hover:bg-navy-800' : 'hover:bg-slate-100'}`}>
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-inherit">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-xs font-semibold">
                  AS
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-medium">Alex Singh</div>
                  <div className="text-slate-500">Ops Manager</div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-x-hidden">
            <Outlet context={{ dark }} />
          </main>
        </div>
      </div>
    </div>
  );
}

function Breadcrumbs({ dark }) {
  const loc = useLocation();
  const parts = loc.pathname.split('/').filter(Boolean);
  const label = parts.length === 0 ? 'Dashboard' : parts.map(p => p.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(' / ');
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link to="/" className={dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}>FreightIQ</Link>
      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
      <span className="font-medium">{label}</span>
    </div>
  );
}
