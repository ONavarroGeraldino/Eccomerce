import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';

const MyPurchases = () => {
  const { user } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error al traer pedidos:", error.message);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 animate-pulse">
          Cargando tu historial...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-extralight text-gray-900">
          Mis <span className="font-bold">Compras</span>
        </h1>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-medium">
          Historial de pedidos realizados
        </p>
      </header>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm italic">Aún no has realizado ninguna compra.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between mb-6 pb-6 border-b border-gray-50">
                <div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">ID del Pedido</p>
                  <p className="text-xs font-mono text-gray-400">{order.id.slice(0, 8)}...</p>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Fecha</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(order.created_at).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-lg">
                        📦
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">Cantidad: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Pagado</span>
                <span className="text-xl font-bold text-gray-900">${order.total_price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchases;