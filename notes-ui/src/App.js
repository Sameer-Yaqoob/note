import React from 'react';
import Home from './pages/home';
import Notes from './pages/notes'

import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";

import './App.css';
import { NoteIcon } from './components/icons';

function App() {

  return (
    <BrowserRouter>
      <div className="container mt-10 xl:w-4/5  mx-auto space-y-10">
        <header className='text-center text-3xl flex justify-center items-center '>
          <NoteIcon />
          <div>
            <h1>Notes App</h1>
          </div>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:id' element={<Notes />} />
        </Routes>

      </div>
    </BrowserRouter>


  );
}

export default App;
