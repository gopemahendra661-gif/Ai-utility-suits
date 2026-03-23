import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { PARAPHRASER_PROMPT } from '../../utils/prompts';
import { STYLES } from '../../utils/constants';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { RefreshCw } from 'lucide-react';

export default function Paraphraser() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState(STYLES[0]);
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!text) return;
    const prompt = PARAPHRASER_PROMPT.replace('{text}', text).replace('{style}', style);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('paraphraser', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-600/20 rounded-2xl text-indigo-400 mb-2">
          <RefreshCw size={32} />
        </div>
        <h1 className="text-4xl font-bold">Paraphraser</h1>
        <p className="text-gray-400">Rewrite any text while keeping the original meaning, in various styles.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Original Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to paraphrase..."
            className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 focus:border-indigo-500 outline-none transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Rewriting Style</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STYLES.map(s => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`py-3 rounded-xl border transition-all ${
                  style === s ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:border-indigo-500/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !text}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Paraphrase Now'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('paraphraser', 'Paraphrased Text', text.substring(0, 50), output)}
          title="Paraphrased Version"
        />
      )}
    </div>
  );
}
