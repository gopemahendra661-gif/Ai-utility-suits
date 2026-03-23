import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { HINDI_TRANSLATOR_PROMPT } from '../../utils/prompts';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Languages, ArrowRightLeft } from 'lucide-react';

export default function HindiTranslator() {
  const [text, setText] = useState('');
  const [direction, setDirection] = useState('English to Hindi');
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!text) return;
    const prompt = HINDI_TRANSLATOR_PROMPT.replace('{text}', text).replace('{direction}', direction);
    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('hindi-translator', result.model, result.responseTime);
    }
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'English to Hindi' ? 'Hindi to English' : 'English to Hindi');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-orange-600/20 rounded-2xl text-orange-400 mb-2">
          <Languages size={32} />
        </div>
        <h1 className="text-4xl font-bold">Hindi Translator</h1>
        <p className="text-gray-400">Professional English-Hindi translation with Hinglish support.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-center gap-8">
          <div className={`text-lg font-semibold ${direction.startsWith('English') ? 'text-blue-400' : 'text-orange-400'}`}>
            {direction.split(' to ')[0]}
          </div>
          <button 
            onClick={toggleDirection}
            className="p-3 glass rounded-full hover:border-blue-500 transition-all hover:rotate-180 duration-500"
          >
            <ArrowRightLeft size={20} />
          </button>
          <div className={`text-lg font-semibold ${direction.endsWith('Hindi') ? 'text-orange-400' : 'text-blue-400'}`}>
            {direction.split(' to ')[1]}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Enter text to translate</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter ${direction.split(' to ')[0]} text...`}
            className="w-full h-48 bg-black/20 border border-white/10 rounded-xl p-4 focus:border-orange-500 outline-none transition-colors resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !text}
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Translate Now'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('hindi-translator', 'Translation', text.substring(0, 50), output)}
          title="Translation"
        />
      )}
    </div>
  );
}
