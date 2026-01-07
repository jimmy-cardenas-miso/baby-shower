import { useState } from 'react';

interface Message {
  id: number;
  name: string;
  message: string;
  date: string;
}

export default function Mensajes() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: 'María González',
      message: '¡Estamos muy emocionados por el baby shower! No podemos esperar para celebrar con ustedes.',
      date: '2024-12-15',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      message: 'Muchas bendiciones para el nuevo miembro de la familia. ¡Felicidades!',
      date: '2024-12-14',
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
      };
      setMessages([message, ...messages]);
      setNewMessage({ name: '', message: '' });
    }
  };

  return (
    <section id="mensajes" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          Mensajes de Cariño
        </h2>
        
        {/* Form to add new message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Deja un mensaje</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition"
              required
            />
            <textarea
              placeholder="Tu mensaje..."
              rows={4}
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition resize-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
        
        {/* Messages list */}
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{msg.name}</h4>
                    <p className="text-sm text-gray-500">{msg.date}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

