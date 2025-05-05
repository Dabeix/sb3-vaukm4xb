import React from 'react';
import { MapPin, Phone, Mail, Users, Ruler, Car } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

const features = [
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Capacité d'accueil",
    description: "Jusqu'à 30 personnes simultanément"
  },
  {
    icon: <Ruler className="w-8 h-8 text-blue-600" />,
    title: "Surface",
    description: "800m² dédiés au bien-être aquatique"
  },
  {
    icon: <Car className="w-8 h-8 text-blue-600" />,
    title: "Parking",
    description: "Parking gratuit de 50 places"
  }
];

const equipments = [
  "20 vélos aquatiques dernière génération",
  "Bassin de 25m chauffé à 30°C",
  "Vestiaires individuels et collectifs",
  "Douches et sanitaires",
  "Casiers sécurisés",
  "Sèche-cheveux",
  "Distributeur de boissons"
];

const activities = [
  {
    name: "Aquabike",
    description: "Cours dynamiques sur vélos aquatiques",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Aquagym",
    description: "Gymnastique douce en piscine",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Aquamix",
    description: "Mix d'activités aquatiques variées",
    image: "https://images.unsplash.com/photo-1622465413073-811143c93c85?auto=format&fit=crop&q=80&w=800"
  }
];

export const CentreCastelnau = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">
            CENTRE DE CASTELNAU-LE-LEZ
          </h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Votre espace bien-être aquatique à Castelnau-le-Lez
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Contact Info */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Adresse</h3>
                <p className="text-gray-600">1744 Avenue de l'Europe, 34170 Castelnau-le-Lez</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Téléphone</h3>
                <p className="text-gray-600">04 67 72 50 20</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">castelnau@aquabike-center.fr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Activities */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-8 text-center">
            Nos Activités
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{activity.name}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6">
            Équipements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {equipments.map((equipment, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-50 rounded-lg p-4"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{equipment}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.6983284859544!2d3.9191844!3d43.6191242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6a5c7a0d6f0f9%3A0x3c0f0f0f0f0f0f0f!2s1744%20Avenue%20de%20l&#39;Europe%2C%2034170%20Castelnau-le-Lez!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};