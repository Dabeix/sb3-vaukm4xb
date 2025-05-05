import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Calendar, Settings, Clock, CreditCard, LogOut, ToggleLeft as Toggle, Save, Plus, Trash2, Users, Mail, MapPin } from 'lucide-react';

interface SiteSettings {
  id: string;
  floating_bubble_active: boolean;
  floating_bubble_text: string;
  mardi_chill_text: string;
  mardi_chill_subtitle: string;
  mardi_chill_schedule: string;
  mardi_chill_color: string;
  mardi_chill_icon: string;
}

interface Schedule {
  id: string;
  activity: string;
  day: string;
  time: string;
  location: string;
  capacity: number;
}

interface Price {
  id: string;
  activity: string;
  name: string;
  price: number;
  description: string | null;
}

interface NewsletterSubscription {
  id: string;
  email: string;
  created_at: string;
  status: string;
}

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState<SiteSettings>({
    id: '',
    floating_bubble_active: true,
    floating_bubble_text: '',
    mardi_chill_text: '',
    mardi_chill_subtitle: '',
    mardi_chill_schedule: '',
    mardi_chill_color: 'blue',
    mardi_chill_icon: 'sparkles'
  });
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [newsletterSubscriptions, setNewsletterSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load site settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (settingsError) throw settingsError;
      if (settingsData) setSettings(settingsData);

      // Load schedules
      const { data: schedulesData, error: schedulesError } = await supabase
        .from('schedules')
        .select('*')
        .order('activity', { ascending: true });

      if (schedulesError) throw schedulesError;
      if (schedulesData) setSchedules(schedulesData);

      // Load prices
      const { data: pricesData, error: pricesError } = await supabase
        .from('pricing')
        .select('*')
        .order('activity', { ascending: true });

      if (pricesError) throw pricesError;
      if (pricesData) setPrices(pricesData);

      // Load newsletter subscriptions
      const { data: newsletterData, error: newsletterError } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (newsletterError) throw newsletterError;
      if (newsletterData) setNewsletterSubscriptions(newsletterData);

    } catch (error) {
      console.error('Error loading data:', error);
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setError(null);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          id: settings.id || undefined,
          floating_bubble_active: settings.floating_bubble_active,
          floating_bubble_text: settings.floating_bubble_text,
          mardi_chill_text: settings.mardi_chill_text,
          mardi_chill_subtitle: settings.mardi_chill_subtitle,
          mardi_chill_schedule: settings.mardi_chill_schedule,
          mardi_chill_color: settings.mardi_chill_color,
          mardi_chill_icon: settings.mardi_chill_icon,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Erreur lors de la sauvegarde des paramètres');
    }
  };

  const deleteSchedule = async (id: string) => {
    setError(null);
    try {
      const { error } = await supabase
        .from('schedules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      setError('Erreur lors de la suppression du créneau');
    }
  };

  const deletePrice = async (id: string) => {
    setError(null);
    try {
      const { error } = await supabase
        .from('pricing')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadData();
    } catch (error) {
      console.error('Error deleting price:', error);
      setError('Erreur lors de la suppression du tarif');
    }
  };

  const exportNewsletterSubscriptions = () => {
    const csvContent = [
      ['Email', 'Date d\'inscription', 'Statut'],
      ...newsletterSubscriptions.map(sub => [
        sub.email,
        new Date(sub.created_at).toLocaleDateString('fr-FR'),
        sub.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter_subscriptions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Administration
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'schedules' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                }`}
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'pricing' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'newsletter' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                }`}
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Paramètres du site</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Bulle flottante active
                </label>
                <button
                  onClick={() => setSettings(s => ({ ...s, floating_bubble_active: !s.floating_bubble_active }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.floating_bubble_active ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.floating_bubble_active ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte de la bulle
                </label>
                <input
                  type="text"
                  value={settings.floating_bubble_text}
                  onChange={(e) => setSettings(s => ({ ...s, floating_bubble_text: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte Mardi Chill
                </label>
                <input
                  type="text"
                  value={settings.mardi_chill_text}
                  onChange={(e) => setSettings(s => ({ ...s, mardi_chill_text: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre Mardi Chill
                </label>
                <input
                  type="text"
                  value={settings.mardi_chill_subtitle}
                  onChange={(e) => setSettings(s => ({ ...s, mardi_chill_subtitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horaires Mardi Chill
                </label>
                <textarea
                  value={settings.mardi_chill_schedule}
                  onChange={(e) => setSettings(s => ({ ...s, mardi_chill_schedule: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Couleur Mardi Chill
                </label>
                <select
                  value={settings.mardi_chill_color}
                  onChange={(e) => setSettings(s => ({ ...s, mardi_chill_color: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="blue">Bleu</option>
                  <option value="cyan">Cyan</option>
                  <option value="indigo">Indigo</option>
                  <option value="violet">Violet</option>
                  <option value="rose">Rose</option>
                  <option value="orange">Orange</option>
                  <option value="green">Vert</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icône Mardi Chill
                </label>
                <select
                  value={settings.mardi_chill_icon}
                  onChange={(e) => setSettings(s => ({ ...s, mardi_chill_icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="sparkles">Étincelles</option>
                  <option value="star">Étoile</option>
                  <option value="sun">Soleil</option>
                  <option value="heart">Cœur</option>
                  <option value="flame">Flamme</option>
                </select>
              </div>
              <button
                onClick={saveSettings}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Horaires</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lieu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horaire
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedules.map((schedule) => (
                    <tr key={schedule.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {schedule.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.activity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.day}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.capacity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => deleteSchedule(schedule.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Tarifs</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {prices.map((price) => (
                <div key={price.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{price.name}</h3>
                      <p className="text-sm text-gray-500">{price.activity}</p>
                    </div>
                    <button 
                      onClick={() => deletePrice(price.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{price.price}€</p>
                  {price.description && (
                    <p className="mt-2 text-sm text-gray-600">{price.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'newsletter' && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Abonnés Newsletter</h2>
              <button
                onClick={exportNewsletterSubscriptions}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Exporter en CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newsletterSubscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscription.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(subscription.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};