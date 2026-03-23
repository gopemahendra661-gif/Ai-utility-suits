import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, User, LogOut, LayoutDashboard, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { useSupabase } from '../../hooks/useSupabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useSupabase();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Utility Suite
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  isActive(link.path) ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1 pl-3 glass rounded-full hover:border-blue-500/50 transition-colors"
                >
                  <span className="text-xs text-gray-400 truncate max-w-[100px]">{user.email}</span>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-xl p-2 shadow-2xl animate-fade-in">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link
                      to="/saved"
                      className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg transition-colors text-sm"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bookmark size={16} /> Saved Content
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors text-sm"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-400" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/5 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium ${isActive(link.path) ? 'text-blue-400' : 'text-gray-400'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" className="text-lg text-gray-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/saved" className="text-lg text-gray-400" onClick={() => setIsOpen(false)}>Saved Content</Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="text-lg text-red-400 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="w-full py-3 bg-blue-600 rounded-xl text-center font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
