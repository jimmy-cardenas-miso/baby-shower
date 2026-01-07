import { useState, useEffect } from 'react';
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
    <section id="confirmar" className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-base text-purple-700">
                group
              </span>
              <span>Confirmación de Asistencia</span>
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            ¿Nos acompañas?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Para confirmar tu asistencia, busca tu nombre o el de tu acompañante en la lista. 
            Si no encuentras tu nombre, por favor contáctanos a Diego o Xiomy.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-lg text-gray-400">
                  search
                </span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
                placeholder="Buscar por nombre..."
              />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Cargando invitados...</p>
            </div>
          )}

          {/* Attendees List */}
          {!loading && (
            <div className="max-h-96 overflow-y-auto mb-6 space-y-3 pr-2">
              {filteredGuests.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No se encontraron resultados</p>
              ) : (
                filteredGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {getInitial(guest.name)}
                    </div>

                    {/* Name and Status */}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium truncate">{guest.name || 'Sin nombre'}</p>
                      {guest.confirmed && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-base text-green-500">
                            check_circle
                          </span>
                          <span className="text-sm text-green-600 font-medium">Confirmado</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleConfirm(guest.id, true)}
                        className={`
                          px-4 py-2 rounded-lg font-medium text-sm transition-colors
                          ${guest.confirmed === true
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }
                        `}
                      >
                        ✓ Sí
                      </button>
                      <button
                        onClick={() => handleConfirm(guest.id, false)}
                        className={`
                          px-4 py-2 rounded-lg font-medium text-sm transition-colors
                          ${guest.confirmed === false
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }
                        `}
                      >
                        × No
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Confirmation Summary */}
          <div className="flex justify-center mb-6">
            <div className="bg-pink-100 rounded-full px-4 py-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-pink-600">
                group
              </span>
              <span className="text-pink-700 font-semibold">{confirmedCount} confirmados</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <button
            onClick={scrollToGifts}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
          >
            <span>Quiero compartir un presente o un mensaje</span>
            <span className="material-symbols-outlined text-lg">
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
