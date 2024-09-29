import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import WebCam from './components/camera';
import Ranks from './components/ranks';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<WebCam />}/>
        <Route path='/ranks' element={<Ranks />} />
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
