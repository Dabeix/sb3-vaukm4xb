import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchPayments = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPayments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();

    // Subscribe to changes
    const subscription = supabase
      .channel('payments_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'payment_transactions',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        // Update payments when changes occur
        fetchPayments();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return { payments, loading, error };
};