import { useState, useEffect } from 'react';
import Icon from './Icons';
import { fetchGuests, updateGuestConfirmation, type Guest } from '../lib/api';

export default function Assist() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      setLoading(true);
      const data = await fetchGuests();
      setGuests(data);
    } catch (error) {
      console.error('Error loading guests:', error);
      // Fallback to empty array on error
      setGuests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id: number, confirmed: boolean) => {
    try {
      const updatedGuest = await updateGuestConfirmation(id, confirmed);
      setGuests(guests.map(guest =>
        guest.id === id ? updatedGuest : guest
      ));
    } catch (error) {
      console.error('Error updating guest:', error);
      alert('Error al actualizar la confirmación. Por favor intenta de nuevo.');
    }
  };

  const filteredGuests = guests.filter(guest =>
    guest.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmedCount = guests.filter(g => g.confirmed === true).length;

  const getInitial = (name: string | null) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const scrollToGifts = () => {
    const element = document.getElementById('regalos');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="confirmar" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-purple-100 text-purple-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
              <Icon name="group" className="text-purple-700" size={16} />
              <span>Confirmación de Asistencia</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            ¿Nos acompañas?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Para confirmar tu asistencia, busca tu nombre o el de tu acompañante en la lista.
            Si no encuentras tu nombre, por favor contáctanos a Jimmy o Tatis.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="search" className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition bg-white"
                placeholder="Buscar por nombre..."
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-base text-gray-600">Cargando invitados...</p>
            </div>
          )}

          {/* Attendees List */}
          {!loading && (
            <div className="mb-6">
              <div className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {filteredGuests.length === 0 ? (
                  <p className="text-center text-base text-gray-500 py-8">No se encontraron resultados</p>
                ) : (
                  filteredGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="bg-gray-50 rounded-xl p-4 shadow-sm flex items-center justify-center gap-4 hover:bg-gray-100 transition-colors"
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {getInitial(guest.name)}
                      </div>

                      {/* Name and Status */}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-medium text-base break-words leading-tight">{guest.name || 'Sin nombre'}</p>
                        {guest.confirmed === true && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm text-green-600 font-medium whitespace-nowrap">✓ Confirmado</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-start gap-2 flex-shrink-0 pt-0.5">
                        <button
                          onClick={() => handleConfirm(guest.id, true)}
                          className={`
                            w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-full font-medium text-sm transition-colors flex items-center justify-center
                            ${guest.confirmed === true
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
                          `}
                        >
                          <Icon name="check" size={16} />
                          <span className="hidden sm:inline ml-1">Sí</span>
                        </button>
                        <button
                          onClick={() => handleConfirm(guest.id, false)}
                          className={`
                            w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-full font-medium text-sm transition-colors flex items-center justify-center
                            ${guest.confirmed === false
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
                          `}
                        >
                          <Icon name="close" size={16} />
                          <span className="hidden sm:inline ml-1">No</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Confirmation Summary */}
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 rounded-full px-4 py-2 flex items-center gap-2">
              <Icon name="group" className="text-pink-600" size={20} />
              <span className="text-sm text-pink-700 font-semibold">{confirmedCount} confirmados</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <button
            onClick={scrollToGifts}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl text-base"
          >
            <span>Quiero compartir un presente o un mensaje</span>
            <Icon name="keyboard_arrow_down" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
