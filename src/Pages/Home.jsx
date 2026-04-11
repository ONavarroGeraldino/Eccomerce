import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../assets/Components/product/ProductCard';

const Home = () => {
  const { inventory, loading } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Obtención de categorías únicas
  const categories = ["Todos", ...new Set((inventory || []).map(p => p.category))];

  // 2. Lógica de filtrado
  const filteredProducts = (inventory || []).filter((product) => {
    const name = product?.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    const category = product?.category || "";

    const matchesSearch = name.includes(search);
    const matchesCategory = activeCategory === "Todos" || category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // 3. Manejador de selección para móvil
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <header id="categorias" className="space-y-8 mb-16 scroll-mt-24">
        {/* Título y Buscador */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-extralight tracking-tighter text-gray-900">
              Store <span className="font-bold text-blue-600">ON</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 mt-4"></div>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
          </div>
        </div>

        {/* --- SECCIÓN DE CATEGORÍAS --- */}
        <div className="relative">
          
          {/* VISTA MÓVIL: Selector Desplegable */}
          <div className="md:hidden flex flex-col items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full max-w-[280px] bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest flex justify-between items-center shadow-xl shadow-blue-100"
            >
              <span>Categoría: {activeCategory}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute top-16 z-30 w-full max-w-[280px] bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-left transition-colors
                      ${activeCategory === category ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VISTA DESKTOP: Botones Horizontales */}
          <div className="hidden md:flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  min-w-[140px] px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border
                  ${activeCategory === category
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-100 border-blue-600"
                    : "bg-white border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-200"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- GRID DE PRODUCTOS --- */}
      <div id="productos" className="scroll-mt-24">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 font-light text-xl italic">
              No hemos encontrado productos que coincidan.
            </p>
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory("Todos")}}
              className="mt-4 text-blue-600 font-bold uppercase text-xs tracking-widest hover:underline"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;