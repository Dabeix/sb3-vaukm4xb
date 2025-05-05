import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Activités",
    question: "Quelles sont les activités proposées ?",
    answer: "Nous proposons une large gamme d'activités aquatiques : aquafitness, aquagym, bébé nageur, et accès à notre espace bien-être avec sauna. Chaque activité est encadrée par des professionnels qualifiés."
  },
  {
    category: "Activités",
    question: "Faut-il savoir nager pour participer aux cours ?",
    answer: "Non, il n'est pas nécessaire de savoir nager. Nos cours sont adaptés à tous les niveaux et se déroulent en petite profondeur. Des équipements de flottaison sont également disponibles si nécessaire."
  },
  {
    category: "Activités",
    question: "Quelle est la température de l'eau ?",
    answer: "La température de l'eau est maintenue à 30°C pour les activités d'aquafitness et à 32°C pour les séances de bébé nageur, assurant un confort optimal pour tous les participants."
  },
  {
    category: "Réservations",
    question: "Comment réserver un cours ?",
    answer: "Vous pouvez réserver directement sur notre site web, par téléphone, ou à l'accueil de nos centres. La réservation est fortement conseillée car les places sont limitées."
  },
  {
    category: "Réservations",
    question: "Quelle est la politique d'annulation ?",
    answer: "Les annulations doivent être effectuées au moins 24h à l'avance pour obtenir un report de séance. En cas d'annulation tardive ou d'absence, la séance sera décomptée."
  },
  {
    category: "Équipement",
    question: "Que dois-je apporter pour les cours ?",
    answer: "Pour tous les cours, vous devez apporter un maillot de bain, une serviette, et des sandales de piscine. Le bonnet de bain est obligatoire. Pour le bébé nageur, prévoir également une couche spéciale piscine."
  },
  {
    category: "Équipement",
    question: "Le matériel est-il fourni ?",
    answer: "Oui, tout le matériel nécessaire pour les cours (vélos aquatiques, accessoires de fitness, etc.) est fourni par le centre. Vous n'avez besoin que de votre équipement personnel."
  },
  {
    category: "Abonnements",
    question: "Quels types d'abonnements proposez-vous ?",
    answer: "Nous proposons des formules à la séance, des cartes de 10 séances, et des abonnements mensuels ou annuels. Des tarifs préférentiels sont disponibles pour les étudiants et les seniors."
  },
  {
    category: "Abonnements",
    question: "Puis-je suspendre mon abonnement ?",
    answer: "Oui, vous pouvez suspendre votre abonnement en cas de maladie (certificat médical requis) ou de congés, pour une durée maximale de 2 mois par an."
  },
  {
    category: "Santé",
    question: "Un certificat médical est-il obligatoire ?",
    answer: "Oui, un certificat médical de non contre-indication à la pratique des activités aquatiques est obligatoire. Il est valable 1 an et doit être renouvelé à chaque nouvelle inscription."
  },
  {
    category: "Santé",
    question: "Les cours sont-ils adaptés aux femmes enceintes ?",
    answer: "Certains cours sont spécialement adaptés aux femmes enceintes. Consultez votre médecin avant de commencer et informez l'instructeur de votre situation."
  }
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">
            FOIRE AUX QUESTIONS
          </h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus fréquentes
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">
                {category}
              </h2>
              <div className="space-y-4">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => {
                    const actualIndex = faqs.findIndex(f => f === faq);
                    const isOpen = openItems.includes(actualIndex);

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(actualIndex)}
                          className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-blue-600" />
                          )}
                        </button>
                        <div
                          className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                            isOpen ? 'py-4' : 'max-h-0'
                          }`}
                        >
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-gray-600 mb-6">
              Notre équipe est là pour répondre à toutes vos questions.
              N'hésitez pas à nous contacter !
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};