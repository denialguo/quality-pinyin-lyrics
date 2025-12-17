import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const AddSongPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', 
    artist: '', 
    artist_chinese: '', 
    cover_url: '',
    youtube_url: '', 
    category: 'pop', // Default genre
    lyrics_chinese: '', 
    lyrics_pinyin: '', 
    lyrics_english: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent double clicks
    setLoading(true);
    
    // FIX: Only one insert call now!
    const { error } = await supabase.from('songs').insert([formData]);

    if (error) {
      alert('Error adding song: ' + error.message);
    } else {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Add New Song</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Song Title *</label>
              <input name="title" onChange={handleChange} className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white w-full focus:outline-none focus:border-emerald-500" required />
            </div>
            
            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Artist (English) *</label>
              <input name="artist" onChange={handleChange} className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white w-full focus:outline-none focus:border-emerald-500" required />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 text-sm">Artist (Chinese) - Optional</label>
              <input name="artist_chinese" onChange={handleChange} className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white w-full focus:outline-none focus:border-emerald-500" />
            </div>

            <div className="space-y-2">
               <label className="text-slate-400 text-sm">Genre / Category</label>
               <select name="category" onChange={handleChange} className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white w-full focus:outline-none focus:border-emerald-500">
                 <option value="pop">Pop</option>
                 <option value="rnb">R&B</option>
                 <option value="ballad">Ballad</option>
                 <option value="rap">Rap</option>
                 <option value="rock">Rock</option>
               </select>
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-slate-400 text-sm">Cover Image URL - Optional</label>
             <input name="cover_url" onChange={handleChange} className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white w-full focus:outline-none focus:border-emerald-500" />
          </div>

          <div className="space-y-2">
             <label className="text-slate-400 text-sm">YouTube Video URL - Optional</label>
             <input name="youtube_url" placeholder="https://youtube.com/watch?v=..." onChange={handleChange} className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white w-full focus:outline-none focus:border-emerald-500" />
          </div>

          {/* The "Paste" Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-slate-400 text-sm font-bold">Chinese Lyrics *</label>
              <textarea name="lyrics_chinese" onChange={handleChange} rows={15} className="w-full bg-slate-900YWpV border border-slate-700 p-4 rounded-xl text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-emerald-500" placeholder="Line 1&#10;Line 2&#10;Line 3..." required />
            </div>
            
            <div className="space-y-2">
              <label className="text-slate-400 text-sm font-bold">Pinyin</label>
              <textarea name="lyrics_pinyin" onChange={handleChange} rows={15} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-emerald-500" placeholder="Line 1 pinyin&#10;Line 2 pinyin..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-slate-400 text-sm font-bold">Translation</label>
              <textarea name="lyrics_english" onChange={handleChange} rows={15} className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white font-mono text-sm leading-relaxed focus:outline-none focus:border-emerald-500" placeholder="Line 1 meaning&#10;Line 2 meaning..." />
            </div>
          </div>

          <button disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> {loading ? "Saving..." : "Publish Song"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSongPage;