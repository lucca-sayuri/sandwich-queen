import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Coupons from './pages/Coupons.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cardapio' element={<Menu/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cadastro' element={<Register/>}/>
        <Route path='/cupons' element={<Coupons/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
