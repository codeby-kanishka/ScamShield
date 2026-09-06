import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#070B14] text-slate-100">
        <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/register" element={<Register />} />
  <Route path="/reports" element={<Reports />} />
</Routes>
      </div>
    </BrowserRouter>
  )
}

export default App