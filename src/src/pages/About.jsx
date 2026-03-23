import React from 'react';
import { Sparkles, Shield, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600">AI Utility Suite</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Free AI tools for everyone, built with love for the community
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We believe that AI tools should be accessible to everyone, not just those who can afford expensive subscriptions. 
            Our mission is to provide high-quality, free AI utilities that help people write better, code faster, and learn more effectively.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              100% Free
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No credit card required, no hidden fees. All tools are completely free to use.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Privacy First
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data stays yours. We don't sell or misuse your content.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Fast & Reliable
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Powered by 5 different AI models with automatic fallback for maximum uptime.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
              <Globe className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Multi-Language
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Support for English, Hindi, and Hinglish. Made for Indian users.
            </p>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {['React', 'Vite', 'Tailwind CSS', 'Supabase', 'OpenRouter', 'Gemini', 'Llama', 'Mistral'].map(tech => (
              <span key={tech} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2026 AI Utility Suite. Made with ❤️ for the developer community.</p>
          <p className="mt-2">Questions? Contact us at support@aiutilitysuite.com</p>
        </div>
      </div>
    </div>
  );
      }
