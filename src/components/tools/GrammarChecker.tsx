import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { GRAMMAR_PROMPT } from '../../utils/prompts';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { CheckCircle } from 'lucide-react';

export default function GrammarChecker() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!text) return;
    const prompt = GRAMMAR_PROMPT.replace('{text}', text);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('grammar', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-green-600/20 rounded-2xl text-green-400 mb-2">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-4xl font-bold">Grammar Checker</h1>
        <p className="text-gray-400">Perfect your writing with professional grammar and spelling correction.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Paste your text below</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to check..."
            className="w-full h-64 bg-black/20 border border-white/10 rounded-xl p-4 focus:border-green-500 outline-none transition-colors resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !text}
          className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Check Grammar'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('grammar', 'Grammar Check', text.substring(0, 50), output)}
          title="Correction & Analysis"
        />
      )}
    </div>
  );
}
