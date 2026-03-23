import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { FLASHCARD_PROMPT } from '../../utils/prompts';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Layers } from 'lucide-react';

export default function FlashcardMaker() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState('10');
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!topic) return;
    const prompt = FLASHCARD_PROMPT.replace('{topic}', topic).replace('{count}', count);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('flashcard-maker', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-emerald-600/20 rounded-2xl text-emerald-400 mb-2">
          <Layers size={32} />
        </div>
        <h1 className="text-4xl font-bold">Flashcard Maker</h1>
        <p className="text-gray-400">Generate study flashcards to help you memorize and learn faster.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Study Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Spanish Vocabulary, React Hooks, Biology Terms..."
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-emerald-500 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Number of Flashcards</label>
          <select
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-emerald-500 outline-none transition-colors"
          >
            <option value="5">5 Cards</option>
            <option value="10">10 Cards</option>
            <option value="20">20 Cards</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Generate Flashcards'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('flashcard-maker', 'Flashcards', topic, output)}
          title="Generated Flashcards"
        />
      )}
    </div>
  );
}
