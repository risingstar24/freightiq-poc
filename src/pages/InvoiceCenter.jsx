import { useState } from 'react';
import { Plus, Receipt, Check, AlertTriangle, Mail, Download } from 'lucide-react';
import { Card, Pill, Section, Button, Table, Tabs } from '../components/ui';
import { invoices } from '../data/invoices';

const colorFor = (s) => ({
  'Draft': 'slate', 'Submitted': 'blue', 'Paid': 'green', 'Overdue': 'red',
}[s] ?? 'slate');

export default function InvoiceCenter() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? invoices : invoices.filter(i => i.status === tab);

  const columns = [
    { key: 'id', label: 'Invoice #', render: r => <span className="font-medium text-accent-400">{r.id}</span> },
    { key: 'type', label: 'Type' },
    { key: 'loadId', label: 'Load ID' },
    { key: 'party', label: 'Party' },
    { key: 'amount', label: 'Amount', render: r => <span className="tabular-nums font-medium">${r.amount.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: r => <Pill color={colorFor(r.status)}>{r.status}</Pill> },
    { key: 'issueDate', label: 'Issued' },
    { key: 'dueDate', label: 'Due' },
    { key: 'portalSubmitted', label: 'Channel' },
    { key: 'reconciled', label: 'Reconciled', render: r => r.reconciled ? <Check className="w-4 h-4 text-green-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" /> },
  ];

  const totals = {
    submitted: invoices.filter(i => i.status === 'Submitted').reduce((a, i) => a + i.amount, 0),
    paid: invoices.filter(i => i.status === 'Paid').reduce((a, i) => a + i.amount, 0),
    overdue: invoices.filter(i => i.status === 'Overdue').reduce((a, i) => a + i.amount, 0),
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoice Center</h1>
          <p className="text-sm text-slate-500 mt-1">AR · AP · Auto-reconciliation</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary"><Mail className="w-4 h-4" /> Batch Submit</Button>
          <Button><Plus className="w-4 h-4" /> Generate Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">Outstanding</div>
          <div className="text-2xl font-semibold mt-2">${(totals.submitted / 1000).toFixed(0)}k</div>
        </Card>
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">Paid MTD</div>
          <div className="text-2xl font-semibold mt-2 text-green-400">${(totals.paid / 1000).toFixed(0)}k</div>
        </Card>
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">Overdue</div>
          <div className="text-2xl font-semibold mt-2 text-red-400">${(totals.overdue / 1000).toFixed(0)}k</div>
        </Card>
        <Card>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">Auto-reconciled</div>
          <div className="text-2xl font-semibold mt-2">87%</div>
        </Card>
      </div>

      <Card>
        <Section title="AI reconciliation" subtitle="Line item matching · RC vs Invoice vs POD">
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title: 'Matched', val: 148, color: 'green' },
              { title: 'Minor variance (<$50)', val: 12, color: 'amber' },
              { title: 'Manual review needed', val: 4, color: 'red' },
            ].map(c => (
              <div key={c.title} className={`rounded-lg border p-3 ${
                c.color === 'green' ? 'border-green-500/20 bg-green-500/5' :
                c.color === 'amber' ? 'border-amber-500/20 bg-amber-500/5' : 'border-red-500/20 bg-red-500/5'
              }`}>
                <div className="text-xs text-slate-400">{c.title}</div>
                <div className="text-2xl font-semibold mt-1">{c.val}</div>
              </div>
            ))}
          </div>
        </Section>
      </Card>

      <Card padded={false}>
        <div className="p-4 border-b border-navy-800">
          <Tabs tabs={['All', 'Draft', 'Submitted', 'Paid', 'Overdue']} active={tab} onChange={setTab} />
        </div>
        <Table columns={columns} rows={filtered} />
      </Card>
    </div>
  );
}
