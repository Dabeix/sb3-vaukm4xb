import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
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
              Message: ${formData.message}`
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-amatic font-bold text-center text-blue-800 mb-8">CONTACTEZ-NOUS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
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

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-4">CASTELNAU-LE-LEZ</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} className="text-blue-600" />
                      1744 Avenue de l'Europe, 34170 Castelnau-le-Lez
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Phone size={18} className="text-blue-600" />
                      04 67 72 50 20
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-4">MONTPELLIER - LE NUAGE</h3>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} className="text-blue-600" />
                      1 rue des Chevaliers de Malte, 34070 Montpellier
                    </p>
                    <p className="flex items-center gap-2 text-gray-700">
                      <Phone size={18} className="text-blue-600" />
                      04 67 34 43 00
                    </p>
                  </div>
                </div>
                <div>
                  <p className="flex items-center gap-2 text-gray-700">
                    <Mail size={18} className="text-blue-600" />
                    contact@aquabike-center.fr
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};