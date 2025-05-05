import React, { useState } from 'react';
import { Flame, Clock, MapPin, Phone, Mail, Download, Waves } from 'lucide-react';
import ReactPlayer from 'react-player';
import { jsPDF } from 'jspdf';
import { ContactSection } from '../components/ContactSection';
import saunaImage from '/images/SAUNA.jpg';

const saunaSchedule = {
  weekdays: {
    morning: "9h à 13h30",
    evening: "17h30 à 20h30"
  },
  saturday: "9h à 12h"
};

const saunaPrices = [
  {
    name: "Carte 10 séances",
    price: 120,
    validity: "Validité 6 mois"
  },
  {
    name: "Séance à l'unité",
    price: 15,
    note: "Sans abonnement"
  },
  {
    name: "Séance avec abonnement",
    price: 8,
    note: "Avec abonnement mensuel"
  }
];

const spaPrices = [
  {
    name: "Accès journée",
    price: 25,
    description: "Accès illimité piscine et sauna"
  },
  {
    name: "Carte 10 entrées",
    price: 200,
    validity: "Validité 1 an"
  },
  {
    name: "Abonnement mensuel",
    price: 49.90,
    description: "Accès illimité 7j/7"
  }
];

export const WellnessSpace = () => {
  const [activeTab, setActiveTab] = useState<'sauna' | 'spa'>('sauna');

  const downloadPriceList = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Espace Bien-être - Tarifs', 20, 20);
    
    // Add Sauna prices
    doc.setFontSize(16);
    doc.text('Sauna', 20, 40);
    doc.setFontSize(12);
    saunaPrices.forEach((price, index) => {
      const y = 50 + (index * 20);
      doc.text(`${price.name}: ${price.price}€`, 20, y);
      if (price.validity) {
        doc.text(price.validity, 20, y + 7);
      }
      if (price.note) {
        doc.text(price.note, 20, y + 7);
      }
    });
    
    // Add Spa prices
    doc.setFontSize(16);
    doc.text('Spa', 20, 120);
    doc.setFontSize(12);
    spaPrices.forEach((price, index) => {
      const y = 130 + (index * 20);
      doc.text(`${price.name}: ${price.price}€`, 20, y);
      if (price.validity) {
        doc.text(price.validity, 20, y + 7);
      }
      if (price.description) {
        doc.text(price.description, 20, y + 7);
      }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.text('* Les tarifs peuvent être modifiés sans préavis', 20, 280);
    
    // Save the PDF
    doc.save('espace-bien-etre-tarifs.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">ESPACE BIEN-ÊTRE</h1>
          <p className="text-center text-orange-100 max-w-2xl mx-auto">
            Détente et bien-être dans notre espace dédié
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('sauna')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'sauna'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-orange-600 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Flame size={24} />
                <span>Sauna</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('spa')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'spa'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-orange-600 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Waves size={24} />
                <span>Spa</span>
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Video */}
            <div className="relative h-[500px] rounded-2xl shadow-lg overflow-hidden">
              <ReactPlayer
                url={activeTab === 'sauna' 
                  ? "https://www.youtube.com/watch?v=your-sauna-video-id"
                  : "https://www.youtube.com/watch?v=your-spa-video-id"
                }
                width="100%"
                height="100%"
                playing={false}
                controls={true}
                light={true}
                className="absolute top-0 left-0"
              />
              
              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900 p-6 text-white">
                <h3 className="text-xl font-bold mb-4">MONTPELLIER - LE NUAGE</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-300" />
                    <span>1 rue des Chevaliers de Malte, 34070 Montpellier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-orange-300" />
                    <span>04 67 34 43 00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-orange-300" />
                    <span>montpellier@aquabike-center.fr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Schedule & Prices */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {activeTab === 'sauna' ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <h2 className="text-2xl font-amatic font-bold text-orange-800">
                      Horaires Sauna
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="font-semibold text-orange-800 mb-4">Du lundi au vendredi</h3>
                      <div className="space-y-2 text-orange-700">
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          {saunaSchedule.weekdays.morning}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          {saunaSchedule.weekdays.evening}
                        </p>
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="font-semibold text-orange-800 mb-4">Samedi</h3>
                      <p className="flex items-center gap-2 text-orange-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        {saunaSchedule.saturday}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <Waves className="w-8 h-8 text-orange-600" />
                    <h2 className="text-2xl font-amatic font-bold text-orange-800">
                      Accès Spa
                    </h2>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Profitez d'un moment de détente absolue dans notre espace spa avec :
                    </p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Accès illimité à la piscine
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Sauna finlandais
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Espace détente
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Tisanerie
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-amatic font-bold text-orange-800">
                {activeTab === 'sauna' ? 'Tarifs Sauna' : 'Tarifs Spa'}
              </h2>
              <button
                onClick={downloadPriceList}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Download size={20} />
                <span>Télécharger les tarifs</span>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {(activeTab === 'sauna' ? saunaPrices : spaPrices).map((price, index) => (
                <div key={index} className="bg-orange-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">{price.name}</h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">{price.price}€</p>
                  {price.validity && (
                    <p className="text-orange-600 text-sm">{price.validity}</p>
                  )}
                  {price.note && (
                    <p className="text-orange-600 text-sm">{price.note}</p>
                  )}
                  {price.description && (
                    <p className="text-orange-600 text-sm">{price.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Ce qu'il faut apporter
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Maillot de bain
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Serviette
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Tongs propres
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Bouteille d'eau
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Recommandations
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Douche obligatoire avant l'accès
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Séances de 15-20 minutes conseillées
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Hydratation régulière recommandée
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Repos entre les séances
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};