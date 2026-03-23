import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Shield, Globe, Star } from 'lucide-react';
import { TOOLS } from '../utils/constants';
import * as Icons from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 text-center space-y-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-blue-400 text-sm font-medium animate-fade-in">
          <Sparkles size={16} />
          <span>The Ultimate AI Powerhouse</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight animate-slide-up">
          Supercharge Your Workflow <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            With AI Intelligence
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
          10+ powerful AI tools in one place. Writing, coding, translation, and more. 
          Built for creators, developers, and students.
        </p>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-up [animation-delay:400ms]">
          <Link
            to="/tools"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            Explore All Tools <ArrowRight size={20} />
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 glass hover:bg-white/5 rounded-xl font-bold transition-all"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Zap,
            title: 'Lightning Fast',
            desc: 'Get high-quality AI responses in seconds with our optimized fallback system.',
            color: 'text-yellow-400'
          },
          {
            icon: Shield,
            title: 'Secure & Private',
            desc: 'Your data is encrypted and stored securely. We prioritize your privacy.',
            color: 'text-green-400'
          },
          {
            icon: Globe,
            title: 'Multilingual',
            desc: 'Support for multiple languages including English, Hindi, and more.',
            color: 'text-blue-400'
          }
        ].map((feat, i) => (
          <div key={i} className="glass p-8 rounded-2xl space-y-4 hover:border-blue-500/30 transition-all group">
            <div className={`p-3 bg-white/5 rounded-xl inline-block group-hover:scale-110 transition-transform ${feat.color}`}>
              <feat.icon size={24} />
            </div>
            <h3 className="text-xl font-bold">{feat.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Tools Grid Preview */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Popular Tools</h2>
            <p className="text-gray-400">Start using our most loved AI utilities.</p>
          </div>
          <Link to="/tools" className="text-blue-400 hover:underline flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOLS.slice(0, 4).map((tool) => {
            const Icon = (Icons as any)[tool.icon];
            return (
              <Link
                key={tool.id}
                to={tool.path}
                className="glass p-6 rounded-2xl space-y-4 hover:border-blue-500/50 transition-all group"
              >
                <div className="p-3 bg-blue-600/10 rounded-xl inline-block text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{tool.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{tool.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass rounded-3xl p-12 text-center grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: 'Active Users', value: '10K+' },
          { label: 'AI Responses', value: '1M+' },
          { label: 'Tools Available', value: '10+' },
          { label: 'Uptime', value: '99.9%' }
        ].map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-10">
        <h2 className="text-4xl font-bold">Ready to boost your productivity?</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          Join thousands of users who are already using AI Utility Suite to work smarter, not harder.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          Get Started for Free
        </Link>
      </section>
    </div>
  );
}
