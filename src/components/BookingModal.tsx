import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useBookingStore } from '../stores/bookingStore';
import { useAuth } from '../contexts/AuthContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: string;
  availableSlots: Array<{
    date: Date;
    time: string;
  }>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  activity,
  availableSlots
}) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const { user } = useAuth();
  const { createBooking, loading, error } = useBookingStore();

  const handleBooking = async () => {
    if (!user || selectedSlot === null) return;

    const slot = availableSlots[selectedSlot];
    const bookingDate = new Date(slot.date);
    const [hours, minutes] = slot.time.split(':');
    bookingDate.setHours(parseInt(hours), parseInt(minutes));

    await createBooking(user.id);
    if (!error) onClose();
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
          Réserver une séance de {activity}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid gap-4">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedSlot(index)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  selectedSlot === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-600" size={20} />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">
                      {format(slot.date, 'EEEE d MMMM', { locale: fr })}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} />
                      {slot.time}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleBooking}
            disabled={loading || selectedSlot === null}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Réservation en cours...' : 'Confirmer la réservation'}
          </button>
        </div>
      </div>
    </div>
  );
};