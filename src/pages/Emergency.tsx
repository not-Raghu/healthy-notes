import React, { useState } from 'react';
import { Phone, Heart, Plus, X, AlertCircle, Ambulance, ChevronFirst as FirstAid, Pill } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

const Emergency = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Sonam Bajwa',
      relationship: 'Spouse',
      phone: '96768-90765'
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  const emergencyNumbers = [
    {
      name: 'Emergency Services',
      number: '112',
      description: 'Police, Fire, Ambulance',
      icon: Ambulance,
      color: 'text-red-600'
    },
    {
      name: 'Poison Control',
      number: '1800-425-1213',
      description: 'National Poison Control Center',
      icon: Pill,
      color: 'text-purple-600'
    },
    {
      name: 'Crisis Hotline',
      number: '91529-87821',
      description: 'Suicide & Crisis Lifeline',
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      name: 'Non-Emergency Medical',
      number: '101',
      description: 'Local Health Services',
      icon: FirstAid,
      color: 'text-blue-600'
    }
  ];

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact
    };
    setContacts([...contacts, contact]);
    setNewContact({ name: '', relationship: '', phone: '' });
    setIsAdding(false);
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Emergency Contacts</h1>
        <p className="mt-1 text-gray-600">
          Quick access to emergency services and your emergency contacts.
        </p>
      </div>

      {/* Emergency Numbers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Emergency Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyNumbers.map((service) => (
            <div
              key={service.name}
              className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-full bg-gray-50 ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
                <a
                  href={`tel:${service.number}`}
                  className="mt-1 inline-flex items-center text-lg font-semibold text-blue-600"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {service.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Emergency Contacts
          </h2>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-5 h-5" />
              <span>Add Contact</span>
            </button>
          )}
        </div>

        {/* Add Contact Form */}
        {isAdding && (
          <form onSubmit={handleAddContact} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <input
                  type="text"
                  required
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Contact
              </button>
            </div>
          </form>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.relationship}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleRemoveContact(contact.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;