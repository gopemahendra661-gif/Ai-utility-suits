import { useState } from 'react';
import { useOpenRouter } from '../../hooks/useOpenRouter';
import { useSupabase } from '../../hooks/useSupabase';
import { CODE_HELPER_PROMPT } from '../../utils/prompts';
import { LANGUAGES, CODE_TASKS } from '../../utils/constants';
import OutputCard from '../common/OutputCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Code } from 'lucide-react';

export default function CodeHelper() {
  const [code, setCode] = useState('');
  const [task, setTask] = useState(CODE_TASKS[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [output, setOutput] = useState('');
  
  const { generateWithFallback, loading, error } = useOpenRouter();
  const { saveContent, trackUsage } = useSupabase();

  const handleGenerate = async () => {
    if (!code) return;
    const prompt = CODE_HELPER_PROMPT
      .replace('{task}', task)
      .replace('{language}', language)
      .replace('{code}', code);

    const result = await generateWithFallback(prompt);
    if (result) {
      setOutput(result.content);
      trackUsage('code-helper', result.model, result.responseTime);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 bg-blue-600/20 rounded-2xl text-blue-400 mb-2">
          <Code size={32} />
        </div>
        <h1 className="text-4xl font-bold">Code Helper</h1>
        <p className="text-gray-400">Explain, debug, or write code snippets in any programming language.</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Task</label>
            <select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
            >
              {CODE_TASKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
            >
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Code or Problem Description</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code or describe the task here..."
            className="w-full h-64 bg-black/20 border border-white/10 rounded-xl p-4 font-mono text-sm focus:border-blue-500 outline-none transition-colors resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !code}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          {loading ? <LoadingSpinner size={20} /> : 'Process Code'}
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {output && (
        <OutputCard 
          content={output} 
          onSave={() => saveContent('code-helper', 'Code Help', task, output)}
          title="Code Analysis & Result"
        />
      )}
    </div>
  );
}
