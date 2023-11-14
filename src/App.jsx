import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import All from './components/All';
import About from './components/About';
import Post from './components/Post';
import Plant from './components/Plant';
import PlantEdit from './components/PlantEdit' ;
import Oops from './components/Oops';
import './App.css';
import { createClient } from '@supabase/supabase-js';

const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_KEY;

function App() {

  const supabase = createClient(PROJECT_URL, API_KEY);
  
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={ <Main/>} >
              <Route path="/" element={ <Home supabase={supabase}/> } />
              <Route path="/all" element={ <All supabase={supabase}/> } />
              <Route path="/post" element={ <Post supabase={supabase}/> } />
              <Route path="/plant/:id" element={ <Plant supabase={supabase}/> } />
              <Route path="/edit/:id" element={ <PlantEdit supabase={supabase}/> } />
              <Route path="/about" element={ <About /> } />
              <Route path="*" element={ <Oops /> } />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
