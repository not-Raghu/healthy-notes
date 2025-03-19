import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Star } from 'lucide-react';
import { useLoadScript } from '@react-google-maps/api';

interface HealthcareFacility {
  id: string;
  name: string;
  type: string;
  rating: number;
  address: string;
  phone: string;
  hours: string;
  position: {
    lat: number;
    lng: number;
  };
}

const FindHealthcare = () => {
  const [facilities] = useState<HealthcareFacility[]>([
    {
      id: '1',
      name: 'Manipal Hospital',
      type: 'Hospital',
      rating: 4.8,
      address: 'Kanakadurga Varadhi, Tadepalle, Vijayawada',
      phone: '1800 102 4647',
      hours: 'Open 24/7',
      position: { lat:16.4844, lng:80.6172}
    },
    {
      id: '2',
      name: 'Andhra Hospitals',
      type: 'Hospital',
      rating: 4.0,
      address: 'Bhavanipuram, Gollapudi, Vijayawada',
      phone: '0866 241 5757',
      hours: 'Open 24/7',
      position: { lat:16.5111, lng:80.6294 }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null);
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Healthcare</h1>
        <p className="mt-1 text-gray-600">
          Locate nearby hospitals, clinics, and healthcare providers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and Results */}
        <div className="space-y-4">
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for healthcare facilities..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedFacility(facility)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{facility.name}</h3>
                    <p className="text-sm text-gray-500">{facility.type}</p>
                  </div>
                  <div className="flex">{renderStars(facility.rating)}</div>
                </div>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {facility.address}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {facility.phone}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {facility.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-[600px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Maps Integration Unavailable</h3>
              <p className="text-gray-600 max-w-md">
                The Google Maps integration is currently unavailable. Please use the facility list to view healthcare providers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindHealthcare;