import React from 'react';
import { MapPin, Phone, Mail, Car, Train, Bus } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

const centers = [
  {
    name: "CASTELNAU-LE-LEZ",
    address: "1744 Avenue de l'Europe, 34170 Castelnau-le-Lez",
    phone: "04 67 72 50 20",
    email: "castelnau@aquabike-center.fr",
    transport: {
      car: [
        "Parking gratuit de 50 places",
        "Accès direct depuis l'Avenue de l'Europe",
        "À 5 minutes de l'autoroute A709"
      ],
      public: [
        "Tramway Ligne 2 - Arrêt 'Europe'",
        "Bus n°37 - Arrêt 'Piscine'",
        "À 15 minutes à pied de la gare de Castelnau"
      ]
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.6983284859544!2d3.9191844!3d43.6191242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6a5c7a0d6f0f9%3A0x3c0f0f0f0f0f0f0f!2s1744%20Avenue%20de%20l&#39;Europe%2C%2034170%20Castelnau-le-Lez!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
  },
  {
    name: "MONTPELLIER - LE NUAGE",
    address: "1 rue des Chevaliers de Malte, 34070 Montpellier",
    phone: "04 67 34 43 00",
    email: "montpellier@aquabike-center.fr",
    transport: {
      car: [
        "Parking souterrain 200 places",
        "Accès direct depuis l'Avenue de la Liberté",
        "À 2 minutes de la sortie 29 de l'A709"
      ],
      public: [
        "Tramway Ligne 1 - Arrêt 'Place de l'Europe'",
        "Bus n°15 - Arrêt 'Nuage'",
        "À 10 minutes à pied de la gare Saint-Roch"
      ]
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.8963284859544!2d3.8891844!3d43.6091242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0f9e1f9a9f%3A0x3c0f0f0f0f0f0f0f!2s1%20Rue%20des%20Chevaliers%20de%20Malte%2C%2034070%20Montpellier!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
  }
];

export const Acces = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">ACCÈS</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Comment nous rejoindre dans nos différents centres
          </p>
        </div>
      </div>

      {/* Centers Access */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-16">
          {centers.map((center, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                {/* Center Info */}
                <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6">
                  {center.name}
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Adresse</h3>
                      <p className="text-gray-600">{center.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Téléphone</h3>
                      <p className="text-gray-600">{center.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">{center.email}</p>
                    </div>
                  </div>
                </div>

                {/* Transport Options */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Car Access */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Car className="w-6 h-6 text-blue-600" />
                      <h3 className="font-medium text-gray-900">En voiture</h3>
                    </div>
                    <ul className="space-y-2">
                      {center.transport.car.map((info, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          {info}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Public Transport */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-2">
                        <Train className="w-6 h-6 text-blue-600" />
                        <Bus className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900">En transport en commun</h3>
                    </div>
                    <ul className="space-y-2">
                      {center.transport.public.map((info, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          {info}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Map */}
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    src={center.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4 text-center">
              Informations pratiques
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Horaires d'ouverture</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Lundi au Vendredi : 9h - 21h</li>
                  <li>• Samedi : 9h - 18h</li>
                  <li>• Dimanche : 9h - 13h</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Accessibilité</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Places PMR réservées</li>
                  <li>• Accès et équipements adaptés</li>
                  <li>• Personnel formé à l'accueil PMR</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};