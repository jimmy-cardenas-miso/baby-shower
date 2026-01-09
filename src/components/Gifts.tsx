import { useState, useEffect, useMemo } from 'react';
import { fetchGifts, reserveGift, removeReservation, type Gift } from '../lib/api';
import Icon from './Icons';

export default function Gifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [reservingGiftId, setReservingGiftId] = useState<string | null>(null);
  const [showingReserveForm, setShowingReserveForm] = useState<string | null>(null);
  const [reserveName, setReserveName] = useState<string>('');

  // Extraer categorías únicas de los gifts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(gifts.map(gift => gift.category).filter(Boolean)));
    return uniqueCategories.sort();
  }, [gifts]);

  useEffect(() => {
    loadGifts();
  }, []);

  const loadGifts = async () => {
    try {
      setLoading(true);
      const data = await fetchGifts();
      setGifts(data);
    } catch (error) {
      console.error('Error loading gifts:', error);
      // Fallback to empty array on error
      setGifts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGifts = activeFilter === 'todos' 
    ? gifts 
    : gifts.filter(gift => gift.category === activeFilter);

  const handleReserveClick = (giftId: string) => {
    if (showingReserveForm === giftId) {
      // Si ya está mostrando el formulario para este gift, cerrarlo
      setShowingReserveForm(null);
      setReserveName('');
    } else {
      // Mostrar el formulario para el nuevo gift
      setShowingReserveForm(giftId);
      setReserveName('');
    }
  };

  const handleConfirmReserve = async (giftId: string) => {
    if (!reserveName || !reserveName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    try {
      setReservingGiftId(giftId);
      const updatedGift = await reserveGift(giftId, reserveName.trim());
      setGifts(gifts.map(g => g.id === giftId ? updatedGift : g));
      setShowingReserveForm(null);
      setReserveName('');
    } catch (error) {
      console.error('Error reserving gift:', error);
      alert('Error al reservar el regalo. Por favor intenta de nuevo.');
    } finally {
      setReservingGiftId(null);
    }
  };

  const handleCancelReserve = () => {
    setShowingReserveForm(null);
    setReserveName('');
  };

  const handleRemoveReservation = async (giftId: string, userName: string) => {
    try {
      const updatedGift = await removeReservation(giftId, userName);
      setGifts(gifts.map(g => g.id === giftId ? updatedGift : g));
    } catch (error) {
      console.error('Error removing reservation:', error);
      alert('Error al eliminar la reserva. Por favor intenta de nuevo.');
    }
  };

  const getReservations = (gift: Gift): string[] => {
    // Use reservations array if available, otherwise fallback to reserved_by
    if (gift.reservations && gift.reservations.length > 0) {
      return gift.reservations;
    }
    if (gift.reserved_by) {
      return [gift.reserved_by];
    }
    return [];
  };

  const isAvailable = (gift: Gift): boolean => {
    // Permite reservar siempre, incluso si ya hay reservas
    // El sistema permite múltiples reservas por regalo
    return true;
  };

  return (
    <section id="regalos" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Icon name="card_giftcard" className="text-pink-700" size={16} />
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
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full mb-4">
            <Icon name="eco" size={16} />
            <span>
              Cuidemos juntos el medio ambiente, se vale recircular objetos de segunda mano y evitar papel regalo de un sólo uso ❤️
            </span>
          </div>

          {/* Multiple Reservations Message */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full mb-8">
            <Icon name="info" size={16} />
            <span>
              Recuerda que el mismo regalo puede ser reservado por varias personas 🎁
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
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando regalos...</p>
          </div>
        )}

        {/* Gifts Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGifts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600">No hay regalos disponibles en esta categoría.</p>
              </div>
            ) : (
              filteredGifts.map((gift) => {
                const reservations = getReservations(gift);
                const available = isAvailable(gift);

                return (
                  <div
                    key={gift.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {gift.image_url ? (
                        <img
                          src={`/images/${gift.image_url}`}
                          alt={gift.name}
                          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                      ) : (
                        <div className="text-6xl">{gift.icon || '🐣'}</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      {/* Price Range */}
                      <p className="text-xs text-gray-500 mb-2">{gift.category}</p>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {gift.name}
                      </h3>

                      {/* Description */}
                      {gift.description && (
                        <p className="text-sm text-gray-600 mb-4">{gift.description}</p>
                      )}

                      {/* Reservations */}
                      {reservations.length > 0 && (
                        <div className="mb-4 bg-purple-50 rounded-lg p-3">
                          <div className="flex items-center gap-1 mb-2">
                            <Icon name="person" className="text-gray-500" size={16} />
                            <span className="text-sm text-gray-600">
                              {reservations.length} {reservations.length === 1 ? 'persona ha reservado' : 'personas han reservado'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {reservations.map((name, index) => (
                              <span
                                key={index}
                                className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5"
                              >
                                {name}
                                <button
                                  onClick={() => handleRemoveReservation(gift.id, name)}
                                  className="hover:bg-pink-200 rounded-full p-0.5 transition-colors"
                                  aria-label={`Eliminar reserva de ${name}`}
                                >
                                  <Icon name="close" size={14} />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reserve Form or Action Buttons */}
                      {showingReserveForm === gift.id ? (
                        <div className="mt-4 space-y-3">
                          <input
                            type="text"
                            value={reserveName}
                            onChange={(e) => setReserveName(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleConfirmReserve(gift.id);
                              } else if (e.key === 'Escape') {
                                handleCancelReserve();
                              }
                            }}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleConfirmReserve(gift.id)}
                              disabled={reservingGiftId === gift.id || !reserveName.trim()}
                              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                            >
                              {reservingGiftId === gift.id ? 'Guardando...' : 'Confirmar'}
                            </button>
                            <button
                              onClick={handleCancelReserve}
                              disabled={reservingGiftId === gift.id}
                              className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 mt-4">
                          {available && (
                            <button
                              onClick={() => handleReserveClick(gift.id)}
                              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Icon name="check" size={16} />
                              <span>Reservar</span>
                            </button>
                          )}
                          {gift.product_url && (
                            <button
                              onClick={() => window.open(gift.product_url!, '_blank')}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Icon name="open_in_new" size={16} />
                              <span>Ver Producto</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
}
