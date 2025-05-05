import React from 'react';
import { ContactSection } from '../components/ContactSection';

export const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">POLITIQUE DE CONFIDENTIALITÉ</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Protection de vos données personnelles
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Introduction</h2>
              <p className="text-gray-700 mb-4">
                AQUABIKE CENTER s'engage à protéger la vie privée des utilisateurs de son site internet et à assurer la protection des informations personnelles que vous nous communiquez. La présente politique de confidentialité détaille la manière dont nous collectons, utilisons et protégeons vos données personnelles.
              </p>
            </section>

            {/* Collecte des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Collecte des données</h2>
              <p className="text-gray-700 mb-4">
                Nous collectons les informations que vous nous fournissez directement, notamment :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Date de naissance</li>
                <li>Informations de paiement</li>
                <li>Historique des réservations</li>
              </ul>
            </section>

            {/* Utilisation des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Utilisation des données</h2>
              <p className="text-gray-700 mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Gérer votre compte et vos réservations</li>
                <li>Vous envoyer des confirmations de réservation</li>
                <li>Vous informer sur nos services et offres spéciales</li>
                <li>Améliorer nos services</li>
                <li>Répondre à vos questions et demandes</li>
                <li>Assurer la sécurité de nos installations</li>
              </ul>
            </section>

            {/* Protection des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Protection des données</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés. Ces mesures comprennent :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Le chiffrement des données sensibles</li>
                <li>Des pare-feu et systèmes de sécurité</li>
                <li>Des contrôles d'accès stricts</li>
                <li>Des audits réguliers de sécurité</li>
              </ul>
            </section>

            {/* Partage des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Partage des données</h2>
              <p className="text-gray-700 mb-4">
                Nous ne partageons vos données personnelles qu'avec :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Nos prestataires de services (paiement, hébergement)</li>
                <li>Les autorités compétentes lorsque la loi l'exige</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Nous ne vendons jamais vos données personnelles à des tiers.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Cookies</h2>
              <p className="text-gray-700 mb-4">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies nous permettent de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Mémoriser vos préférences</li>
                <li>Analyser l'utilisation du site</li>
                <li>Personnaliser votre expérience</li>
                <li>Sécuriser votre connexion</li>
              </ul>
            </section>

            {/* Vos droits */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Vos droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Nous contacter</h2>
              <p className="text-gray-700">
                Pour toute question concernant notre politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li><strong>Email :</strong> dpo@aquabike-center.fr</li>
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