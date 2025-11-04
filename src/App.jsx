import { useState, useMemo } from 'react';
import Header from './components/Header.jsx';
import NoteEditor from './components/NoteEditor.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import FlashcardDeck from './components/FlashcardDeck.jsx';

function extractSentences(text) {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}

function summarize(text, maxSentences = 5) {
  const sentences = extractSentences(text);
  if (sentences.length === 0) return '';
  // Score sentences by keyword frequency (very lightweight heuristic)
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w && w.length > 2);
  const stop = new Set(['the','and','for','that','with','this','from','are','was','were','have','has','had','but','not','you','your','about','into','over','also','can','will','they','them','their','then','than','because','when','what','which','while','where','such']);
  const freq = new Map();
  for (const w of words) {
    if (stop.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  const scored = sentences.map((s, idx) => {
    const tokens = s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);
    let score = 0;
    for (const t of tokens) score += (freq.get(t) || 0);
    // Slight preference for earlier sentences
    const positionBonus = Math.max(0, sentences.length - idx) * 0.01;
    return { s, score: score + positionBonus, idx };
  });
  scored.sort((a, b) => b.score - a.score);
  const selected = scored.slice(0, Math.min(maxSentences, scored.length)).sort((a, b) => a.idx - b.idx);
  return selected.map(x => x.s).join(' ');
}

function generateFlashcards(text, maxCards = 12) {
  const sentences = extractSentences(text);
  const cards = [];
  const keywordRegex = /([A-Z][a-zA-Z0-9_-]+(?:\s+[A-Z][a-zA-Z0-9_-]+)*)/g; // Proper nouns / terms
  for (const s of sentences) {
    // Try to extract term: definition pairs like "X is ..." or "X are ..."
    const isMatch = s.match(/^(.*?)\s+(is|are|refers to|means)\s+(.*)$/i);
    if (isMatch) {
      const term = isMatch[1].replace(/[:;,\-]+$/,'').trim();
      const def = isMatch[3].replace(/[:;]+$/,'').trim();
      if (term.split(' ').length <= 8 && def.length > 0) {
        cards.push({ q: `What is ${term}?`, a: def });
        continue;
      }
    }
    // Fallback: Pull capitalized terms from the sentence
    const terms = Array.from(s.matchAll(keywordRegex)).map(m => m[1]).filter(t => t.length > 2 && t.split(' ').length <= 5);
    if (terms.length) {
      for (const t of terms.slice(0, 2)) {
        cards.push({ q: `Define: ${t}`, a: s });
      }
    }
    if (cards.length >= maxCards) break;
  }
  // Ensure uniqueness by question
  const seen = new Set();
  const unique = [];
  for (const c of cards) {
    if (seen.has(c.q)) continue;
    seen.add(c.q);
    unique.push(c);
    if (unique.length >= maxCards) break;
  }
  // If still empty, create general prompts
  if (unique.length === 0 && text.trim()) {
    unique.push({ q: 'Summarize the main idea', a: summarize(text, 2) || 'N/A' });
  }
  return unique;
}

export default function App() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const canGenerate = notes.trim().length > 0;

  const wordCount = useMemo(() => {
    return notes.trim() ? notes.trim().split(/\s+/).length : 0;
  }, [notes]);

  const handleSummarize = () => {
    const s = summarize(notes, 5);
    setSummary(s);
  };

  const handleFlashcards = () => {
    const cards = generateFlashcards(notes, 12);
    setFlashcards(cards);
  };

  const handleClearAll = () => {
    setNotes('');
    setSummary('');
    setFlashcards([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Header onClearAll={handleClearAll} />
      <main className="mx-auto max-w-6xl px-4 pb-24">
        <NoteEditor
          value={notes}
          onChange={setNotes}
          onSummarize={handleSummarize}
          onGenerateFlashcards={handleFlashcards}
          canGenerate={canGenerate}
          wordCount={wordCount}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <SummaryPanel
            summary={summary}
            onCopy={() => navigator.clipboard.writeText(summary)}
          />
          <FlashcardDeck cards={flashcards} onShuffle={() => setFlashcards(prev => [...prev].sort(() => Math.random() - 0.5))} />
        </div>
      </main>
    </div>
  );
}
