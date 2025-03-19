import React, { useState } from 'react';
import AppointmentManager from '../components/AppointmentManager';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: '2024-03-25',
      time: '10:00 AM',
      location: 'Heart Care Center'
    }
  ]);

  const handleAddAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  const handleGoogleSync = () => {
    // Show a message that Google Calendar sync is not available
    alert('Google Calendar sync is currently unavailable. Please check back later.');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <p className="mt-1 text-gray-600">
          Schedule and manage your medical appointments.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <AppointmentManager
          appointments={appointments}
          onAdd={handleAddAppointment}
          onGoogleSync={handleGoogleSync}
        />
      </div>
    </div>
  );
};

export default Appointments;