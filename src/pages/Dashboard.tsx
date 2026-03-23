import { useState, useEffect } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { User, Mail, Calendar, Shield, BarChart3, Clock, Zap } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function Dashboard() {
  const { user, loading, signIn, signUp } = useSupabase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><LoadingSpinner size={40} /></div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="glass p-8 rounded-3xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
            <p className="text-gray-400">Sign in to sync your saved content across devices.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            isSignUp ? signUp(email, password) : signIn(email, password);
          }}>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none"
                required
              />
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-blue-400 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold">
                {user.email?.[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold truncate max-w-[200px]">{user.email}</h2>
                <p className="text-sm text-gray-500">Free Tier User</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} /> {user.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Calendar size={16} /> Joined {new Date(user.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Shield size={16} /> Account Verified
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Activity */}
        <div className="w-full md:w-2/3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Zap, label: 'Total Usage', value: '124', color: 'text-yellow-400' },
              { icon: BarChart3, label: 'Saved Items', value: '12', color: 'text-blue-400' },
              { icon: Clock, label: 'Avg Speed', value: '1.2s', color: 'text-green-400' }
            ].map((stat, i) => (
              <div key={i} className="glass p-6 rounded-2xl space-y-2">
                <div className={`p-2 bg-white/5 rounded-lg inline-block ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold">Usage Statistics</h3>
            <div className="h-64 flex items-end gap-2">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-600/20 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all group-hover:bg-blue-400" 
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
