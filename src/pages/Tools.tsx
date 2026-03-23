import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../utils/constants';
import * as Icons from 'lucide-react';

export default function Tools() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                         tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">AI Tools Directory</h1>
        <p className="text-gray-400">Explore our collection of specialized AI utilities.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass p-4 rounded-2xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-blue-500 outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter size={18} className="text-gray-500 mr-2 hidden md:block" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                category === cat 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => {
          const Icon = (Icons as any)[tool.icon];
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="glass p-6 rounded-2xl space-y-4 hover:border-blue-500/50 transition-all group animate-fade-in"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold bg-white/5 px-2 py-1 rounded">
                  {tool.category}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{tool.description}</p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Try Tool <Icons.ArrowRight size={16} />
              </div>
            </Link>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl">
          <Icons.SearchX size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-bold">No tools found</h3>
          <p className="text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
