import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WebCam from './components/camera';
import UserProfile from './Pages/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>WebCam Feed</h1>
        <Routes>
          <Route path='/' element={<WebCam />} />
          <Route path='/profile' element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
