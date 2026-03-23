import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSupabase } from './hooks/useSupabase';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Tools from './pages/Tools';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import About from './pages/About';

// Tool Components
import AIWriter from './components/tools/AIWriter';
import GrammarChecker from './components/tools/GrammarChecker';
import Summarizer from './components/tools/Summarizer';
import Paraphraser from './components/tools/Paraphraser';
import HindiTranslator from './components/tools/HindiTranslator';
import IdeaGenerator from './components/tools/IdeaGenerator';
import SEOMetaGenerator from './components/tools/SEOMetaGenerator';
import CodeHelper from './components/tools/CodeHelper';
import QuizGenerator from './components/tools/QuizGenerator';
import FlashcardMaker from './components/tools/FlashcardMaker';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useSupabase();
  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-blue-500/30">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
            
            {/* Tool Routes */}
            <Route path="/tools/writer" element={<AIWriter />} />
            <Route path="/tools/grammar" element={<GrammarChecker />} />
            <Route path="/tools/summarizer" element={<Summarizer />} />
            <Route path="/tools/paraphraser" element={<Paraphraser />} />
            <Route path="/tools/hindi-translator" element={<HindiTranslator />} />
            <Route path="/tools/idea-generator" element={<IdeaGenerator />} />
            <Route path="/tools/seo-meta" element={<SEOMetaGenerator />} />
            <Route path="/tools/code-helper" element={<CodeHelper />} />
            <Route path="/tools/quiz-generator" element={<QuizGenerator />} />
            <Route path="/tools/flashcard-maker" element={<FlashcardMaker />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1f1f2f',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
          }
        }} />
      </div>
    </BrowserRouter>
  );
}
