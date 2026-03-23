import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { QUIZ_GENERATOR_PROMPT } from '../../utils/prompts';
import { DIFFICULTIES } from '../../utils/constants';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { HelpCircle } from 'lucide-react';

export default function QuizGenerator() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState('5');
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[1]);
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!topic) return;
    const prompt = QUIZ_GENERATOR_PROMPT
      .replace('{topic}', topic)
      .replace('{count}', count)
      .replace('{difficulty}', difficulty);

    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('quiz-generator', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-rose-600/20 rounded-2xl text-rose-400 mb-2">
          <HelpCircle size={32} />
        </div>
        <h1 className="text-4xl font-bold">Quiz Generator</h1>
        <p className="text-gray-400">Create interactive multiple-choice quizzes for any subject or topic.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Quiz Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. World War II, Basic Physics, JavaScript Fundamentals..."
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-rose-500 outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Number of Questions</label>
            <select
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-rose-500 outline-none transition-colors"
            >
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-rose-500 outline-none transition-colors"
            >
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Generate Quiz'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('quiz-generator', 'Quiz', topic, output)}
          title="Generated Quiz"
        />
      )}
    </div>
  );
}
