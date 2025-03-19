import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Allergy {
  id: string;
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction: string;
}

interface AllergyFormProps {
  onAdd: (allergy: Allergy) => void;
  onRemove: (id: string) => void;
  allergies: Allergy[];
}

const AllergyForm: React.FC<AllergyFormProps> = ({ onAdd, onRemove, allergies }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAllergy, setNewAllergy] = useState({
    name: '',
    severity: 'Mild' as const,
    reaction: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      ...newAllergy
    });
    setNewAllergy({ name: '', severity: 'Mild', reaction: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Existing Allergies */}
      <div className="space-y-2">
        {allergies.map((allergy) => (
          <div
            key={allergy.id}
            className="flex items-start justify-between p-3 bg-white rounded-lg border border-gray-200"
          >
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{allergy.name}</h4>
                <span className={`px-2 py-1 text-xs rounded ${
                  allergy.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                  allergy.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {allergy.severity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{allergy.reaction}</p>
            </div>
            <button
              onClick={() => onRemove(allergy.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Allergy Form */}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Allergy Name</label>
            <input
              type="text"
              required
              value={newAllergy.name}
              onChange={(e) => setNewAllergy({ ...newAllergy, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Severity</label>
            <select
              value={newAllergy.severity}
              onChange={(e) => setNewAllergy({ ...newAllergy, severity: e.target.value as 'Mild' | 'Moderate' | 'Severe' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Reaction</label>
            <textarea
              value={newAllergy.reaction}
              onChange={(e) => setNewAllergy({ ...newAllergy, reaction: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div className="flex justify-end space-x-2">
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
              Save
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Allergy</span>
        </button>
      )}
    </div>
  );
};

export default AllergyForm;