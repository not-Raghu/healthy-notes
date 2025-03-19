import React, { useState } from 'react';
import MedicalHistoryForm from '../components/MedicalHistoryForm';

interface MedicalRecord {
  id: string;
  type: 'condition' | 'procedure' | 'medication';
  name: string;
  date: string;
  details: string;
  status: 'active' | 'resolved' | 'ongoing';
  provider?: string;
}

const MedicalHistory = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      type: 'condition',
      name: 'Hypertension',
      date: '2023-06-15',
      details: 'Diagnosed with high blood pressure. Regular monitoring required.',
      status: 'active',
      provider: 'Dr. James Wilson'
    },
    {
      id: '2',
      type: 'procedure',
      name: 'Appendectomy',
      date: '2022-03-10',
      details: 'Laparoscopic appendix removal',
      status: 'resolved',
      provider: 'Dr. Sarah Chen'
    },
    {
      id: '3',
      type: 'medication',
      name: 'Lisinopril',
      date: '2023-06-15',
      details: '10mg daily for blood pressure management',
      status: 'ongoing',
      provider: 'Dr. James Wilson'
    }
  ]);

  const handleAddRecord = (record: MedicalRecord) => {
    setRecords([...records, record]);
  };

  const handleRemoveRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medical History</h1>
        <p className="mt-1 text-gray-600">
          Keep track of your medical conditions, procedures, and medications for better healthcare management.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">●</span>
              <span className="text-sm text-gray-600">Conditions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-500">▲</span>
              <span className="text-sm text-gray-600">Procedures</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">■</span>
              <span className="text-sm text-gray-600">Medications</span>
            </div>
          </div>
        </div>

        <MedicalHistoryForm
          records={records}
          onAdd={handleAddRecord}
          onRemove={handleRemoveRecord}
        />
      </div>
    </div>
  );
};

export default MedicalHistory;