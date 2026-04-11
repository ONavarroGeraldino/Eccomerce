import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const Navbar = () => {
  const { totalItems, user, logout } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-black text-xl">ON</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-gray-900 uppercase">
            STORE <span className="font-light text-gray-400">ON</span>
          </span>
        </Link>

        {/* Menú de Navegación */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Inicio</Link>
          <a href="#categorias" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Categorías</a>
          <Link to="/mis-compras" className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Mis Pedidos</Link>
        </div>

        {/* Acciones (Carrito & Auth) */}
        <div className="flex items-center gap-4">
          
          {/* Carrito con Badge Dinámico */}
          <Link to="/checkout" className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.112 16.856a.625.625 0 0 1-.624.667H4.89a.625.625 0 0 1-.624-.667l1.112-16.856a.625.625 0 0 1 .624-.667h13.712a.625.625 0 0 1 .624.667Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>

          {/* Autenticación */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-gray-400 hidden lg:block">
                {user.email.split('@')[0]}
              </span>
              <button 
                onClick={logout}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-gray-200"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;