import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-fade-in">
      <AlertCircle size={20} />
      <p>{message}</p>
    </div>
  );
}
