import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, processPurchase, totalItems } = useCart();
  const navigate = useNavigate();

  // Cálculos de montos
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0; // Envío fijo si hay productos
  const total = subtotal + shipping;

  const handleFinalPurchase = async () => {
    const loadingToast = toast.loading('Procesando tu pedido...');
    
    const result = await processPurchase();

    if (result.success) {
      toast.success('¡Compra realizada con éxito!', { id: loadingToast });
      navigate('/mis-compras'); // Redirigimos al historial
    } else {
      toast.error(`Error: ${result.error}`, { id: loadingToast });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-light text-gray-400 mb-6">Tu carrito está vacío</h2>
        <Link to="/" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black tracking-tighter text-gray-900 mb-12 uppercase">
        Finalizar <span className="font-light text-blue-600">Compra</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Lista de Productos (Izquierda) */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-6 bg-white border border-gray-100 p-4 rounded-3xl hover:shadow-sm transition-all">
              <img 
                src={item.image_url || item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-2xl bg-gray-50"
              />
              
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{item.category}</p>
                <p className="text-blue-600 font-black mt-1">${item.price}</p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-red-500 transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-blue-600 transition-colors"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-gray-300 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-1.256c0-1.106-.892-2.106-1.992-2.106h-3.824c-1.1 0-1.992.892-1.992 2.106v1.256" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Resumen de Pago (Derecha) */}
        <div className="lg:col-span-4">
          <div className="bg-gray-900 text-white p-8 rounded-[2rem] sticky top-32 shadow-2xl shadow-blue-200">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-blue-400">Resumen</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Productos ({totalItems})</span>
                <span className="font-mono">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Envío</span>
                <span className="font-mono">${shipping.toFixed(2)}</span>
              </div>
              <div className="h-[1px] bg-gray-800 my-4"></div>
              <div className="flex justify-between text-xl font-black">
                <span>TOTAL</span>
                <span className="text-blue-400 font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleFinalPurchase}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-lg shadow-blue-900/50"
            >
              Confirmar Pago
            </button>
            
            <p className="text-[10px] text-gray-500 mt-6 text-center uppercase tracking-widest leading-relaxed">
              Al confirmar, el stock será actualizado automáticamente en nuestra base de datos.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;