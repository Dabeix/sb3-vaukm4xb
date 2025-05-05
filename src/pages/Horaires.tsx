import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

interface Schedule {
  day: string;
  slots: string[];
}

interface Center {
  name: string;
  address: string;
  schedules: {
    activity: string;
    times: Schedule[];
  }[];
}

const centers: Center[] = [
  {
    name: "CASTELNAU-LE-LEZ",
    address: "1744 Avenue de l'Europe, 34170 Castelnau-le-Lez",
    schedules: [
      {
        activity: "AQUAMIX",
        times: [
          { day: "Lundi", slots: ["10h15", "11h15", "17h45", "19h30"] },
          { day: "Mardi", slots: ["11h30"] },
          { day: "Mercredi", slots: ["11h30", "19h30"] },
          { day: "Jeudi", slots: ["11h30"] },
          { day: "Vendredi", slots: ["14h", "17h45", "19h45"] }
        ]
      },
      {
        activity: "AQUAGYM",
        times: [
          { day: "Lundi", slots: ["9h15"] },
          { day: "Mardi", slots: ["10h30"] },
          { day: "Mercredi", slots: ["17h45"] },
          { day: "Jeudi", slots: ["10h30", "11h15"] }
        ]
      }
    ]
  },
  {
    name: "MONTPELLIER - LE NUAGE",
    address: "1 rue des Chevaliers de Malte, 34070 Montpellier",
    schedules: [
      {
        activity: "AQUAMIX",
        times: [
          { day: "Lundi", slots: ["10h15", "11h15", "17h45", "19h30"] },
          { day: "Mercredi", slots: ["11h30", "19h30"] },
          { day: "Vendredi", slots: ["14h", "17h45", "19h45"] },
          { day: "Dimanche", slots: ["9h15", "11h15"] }
        ]
      },
      {
        activity: "BÉBÉ NAGEUR",
        times: [
          { day: "Samedi", slots: ["9h00", "9h30", "10h00", "10h30", "11h00"] },
          { day: "Dimanche", slots: ["9h00", "9h30", "10h00", "10h30", "11h00"] }
        ]
      },
      {
        activity: "ESPACE BIEN-ÊTRE",
        times: [
          { day: "Lundi au Vendredi", slots: ["9h00 - 13h30", "17h30 - 20h30"] },
          { day: "Samedi", slots: ["9h00 - 12h00"] }
        ]
      }
    ]
  }
];

export const Horaires = () => {
  const [selectedCenter, setSelectedCenter] = useState(centers[0].name);

  const currentCenter = centers.find(center => center.name === selectedCenter)!;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">HORAIRES</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Consultez les horaires de nos activités dans nos différents centres
          </p>
        </div>
      </div>

      {/* Center Selection */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          {centers.map(center => (
            <button
              key={center.name}
              onClick={() => setSelectedCenter(center.name)}
              className={`flex-1 p-6 rounded-xl transition-all transform hover:scale-105 ${
                selectedCenter === center.name
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

      {/* Schedule Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {currentCenter.schedules.map((schedule, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-amatic font-bold text-blue-800">
                  {schedule.activity}
                </h2>
              </div>
              <div className="space-y-6">
                {schedule.times.map((time, timeIndex) => (
                  <div key={timeIndex} className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-800 mb-4">{time.day}</h3>
                    <div className="flex flex-wrap gap-2">
                      {time.slots.map((slot, slotIndex) => (
                        <span
                          key={slotIndex}
                          className="bg-white px-4 py-2 rounded-full text-blue-600 shadow-sm"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6">Informations pratiques</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Réservations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Réservation conseillée pour tous les cours</li>
                  <li>• Annulation possible jusqu'à 24h avant</li>
                  <li>• Places limitées pour un meilleur confort</li>
                  <li>• Possibilité de réserver en ligne</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Recommandations</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Arriver 10 minutes avant le cours</li>
                  <li>• Prévoir une tenue adaptée</li>
                  <li>• Bonnet de bain obligatoire</li>
                  <li>• Douche obligatoire avant la séance</li>
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