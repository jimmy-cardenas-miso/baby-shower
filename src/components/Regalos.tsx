import { useState } from 'react';

interface Gift {
  id: number;
  title: string;
  description: string;
  priceRange: string;
  category: 'economico' | 'moderado' | 'premium';
  image: string;
  reservedBy: string[];
  productUrl?: string;
}

const gifts: Gift[] = [
  {
    id: 1,
    title: 'Pañales Etapa 2 (Paquete Grande)',
    description: 'Paquete de pañales etapa 2',
    priceRange: 'menor a 100 mil',
    category: 'economico',
    image: 'https://via.placeholder.com/200x200?text=Pañales',
    reservedBy: ['Jolie', 'Giovanni Clavijo', 'Germán y Matilde'],
    productUrl: '#',
  },
  {
    id: 2,
    title: 'Set de paños/baberos',
    description: 'Set de 6 Paños Surtidos',
    priceRange: 'menor a 100 mil',
    category: 'economico',
    image: 'https://via.placeholder.com/200x200?text=Paños',
    reservedBy: ['Valeria'],
    productUrl: '#',
  },
  {
    id: 3,
    title: 'Pijamas de Bebé (6-9 meses)',
    description: 'Conjuntos de pijamas (6-9 meses)',
    priceRange: 'menor a 100 mil',
    category: 'economico',
    image: 'https://via.placeholder.com/200x200?text=Pijamas',
    reservedBy: ['Lina Álvarez', 'Jolie', 'Carol y eliana'],
    productUrl: '#',
  },
  {
    id: 4,
    title: 'Gorro de Bebé',
    description: 'Gorro suave para recién nacido',
    priceRange: 'menor a 100 mil',
    category: 'economico',
    image: 'https://via.placeholder.com/200x200?text=Gorro',
    reservedBy: [],
    productUrl: '#',
  },
  {
    id: 5,
    title: 'Toallitas Húmedas',
    description: 'Paquete grande de toallitas húmedas',
    priceRange: 'menor a 100 mil',
    category: 'economico',
    image: 'https://via.placeholder.com/200x200?text=Toallitas',
    reservedBy: ['María'],
    productUrl: '#',
  },
  {
    id: 6,
    title: 'Cuna Portátil',
    description: 'Cuna portátil plegable',
    priceRange: '100 mil - 300 mil',
    category: 'moderado',
    image: 'https://via.placeholder.com/200x200?text=Cuna',
    reservedBy: ['Carlos'],
    productUrl: '#',
  },
];

export default function Regalos() {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'economico' | 'moderado' | 'premium'>('todos');

  const filteredGifts = activeFilter === 'todos' 
    ? gifts 
    : gifts.filter(gift => gift.category === activeFilter);

  const handleReserve = (giftId: number) => {
    // Aquí iría la lógica para reservar un regalo
    console.log('Reservar regalo:', giftId);
    // En producción, esto haría una llamada a la API
  };

  return (
    <section id="regalos" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
            <span>Lista de Regalos</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Regalos para Emily
          </h2>

          {/* Description */}
          <p className="text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            Tu presencia y tu cariño siempre serán el mejor regalo para nosotros; opcionalmente, puedes elegir un detalle extra o dejar un mensaje para Emily en la siguiente sección.
          </p>

          {/* Environmental Message */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
            <span>
              Cuidemos juntos el medio ambiente, se vale recircular objetos de segunda mano y evitar papel regalo de un sólo uso ❤️
            </span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'todos'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveFilter('economico')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'economico'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Económico
          </button>
          <button
            onClick={() => setActiveFilter('moderado')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'moderado'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Moderado
          </button>
          <button
            onClick={() => setActiveFilter('premium')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === 'premium'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Premium
          </button>
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGifts.map((gift) => (
            <div
              key={gift.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Product Image */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Price Range */}
                <p className="text-xs text-gray-500 mb-2">{gift.priceRange}</p>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {gift.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{gift.description}</p>

                {/* Reservations */}
                {gift.reservedBy.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span className="text-sm text-gray-600">
                        {gift.reservedBy.length} {gift.reservedBy.length === 1 ? 'persona ha reservado' : 'personas han reservado'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gift.reservedBy.map((name, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleReserve(gift.id)}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Reservar</span>
                  </button>
                  {gift.productUrl && (
                    <button
                      onClick={() => window.open(gift.productUrl, '_blank')}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      <span>Ver Producto</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
