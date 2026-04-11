// src/context/CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // --- 1. ESTADOS DE USUARIO E INVENTARIO ---
  const [user, setUser] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart_storage');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al leer cart_storage:", error);
      return [];
    }
  });

  const [purchasedIds, setPurchasedIds] = useState(() => {
    try {
      const savedPurchased = localStorage.getItem('purchased_items');
      return savedPurchased ? JSON.parse(savedPurchased) : [];
    } catch (error) {
      console.error("Error al leer purchased_items:", error);
      return [];
    }
  });

  // --- 2. GESTIÓN DE SESIÓN (AUTH) ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- 3. CARGA DE PRODUCTOS DESDE SUPABASE ---
  // He centralizado esto para asegurar que loading se maneje bien
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setInventory(data || []);
    } catch (error) {
      console.error('Error cargando productos:', error.message);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 4. PERSISTENCIA LOCAL ---
  useEffect(() => {
    localStorage.setItem('cart_storage', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('purchased_items', JSON.stringify(purchasedIds));
  }, [purchasedIds]);

  // --- 5. LÓGICA DEL CARRITO ---

  const addToCart = (product) => {
    // Verificamos stock en el estado local del inventario
    const itemInInventory = inventory.find(p => p.id === product.id);
    if (!itemInInventory || itemInInventory.stock <= 0) return;

    // Reducimos stock visualmente en el inventario local
    setInventory(prev => prev.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    ));

    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    const itemInCart = cart.find(item => item.id === productId);
    if (!itemInCart) return;

    // Devolvemos el stock al inventario local
    setInventory(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: p.stock + itemInCart.quantity } : p
    ));

    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    const itemInInventory = inventory.find(p => p.id === productId);
    
    // Si queremos aumentar y no hay stock, salimos
    if (amount > 0 && (!itemInInventory || itemInInventory.stock <= 0)) return;

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + amount);
          
          // Solo actualizamos el inventario si la cantidad realmente cambió
          if (newQuantity !== item.quantity) {
            setInventory(prev => prev.map(p => 
              p.id === productId ? { ...p, stock: p.stock - amount } : p
            ));
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // --- 6. PROCESAR COMPRA ---
  const processPurchase = async () => {
    if (cart.length === 0 || !user) {
      return { success: false, error: 'Inicia sesión para completar la compra' };
    }

    try {
      const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      // 1. Insertar pedido
      const { error: orderError } = await supabase
        .from('orders')
        .insert([
          { 
            user_id: user.id, 
            items: cart, 
            total_price: totalPrice 
          }
        ]);

      if (orderError) throw orderError;

      // 2. Actualizar stock real en DB de forma atómica por producto
      for (const item of cart) {
        const itemInInv = inventory.find(p => p.id === item.id);
        const { error: stockError } = await supabase
          .from('products')
          .update({ stock: itemInInv.stock })
          .eq('id', item.id);
        
        if (stockError) throw stockError;
      }

      // 3. Finalizar proceso local
      const newIdsFromCart = cart.map(item => item.id);
      setPurchasedIds((prev) => [...new Set([...prev, ...newIdsFromCart])]);
      clearCart();
      
      return { success: true };
    } catch (error) {
      console.error("Error en la transacción:", error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      user, 
      inventory, 
      loading,
      cart, 
      purchasedIds, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      processPurchase, 
      logout,
      totalItems,
      fetchProducts // Útil por si quieres un botón de "Refrescar"
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};