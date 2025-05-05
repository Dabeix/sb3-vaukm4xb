import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

interface BookingState {
  selectedActivity: string | null;
  selectedDate: Date | null;
  loading: boolean;
  error: string | null;
  setActivity: (activity: string) => void;
  setDate: (date: Date) => void;
  createBooking: (userId: string) => Promise<void>;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  selectedActivity: null,
  selectedDate: null,
  loading: false,
  error: null,

  setActivity: (activity) => set({ selectedActivity: activity }),
  setDate: (date) => set({ selectedDate: date }),
  
  createBooking: async (userId) => {
    const { selectedActivity, selectedDate } = get();
    
    if (!selectedActivity || !selectedDate) {
      set({ error: 'Veuillez sélectionner une activité et une date' });
      return;
    }

    set({ loading: true, error: null });

    try {
      // Vérifier si le créneau est disponible
      const { data: existingBookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('activity', selectedActivity)
        .eq('date', selectedDate.toISOString());

      if (existingBookings && existingBookings.length > 0) {
        throw new Error('Ce créneau est déjà réservé');
      }

      // Créer la réservation
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: userId,
          activity: selectedActivity,
          date: selectedDate.toISOString(),
        });

      if (error) throw error;
      
      // Clear selection after successful booking
      get().clearBooking();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Une erreur est survenue' });
    } finally {
      set({ loading: false });
    }
  },

  clearBooking: () => set({
    selectedActivity: null,
    selectedDate: null,
    error: null
  })
}));