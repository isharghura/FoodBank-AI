import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WebCam from './components/camera';


function App() {
  return (
    <Router>
    <div className="App">
      <h1> WebCam feed</h1>
      <Routes>
        <Route path='/' element={<WebCam />}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
