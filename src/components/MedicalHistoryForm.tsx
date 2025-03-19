import React, { useState } from 'react';
import { Plus, X, Calendar, Clock, Guitar as Hospital } from 'lucide-react';

interface MedicalRecord {
  id: string;
  type: 'condition' | 'procedure' | 'medication';
  name: string;
  date: string;
  details: string;
  status: 'active' | 'resolved' | 'ongoing';
  provider?: string;
}

interface MedicalHistoryFormProps {
  records: MedicalRecord[];
  onAdd: (record: MedicalRecord) => void;
  onRemove: (id: string) => void;
}

const MedicalHistoryForm: React.FC<MedicalHistoryFormProps> = ({ records, onAdd, onRemove }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newRecord, setNewRecord] = useState<Omit<MedicalRecord, 'id'>>({
    type: 'condition',
    name: '',
    date: '',
    details: '',
    status: 'active',
    provider: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      ...newRecord
    });
    setNewRecord({
      type: 'condition',
      name: '',
      date: '',
      details: '',
      status: 'active',
      provider: ''
    });
    setIsAdding(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'condition':
        return <span className="text-red-500">●</span>;
      case 'procedure':
        return <span className="text-blue-500">▲</span>;
      case 'medication':
        return <span className="text-green-500">■</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Records List */}
      <div className="space-y-3">
        {records.map((record) => (
          <div
            key={record.id}
            className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                {getTypeIcon(record.type)}
                <h4 className="font-medium text-gray-900">{record.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
              
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{record.date}</span>
                </div>
                {record.provider && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Hospital className="w-4 h-4 mr-2" />
                    <span>{record.provider}</span>
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-2">{record.details}</p>
              </div>
            </div>
            <button
              onClick={() => onRemove(record.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Record Form */}
      {isAdding ? (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={newRecord.type}
                onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value as MedicalRecord['type'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="condition">Medical Condition</option>
                <option value="procedure">Procedure</option>
                <option value="medication">Medication</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={newRecord.status}
                onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value as MedicalRecord['status'] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={newRecord.name}
              onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder={`Enter ${newRecord.type} name`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              required
              value={newRecord.date}
              onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Healthcare Provider</label>
            <input
              type="text"
              value={newRecord.provider || ''}
              onChange={(e) => setNewRecord({ ...newRecord, provider: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter healthcare provider name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              value={newRecord.details}
              onChange={(e) => setNewRecord({ ...newRecord, details: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Enter additional details"
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
          <span>Add Medical Record</span>
        </button>
      )}
    </div>
  );
};

export default MedicalHistoryForm;