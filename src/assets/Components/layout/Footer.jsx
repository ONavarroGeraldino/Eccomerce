import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Columna Logo */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold tracking-tighter text-gray-900">
              STORE ON<span className="text-blue-600">.</span>
            </Link>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
              Soluciones minimalistas para espacios de trabajo modernos.
            </p>
          </div>

          {/* Enlaces de Navegación */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Tienda</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Todos los productos</Link></li>
              <li><Link to="/" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Novedades</Link></li>
              <li><Link to="/" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Categorías</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Asistencia</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Envíos y Entregas</a></li>
              <li><a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Devoluciones</a></li>
              <li><a href="#" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-6">Newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-gray-50 border border-gray-100 rounded-l-lg px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 w-full"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r-lg text-xs hover:bg-blue-600 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Copyright y Créditos */}
        <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © {new Date().getFullYear()} STORE. Todos los derechos reservados a Oswaldo Navarro.
          </p>
          <div className="flex space-x-6">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest cursor-default">Privacidad</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest cursor-default">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;