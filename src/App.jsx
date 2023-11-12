import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Main from './components/Main'
import Home from './components/Home'
import About from './components/About'
import Post from './components/Post'
import Plant from './components/Plant'
import PlantEdit from './components/PlantEdit' 
import Oops from './components/Oops'
import './App.css'


function App() {
  
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={ <Main/>} >
              <Route path="/" element={ <Home /> } />
              <Route path="/Post" element={ <Post /> } />
              <Route path="/plant:id" element={ <Plant /> } />
              <Route path="/plant/edit:id" element={ <PlantEdit /> } />
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
