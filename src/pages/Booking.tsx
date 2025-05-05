import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '../contexts/AuthContext';
import { useBookingStore } from '../stores/bookingStore';
import { supabase } from '../lib/supabaseClient';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DaySchedule {
  date: Date;
  slots: TimeSlot[];
}

export const Booking = () => {
  const { activity } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { createBooking, error, setActivity, setDate } = useBookingStore();

  useEffect(() => {
    if (!user) {
      // Store the current location before redirecting
      navigate('/login', { state: { from: location } });
      return;
    }

    if (activity) {
      setActivity(activity);
    }

    const fetchSchedule = async () => {
      setLoading(true);
      try {
        // Fetch available slots from Supabase
        const { data: scheduleData, error } = await supabase
          .from('schedules')
          .select('*')
          .eq('activity', activity)
          .order('day', { ascending: true });

        if (error) throw error;

        // Fetch existing bookings to check availability
        const startDate = new Date();
        const endDate = addDays(startDate, 7);
        const { data: existingBookings } = await supabase
          .from('bookings')
          .select('date, activity')
          .eq('activity', activity)
          .gte('date', startDate.toISOString())
          .lte('date', endDate.toISOString());

        // Create schedule for next 7 days
        const nextWeekSchedule = Array.from({ length: 7 }, (_, i) => {
          const date = addDays(new Date(), i);
          const dayName = format(date, 'EEEE', { locale: fr }).toLowerCase();
          
          const daySlots = scheduleData
            ?.filter(s => s.day.toLowerCase() === dayName)
            .map(s => {
              const slotTime = s.time;
              const [hours, minutes] = slotTime.split(':');
              const slotDate = new Date(date);
              slotDate.setHours(parseInt(hours), parseInt(minutes));

              // Check if slot is already booked
              const isBooked = existingBookings?.some(booking => 
                isSameDay(new Date(booking.date), date) && 
                format(new Date(booking.date), 'HH:mm') === slotTime
              );

              return {
                time: slotTime,
                available: !isBooked && s.capacity > 0
              };
            }) || [];

          return {
            date,
            slots: daySlots
          };
        });

        setSchedule(nextWeekSchedule);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [activity, user, navigate, setActivity, location]);

  const handleBooking = async () => {
    if (!user || !selectedDate || !selectedTime || !activity) return;

    const bookingDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(':');
    bookingDate.setHours(parseInt(hours), parseInt(minutes));

    setDate(bookingDate);
    await createBooking(user.id);
    
    if (!error) {
      navigate('/account');
    }
  };

  const handleBack = () => {
    navigate(-1); // This will take the user back to the previous page
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-blue-600 mb-8 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Réserver une séance de {activity}
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Sélectionnez une date
              </h2>
              <div className="space-y-4">
                {schedule.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedTime(null); // Reset selected time when date changes
                    }}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedDate && isSameDay(selectedDate, day.date)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    } ${day.slots.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={day.slots.length === 0}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="text-blue-600" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">
                          {format(day.date, 'EEEE d MMMM', { locale: fr })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {day.slots.filter(slot => slot.available).length} créneaux disponibles
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Sélectionnez un horaire
              </h2>
              <div className="space-y-4">
                {selectedDate &&
                  schedule
                    .find(day => isSameDay(day.date, selectedDate))
                    ?.slots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`w-full text-left p-4 rounded-lg border transition-colors ${
                          selectedTime === slot.time
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-200'
                        } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="text-blue-600" size={20} />
                          <div>
                            <div className="font-medium text-gray-900">{slot.time}</div>
                            <div className="text-sm text-gray-500">
                              {slot.available ? 'Disponible' : 'Complet'}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="w-full md:w-auto flex justify-center items-center gap-2 py-2 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Confirmer la réservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};