import ReactMarkdown from 'react-markdown';
import { Copy, Save, Share2, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface OutputCardProps {
  content: string;
  onSave?: () => void;
  title?: string;
}

export default function OutputCard({ content, onSave, title = "AI Output" }: OutputCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Utility Suite Content',
        text: content,
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  const charCount = content.length;
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <div className="glass rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-400">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Copy"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
              title="Save"
            >
              <Save size={18} />
            </button>
          )}
          <button
            onClick={handleShare}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            title="Share"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="prose prose-invert max-w-none mb-4 min-h-[100px]">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-white/5 pt-4">
        <span>{charCount} characters</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  );
}
