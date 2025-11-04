import { Clipboard, Download } from 'lucide-react';

export default function SummaryPanel({ summary, onCopy }) {
  const handleDownload = () => {
    const blob = new Blob([summary || ''], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studybuddy-summary.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section>
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 h-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="flex items-center gap-2">
            <button onClick={onCopy} className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-xs hover:bg-slate-800">
              <Clipboard className="h-3.5 w-3.5" /> Copy
            </button>
            <button onClick={handleDownload} className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-xs hover:bg-slate-800">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        </div>
        <div className="min-h-[160px] rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-slate-200">
          {summary ? (
            <p className="leading-relaxed whitespace-pre-wrap">{summary}</p>
          ) : (
            <p className="text-slate-400">Your summary will appear here after you click Summarize.</p>
          )}
        </div>
      </div>
    </section>
  );
}
