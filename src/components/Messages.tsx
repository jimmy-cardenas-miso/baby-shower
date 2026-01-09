import { useState, useEffect } from 'react';
import Icon from './Icons';
import { fetchMessages, createMessage, likeMessage, type Message } from '../lib/api';

const avatarColors = ['bg-pink-500', 'bg-purple-500', 'bg-blue-500'];

const getAvatarColor = (index: number) => {
  return avatarColors[index % avatarColors.length];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({
    name: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages();
      // Sort by created_at descending (newest first)
      const sorted = data.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setMessages(sorted);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;

    try {
      setSubmitting(true);
      const created = await createMessage(
        newMessage.name.trim(),
        newMessage.message.trim()
      );
      setMessages([created, ...messages]);
      setNewMessage({ name: '', message: '' });
    } catch (error) {
      console.error('Error creating message:', error);
      alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (messageId: string) => {
    try {
      const updated = await likeMessage(messageId);
      setMessages(messages.map(msg => 
        msg.id === messageId ? updated : msg
      ));
    } catch (error) {
      console.error('Error liking message:', error);
    }
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <section id="mensajes" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-pink-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Icon name="chat" className="text-blue-700" size={16} />
            <span>Mural de Mensajes</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
            Deja tus Bendiciones
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg">
            Comparte tus mejores deseos para Emily y familia
          </p>
        </div>

        {/* Message Input Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              required
              disabled={submitting}
            />
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
              required
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              {submitting ? (
                <>Enviando...</>
              ) : (
                <>
                  <Icon name="send" size={20} />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando mensajes...</p>
          </div>
        )}

        {/* Messages List */}
        {!loading && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Aún no hay mensajes. ¡Sé el primero en dejar una bendición!</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={msg.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative"
                >
                  {/* Like Button - Top Right */}
                  <button
                    onClick={() => handleLike(msg.id)}
                    className="absolute top-4 right-4 flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    <Icon name="favorite" size={20} />
                    <span className="text-sm">{msg.likes}</span>
                  </button>

                  {/* Message Content */}
                  <div className="flex items-start gap-4 pr-12">
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-12 h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {getInitial(msg.author_name)}
                    </div>

                    {/* Message Info */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg mb-1">
                        {msg.author_name}
                      </h4>
                      <p className="text-sm text-gray-500 mb-3">
                        {formatDate(msg.created_at)}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        section#mensajes::-webkit-scrollbar {
          width: 8px;
        }
        section#mensajes::-webkit-scrollbar-track {
          background: transparent;
        }
        section#mensajes::-webkit-scrollbar-thumb {
          background: #f9a8d4;
          border-radius: 4px;
        }
        section#mensajes::-webkit-scrollbar-thumb:hover {
          background: #f472b6;
        }
      `}</style>
    </section>
  );
}
