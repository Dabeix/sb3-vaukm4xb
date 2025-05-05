import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, Mail, Check } from 'lucide-react';
import { format, addMonths, isTuesday, isThursday, isSaturday, addDays, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { ContactSection } from '../components/ContactSection';
import evjImage from '/images/EVJ.jpg';

const getUpcomingSlots = () => {
  const slots = [];
  const today = startOfDay(new Date());
  const endDate = addMonths(today, 3);
  let currentDate = today;

  while (currentDate <= endDate) {
    if (isTuesday(currentDate) || isThursday(currentDate)) {
      slots.push({
        date: currentDate,
        time: '20:00 - 22:00'
      });
    } else if (isSaturday(currentDate)) {
      slots.push({
        date: currentDate,
        time: 'Après-midi et soir'
      });
    }
    currentDate = addDays(currentDate, 1);
  }

  return slots;
};

const additionalServices = [
  {
    name: "Massage relaxant",
    description: "30 minutes de détente absolue",
    price: "à partir de 45€/pers."
  },
  {
    name: "Gâteau personnalisé",
    description: "Création sur mesure selon vos envies",
    price: "à partir de 35€"
  },
  {
    name: "Décoration thématique",
    description: "Installation et mise en place incluses",
    price: "à partir de 50€"
  },
  {
    name: "Photographe professionnel",
    description: "Immortalisez vos moments",
    price: "à partir de 150€"
  }
];

export const Events = () => {
  const upcomingSlots = getUpcomingSlots();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleBooking = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
    } else {
      navigate('/booking/events');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            email: formData.email,
            content: `Demande de devis événement:
              Nom: ${formData.name}
              Téléphone: ${formData.phone}
              Date souhaitée: ${formData.date}
              Nombre de personnes: ${formData.guests}
              Message: ${formData.message}`
          }
        ]);

      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <div className="bg-teal-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-amatic font-bold text-center mb-4">ANNIVERSAIRE/EVG-EVJ</h1>
          <p className="text-center text-teal-100 max-w-2xl mx-auto">
            Célébrez vos événements spéciaux dans un cadre unique et aquatique
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Pricing Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-amatic font-bold text-teal-800 mb-6">Tarifs Événements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-4">Privatisation bassin</h3>
                <div className="space-y-4">
                  <p className="text-3xl font-bold text-teal-600">À partir de 250€</p>
                  <p className="text-sm text-teal-600">Pour 10 personnes (2h)</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-teal-700">
                      <Check size={20} className="text-teal-500" />
                      <span>Coach dédié inclus</span>
                    </li>
                    <li className="flex items-center gap-2 text-teal-700">
                      <Check size={20} className="text-teal-500" />
                      <span>Matériel fourni</span>
                    </li>
                    <li className="flex items-center gap-2 text-teal-700">
                      <Check size={20} className="text-teal-500" />
                      <span>Vestiaires privatifs</span>
                    </li>
                  </ul>
                  <p className="text-sm text-teal-600 mt-4">
                    +15€/personne supplémentaire
                  </p>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-teal-800 mb-4">Pack Premium</h3>
                <div className="space-y-4">
                  <p className="text-3xl font-bold text-teal-600">À partir de 450€</p>
                  <p className="text-sm text-teal-600">Pour 10 personnes (3h)</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-teal-700">
                      <Check size={20} className="text-teal-500" />
                      <span>Tout le pack bassin</span>
                    </li>
                    <li className="flex items-center gap-2 text-teal-700">
                      <Check size={20} className="text-teal-500" />
                      <span>Accès spa et sauna</span>
                    </li>
                    <li className="flex items-center gap-2 text-teal-700">
                      <Check size={20} className="text-teal-500" />
                      <span>Collation et boissons</span>
                    </li>
                  </ul>
                  <p className="text-sm text-teal-600 mt-4">
                    +25€/personne supplémentaire
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-amatic font-bold text-teal-800 mb-6">Services Additionnels</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-teal-50 rounded-lg p-6">
                  <h3 className="font-bold text-teal-800 mb-2">{service.name}</h3>
                  <p className="text-sm text-teal-600 mb-4">{service.description}</p>
                  <p className="text-lg font-semibold text-teal-700">{service.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <ContactSection />
        </div>
      </div>
    </div>
  );
};