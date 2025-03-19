import React, { useState } from 'react';
import AllergyForm from '../components/AllergyForm';

interface Allergy {
  id: string;
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction: string;
}

const Allergies = () => {
  const [allergies, setAllergies] = useState<Allergy[]>([
    {
      id: '1',
      name: 'Penicillin',
      severity: 'Severe',
      reaction: 'Anaphylaxis'
    }
  ]);

  const handleAddAllergy = (allergy: Allergy) => {
    setAllergies([...allergies, allergy]);
  };

  const handleRemoveAllergy = (id: string) => {
    setAllergies(allergies.filter(allergy => allergy.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Allergies</h1>
        <p className="mt-1 text-gray-600">
          Manage your allergies and reactions to help healthcare providers give you better care.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <AllergyForm
          allergies={allergies}
          onAdd={handleAddAllergy}
          onRemove={handleRemoveAllergy}
        />
      </div>
    </div>
  );
};

export default Allergies;