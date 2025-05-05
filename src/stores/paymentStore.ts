import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';
import { createPaymentSession } from '../lib/stripe';

interface PaymentState {
  loading: boolean;
  error: string | null;
  processingPayment: boolean;
  initiatePayment: (priceId: string, userId: string) => Promise<void>;
  recordPayment: (paymentId: string, userId: string, amount: number) => Promise<void>;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  loading: false,
  error: null,
  processingPayment: false,

  initiatePayment: async (priceId: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const session = await createPaymentSession(priceId);
      
      // Record the pending payment
      await supabase.from('payment_transactions').insert({
        user_id: userId,
        amount: session.amount_total / 100, // Convert from cents to euros
        status: 'pending',
        payment_method: 'stripe',
        metadata: {
          stripe_session_id: session.id,
          price_id: priceId
        }
      });

      return session;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Une erreur est survenue' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  recordPayment: async (paymentId: string, userId: string, amount: number) => {
    set({ processingPayment: true, error: null });
    try {
      // Update the payment transaction
      const { error } = await supabase
        .from('payment_transactions')
        .update({
          status: 'completed',
          amount: amount,
          updated_at: new Date().toISOString()
        })
        .match({ user_id: userId })
        .single();

      if (error) throw error;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Une erreur est survenue' });
      throw error;
    } finally {
      set({ processingPayment: false });
    }
  }
}));