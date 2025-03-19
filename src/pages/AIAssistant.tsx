import React from 'react';
import AIAssistantComponent from '../components/AIAssistant';

const AIAssistant = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI Health Assistant</h1>
        <p className="mt-1 text-gray-600">
          Get instant help with health-related questions and medical information.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <AIAssistantComponent variant="floating" />
      </div>
    </div>
  );
};

export default AIAssistant;