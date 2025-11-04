import { Rocket, Sparkles, Trash2 } from 'lucide-react';

export default function Header({ onClearAll }) {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 grid place-items-center">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">StudyBuddy</h1>
              <p className="text-slate-300 text-sm flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-yellow-300" /> AI study helper that summarizes notes and creates flashcards
              </p>
            </div>
          </div>
          <button
            onClick={onClearAll}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm hover:bg-slate-800 transition-colors"
            title="Clear everything"
          >
            <Trash2 className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>
    </header>
  );
}
