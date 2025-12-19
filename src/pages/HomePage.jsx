import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Music, Flame, Sparkles, Disc } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import SongCard from '../components/SongCard';

const HomePage = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // Changed default to 'all' or 'trending'
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch songs from Supabase
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setSongs(data);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  // --- FILTER LOGIC ---
  const filteredSongs = songs.filter(song => {
    // 1. Search Filter (checks Title, Artist, or Chinese/Pinyin lyrics)
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      (song.artist_chinese && song.artist_chinese.includes(query)) ||
      (song.lyrics_chinese && song.lyrics_chinese.includes(query));

    // 2. Tab Filter
    let matchesTab = true;
    if (activeTab === 'new') {
        // Example: Only show songs added in the last 7 days? 
        // For now, let's just say "New" is the raw list sorted by date (which it already is)
        matchesTab = true; 
    } else if (activeTab === 'classics') {
        // Simple logic: Classics are older songs or ballads
        matchesTab = song.category === 'ballad' || song.category === 'oldies'; 
    } else if (activeTab === 'trending') {
        matchesTab = song.category === 'pop'; // Placeholder logic
    }

    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/logo_t.png" 
              alt="Quality Pinyin Logo" 
              className="w-10 h-10 rounded-lg object-cover" 
            />
            <span className="font-bold text-xl tracking-tight text-white">Quality Pinyin Lyrics</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search songs, artists, lyrics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900 border border-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all text-sm"
            />
          </div>

          <button 
            onClick={() => navigate('/add')}
            className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Song</span>
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-600/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Learn Chinese Through <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Music
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            A community-driven database of Chinese lyrics with full Pinyin and English translations.
          </p>
          
          <div className="flex justify-center gap-2">
            {[
              { id: 'all', label: 'All Songs', icon: Music },
              { id: 'trending', label: 'Trending', icon: Flame },
              { id: 'new', label: 'Fresh Drops', icon: Sparkles },
              { id: 'classics', label: 'Classics', icon: Disc },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Song Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Songs'}
        </h2>

        {loading ? (
          <div className="text-slate-500">Loading library...</div>
        ) : filteredSongs.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-white/5 border-dashed">
            <p className="text-slate-400 mb-4">No songs found matching your criteria.</p>
            <button onClick={() => {setSearchQuery(''); setActiveTab('all')}} className="text-emerald-400 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSongs.map((song) => (
              <div key={song.id} onClick={() => navigate(`/song/${song.id}`)}>
                <SongCard 
                  title={song.title} 
                  artist={song.artist}
                  difficulty={song.category || "Pop"} 
                  coverUrl={song.cover_url || "https://i.scdn.co/image/ab67616d0000b273a0050d2495d46777c223c038"}
                  likes="0" 
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;