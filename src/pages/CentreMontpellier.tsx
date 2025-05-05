import React from 'react';
import { MapPin, Phone, Mail, Users, Ruler, Car } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

const features = [
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Capacité d'accueil",
    description: "Jusqu'à 50 personnes simultanément"
  },
  {
    icon: <Ruler className="w-8 h-8 text-blue-600" />,
    title: "Surface",
    description: "1200m² d'espace aquatique"
  },
  {
    icon: <Car className="w-8 h-8 text-blue-600" />,
    title: "Parking",
    description: "Parking souterrain 200 places"
  }
];

const equipments = [
  "30 vélos aquatiques dernière génération",
  "Bassin olympique chauffé à 30°C",
  "Espace bien-être avec sauna",
  "Vestiaires individuels et collectifs",
  "Douches et sanitaires",
  "Casiers sécurisés",
  "Sèche-cheveux",
  "Distributeur de boissons",
  "Boutique d'accessoires"
];

const activities = [
  {
    name: "Aquabike",
    description: "Cours dynamiques sur vélos aquatiques",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Bébé Nageur",
    description: "Éveil aquatique pour les tout-petits",
    image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Espace Bien-être",
    description: "Sauna et espace détente",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800"
  }
];

export const CentreMontpellier = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">
            CENTRE DE MONTPELLIER - LE NUAGE
          </h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Votre espace aquatique premium au cœur de Montpellier
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
                <p className="text-gray-600">1 rue des Chevaliers de Malte, 34070 Montpellier</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Téléphone</h3>
                <p className="text-gray-600">04 67 34 43 00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">montpellier@aquabike-center.fr</p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.8963284859544!2d3.8891844!3d43.6091242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0f9e1f9a9f%3A0x3c0f0f0f0f0f0f0f!2s1%20Rue%20des%20Chevaliers%20de%20Malte%2C%2034070%20Montpellier!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
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