import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../hooks/useBookings';
import { usePayments } from '../hooks/usePayments';

export const Account = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { bookings, loading: bookingsLoading } = useBookings();
  const { payments, loading: paymentsLoading } = usePayments();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Compte</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Réservations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Mes Réservations</h2>
            </div>
            
            {bookingsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucune réservation pour le moment
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking: any) => (
                  <div key={booking.id} className="border rounded-lg p-4">
                    <div className="font-medium text-gray-900">{booking.activity}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paiements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Mes Paiements</h2>
            </div>
            
            {paymentsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : payments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Aucun paiement pour le moment
              </p>
            ) : (
              <div className="space-y-4">
                {payments.map((payment: any) => (
                  <div key={payment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-900">{payment.amount}€</div>
                      <div className={`text-sm ${
                        payment.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {payment.status === 'completed' ? 'Payé' : 'En attente'}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(payment.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};