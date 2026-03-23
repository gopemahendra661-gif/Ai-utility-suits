import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function useSupabase() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password: pass });
    if (error) toast.error(error.message);
    else toast.success('Check your email for confirmation!');
    return { data, error };
  };

  const signIn = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) toast.error(error.message);
    else toast.success('Welcome back!');
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else toast.success('Signed out');
  };

  const saveContent = async (toolType: string, toolName: string, inputText: string, outputText: string) => {
    if (!user) {
      toast.error('Please sign in to save content');
      return;
    }

    const { data, error } = await supabase.from('saved_contents').insert([
      { user_id: user.id, tool_type: toolType, tool_name: toolName, input_text: inputText, output_text: outputText }
    ]);

    if (error) toast.error('Failed to save content');
    else toast.success('Content saved!');
    return { data, error };
  };

  const getSavedContents = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('saved_contents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) toast.error('Failed to fetch saved content');
    return data || [];
  };

  const deleteSavedContent = async (id: string) => {
    const { error } = await supabase.from('saved_contents').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else toast.success('Deleted');
  };

  const trackUsage = async (toolType: string, modelUsed: string, responseTime: number) => {
    if (!user) return;
    await supabase.from('usage_stats').insert([
      { user_id: user.id, tool_type: toolType, model_used: modelUsed, response_time: responseTime }
    ]);
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    saveContent,
    getSavedContents,
    deleteSavedContent,
    trackUsage
  };
}
