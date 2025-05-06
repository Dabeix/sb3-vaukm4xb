import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, Mail, Download, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { jsPDF } from 'jspdf';
import { ContactSection } from '../components/ContactSection';

interface Schedule {
  activity: string;
  times: {
    day: string;
    slots: string[];
  }[];
}

interface Center {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  schedules: Schedule[];
}

const centers: Center[] = [
  {
    id: 'castelnau',
    name: 'CASTELNAU-LE-LEZ',
    address: '1744 Avenue de l\'Europe, 34170 Castelnau-le-Lez',
    phone: '04 67 72 50 20',
    email: 'castelnau@aquabike-center.fr',
    schedules: [
      {
        activity: "AQUAMIXE",
        times: [
          {
            day: "Lundi",
            slots: ["10h15", "11h15", "17h45", "19h30"]
          },
          {
            day: "Mardi",
            slots: ["11h30"]
          },
          {
            day: "Mercredi",
            slots: ["11h30", "19h30"]
          },
          {
            day: "Jeudi",
            slots: ["11h30"]
          },
          {
            day: "Vendredi",
            slots: ["14h", "17h45", "19h45"]
          }
        ]
      },
      {
        activity: "AQUAGYM",
        times: [
          {
            day: "Lundi",
            slots: ["9h15"]
          },
          {
            day: "Mardi",
            slots: ["10h30"]
          },
          {
            day: "Mercredi",
            slots: ["17h45"]
          },
          {
            day: "Jeudi",
            slots: ["10h30", "11h15"]
          }
        ]
      }
    ]
  },
  {
    id: 'montpellier',
    name: 'MONTPELLIER - LE NUAGE',
    address: '1 rue des Chevaliers de Malte, 34070 Montpellier',
    phone: '04 67 34 43 00',
    email: 'montpellier@aquabike-center.fr',
    schedules: [
      {
        activity: "AQUAMIX",
        times: [
          {
            day: "Lundi",
            slots: ["10h15", "11h15", "17h45", "19h30"]
          },
          {
            day: "Mercredi",
            slots: ["11h30", "19h30"]
          },
          {
            day: "Vendredi",
            slots: ["14h", "17h45", "19h45"]
          },
          {
            day: "Dimanche",
            slots: ["9h15", "11h15"]
          }
        ]
      }
    ]
  }
];

const prices = [
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
    price: 6,
    note: "Avec abonnement mensuel"
  }
];

export const Aquafitness = () => {
  const [selectedCenter, setSelectedCenter] = useState(centers[0].id);
  const navigate = useNavigate();
  
  const currentCenter = centers.find(center => center.id === selectedCenter)!;

  const downloadPriceList = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Aquabike Center - Tarifs', 20, 20);
    
    // Add prices
    doc.setFontSize(12);
    prices.forEach((price, index) => {
      const y = 40 + (index * 20);
      doc.text(`${price.name}: ${price.price}€`, 20, y);
      if (price.validity) {
        doc.text(price.validity, 20, y + 7);
      }
      if (price.note) {
        doc.text(price.note, 20, y + 7);
      }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.text('* Les tarifs peuvent être modifiés sans préavis', 20, 150);
    
    // Save the PDF
    doc.save('aquabike-center-tarifs.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">AQUAFITNESS</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Découvrez nos activités aquatiques pour tous les niveaux dans nos deux centres
          </p>
        </div>
      </div>

      {/* Center Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          {centers.map(center => (
            <button
              key={center.id}
              onClick={() => setSelectedCenter(center.id)}
              className={`flex-1 p-6 rounded-xl transition-all transform hover:scale-105 ${
                selectedCenter === center.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{center.name}</h2>
              <div className="flex items-center gap-2 text-sm opacity-80">
                <MapPin size={16} />
                <span className="truncate">{center.address}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Video */}
            <div className="relative h-[500px] rounded-2xl shadow-lg overflow-hidden">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=your-video-id"
                width="100%"
                height="100%"
                playing={false}
                controls={true}
                light={true}
                className="absolute top-0 left-0"
              />
              
              {/* Center Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 p-6 text-white">
                <h3 className="text-xl font-bold mb-4">{currentCenter.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-300" />
                    <span>{currentCenter.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-300" />
                    <span>{currentCenter.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-300" />
                    <span>{currentCenter.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-amatic font-bold text-blue-800">
                  Planning des cours
                </h2>
              </div>
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {currentCenter.schedules.map((schedule, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-800 mb-4 text-lg">
                      {schedule.activity}
                    </h3>
                    <div className="grid gap-4">
                      {schedule.times.map((time, timeIndex) => (
                        <div key={timeIndex} className="text-blue-700">
                          <div className="font-medium mb-1">{time.day}</div>
                          <div className="flex flex-wrap gap-2">
                            {time.slots.map((slot, slotIndex) => (
                              <button
                                key={slotIndex}
                                onClick={() => navigate('/booking/aquafitness')}
                                className="bg-white px-3 py-1 rounded-full text-sm shadow-sm hover:bg-blue-600 hover:text-white transition-colors"
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-amatic font-bold text-blue-800">Nos Tarifs</h2>
              <button
                onClick={downloadPriceList}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                <span>Télécharger les tarifs</span>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {prices.map((price, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-blue-800 mb-2">{price.name}</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">{price.price}€</p>
                  {price.validity && (
                    <p className="text-blue-600 text-sm">{price.validity}</p>
                  )}
                  {price.note && (
                    <p className="text-blue-600 text-sm">{price.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Sections - Horizontal Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Description des activités */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <Waves className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-amatic font-bold text-blue-800">
                  Nos activités
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">AQUAMIX</h3>
                  <p className="text-gray-600">
                    Un mix d'activités aquatiques pour une séance complète et variée.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">AQUAGYM</h3>
                  <p className="text-gray-600">
                    Gymnastique douce dans l'eau pour tonifier le corps en douceur.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">AQUABIKE</h3>
                  <p className="text-gray-600">
                    Vélo dans l'eau pour un entraînement cardio intense et sans impact.
                  </p>
                </div>
              </div>
            </div>

            {/* Informations pratiques */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Informations pratiques
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Ce qu'il faut apporter</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Maillot de bain
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Bonnet de bain (obligatoire)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Serviette
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Bouteille d'eau
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Recommandations</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Arriver 10 minutes avant le cours
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Douche obligatoire avant la séance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Durée des séances : 45 minutes
                    </li>
                  </ul>
                </div>
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
