import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WebCam from './components/camera';
import Ranks from './components/ranks';
import UserProfile from './Pages/Profile';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<WebCam />}/>
        <Route path='/ranks' element={<Ranks />} />
        <Route path='/profile' element={<UserProfile />} />      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
