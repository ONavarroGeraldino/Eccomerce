// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

// Componentes de Autenticación
import ProtectedRoute from './assets/Components/auth/ProtectedRoute';

// Layout
import Navbar from "./assets/Components/layout/Navbar.jsx";
import Footer from "./assets/Components/layout/Footer.jsx";

// Páginas
import Home from "./Pages/Home.jsx";
import Checkout from "./Pages/Checkout.jsx";
import MyPurchases from './Pages/MyPurchases';
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Configurador de notificaciones */}
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 3000,
            style: { 
              padding: '16px', 
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
            }
          }} 
        />
        
        <Navbar />
        
        <div className="flex-grow">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Rutas Protegidas (Requieren Login) */}
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/mis-compras" 
              element={
                <ProtectedRoute>
                  <MyPurchases />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;