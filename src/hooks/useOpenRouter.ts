import { useState } from 'react';
import { toast } from 'react-hot-toast';

const FREE_MODELS = [
  'google/gemini-2.0-flash-exp:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'microsoft/phi-3.5-mini-128k-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'qwen/qwen-2.5-7b-instruct:free'
];

export function useOpenRouter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateWithFallback = async (prompt: string, systemPrompt?: string) => {
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    for (const model of FREE_MODELS) {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, model, systemPrompt }),
        });

        const data = await response.json();

        if (response.ok && data.choices?.[0]?.message?.content) {
          setLoading(false);
          return {
            content: data.choices[0].message.content,
            model,
            responseTime: Date.now() - startTime
          };
        }

        console.warn(`Model ${model} failed, trying next...`);
      } catch (err: any) {
        console.error(`Error with model ${model}:`, err);
      }
    }

    const msg = 'All AI models failed to respond. Please try again later.';
    setError(msg);
    toast.error(msg);
    setLoading(false);
    return null;
  };

  return { generateWithFallback, loading, error };
}
