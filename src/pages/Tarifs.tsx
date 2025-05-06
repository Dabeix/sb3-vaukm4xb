import React from 'react';
import { Euro } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

const pricingCategories = [
  {
    title: "Aquafitness",
    prices: [
      { name: "Séance découverte", price: "offerte!", highlight: true },
      { name: "Abonnement 4 séances / mois", price: "47€", validity: "Soit 11€75 la séance" },
      { name: "Abonnement 6 séances / mois", price: "64€", validity: "Soit 10€66 la séance" },
      { name: "Abonnement 8 séances / mois", price: "74€", validity: "Soit 09€25 la séance" },
      { name: "Abonnement 12 séances / mois", price: "84€", validity: "Soit 07€ la séance" },
      { name: "Abonnement 16 séances / mois", price: "84€", validity: "Soit 05€87 la séance" },
      { name: "Carte 1 séance", price: "20€", validity: "Carte usage unique" },
      { name: "Carte 5 séances", price: "90€", validity: "Carte 5 utilisations, soit 18€ la séance" },
      { name: "Carte 10 séances", price: "159€", validity: "Carte 10 utilisations, soit 15€90 la séance" },
      { name: "Carte 20 séances", price: "278€", validity: "Carte 20 utilisations, soit 13€90 la séance" },
      { name: "Carte 40 séances", price: "516€", validity: "Carte 40 utilisations, soit 12€90 la séance" },
      { name: "Carte 80 séances", price: "952€", validity: "Carte 80 utilisations, soit 11€90 la séance" },
      { name: "Carte 120 séances", price: "1200€", validity: "Carte 120 utilisations, soit 10€ la séance" }
    ]
  },
  {
    title: "Bébé Nageur",
    prices: [
      { name: "Abonnement annuel", price: "640€", description: "Validité 1 an pour nos 40 séances" },
      { name: "Séance unique", price: "35€" },
      { name: "Carte 5 séances", price: "150€", validity: "Validité 3 mois" },
      { name: "Carte 10 séances", price: "220€", validity: "Validité 6 mois" },
      { name: "Carte 20 séances", price: "400€", description: "1 séance/semaine" }
    ]
  },
  {
    title: "Espace Bien-être",
    prices: [
      { name: "Carnet 10 séances", price: "99€", description: "Sauna à la carte : 9€90 la séance" },
      { name: "Abonnement 12 séances / mois pour 3 mois", price: "55€/mois", description: "Validité 3 mois, 4€50 la séance" },
      { name: "Abonnement 12 séances / mois pour 6 mois", price: "45€/mois", description: "Validité 6 mois, 3€75 la séance" },
      { name: "Abonnement 12 séances / mois pour 12 mois", price: "35€/mois", description: "Validité 1é mois, 2€90 la séance" }
    ]
  },
  {
    title: "Événements",
    prices: [
      { name: "Poupoule Party EVJF/EVJG", price: "329€", description: "2h00 - 10 personnes" },
      { name: "Anniversaire party", price: "329€", description: "2h30 - 10 personnes" },
      { name: "Option massage", price: "+45€", description: "Par heure" },
      { name: "Option champagne", price: "+40€", description: "Prix par bouteille" },
      { name: "Personne supplémentaire", price: "+15€", description: "Par personne" }
    ]
  }
];

export const Tarifs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">NOS TARIFS</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Des formules adaptées à tous vos besoins
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {pricingCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6 flex items-center gap-2">
                <Euro className="w-6 h-6 text-blue-600" />
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.prices.map((price, priceIndex) => (
                  <div
                    key={priceIndex}
                    className={`p-4 rounded-lg transition-colors ${
                      price.highlight
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{price.name}</h3>
                      <span className="text-lg font-bold text-blue-600">{price.price}</span>
                    </div>
                    {price.validity && (
                      <p className="text-sm text-gray-600">{price.validity}</p>
                    )}
                    {price.description && (
                      <p className="text-sm text-gray-600">{price.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6">Informations importantes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Modalités de paiement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Paiement en 3 fois sans frais possible</li>
                  <li>• Carte bancaire, chèque ou espèces</li>
                  <li>• Chèques vacances acceptés</li>
                  <li>• Prélèvement automatique pour les abonnements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Conditions générales</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Certificat médical obligatoire</li>
                  <li>• Réservation conseillée pour les cours</li>
                  <li>• Tarifs dégressifs pour les familles</li>
                  <li>• Assurance incluse</li>
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
