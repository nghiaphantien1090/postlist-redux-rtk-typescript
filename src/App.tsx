import React from 'react';
import './App.css';
import {BrowserRouter,Navigate,Routes,Route }from 'react-router-dom'
import { Home } from './features/post/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<Home />} />
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
