import { createClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Site Settings
export const fetchSiteSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .maybeSingle();
    
    if (error) throw error;
    return data || {
      floating_bubble_active: true,
      floating_bubble_text: 'Nouveauté ! Mardis Chill !'
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {
      floating_bubble_active: true,
      floating_bubble_text: 'Nouveauté ! Mardis Chill !'
    };
  }
};

// Auth
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Profile
export const updateProfile = async (profile: {
  id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  birth_date?: string;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', profile.id);
  return { data, error };
};

// Bookings
export const createBooking = async (booking: {
  activity: string;
  date: string;
  user_id: string;
}) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert(booking)
    .select()
    .single();
  return { data, error };
};

// Payments
export const createPaymentTransaction = async (transaction: {
  user_id: string;
  amount: number;
  description: string;
  payment_method: string;
}) => {
  const { data, error } = await supabase
    .from('payment_transactions')
    .insert(transaction)
    .select()
    .single();
  return { data, error };
};

// Subscriptions
export const getUserSubscription = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .maybeSingle();
  return { data, error };
};

// Credits
export const getUserCredits = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', userId)
    .gt('credits_remaining', 0)
    .gt('expires_at', new Date().toISOString());
  return { data, error };
};

// Analytics cache management
const analyticsCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getBookingAnalytics = async (forceRefresh = false) => {
  const cacheKey = 'booking_analytics';
  const cached = analyticsCache.get(cacheKey);
  
  if (!forceRefresh && cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  const { data, error } = await supabase
    .from('booking_analytics')
    .select('*');

  if (!error && data) {
    analyticsCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  return data;
};