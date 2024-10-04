import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Leaderboard from './Pages/Leaderboard';
import UserProfile from './Pages/Profile';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/ranks' element={<Leaderboard />} />
        <Route path='/profile' element={<UserProfile />} />      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
