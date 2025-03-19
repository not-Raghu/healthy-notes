import React, { useState } from 'react';
import DocumentManager from '../components/DocumentManager';
import { useDigiLocker } from '../hooks/useDigiLocker';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  url?: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Blood Test Results.pdf',
      type: 'pdf',
      size: 1024 * 1024,
      uploadedAt: new Date('2024-03-15')
    }
  ]);

  const { linkAccount } = useDigiLocker();

  const handleUpload = (file: File) => {
    const newDoc: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date()
    };
    setDocuments([...documents, newDoc]);
  };

  const handleRemove = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medical Documents</h1>
        <p className="mt-1 text-gray-600">
          Securely store and manage your medical records, test results, and prescriptions.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <DocumentManager
          documents={documents}
          onUpload={handleUpload}
          onRemove={handleRemove}
          onDigiLockerLink={linkAccount}
        />
      </div>
    </div>
  );
};

export default Documents;