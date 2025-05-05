import React from 'react';
import { ContactSection } from '../components/ContactSection';

export const Accessibilite = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">ACCESSIBILITÉ</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Notre engagement pour un accès inclusif à nos services
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Notre engagement</h2>
              <p className="text-gray-700 mb-4">
                AQUABIKE CENTER s'engage à rendre ses services accessibles à tous, y compris aux personnes en situation de handicap. Nous mettons tout en œuvre pour garantir l'accessibilité de nos centres et de notre site internet.
              </p>
            </section>

            {/* Accessibilité des centres */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Accessibilité de nos centres</h2>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Accès aux bâtiments</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Places de parking PMR à proximité immédiate des entrées</li>
                  <li>Rampes d'accès aux normes</li>
                  <li>Portes automatiques</li>
                  <li>Ascenseurs accessibles aux fauteuils roulants</li>
                  <li>Signalétique claire et visible</li>
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Vestiaires et sanitaires</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Cabines adaptées spacieuses</li>
                  <li>Douches accessibles avec siège</li>
                  <li>Toilettes PMR</li>
                  <li>Barres d'appui</li>
                  <li>Sols antidérapants</li>
                </ul>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Bassins</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Élévateur pour l'accès aux bassins</li>
                  <li>Main courante tout autour des bassins</li>
                  <li>Équipements adaptés disponibles</li>
                  <li>Personnel formé à l'accompagnement</li>
                </ul>
              </div>
            </section>

            {/* Accessibilité numérique */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Accessibilité numérique</h2>
              <p className="text-gray-700 mb-4">
                Notre site internet est développé selon les recommandations du RGAA (Référentiel Général d'Amélioration de l'Accessibilité) et les normes WCAG 2.1. Nous veillons à :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fournir des alternatives textuelles aux contenus visuels</li>
                <li>Assurer une navigation possible au clavier</li>
                <li>Maintenir un contraste suffisant</li>
                <li>Proposer une structure de contenu claire</li>
                <li>Permettre le redimensionnement du texte</li>
                <li>Rendre le contenu compatible avec les lecteurs d'écran</li>
              </ul>
            </section>

            {/* Personnel formé */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Personnel formé</h2>
              <p className="text-gray-700 mb-4">
                Nos équipes sont formées à l'accueil et à l'accompagnement des personnes en situation de handicap :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Formation à l'accueil des personnes handicapées</li>
                <li>Maîtrise des équipements spécifiques</li>
                <li>Connaissance des différents types de handicap</li>
                <li>Capacité à adapter les activités</li>
              </ul>
            </section>

            {/* Activités adaptées */}
            <section className="mb-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Activités adaptées</h2>
              <p className="text-gray-700 mb-4">
                Nous proposons des activités adaptées aux différents types de handicap :
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Séances individuelles personnalisées</li>
                <li>Créneaux horaires dédiés</li>
                <li>Matériel adapté</li>
                <li>Accompagnement spécifique</li>
              </ul>
            </section>

            {/* Contact et assistance */}
            <section>
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-4">Contact et assistance</h2>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant l'accessibilité de nos centres ou pour des besoins spécifiques, n'hésitez pas à contacter notre référent accessibilité :
              </p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Nom :</strong> Marie Martin</li>
                <li><strong>Email :</strong> accessibilite@aquabike-center.fr</li>
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