import { useState } from 'react';

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
  likes: number;
}

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

export default function Mensajes() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'Beatriz de Clavijo',
      message: '¡Felicidades! Que Emily llegue llena de salud y bendiciones. Estamos muy felices por ustedes.',
      date: '2025-12-13',
      likes: 1,
    },
    {
      id: 2,
      name: 'Maria Fernanda Ortiz Castillo',
      message: 'Muchas bendiciones para Emily y toda la familia. Que este nuevo capítulo esté lleno de amor y alegría.',
      date: '2025-12-13',
      likes: 0,
    },
    {
      id: 3,
      name: 'Laura Núñez',
      message: '¡Qué hermoso momento! Emily será muy afortunada de tener una familia tan especial. Bendiciones infinitas.',
      date: '2025-12-12',
      likes: 2,
    },
  ]);

  const [newMessage, setNewMessage] = useState({
    name: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.name && newMessage.message) {
      const message: Message = {
        id: messages.length + 1,
        name: newMessage.name,
        message: newMessage.message,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
      };
      setMessages([message, ...messages]);
      setNewMessage({ name: '', message: '' });
    }
  };

  const handleLike = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <section id="mensajes" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-blue-200 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
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
            />
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <span>Enviar Mensaje</span>
            </button>
          </form>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow relative"
            >
              {/* Like Button - Top Right */}
              <button
                onClick={() => handleLike(msg.id)}
                className="absolute top-4 right-4 flex items-center gap-1 text-gray-400 hover:text-pink-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="text-sm">{msg.likes}</span>
              </button>

              {/* Message Content */}
              <div className="flex items-start gap-4 pr-12">
                {/* Avatar */}
                <div className={`flex-shrink-0 w-12 h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {getInitial(msg.name)}
                </div>

                {/* Message Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg mb-1">
                    {msg.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    {formatDate(msg.date)}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
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
