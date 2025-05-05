import React from 'react';
import { Euro } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

const pricingCategories = [
  {
    title: "Aquafitness",
    prices: [
      { name: "Séance découverte", price: "15€", highlight: true },
      { name: "Carte 10 séances", price: "120€", validity: "Validité 6 mois" },
      { name: "Abonnement mensuel", price: "49.90€/mois", description: "Accès illimité" },
      { name: "Pass Annuel", price: "499€", description: "Engagement 12 mois" }
    ]
  },
  {
    title: "Bébé Nageur",
    prices: [
      { name: "Séance unique", price: "20€" },
      { name: "Carte 5 séances", price: "90€", validity: "Validité 3 mois" },
      { name: "Carte 10 séances", price: "160€", validity: "Validité 6 mois" },
      { name: "Forfait trimestriel", price: "199€", description: "1 séance/semaine" }
    ]
  },
  {
    title: "Espace Bien-être",
    prices: [
      { name: "Accès journée", price: "25€", description: "Sauna + Piscine" },
      { name: "Carte 10 entrées", price: "200€", validity: "Validité 1 an" },
      { name: "Abonnement mensuel", price: "79€/mois", description: "Accès illimité" },
      { name: "Pass Bien-être", price: "599€", description: "Accès annuel illimité" }
    ]
  },
  {
    title: "Événements",
    prices: [
      { name: "Privatisation bassin", price: "250€", description: "2h - 10 personnes" },
      { name: "Pack Premium", price: "450€", description: "3h - 10 personnes" },
      { name: "Option coach", price: "+50€", description: "Par heure" },
      { name: "Personne supplémentaire", price: "+25€", description: "Par personne" }
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