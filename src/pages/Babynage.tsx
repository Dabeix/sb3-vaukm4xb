import React from 'react';
import { Baby, Calendar as CalendarIcon, Download } from 'lucide-react';
import ReactPlayer from 'react-player';
import { jsPDF } from 'jspdf';
import { ContactSection } from '../components/ContactSection';

interface TimeSlot {
  time: string;
  age: string;
  description: string;
}

const timeSlots: TimeSlot[] = [
  {
    time: '09:00',
    age: '6-12 mois',
    description: "Éveil aquatique pour les plus petits"
  },
  {
    time: '09:30',
    age: '12-24 mois',
    description: "Découverte et familiarisation avec l'eau"
  },
  {
    time: '10:00',
    age: 'Jardin Aquatique',
    description: "Activités ludiques et apprentissage"
  },
  {
    time: '10:30',
    age: '24-36 mois',
    description: "Développement de l'autonomie aquatique"
  },
  {
    time: '11:00',
    age: 'Jardin Aquatique',
    description: "Activités ludiques et apprentissage"
  },
  {
    time: '11:30',
    age: '6-24 mois',
    description: "Séance découverte multi-âges"
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

export const Babynage = () => {
  const downloadPriceList = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Bébé Nageur - Tarifs', 20, 20);
    
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
    doc.save('bebe-nageur-tarifs.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <div className="bg-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">BÉBÉ NAGEUR</h1>
          <p className="text-center text-cyan-100 max-w-2xl mx-auto">
            Découvrez nos séances d'éveil aquatique adaptées à l'âge de votre enfant
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Video and Introduction Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Video Column */}
            <div className="relative h-[500px] rounded-2xl shadow-lg overflow-hidden">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=your-baby-swimming-video-id"
                width="100%"
                height="100%"
                playing={false}
                controls={true}
                light={true}
                className="absolute top-0 left-0"
              />
            </div>

            {/* Introduction Column */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <Baby className="w-8 h-8 text-cyan-600" />
                <h2 className="text-2xl font-amatic font-bold text-cyan-800">
                  L'éveil aquatique
                </h2>
              </div>
              <div className="prose text-gray-600">
                <p className="mb-4">
                  L'activité bébé nageur permet à votre enfant de découvrir le milieu aquatique 
                  de manière ludique et sécurisée. Nos séances sont adaptées à chaque tranche d'âge 
                  pour un développement optimal.
                </p>
                <p>
                  Encadrées par des professionnels qualifiés, les séances se déroulent dans une eau 
                  chauffée à 32°C pour le confort de votre bébé.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-amatic font-bold text-cyan-800">Nos Tarifs</h2>
              <button
                onClick={downloadPriceList}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                <Download size={20} />
                <span>Télécharger les tarifs</span>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {prices.map((price, index) => (
                <div key={index} className="bg-cyan-50 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-cyan-800 mb-2">{price.name}</h3>
                  <p className="text-3xl font-bold text-cyan-600 mb-2">{price.price}€</p>
                  {price.validity && (
                    <p className="text-cyan-600 text-sm">{price.validity}</p>
                  )}
                  {price.note && (
                    <p className="text-cyan-600 text-sm">{price.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <CalendarIcon className="w-8 h-8 text-cyan-600" />
                <h2 className="text-2xl font-amatic font-bold text-cyan-800">
                  Horaires des cours
                </h2>
              </div>
              
              <div className="space-y-4">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="group relative bg-cyan-50 rounded-lg p-6 transition-all hover:bg-cyan-100"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 text-lg font-semibold text-cyan-800">
                          {slot.time}
                        </div>
                        <div>
                          <h3 className="font-semibold text-cyan-800">
                            {slot.age}
                          </h3>
                          <p className="text-cyan-600 text-sm">
                            {slot.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-amatic font-bold text-cyan-800 mb-4">
              Informations importantes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cyan-800 mb-2">
                  Ce qu'il faut apporter
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Maillot de bain adapté</li>
                  <li>• Couche de bain pour les plus petits</li>
                  <li>• Serviette</li>
                  <li>• Bonnet de bain (obligatoire)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-cyan-800 mb-2">
                  Recommandations
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Arriver 10 minutes avant le cours</li>
                  <li>• Prévoir une collation pour après la séance</li>
                  <li>• Température de l'eau : 32°C</li>
                  <li>• Présence d'un parent obligatoire</li>
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