import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 py-12 glass">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Utility Suite
            </h3>
            <p className="text-gray-400 max-w-md">
              Empowering creators and developers with a comprehensive suite of AI-powered tools. 
              Built for speed, accuracy, and ease of use.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/tools" className="hover:text-blue-400 transition-colors">All Tools</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 glass rounded-lg hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="p-2 glass rounded-lg hover:text-blue-400 transition-colors"><Github size={20} /></a>
              <a href="#" className="p-2 glass rounded-lg hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AI Utility Suite. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for the future of AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
