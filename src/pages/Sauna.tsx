import React from 'react';
import { Flame, Clock } from 'lucide-react';
import saunaImage from '/images/SAUNAP.jpg';

export const Sauna = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">SAUNA</h1>
          <p className="text-center text-orange-100 max-w-2xl mx-auto">
            Détente et bien-être dans notre espace sauna
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Image */}
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={saunaImage} 
                  alt="Sauna" 
                  className="w-full h-[500px] object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent rounded-2xl"></div>
              </div>
            </div>

            {/* Right Column - Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
                <h2 className="text-2xl font-amatic font-bold text-orange-800">
                  Horaires d'ouverture
                </h2>
              </div>
              <div className="space-y-6">
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-800 mb-4">Du lundi au vendredi</h3>
                  <div className="space-y-2 text-orange-700">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      9h à 13h30
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      17h30 à 20h30
                    </p>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-800 mb-4">Samedi</h3>
                  <p className="flex items-center gap-2 text-orange-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    9h à 12h
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Sections - Horizontal Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bienfaits du Sauna */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <Flame className="w-8 h-8 text-orange-600" />
                <h2 className="text-2xl font-amatic font-bold text-orange-800">
                  Les bienfaits du sauna
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Le sauna offre de nombreux avantages pour votre santé et votre bien-être :
                </p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Détente musculaire profonde
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Amélioration de la circulation sanguine
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Élimination des toxines
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Renforcement du système immunitaire
                  </li>
                </ul>
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Recommandations
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Hydratez-vous bien avant et après la séance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Prenez une douche avant d'entrer
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Limitez vos séances à 15-20 minutes
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Reposez-vous entre les séances
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Apportez votre serviette
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};