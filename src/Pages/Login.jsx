import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success("¡Bienvenido de nuevo!");
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    
    if (error) toast.error(error.message);
    else toast.success("Usuario registrado con éxito");
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50">
      <h2 className="text-3xl font-extralight mb-6 text-gray-900 text-center">
        Tu <span className="font-bold">Cuenta</span>
      </h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            placeholder="oswaldo@ejemplo.com"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-2">Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="flex flex-col gap-3 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <button 
            onClick={handleSignUp}
            type="button"
            className="w-full text-gray-400 py-2 text-[10px] font-bold uppercase tracking-widest hover:text-gray-900 transition-colors"
          >
            Crear cuenta nueva
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;