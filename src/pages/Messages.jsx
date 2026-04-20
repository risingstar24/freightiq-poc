import { useMemo, useState } from 'react';
import { Mail, MessageSquare, Phone, Sparkles, Send, ChevronRight } from 'lucide-react';
import { Card, Pill, Section, Button, Tabs } from '../components/ui';
import { messages } from '../data/messages';

const classificationColor = { 'Inquiry': 'slate', 'POD': 'cyan', 'Rate': 'green', 'Exception': 'red', 'Scheduling': 'blue' };

export default function Messages() {
  const [tab, setTab] = useState('All');
  const [sel, setSel] = useState(messages[0]);

  const filtered = useMemo(() => {
    if (tab === 'All') return messages;
    if (tab === 'Automated') return messages.filter(m => m.aiSuggested);
    return messages.filter(m => m.category === tab.slice(0, -1));
  }, [tab]);

  const PlatformIcon = { Email: Mail, SMS: MessageSquare, Portal: Phone };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Communication Hub</h1>
          <p className="text-sm text-slate-500 mt-1">Unified inbox · AI classification & auto-response</p>
        </div>
        <Tabs tabs={['All', 'Carriers', 'Shippers', 'Drivers', 'Automated']} active={tab} onChange={setTab} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Card padded={false} className="col-span-5 max-h-[70vh] overflow-y-auto scrollbar-thin">
          <div className="divide-y divide-navy-800">
            {filtered.map(m => {
              const Icon = PlatformIcon[m.platform];
              return (
                <button key={m.id} onClick={() => setSel(m)}
                  className={`w-full text-left p-4 flex items-start gap-3 hover:bg-navy-850/40 ${sel?.id === m.id ? 'bg-navy-850/60 border-l-2 border-accent-500' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm truncate">{m.name}</div>
                      <div className="text-[10px] text-slate-500 shrink-0">{m.timestamp.slice(11)}</div>
                    </div>
                    <div className="text-sm text-slate-300 truncate">{m.subject}</div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">{m.body}</div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Pill color={classificationColor[m.classification]}>{m.classification}</Pill>
                      <Pill>{m.platform}</Pill>
                      {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {sel && (
          <Card className="col-span-7 min-h-[70vh]">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{sel.subject}</div>
                <div className="text-xs text-slate-500 mt-1">From: {sel.from} · {sel.timestamp}</div>
              </div>
              <div className="flex items-center gap-2">
                <Pill color={classificationColor[sel.classification]}>{sel.classification}</Pill>
                <Pill>{sel.platform}</Pill>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-navy-800 bg-navy-850/40 p-4 text-sm leading-relaxed">
              {sel.body}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent-500" />
                <div className="text-xs uppercase tracking-wider text-accent-400 font-semibold">AI Suggested Reply</div>
                <Pill color="accent">92% confidence</Pill>
              </div>
              <textarea
                defaultValue={sel.aiSuggested}
                className="w-full h-32 p-3 rounded-lg bg-navy-850 border border-navy-700 text-sm outline-none resize-none focus:border-accent-500"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Template:</span>
                  <select className="bg-navy-850 border border-navy-700 rounded px-2 py-1 text-xs outline-none">
                    <option>POD acknowledgement</option>
                    <option>Rate confirmation</option>
                    <option>Delay notification</option>
                    <option>Appointment confirm</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary">Edit & send</Button>
                  <Button><Send className="w-4 h-4" /> Send as-is</Button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-navy-800 bg-navy-850/40 p-3">
              <div className="text-xs font-medium mb-2">Suggested actions</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent-400" /> Update load FQ-2026-0207 delivery window</div>
                <div className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent-400" /> Notify shipper of revised ETA</div>
                <div className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-accent-400" /> Log interaction to CRM</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
