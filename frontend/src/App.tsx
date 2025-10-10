import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ChatbotWidget from './components/ChatbotWidget'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostFood from './pages/PostFood'
import CollectorDashboard from './pages/CollectorDashboard'
import ProofOfDelivery from './pages/ProofOfDelivery'
import About from './pages/About'
import Tech from './pages/Tech'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import FAQs from './pages/FAQs'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<ProtectedRoute role="donor"><PostFood /></ProtectedRoute>} />
          <Route path="/collector" element={<ProtectedRoute role="collector"><CollectorDashboard /></ProtectedRoute>} />
          <Route path="/proof/:pickupId" element={<ProtectedRoute role="collector"><ProofOfDelivery /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/tech" element={<Tech />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
        </Routes>
        <ChatbotWidget />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
