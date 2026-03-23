import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { SEO_META_PROMPT } from '../../utils/prompts';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Search } from 'lucide-react';

export default function SEOMetaGenerator() {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!topic) return;
    const prompt = SEO_META_PROMPT.replace('{topic}', topic);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('seo-meta', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-cyan-600/20 rounded-2xl text-cyan-400 mb-2">
          <Search size={32} />
        </div>
        <h1 className="text-4xl font-bold">SEO Meta Generator</h1>
        <p className="text-gray-400">Generate optimized titles, descriptions, and tags for better search rankings.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Enter page topic or keywords</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Best hiking boots for winter 2024..."
            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 focus:border-cyan-500 outline-none transition-colors"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Generate SEO Data'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('seo-meta', 'SEO Metadata', topic, output)}
          title="SEO Analysis & Metadata"
        />
      )}
    </div>
  );
}
