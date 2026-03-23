import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { SUMMARIZER_PROMPT } from '../../utils/prompts';
import { LENGTHS } from '../../utils/constants';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { FileText } from 'lucide-react';

export default function Summarizer() {
  const [text, setText] = useState('');
  const [length, setLength] = useState(LENGTHS[1]);
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!text) return;
    const prompt = SUMMARIZER_PROMPT.replace('{text}', text).replace('{length}', length);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('summarizer', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-purple-600/20 rounded-2xl text-purple-400 mb-2">
          <FileText size={32} />
        </div>
        <h1 className="text-4xl font-bold">Text Summarizer</h1>
        <p className="text-gray-400">Turn long articles and documents into concise, readable summaries.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Paste long text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the text you want to summarize..."
            className="w-full h-64 bg-black/20 border border-white/10 rounded-xl p-4 focus:border-purple-500 outline-none transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Summary Length</label>
          <div className="flex gap-4">
            {LENGTHS.map(l => (
              <button
                key={l}
                onClick={() => setLength(l)}
                className={`flex-1 py-3 rounded-xl border transition-all ${
                  length === l ? 'bg-purple-600 border-purple-500 text-white' : 'bg-black/20 border-white/10 text-gray-400 hover:border-purple-500/50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !text}
          className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Summarize Text'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('summarizer', 'Summary', text.substring(0, 50), output)}
          title="Summary"
        />
      )}
    </div>
  );
}
