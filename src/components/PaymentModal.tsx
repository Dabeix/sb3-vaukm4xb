import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../contexts/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: number;
  priceId: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  productName,
  price,
  priceId
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      setError('Veuillez vous connecter pour effectuer un paiement');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe n\'est pas initialisé');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Paiement - {productName}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Montant total</span>
              <span className="text-2xl font-bold text-gray-900">{price}€</span>
            </div>
            <div className="text-sm text-gray-500">
              Paiement sécurisé par Stripe
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <CreditCard size={20} />
            {loading ? 'Traitement en cours...' : 'Procéder au paiement'}
          </button>

          <p className="text-xs text-center text-gray-500">
            En cliquant sur "Procéder au paiement", vous acceptez nos conditions générales de vente
          </p>
        </div>
      </div>
    </div>
  );
};