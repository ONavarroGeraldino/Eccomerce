import { Navigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useCart();

  // Mientras Supabase verifica la sesión, no mostramos nada o un spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen uppercase text-[10px] font-bold tracking-[0.3em] text-gray-400">
        Verificando credenciales...
      </div>
    );
  }

  // Si no hay usuario, redirigimos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, permitimos ver el contenido
  return children;
};

export default ProtectedRoute;