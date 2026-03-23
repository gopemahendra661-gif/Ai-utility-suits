import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { WRITER_PROMPT } from '../../utils/prompts';
import { TONES, LENGTHS } from '../../utils/constants';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { PenTool } from 'lucide-react';

export default function AIWriter() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState(TONES[0]);
  const [length, setLength] = useState(LENGTHS[1]);
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!topic) return;
    
    const prompt = WRITER_PROMPT
      .replace('{topic}', topic)
      .replace('{tone}', tone)
      .replace('{length}', length === 'Short' ? '200' : length === 'Medium' ? '500' : '1000');

    const result = await generateWithFallback(prompt);
    
    if (result) {
      setOutput(result.content);
      trackUsage('writer', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-blue-600/20 rounded-2xl text-blue-400 mb-2">
          <PenTool size={32} />
        </div>
        <h1 className="text-4xl font-bold">AI Writer</h1>
        <p className="text-gray-400">Generate high-quality articles, blogs, and creative content in seconds.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">What do you want to write about?</label>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. The future of artificial intelligence in healthcare..."
            className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
            >
              {TONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
            >
              {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Generate Content'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('writer', 'AI Writer Output', topic, output)}
          title="Generated Content"
        />
      )}
    </div>
  );
}
