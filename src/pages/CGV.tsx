import React from 'react';
import { ContactSection } from '../components/ContactSection';

export const CGV = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">CONDITIONS GÉNÉRALES DE VENTE</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            En vigueur au 01/03/2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 1 - Champ d'application</h2>
              <p className="text-gray-700 mb-4">
                Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de services conclues par AQUABIKE CENTER auprès des clients particuliers et professionnels, quelles que soient les clauses pouvant figurer sur les documents du Client, et notamment ses conditions générales d'achat.
              </p>
            </section>

            {/* Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 2 - Services proposés</h2>
              <p className="text-gray-700 mb-4">
                AQUABIKE CENTER propose les services suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cours d'aquafitness</li>
                <li>Séances de bébé nageur</li>
                <li>Accès à l'espace bien-être</li>
                <li>Location d'équipements aquatiques</li>
                <li>Privatisation des installations</li>
              </ul>
            </section>

            {/* Prix */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 3 - Prix</h2>
              <p className="text-gray-700 mb-4">
                Les prix des services sont indiqués en euros TTC. AQUABIKE CENTER se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au catalogue le jour de la commande sera le seul applicable au client.
              </p>
            </section>

            {/* Réservations */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 4 - Réservations</h2>
              <p className="text-gray-700 mb-4">
                Les réservations peuvent être effectuées :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Sur notre site internet</li>
                <li>Par téléphone</li>
                <li>À l'accueil de nos centres</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Toute réservation est considérée comme définitive après confirmation et paiement.
              </p>
            </section>

            {/* Paiement */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 5 - Modalités de paiement</h2>
              <p className="text-gray-700 mb-4">
                Le paiement peut être effectué par :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Carte bancaire</li>
                <li>Espèces</li>
                <li>Chèques (sous réserve d'acceptation)</li>
                <li>Chèques vacances</li>
              </ul>
            </section>

            {/* Annulation */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 6 - Annulation et remboursement</h2>
              <p className="text-gray-700 mb-4">
                Toute annulation doit être effectuée au moins 24 heures avant la séance. En cas d'annulation tardive ou d'absence, la séance sera décomptée ou facturée.
              </p>
              <p className="text-gray-700">
                Le remboursement des prestations est possible uniquement sur présentation d'un certificat médical, au prorata des séances non effectuées.
              </p>
            </section>

            {/* Règlement intérieur */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 7 - Règlement intérieur</h2>
              <p className="text-gray-700">
                Les clients s'engagent à respecter le règlement intérieur affiché dans nos centres. Le non-respect de ce règlement peut entraîner l'exclusion temporaire ou définitive sans remboursement.
              </p>
            </section>

            {/* Responsabilité */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 8 - Responsabilité</h2>
              <p className="text-gray-700">
                AQUABIKE CENTER décline toute responsabilité en cas de vol ou de perte d'objets personnels dans l'enceinte de l'établissement. Les clients sont invités à utiliser les casiers mis à leur disposition.
              </p>
            </section>

            {/* Assurance */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 9 - Assurance</h2>
              <p className="text-gray-700">
                AQUABIKE CENTER est assuré pour les dommages engageant sa responsabilité civile. Cette assurance ne couvre pas les dommages corporels des clients qui doivent être assurés individuellement.
              </p>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Article 10 - Droit applicable</h2>
              <p className="text-gray-700 mb-4">
                Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
              </p>
              <p className="text-gray-700">
                Pour toute réclamation, merci de contacter notre service client :
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li><strong>Email :</strong> contact@aquabike-center.fr</li>
                <li><strong>Adresse :</strong> 1744 Avenue de l'Europe, 34170 Castelnau-le-Lez</li>
                <li><strong>Téléphone :</strong> 04 67 72 50 20</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};