// src/assets/Components/product/SkeletonCard.jsx

const SkeletonCard = () => {
  return (
    // Usamos 'animate-pulse' de Tailwind para el efecto de carga
    <div className="relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm animate-pulse">
      
      {/* Esqueleto de la Imagen (aspect-square) */}
      <div className="aspect-square bg-gray-200" />

      {/* Esqueleto de la Información */}
      <div className="p-4 space-y-3">
        {/* Esqueleto de la Categoría */}
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        
        {/* Esqueleto del Nombre (dos líneas simuladas) */}
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
        </div>
        
        {/* Esqueleto del Footer (Precio y Botón) */}
        <div className="flex items-center justify-between mt-5 pt-2">
          {/* Precio */}
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          {/* Botón Circular */}
          <div className="w-9 h-9 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;