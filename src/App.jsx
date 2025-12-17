import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SongPage from './pages/SongPage';
import AddSongPage from './pages/AddSongPage';
import EditSongPage from './pages/EditSongPage'; // Import the new page

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/song/:id" element={<SongPage />} />
          <Route path="/add" element={<AddSongPage />} />
          <Route path="/edit/:id" element={<EditSongPage />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;