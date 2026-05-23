# STORE ON - E-commerce 🛍️

Tienda virtual de productos minimalistas para espacios modernos (muebles, tecnología, iluminación, accesorios y audio). Construido con **React 19**, **Vite 8**, **Tailwind CSS 4**, **Supabase** y **React Router**.

## ✨ Características

- **Catálogo de productos** — Exploración con cuadrícula responsive de 1 a 4 columnas.
- **Búsqueda en tiempo real** — Filtrado de productos por nombre mientras escribes.
- **Filtro por categorías** — Muebles, Tecnología, Iluminación, Accesorios y Audio.
- **Carrito de compras** — Agregar, incrementar, decrementar y eliminar productos con persistencia en `localStorage`.
- **Stock en tiempo real** — Control de inventario que se actualiza al agregar/eliminar del carrito.
- **Autenticación con Supabase** — Registro e inicio de sesión con email/contraseña.
- **Rutas protegidas** — Páginas de checkout y compras solo para usuarios autenticados.
- **Procesamiento de pedidos** — Confirmación de compra con registro en base de datos y actualización de stock.
- **Historial de compras** — Visualización de pedidos anteriores con resumen de gastos.
- **Protección de stock** — Validación antes de agregar al carrito y al confirmar compra.
- **Notificaciones toast** — Feedback visual en acciones (añadir, error, éxito) con `react-hot-toast`.
- **Indicadores de stock** — Etiquetas visuales: disponible, bajo stock (≤3) y agotado.
- **Diseño moderno** — Efectos glass, gradientes, animaciones y sombras.
- **Navbar sticky** — Menú de navegación con indicador de página activa y badge del carrito.
- **Footer con newsletter** — Formulario de suscripción y enlaces de asistencia.

## 🛠️ Tecnologías y Herramientas

| Herramienta          | Versión | Propósito                              |
|----------------------|---------|----------------------------------------|
| React                | 19      | UI y lógica de componentes             |
| Vite                 | 8       | Bundler y dev server rápido            |
| Tailwind CSS         | 4       | Estilos utilitarios                    |
| Supabase             | 2       | Base de datos, autenticación y API     |
| React Router DOM     | 7       | Enrutamiento SPA (BrowserRouter)       |
| react-hot-toast      | 2       | Notificaciones toast                    |
| ESLint               | 9       | Linter de código                       |
| @vitejs/plugin-react | 6       | Integración de React con Vite          |
| React Compiler       | 1.0     | Optimización automática de re-renders  |

## 🔑 Configuración

Crea un archivo `.env.local` en la raíz con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=tu_url_aqui
VITE_SUPABASE_ANON_KEY=tu_key_aqui
```

Crea las siguientes tablas en tu proyecto de Supabase:

- **`products`** — `id`, `name`, `price`, `stock`, `category`, `image_url`, `created_at`
- **`orders`** — `id`, `user_id`, `items` (jsonb), `total_price`, `created_at`

## 🚀 Scripts

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Previsualiza la build
npm run lint     # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx    # Ruta protegida para usuarios autenticados
│   ├── layout/
│   │   ├── Navbar.jsx            # Barra de navegación con carrito y menú móvil
│   │   └── Footer.jsx            # Footer con newsletter y enlaces
│   ├── product/
│   │   ├── ProductCard.jsx       # Tarjeta de producto con imagen y badge de stock
│   │   └── SkeletonCard.jsx      # Esqueleto de carga para productos
│   └── ui/
│       └── ErrorBoundary.jsx     # Manejo de errores en la UI
├── context/
│   ├── CartContext.jsx           # Estado global del carrito, auth e inventario
│   └── useCart.js                # Hook personalizado para consumir el contexto
├── data/
│   └── products.js               # Datos de productos (fallback local)
├── lib/
│   └── supabase.js               # Cliente de Supabase
├── pages/
│   ├── Home.jsx                  # Tienda con búsqueda, categorías y productos
│   ├── Checkout.jsx              # Resumen de compra y confirmación de pago
│   ├── MyPurchases.jsx           # Historial de pedidos del usuario
│   └── Login.jsx                 # Inicio de sesión y registro
├── App.jsx                       # Punto de entrada con routing y providers
├── main.jsx                      # Renderizado con CartProvider
└── index.css                     # Estilos base Tailwind
```
