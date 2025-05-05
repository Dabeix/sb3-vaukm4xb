import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const centers = [
  {
    name: "CASTELNAU-LE-LEZ",
    address: "1744 Avenue de l'Europe, 34170 Castelnau-le-Lez",
    phone: "04 67 72 50 20",
    email: "castelnau@aquabike-center.fr",
    hours: {
      weekdays: "9h - 21h",
      saturday: "9h - 18h",
      sunday: "9h - 13h"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.6983284859544!2d3.9191844!3d43.6191242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6a5c7a0d6f0f9%3A0x3c0f0f0f0f0f0f0f!2s1744%20Avenue%20de%20l&#39;Europe%2C%2034170%20Castelnau-le-Lez!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
  },
  {
    name: "MONTPELLIER - LE NUAGE",
    address: "1 rue des Chevaliers de Malte, 34070 Montpellier",
    phone: "04 67 34 43 00",
    email: "montpellier@aquabike-center.fr",
    hours: {
      weekdays: "9h - 21h",
      saturday: "9h - 18h",
      sunday: "9h - 13h"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.8963284859544!2d3.8891844!3d43.6091242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6af0f9e1f9a9f%3A0x3c0f0f0f0f0f0f0f!2s1%20Rue%20des%20Chevaliers%20de%20Malte%2C%2034070%20Montpellier!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
  }
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    center: centers[0].name
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            email: formData.email,
            content: `Message de contact:
              Nom: ${formData.name}
              Téléphone: ${formData.phone}
              Centre: ${formData.center}
              Sujet: ${formData.subject}
              Message: ${formData.message}`
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        center: centers[0].name
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">CONTACT</h1>
          <p className="text-center text-blue-100 max-w-2xl mx-auto">
            Une question ? N'hésitez pas à nous contacter !
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Centers Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {centers.map((center, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6">
                  {center.name}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Adresse</h3>
                      <p className="text-gray-600">{center.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Téléphone</h3>
                      <p className="text-gray-600">{center.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-gray-600">{center.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Horaires</h3>
                      <div className="text-gray-600">
                        <p>Lundi au Vendredi : {center.hours.weekdays}</p>
                        <p>Samedi : {center.hours.saturday}</p>
                        <p>Dimanche : {center.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src={center.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-amatic font-bold text-blue-800 mb-6">
                Formulaire de contact
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="center" className="block text-sm font-medium text-gray-700">Centre</label>
                    <select
                      id="center"
                      value={formData.center}
                      onChange={(e) => setFormData({...formData, center: e.target.value})}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {centers.map((center, index) => (
                        <option key={index} value={center.name}>{center.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet</label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {submitStatus === 'loading' ? 'Envoi en cours...' : 'Envoyer'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm text-center">Votre message a été envoyé avec succès !</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center">Une erreur est survenue. Veuillez réessayer.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};