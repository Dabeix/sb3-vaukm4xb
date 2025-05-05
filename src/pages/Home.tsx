import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SwissFranc as Swim, Baby, Droplets, Users, Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Import des images locales
import aquafitnessImage from '/images/AQUAFITNESS.jpg';
import babynageImage from '/images/BABYNAGE.jpg';
import saunaImage from '/images/SAUNA.jpg';
import eventsImage from '/images/EVENTS.jpg';

interface SiteSettings {
  floating_bubble_active: boolean;
  floating_bubble_text: string;
  mardi_chill_text: string;
  mardi_chill_subtitle: string;
  mardi_chill_schedule: string;
  mardi_chill_color: string;
  mardi_chill_icon: string;
}

export const Home = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    floating_bubble_active: true,
    floating_bubble_text: 'Nouveauté ! Mardis Chill !',
    mardi_chill_text: 'Nouveauté ! Mardis Chill !',
    mardi_chill_subtitle: 'Nouvelle activité relaxante',
    mardi_chill_schedule: 'Tous les mardis\n19h - 20h30',
    mardi_chill_color: 'blue',
    mardi_chill_icon: 'sparkles'
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    loadSettings();

    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_settings'
        },
        (payload) => {
          if (payload.new) {
            setSettings(payload.new as SiteSettings);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) throw error;
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            email: contactForm.email,
            content: `Message de contact:
              Nom: ${contactForm.name}
              Téléphone: ${contactForm.phone}
              Message: ${contactForm.message}`
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  const getGradientColors = (color: string) => {
    const colorMap: Record<string, { from: string, via: string, to: string }> = {
      blue: { from: '#2563eb', via: '#3b82f6', to: '#60a5fa' },
      cyan: { from: '#0891b2', via: '#06b6d4', to: '#22d3ee' },
      indigo: { from: '#4f46e5', via: '#6366f1', to: '#818cf8' },
      violet: { from: '#7c3aed', via: '#8b5cf6', to: '#a78bfa' },
      rose: { from: '#e11d48', via: '#f43f5e', to: '#fb7185' },
      orange: { from: '#ea580c', via: '#f97316', to: '#fb923c' },
      green: { from: '#16a34a', via: '#22c55e', to: '#4ade80' },
      teal: { from: '#0d9488', via: '#14b8a6', to: '#2dd4bf' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const gradientColors = getGradientColors(settings.mardi_chill_color);
  const gradientStyle = {
    background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
  };

  return (
    <div className="min-h-screen">
      {/* Floating Bubble */}
      {settings.floating_bubble_active && (
        <div className="fixed right-4 md:right-8 top-24 md:top-32 z-40">
          <div className="floating-bubble bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-center p-3 md:p-4 shadow-lg backdrop-blur-sm text-white font-amatic text-2xl md:text-3xl leading-tight cursor-pointer">
            {settings.floating_bubble_text}
          </div>
        </div>
      )}

      {/* Services Grid with Centered Logo */}
      <div className="container mx-auto px-4 py-8">
        {/* Mardi Chill Banner */}
        {settings.floating_bubble_active && (
          <div className="relative overflow-hidden rounded-lg mb-8 shadow-md" style={gradientStyle}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJ3YXZlIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNMjggNjYuNGMtOCAwLTgtMzIuOC0xNi0zMi44UzQgNjYuNCA0IDY2LjQgMCA5OC40IDAgOTguNGg1NlY2Ni40YzAgMC00IDAtMTIgMHMtOC0zMi44LTE2LTMyLjh6IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dhdmUpIi8+PC9zdmc+')] opacity-10"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 py-3 px-4 text-white">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-white animate-pulse" />
                <div>
                  <h3 className="text-xl font-amatic font-bold">{settings.mardi_chill_text}</h3>
                  <p className="text-xs text-white/80">{settings.mardi_chill_subtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-xs whitespace-pre-line">
                  {settings.mardi_chill_schedule}
                </div>
                <button 
                  onClick={() => window.location.href = '/booking/aquafitness'}
                  className="bg-white px-3 py-1 rounded text-sm font-medium hover:bg-white/90 transition-colors duration-300 shadow-sm hover:shadow-md"
                  style={{ color: gradientColors.from }}
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative max-w-6xl mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Aquafitness */}
            <Link to="/aquafitness" className="block">
              <section className="group relative h-80 overflow-hidden cursor-pointer wave-bg rounded-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${aquafitnessImage})` }}
                />
                <div className="absolute inset-0 bg-blue-600/60 group-hover:bg-blue-600/70 transition-colors duration-300 backdrop-blur-[1px] group-hover:backdrop-blur-[2px]" />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                  <Swim size={36} className="mb-2 md:mb-4 animate-[float_3s_ease-in-out_infinite] group-hover:scale-125 transition-transform duration-300" />
                  <h2 className="text-3xl md:text-5xl font-bold tracking-wider group-hover:scale-110 transition-transform duration-300 font-amatic relative text-center">
                    AQUAFITNESS
                    <span className="absolute inset-0 animate-[ripple_2s_ease-out_infinite] bg-white/20 rounded-full -z-10 group-hover:opacity-100 opacity-0"></span>
                  </h2>
                  <p className="mt-2 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm py-1 px-4 rounded-full bg-white/10 text-center">
                    Remise en forme et tonification musculaire
                  </p>
                  <p className="text-xs md:text-sm mt-2 font-medium">Castelnau / Montpellier-Le Nuage</p>
                </div>
              </section>
            </Link>

            {/* Babynage */}
            <Link to="/babynage" className="block">
              <section className="group relative h-80 overflow-hidden cursor-pointer wave-bg rounded-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${babynageImage})` }}
                />
                <div className="absolute inset-0 bg-cyan-600/60 group-hover:bg-cyan-600/70 transition-colors duration-300 backdrop-blur-[1px] group-hover:backdrop-blur-[2px]" />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                  <Baby size={36} className="mb-2 md:mb-4 animate-[float_3s_ease-in-out_infinite] group-hover:scale-125 transition-transform duration-300" />
                  <h2 className="text-3xl md:text-5xl font-bold tracking-wider group-hover:scale-110 transition-transform duration-300 font-amatic relative text-center">
                    BÉBÉ NAGEUR
                    <span className="absolute inset-0 animate-[ripple_2s_ease-out_infinite] bg-white/20 rounded-full -z-10 group-hover:opacity-100 opacity-0"></span>
                  </h2>
                  <p className="mt-2 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm py-1 px-4 rounded-full bg-white/10 text-center">
                    Éveil aquatique pour les tout-petits
                  </p>
                  <p className="text-xs md:text-sm mt-2 font-medium">Montpellier-Le Nuage</p>
                </div>
              </section>
            </Link>
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <img 
                src="https://static.wixstatic.com/media/845141_4f68cdeaa292482a8ee51a692376595a~mv2.jpg/v1/crop/x_0,y_0,w_635,h_622/fill/w_354,h_338,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/fille.jpg"
                alt="Aquabike Center"
                className="relative h-40 w-40 md:h-48 md:w-48 object-cover rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 border-4 border-white/50"
              />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Espace Bien-être */}
            <Link to="/espace-bien-etre" className="block">
              <section className="group relative h-80 overflow-hidden cursor-pointer wave-bg rounded-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${saunaImage})` }}
                />
                <div className="absolute inset-0 bg-orange-600/60 group-hover:bg-orange-600/70 transition-colors duration-300 backdrop-blur-[1px] group-hover:backdrop-blur-[2px]" />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                  <Droplets size={36} className="mb-2 md:mb-4 animate-[float_3s_ease-in-out_infinite] group-hover:scale-125 transition-transform duration-300" />
                  <h2 className="text-3xl md:text-5xl font-bold tracking-wider group-hover:scale-110 transition-transform duration-300 font-amatic relative text-center">
                    ESPACE BIEN-ÊTRE
                    <span className="absolute inset-0 animate-[ripple_2s_ease-out_infinite] bg-white/20 rounded-full -z-10 group-hover:opacity-100 opacity-0"></span>
                  </h2>
                  <p className="mt-2 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm py-1 px-4 rounded-full bg-white/10 text-center">
                    Détente et récupération
                  </p>
                  <p className="text-xs md:text-sm mt-2 font-medium">Montpellier-Le Nuage</p>
                </div>
              </section>
            </Link>

            {/* Events */}
            <Link to="/events" className="block">
              <section className="group relative h-80 overflow-hidden cursor-pointer wave-bg rounded-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${eventsImage})` }}
                />
                <div className="absolute inset-0 bg-teal-600/60 group-hover:bg-teal-600/70 transition-colors duration-300 backdrop-blur-[1px] group-hover:backdrop-blur-[2px]" />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                  <Users size={36} className="mb-2 md:mb-4 animate-[float_3s_ease-in-out_infinite] group-hover:scale-125 transition-transform duration-300" />
                  <h2 className="text-3xl md:text-5xl font-bold tracking-wider group-hover:scale-110 transition-transform duration-300 font-amatic relative text-center">
                    ANNIVERSAIRE/EVG-EVJ
                    <span className="absolute inset-0 animate-[ripple_2s_ease-out_infinite] bg-white/20 rounded-full -z-10 group-hover:opacity-100 opacity-0"></span>
                  </h2>
                  <p className="mt-2 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm py-1 px-4 rounded-full bg-white/10 text-center">
                    Animations et événements spéciaux
                  </p>
                  <p className="text-xs md:text-sm mt-2 font-medium">Montpellier-Le Nuage</p>
                </div>
              </section>
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white py-16 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-amatic font-bold text-center text-blue-800 mb-8">CONTACTEZ-NOUS</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Send size={20} />
                    {submitStatus === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                  {submitStatus === 'success' && (
                    <p className="text-green-600 text-sm text-center">Votre message a été envoyé avec succès !</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600 text-sm text-center">Une erreur est survenue. Veuillez réessayer.</p>
                  )}
                </form>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-4">CASTELNAU-LE-LEZ</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-blue-600" />
                        1744 Avenue de l'Europe, 34170 Castelnau-le-Lez
                      </p>
                      <p className="flex items-center gap-2 text-gray-700">
                        <Phone size={18} className="text-blue-600" />
                        04 67 72 50 20
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-4">MONTPELLIER - LE NUAGE</h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-blue-600" />
                        1 rue des Chevaliers de Malte, 34070 Montpellier
                      </p>
                      <p className="flex items-center gap-2 text-gray-700">
                        <Phone size={18} className="text-blue-600" />
                        04 67 34 43 00
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Mail size={18} className="text-blue-600" />
                      contact@aquabike-center.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Qui sommes-nous Section */}
      <div className="max-w-4xl mx-auto my-16 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-blue-800 mb-4 font-amatic">Qui sommes-nous ?</h3>
        <p className="text-gray-700 leading-relaxed">
          Aquabike Center ce sont 2 centres spécialisés dans l'aquafitness autour de Montpellier et plus de 15 ans d'expérience. Nous proposons des cours mixtes sur de nombreux créneaux, accessibles quelque soit votre niveau.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          N'hésitez pas à découvrir nos différentes formules, nos activités et nos centres (réservez vos séances de l'activité de votre choix dans n'importe lequel de nos centres).
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Nous proposons également la privatisation de nos bassins pour vos évènements.
        </p>
      </div>
    </div>
  );
};

export default Home;