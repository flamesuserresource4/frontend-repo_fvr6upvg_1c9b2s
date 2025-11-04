import { BookOpen, Clipboard, Sparkles, Cards, RotateCcw } from 'lucide-react';

const sampleNotes = `Photosynthesis is the process by which green plants and some other organisms convert light energy into chemical energy. This process occurs in the chloroplasts, which contain chlorophyll. Chlorophyll absorbs light, most efficiently in the blue and red wavelengths, and converts it into chemical energy via the light-dependent reactions.

The Calvin cycle, also known as the light-independent reactions, uses ATP and NADPH produced by the light-dependent reactions to synthesize glucose from carbon dioxide. Stomata are pores on the leaf surface that allow gas exchange; they open to let CO2 in and O2 out. Factors affecting photosynthesis include light intensity, carbon dioxide concentration, and temperature.`;

export default function NoteEditor({ value, onChange, onSummarize, onGenerateFlashcards, canGenerate, wordCount }) {
  const handlePasteSample = () => {
    onChange(sampleNotes);
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
  };

  const handleClear = () => onChange('');

  return (
    <section className="mt-6">
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 sm:px-5 py-3">
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <BookOpen className="h-4 w-4" /> Paste your notes below
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">{wordCount} words</span>
            <button onClick={handleCopy} className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 hover:bg-slate-800">
              <Clipboard className="h-3.5 w-3.5" /> Copy
            </button>
            <button onClick={handlePasteSample} className="inline-flex items-center gap-1 rounded-md border border-fuchsia-700/60 bg-fuchsia-600/20 px-2 py-1 text-fuchsia-200 hover:bg-fuchsia-600/30">
              <Sparkles className="h-3.5 w-3.5" /> Sample
            </button>
            <button onClick={handleClear} className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 hover:bg-slate-800">
              <RotateCcw className="h-3.5 w-3.5" /> Clear
            </button>
          </div>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or type your study notes here..."
          className="w-full min-h-[180px] md:min-h-[220px] resize-y bg-transparent px-4 sm:px-5 py-4 outline-none text-slate-100 placeholder:text-slate-500"
        />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-slate-800">
          <p className="text-slate-400 text-sm">Tip: Add clear sentences like "X is..." for better flashcards.</p>
          <div className="flex items-center gap-2">
            <button
              disabled={!canGenerate}
              onClick={onSummarize}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-4 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="h-4 w-4" /> Summarize
            </button>
            <button
              disabled={!canGenerate}
              onClick={onGenerateFlashcards}
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-600/60 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Cards className="h-4 w-4" /> Create Flashcards
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
