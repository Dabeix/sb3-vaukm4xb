import React from 'react';
import { ContactSection } from '../components/ContactSection';

export const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">MENTIONS LÉGALES</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Informations légales et réglementaires
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Éditeur */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Éditeur du site</h2>
              <p className="text-gray-700 mb-4">
                <strong>AQUABIKE CENTER</strong><br />
                SAS au capital de 50 000€<br />
                RCS Montpellier B 123 456 789<br />
                SIRET : 123 456 789 00011<br />
                TVA Intracommunautaire : FR 12 345678901<br />
                Siège social : 1744 Avenue de l'Europe, 34170 Castelnau-le-Lez
              </p>
              <p className="text-gray-700">
                <strong>Directeur de la publication :</strong> Jean Dupont
              </p>
            </section>

            {/* Hébergeur */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Hébergement</h2>
              <p className="text-gray-700">
                <strong>OVH SAS</strong><br />
                2 rue Kellermann<br />
                59100 Roubaix - France<br />
                Tél : 1007
              </p>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-700">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            {/* Données personnelles */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Protection des données personnelles</h2>
              <p className="text-gray-700 mb-4">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-gray-700">
                Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez nous contacter à l'adresse suivante : dpo@aquabike-center.fr
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Cookies</h2>
              <p className="text-gray-700">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez paramétrer vos préférences concernant les cookies dans les paramètres de votre navigateur.
              </p>
            </section>

            {/* Liens hypertextes */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Liens hypertextes</h2>
              <p className="text-gray-700">
                La création de liens hypertextes vers le site www.aquabike-center.fr est soumise à l'accord préalable du Directeur de la Publication. Les liens hypertextes établis en direction d'autres sites à partir de www.aquabike-center.fr ne sauraient, en aucun cas, engager la responsabilité de AQUABIKE CENTER.
              </p>
            </section>

            {/* Crédits */}
            <section>
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Crédits</h2>
              <p className="text-gray-700">
                Conception et réalisation : AQUABIKE CENTER<br />
                Photographies : © AQUABIKE CENTER - Tous droits réservés
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};