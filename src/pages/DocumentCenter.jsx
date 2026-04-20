import { useState } from 'react';
import { FileText, Upload, Check, X, AlertTriangle, Eye } from 'lucide-react';
import { Card, Pill, Table, Button, Section } from '../components/ui';
import { documents } from '../data/documents';

export default function DocumentCenter() {
  const [sel, setSel] = useState(documents[0]);

  const columns = [
    { key: 'id', label: 'Document', render: r => <span className="font-medium text-accent-400">{r.id}</span> },
    { key: 'type', label: 'Type', render: r => <Pill>{r.type}</Pill> },
    { key: 'loadId', label: 'Load ID' },
    { key: 'uploadDate', label: 'Uploaded' },
    { key: 'ocrStatus', label: 'OCR', render: r => (
      <Pill color={r.ocrStatus === 'Processed' ? 'green' : r.ocrStatus === 'Pending' ? 'amber' : 'red'}>{r.ocrStatus}</Pill>
    )},
    { key: 'validation', label: 'Validation', render: r => (
      <Pill color={r.validation === 'Valid' ? 'green' : r.validation === 'Issues' ? 'red' : 'amber'}>{r.validation}</Pill>
    )},
    { key: 'uploader', label: 'Source' },
    { key: 'size', label: 'Size' },
    { key: 'a', label: 'Actions', render: r => <button onClick={e => { e.stopPropagation(); setSel(r); }} className="text-accent-400 text-xs hover:underline flex items-center gap-1"><Eye className="w-3 h-3" /> View</button> },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Document Center</h1>
          <p className="text-sm text-slate-500 mt-1">{documents.length} documents · AI OCR + validation</p>
        </div>
        <Button><Upload className="w-4 h-4" /> Upload document</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total documents', value: documents.length, color: 'slate' },
          { label: 'OCR processed', value: documents.filter(d => d.ocrStatus === 'Processed').length, color: 'green' },
          { label: 'Needs review', value: documents.filter(d => d.validation === 'Issues').length, color: 'amber' },
          { label: 'OCR pending', value: documents.filter(d => d.ocrStatus === 'Pending').length, color: 'blue' },
        ].map(k => (
          <Card key={k.label}>
            <div className="text-[11px] uppercase tracking-wider text-slate-500">{k.label}</div>
            <div className="text-3xl font-semibold mt-2">{k.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Card padded={false}>
            <Table columns={columns} rows={documents} onRowClick={setSel} />
          </Card>
        </div>

        {sel && (
          <Card>
            <Section title={sel.id} subtitle={`${sel.type} for load ${sel.loadId}`}>
              <div className="rounded-lg border border-dashed border-navy-700 bg-navy-850/40 p-4 h-48 flex flex-col items-center justify-center">
                <FileText className="w-10 h-10 text-accent-500 mb-2" />
                <div className="text-xs text-slate-500">Document preview · {sel.size}</div>
                <div className="text-[10px] text-slate-600 mt-1">OCR confidence avg: {Math.round(sel.fields.reduce((a, f) => a + f.confidence, 0) / sel.fields.length)}%</div>
              </div>
              <div className="mt-4">
                <div className="text-xs font-medium mb-2 uppercase tracking-wider text-slate-500">Extracted fields</div>
                <div className="space-y-2">
                  {sel.fields.map(f => (
                    <div key={f.name} className="text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">{f.name}</span>
                        <span className={f.confidence >= 90 ? 'text-green-400' : f.confidence >= 80 ? 'text-accent-400' : 'text-amber-400'}>{f.confidence}%</span>
                      </div>
                      <div className="font-mono text-slate-200 mt-0.5">{f.extracted}</div>
                      <div className="h-0.5 rounded-full bg-slate-700/30 mt-1 overflow-hidden">
                        <div className={`h-full ${f.confidence >= 90 ? 'bg-green-500' : f.confidence >= 80 ? 'bg-accent-500' : 'bg-amber-500'}`} style={{ width: `${f.confidence}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary"><X className="w-4 h-4" /> Reject</Button>
                <Button><Check className="w-4 h-4" /> Approve</Button>
              </div>
            </Section>
          </Card>
        )}
      </div>
    </div>
  );
}
