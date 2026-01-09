import { useState, useEffect } from 'react';
import Icon from './Icons';

interface NavItem {
  id: string;
  label: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    icon: (
      <Icon name="child_care" className="text-pink-500" size={24} />
    ),
  },
  {
    id: 'informacion',
    label: 'Información',
    icon: (
      <Icon name="location_on" size={24} />
    ),
  },
  {
    id: 'confirmar',
    label: 'Confirmar',
    icon: (
      <Icon name="group" size={24} />
    ),
  },
  {
    id: 'regalos',
    label: 'Regalos',
    icon: (
      <Icon name="featured_seasonal_and_gifts" size={24} />
    ),
  },
  {
    id: 'mensajes',
    label: 'Mensajes',
    icon: (
      <Icon name="chat_bubble" size={24} />
    ),
  },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="hidden md:inline-flex">
              <Icon name="child_care" className="text-pink-500" size={24} />
            </div>
            <span className="text-sm sm:text-lg md:text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Baby Shower<br className="md:hidden" /> Emily
            </span>
          </div>

          {/* Navigation Items - Desktop: with text, Mobile: icons only */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  flex items-center justify-center transition-all duration-200
                  p-2 rounded-lg
                  md:gap-2 md:px-4 md:py-2
                  ${
                    activeSection === item.id
                      ? 'bg-pink-100 text-pink-600'
                      : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                  }
                `}
                title={item.label}
              >
                <span
                  className={`flex items-center justify-center ${
                    activeSection === item.id ? 'text-pink-600' : 'text-gray-400'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="hidden md:inline text-sm font-medium ml-0">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

