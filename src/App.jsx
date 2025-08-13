import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Feature from './pages/Feature/Feature'
import Blog from './pages/Blog/Blog'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin/:coinId' element={<Coin/>}/>
        <Route path='/feature' element={<Feature/>}/>
        <Route path='/blog' element={<Blog/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
