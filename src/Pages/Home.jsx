import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../assets/Components/product/ProductCard';

const Home = () => {
  const { inventory, loading } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // 1. Aseguramos que inventory sea un array antes de mapear categorías
  const categories = ["Todos", ...new Set((inventory || []).map(p => p.category))];

  // 2. Lógica de filtrado con protección total contra undefined/null
  const filteredProducts = (inventory || []).filter((product) => {
    // Limpiamos los valores para comparar strings de forma segura
    const name = product?.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    const category = product?.category || "";

    const matchesSearch = name.includes(search);
    const matchesCategory = activeCategory === "Todos" || category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-extralight tracking-tighter text-gray-900">
              Store <span className="font-bold">ON</span>
            </h1>
            <div className="h-1 w-20 bg-blue-600 mt-4"></div>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl py-4 px-12 text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
            />
            {/* SVG del buscador omitido por brevedad */}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                activeCategory === category
                  ? "bg-gray-900 text-white shadow-xl"
                  : "bg-white border border-gray-100 text-gray-400 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div id="productos" className="scroll-mt-24">
        {/* Usamos el operador ternario para mostrar el grid o el mensaje de vacío */}
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
            {/* Botón de reset para experiencia de usuario */}
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory("Todos")}}
              className="mt-4 text-blue-600 underline text-sm"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;