import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Podcasts from './components/podcasts';
import EditPodcast from './components/EditPodcast';
import '../src/App.css'




const App = () => {
  return (
    <Router>
      <div>
        {/* Routing */}
        <Routes>
          <Route path="/" element={<Podcasts />} />
          <Route path="/edit-podcast/:podcastId" element={<EditPodcast />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

