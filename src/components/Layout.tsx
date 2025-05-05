import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen font-quicksand relative bg-white">
      {/* Header with gradient background */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-purple-900/90 shadow-lg backdrop-blur-lg' : 'bg-purple-900'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center h-24">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-lg"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            
            <div className="flex-1 flex justify-center">
              <Link to="/" className="transform hover:scale-105 transition-transform">
                <img 
                  src="https://static.wixstatic.com/media/845141_004686abaf764c77a33842a3c6a3e42a~mv2.png/v1/crop/x_28,y_0,w_418,h_125/fill/w_386,h_116,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/53095737_2171837366230405_32175160118256.png"
                  alt="Aquabike Center Logo"
                  className="h-20 object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Side Navigation */}
      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-64 glass shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="pt-20">
            <nav className="space-y-2">
              {[
                { path: '/', label: 'Accueil' },
                { path: '/aquafitness', label: 'Aquafitness' },
                { path: '/espace-bien-etre', label: 'Espace Bien-être' },
                { path: '/events', label: 'Events' },
                { path: '/babynage', label: 'Bébé Nageur' }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`block text-blue-600 transition-all py-3 px-4 rounded-lg hover:bg-blue-50 hover:shadow-md ${
                    location.pathname === item.path 
                      ? 'bg-blue-50 shadow-sm font-medium' 
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-24 relative z-10">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 text-gray-600 py-12 mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Activités */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Nos Activités</h4>
              <ul className="space-y-2">
                <li><Link to="/aquafitness" className="hover:text-blue-600 transition-colors">Aquafitness</Link></li>
                <li><Link to="/babynage" className="hover:text-blue-600 transition-colors">Bébé Nageur</Link></li>
                <li><Link to="/espace-bien-etre" className="hover:text-blue-600 transition-colors">Espace Bien-être</Link></li>
                <li><Link to="/events" className="hover:text-blue-600 transition-colors">Événements</Link></li>
              </ul>
            </div>

            {/* Informations */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Informations</h4>
              <ul className="space-y-2">
                <li><Link to="/tarifs" className="hover:text-blue-600 transition-colors">Tarifs</Link></li>
                <li><Link to="/horaires" className="hover:text-blue-600 transition-colors">Horaires</Link></li>
                <li><Link to="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
                <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Centres */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Nos Centres</h4>
              <ul className="space-y-2">
                <li><Link to="/centre/castelnau" className="hover:text-blue-600 transition-colors">Castelnau-le-Lez</Link></li>
                <li><Link to="/centre/montpellier" className="hover:text-blue-600 transition-colors">Montpellier - Le Nuage</Link></li>
                <li><Link to="/acces" className="hover:text-blue-600 transition-colors">Plan d'accès</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Légal */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Informations Légales</h4>
              <ul className="space-y-2">
                <li><Link to="/mentions-legales" className="hover:text-blue-600 transition-colors">Mentions légales</Link></li>
                <li><Link to="/confidentialite" className="hover:text-blue-600 transition-colors">Politique de confidentialité</Link></li>
                <li><Link to="/cgv" className="hover:text-blue-600 transition-colors">CGV</Link></li>
                <li><Link to="/accessibilite" className="hover:text-blue-600 transition-colors">Accessibilité</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col items-center gap-6">
              <span className="text-4xl font-bold text-blue-900">AQUABIKE CENTER</span>
              <div className="flex flex-wrap justify-center gap-8 text-gray-500">
                <Link to="/mentions-legales" className="hover:text-blue-600 transition-colors">Mentions légales</Link>
                <Link to="/confidentialite" className="hover:text-blue-600 transition-colors">Politique de confidentialité</Link>
                <Link to="/cgv" className="hover:text-blue-600 transition-colors">CGV</Link>
              </div>
              <p className="text-gray-400 text-sm">© 2024 Aquabike Center - Tous droits réservés</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};