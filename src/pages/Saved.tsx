import { useState, useEffect } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { Bookmark, Trash2, ExternalLink, Search, Clock, Tag } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';

export default function Saved() {
  const { getSavedContents, deleteSavedContent } = useSupabase();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getSavedContents();
    setItems(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteSavedContent(id);
      setItems(items.filter(i => i.id !== id));
    }
  };

  const filteredItems = items.filter(item => 
    item.tool_name.toLowerCase().includes(search.toLowerCase()) ||
    item.input_text.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><LoadingSpinner size={40} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Bookmark className="text-blue-500" /> Saved Content
          </h1>
          <p className="text-gray-400">Access all your previously generated AI content.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search saved items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-11 pr-4 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="glass p-6 rounded-2xl space-y-4 hover:border-blue-500/30 transition-all group animate-fade-in">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-600/20 text-blue-400 text-[10px] font-bold rounded uppercase tracking-wider">
                      {item.tool_type}
                    </span>
                    <h3 className="font-bold text-lg">{item.tool_name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(item.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Tag size={12} /> {item.input_text.substring(0, 30)}...</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 text-sm text-gray-300 line-clamp-3 whitespace-pre-wrap">
                {item.output_text}
              </div>

              <div className="flex justify-end">
                <Link 
                  to={`/tools/${item.tool_type}`}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                >
                  Open in Tool <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
          <Bookmark size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-bold">No saved content yet</h3>
          <p className="text-gray-400">Start using tools and save your results to see them here.</p>
          <Link to="/tools" className="inline-block mt-6 text-blue-400 hover:underline">Explore Tools</Link>
        </div>
      )}
    </div>
  );
}
