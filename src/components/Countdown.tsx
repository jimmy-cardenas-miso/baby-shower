import { useState, useEffect } from 'react';
import Icon from './Icons';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Fecha objetivo: 8 de febrero 2026 a las 2:00 PM (14:00)
    const targetDate = new Date('2026-02-08T14:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Días', value: timeLeft.days, color: 'pink' },
    { label: 'Horas', value: timeLeft.hours, color: 'purple' },
    { label: 'Minutos', value: timeLeft.minutes, color: 'blue' },
    { label: 'Segundos', value: timeLeft.seconds, color: 'green' },
  ];

  const colorClasses = {
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-700',
      bgCard: 'bg-pink-500',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      bgCard: 'bg-purple-500',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      bgCard: 'bg-blue-500',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      bgCard: 'bg-green-500',
    },
  };

  return (
    <section id="countdown" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Icon name="schedule" className="text-purple-700" size={16} />
            <span>Cuenta Regresiva</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            ¡Falta Poco!
          </h2>

          {/* Description */}
          <p className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Estamos contando los días, horas, minutos y segundos para celebrar contigo este momento especial
          </p>
        </div>

        {/* Countdown Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-8">
          {timeUnits.map((unit) => {
            const colors = colorClasses[unit.color as keyof typeof colorClasses];
            return (
              <div
                key={unit.label}
                className="bg-white rounded-2xl p-3 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4`}>
                  <Icon name="schedule" className={`${colors.text} scale-75 sm:scale-100 lg:scale-125`} size={16} />
                </div>
                <div className={`text-2xl sm:text-4xl lg:text-6xl font-bold ${colors.bgCard} text-white rounded-xl py-2 sm:py-3 lg:py-4 mb-2 sm:mb-3`}>
                  {String(unit.value).padStart(2, '0')}
                </div>
                <p className="text-gray-600 font-semibold text-xs sm:text-sm lg:text-base">
                  {unit.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Event Date Reminder */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-gray-700 text-sm font-medium px-6 py-3 rounded-full shadow-md">
            <Icon name="calendar_today" className="text-pink-600" size={18} />
            <span>
              <span className="font-semibold">8 de Febrero 2026</span> a las <span className="font-semibold">2:00 PM</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}