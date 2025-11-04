import { useState } from 'react';
import { Shuffle } from 'lucide-react';

function Card({ q, a }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped(v => !v)}
      className={`relative w-full rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-left transition-transform duration-300 ${flipped ? 'rotate-y-180' : ''}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="[backface-visibility:hidden]">
        <p className="text-sm uppercase tracking-wide text-slate-400">Question</p>
        <p className="mt-1 font-medium text-slate-100">{q}</p>
        <p className="mt-3 text-xs text-slate-500">Tap to reveal</p>
      </div>
      <div className="absolute inset-0 rounded-xl bg-slate-900/80 p-4 [backface-visibility:hidden] rotate-y-180">
        <p className="text-sm uppercase tracking-wide text-slate-400">Answer</p>
        <p className="mt-1 text-slate-100 leading-relaxed">{a}</p>
        <p className="mt-3 text-xs text-slate-500">Tap to flip back</p>
      </div>
    </button>
  );
}

export default function FlashcardDeck({ cards, onShuffle }) {
  return (
    <section>
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 h-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Flashcards</h2>
          <button onClick={onShuffle} disabled={!cards?.length} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-sm hover:bg-slate-800 disabled:opacity-50">
            <Shuffle className="h-4 w-4" /> Shuffle
          </button>
        </div>
        {(!cards || cards.length === 0) ? (
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4 text-slate-400 min-h-[160px] grid place-items-center text-center">
            Your flashcards will appear here after you click Create Flashcards.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cards.map((c, i) => (
              <Card key={i} q={c.q} a={c.a} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
