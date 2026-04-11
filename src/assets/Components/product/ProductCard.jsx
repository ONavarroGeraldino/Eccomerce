import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Verificación de seguridad: si el objeto no llega, evitamos el crash
  if (!product) return null;

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product?.name || 'Producto'} añadido`, {
      style: { 
        borderRadius: '10px', 
        background: '#333', 
        color: '#fff',
        fontSize: '12px' 
      },
    });
  };

  return (
    <div className="group">
      {/* Contenedor de Imagen con Aspect Ratio cuadrado */}
      <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-square mb-4">
        <img 
          // Prioriza image_url de Supabase, luego image local, y finalmente un placeholder
          src={product?.image_url || product?.image || 'https://via.placeholder.com/400'} 
          alt={product?.name || 'Producto'}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Botón de Añadir (Aparece al hacer hover) */}
        <button 
          onClick={handleAdd}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Información del Producto */}
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-gray-900 truncate">
          {product?.name || 'Cargando producto...'}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            {product?.category || 'General'}
          </p>
          <p className="text-sm font-black text-blue-600">
            ${product?.price || '0.00'}
          </p>
        </div>
        <div className="flex justify-between items-center pt-1">
          <p className="text-[10px] text-gray-300 font-medium uppercase">
            Stock disponible
          </p>
          <p className="text-[10px] font-bold text-gray-400">
            {product?.stock ?? 0} uds
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;