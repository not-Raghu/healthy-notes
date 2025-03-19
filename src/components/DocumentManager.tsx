import React, { useState, useRef } from 'react';
import { FileText, Trash2, Link, Upload } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  url?: string;
}

interface DocumentManagerProps {
  documents: Document[];
  onUpload: (file: File) => void;
  onRemove: (id: string) => void;
  onDigiLockerLink: () => void;
}

const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onUpload,
  onRemove,
  onDigiLockerLink
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => onUpload(file));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          className="hidden"
          multiple
        />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Drag and drop files here, or</p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          browse to upload
        </button>
      </div>

      {/* DigiLocker Link */}
      <button
        onClick={onDigiLockerLink}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
      >
        <Link className="w-5 h-5" />
        <span>Link with DigiLocker</span>
      </button>

      {/* Document List */}
      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                <p className="text-sm text-gray-500">
                  {formatFileSize(doc.size)} • {doc.uploadedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(doc.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;