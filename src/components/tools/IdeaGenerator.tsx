import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { IDEA_GENERATOR_PROMPT } from '../../utils/prompts';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Lightbulb } from 'lucide-react';

export default function IdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState('10');
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!topic) return;
    const prompt = IDEA_GENERATOR_PROMPT.replace('{topic}', topic).replace('{count}', count);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('idea-generator', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-yellow-600/20 rounded-2xl text-yellow-400 mb-2">
          <Lightbulb size={32} />
        </div>
        <h1 className="text-4xl font-bold">Idea Generator</h1>
        <p className="text-gray-400">Get creative and actionable ideas for your next project or content piece.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">What's the niche or topic?</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. YouTube channel for cooking, SaaS for developers..."
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-yellow-500 outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Number of Ideas</label>
          <select
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-yellow-500 outline-none transition-colors"
          >
            <option value="5">5 Ideas</option>
            <option value="10">10 Ideas</option>
            <option value="15">15 Ideas</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full py-4 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Generate Ideas'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('idea-generator', 'Ideas', topic, output)}
          title="Generated Ideas"
        />
      )}
    </div>
  );
}
