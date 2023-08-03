import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tasks from './components/tasks';
import Task from './components/task';
import '../src/App.css'
import EditTask from './components/editTask';


const App = () => {
  return (
    <Router>
      <div>
        {/* Routing */}
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/:taskId" element={<Task />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
