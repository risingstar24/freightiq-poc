import { useState } from 'react';
import { Building, Users, KeyRound, Bell, Cpu, Bot as BotIcon, CreditCard, Save, Plus } from 'lucide-react';
import { Card, Pill, Section, Button, Tabs } from '../components/ui';

const TABS = ['Tenant', 'Users', 'Credentials', 'Notifications', 'AI Thresholds', 'Bot Schedules', 'Billing'];

export default function Settings() {
  const [tab, setTab] = useState('Tenant');

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage organization, users, automation thresholds</p>
        </div>
        <Button><Save className="w-4 h-4" /> Save changes</Button>
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 'Tenant' && (
        <Card>
          <Section title="Organization" subtitle="Signity Solutions · Freight Operations tenant">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Company name" value="Signity Solutions" />
              <Field label="Tenant ID" value="signity-freight-prod" />
              <Field label="Timezone" value="America/New_York" />
              <Field label="Default currency" value="USD" />
              <Field label="Industry" value="Freight Brokerage" />
              <Field label="Fleet size" value="Asset-light · 280 carrier partners" />
            </div>
          </Section>
        </Card>
      )}

      {tab === 'Users' && (
        <Card padded={false}>
          <div className="p-4 border-b border-navy-800 flex items-center justify-between">
            <div className="font-semibold">Users & roles</div>
            <Button><Plus className="w-4 h-4" /> Invite user</Button>
          </div>
          <div className="divide-y divide-navy-800">
            {[
              ['Alex Singh', 'alex@signity.com', 'Ops Manager', 'green'],
              ['Priya Raman', 'priya@signity.com', 'Dispatcher', 'blue'],
              ['Jordan Klein', 'jordan@signity.com', 'Billing', 'amber'],
              ['Samira Ali', 'samira@signity.com', 'Admin', 'accent'],
              ['Chen Li', 'chen@signity.com', 'Dispatcher', 'blue'],
            ].map(([n, e, r, c]) => (
              <div key={e} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-accent-700 flex items-center justify-center text-white text-xs font-semibold">
                    {n.split(' ').map(x => x[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{n}</div>
                    <div className="text-xs text-slate-500">{e}</div>
                  </div>
                </div>
                <Pill color={c}>{r}</Pill>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'Credentials' && (
        <Card>
          <Section title="Portal credentials" subtitle="Stored in encrypted vault · rotated quarterly">
            <div className="space-y-2">
              {['Walmart Retail Link', 'Amazon Vendor Central', 'Target Partners Online', 'Home Depot Vendor', 'QuickBooks Online', 'McLeod TMS'].map(p => (
                <div key={p} className="flex items-center justify-between rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-accent-500" />
                    <div>
                      <div className="text-sm font-medium">{p}</div>
                      <div className="text-[11px] text-slate-500 font-mono">Username: bot_svc@signity · Password: ••••••••</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Pill color="green">Active</Pill>
                    <Button variant="ghost">Rotate</Button>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      )}

      {tab === 'Notifications' && (
        <Card>
          <Section title="Notification preferences">
            <div className="space-y-2">
              {[
                ['Load exceptions · critical', true],
                ['POD collection reminders', true],
                ['Carrier insurance expiring', true],
                ['Payment received', true],
                ['Bot run failures', true],
                ['AI model threshold drift', false],
                ['Weekly operations summary', true],
              ].map(([label, on]) => (
                <div key={label} className="flex items-center justify-between rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="text-sm">{label}</div>
                  <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${on ? 'bg-accent-500' : 'bg-navy-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : ''}`} />
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </Card>
      )}

      {tab === 'AI Thresholds' && (
        <Card>
          <Section title="Model confidence thresholds" subtitle="Automated actions below threshold route to human review">
            <div className="space-y-3">
              {[
                ['Carrier matching', 0.78], ['Rate prediction', 0.72], ['ETA prediction', 0.70],
                ['Document classification', 0.85], ['POD validation', 0.80], ['Fraud detection', 0.88],
              ].map(([n, v]) => (
                <div key={n} className="rounded-lg border border-navy-800 bg-navy-850/40 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>{n}</span><span className="tabular-nums font-medium">{v.toFixed(2)}</span>
                  </div>
                  <input type="range" min="0.5" max="0.99" step="0.01" defaultValue={v} className="w-full mt-2 accent-orange-500" />
                </div>
              ))}
            </div>
          </Section>
        </Card>
      )}

      {tab === 'Bot Schedules' && (
        <Card padded={false}>
          <div className="p-4 border-b border-navy-800"><div className="font-semibold">RPA bot schedules</div></div>
          <div className="divide-y divide-navy-800">
            {[
              ['Walmart POD Upload', 'Continuous (30s cycle)', 'green'],
              ['Amazon Portal', 'Continuous (60s cycle)', 'green'],
              ['Target Invoice', 'Continuous', 'green'],
              ['Home Depot Portal', 'On-demand', 'slate'],
              ['QuickBooks Invoice', 'Hourly at :00', 'blue'],
              ['Insurance Monitor', 'Daily 06:00 UTC', 'blue'],
              ['FMCSA Verification', 'On-demand', 'slate'],
            ].map(([n, s, c]) => (
              <div key={n} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BotIcon className="w-4 h-4 text-accent-500" />
                  <div className="text-sm font-medium">{n}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{s}</span>
                  <Pill color={c}>{c === 'slate' ? 'On-demand' : 'Scheduled'}</Pill>
                  <Button variant="ghost">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'Billing' && (
        <Card>
          <Section title="Subscription" subtitle="FreightIQ Enterprise">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-4">
                <div className="flex items-center gap-2 text-xs text-slate-500"><CreditCard className="w-3.5 h-3.5" /> Current plan</div>
                <div className="text-2xl font-semibold mt-2">Enterprise</div>
                <div className="text-xs text-slate-500 mt-1">Unlimited loads · all bots · priority support</div>
              </div>
              <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-4">
                <div className="text-xs text-slate-500">Monthly fee</div>
                <div className="text-2xl font-semibold mt-2">$8,400</div>
                <div className="text-xs text-slate-500 mt-1">Billed monthly · Renewed 2026-04-01</div>
              </div>
              <div className="rounded-lg border border-navy-800 bg-navy-850/40 p-4">
                <div className="text-xs text-slate-500">Next invoice</div>
                <div className="text-2xl font-semibold mt-2">2026-05-01</div>
                <div className="text-xs text-slate-500 mt-1">Auto-charge enabled</div>
              </div>
            </div>
          </Section>
        </Card>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-wider text-slate-500">{label}</label>
      <input defaultValue={value} className="mt-1 w-full px-3 py-2 bg-navy-850 border border-navy-700 rounded-lg text-sm outline-none" />
    </div>
  );
}
