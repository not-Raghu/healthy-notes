import { useState, useCallback } from 'react';

export const useDigiLocker = () => {
  const [isLinked, setIsLinked] = useState(false);

  const linkAccount = useCallback(async () => {
    try {
      // This is where you would implement the actual DigiLocker API integration
      // 1. Redirect to DigiLocker auth page
      // 2. Handle the OAuth flow
      // 3. Store the access token
      console.log('Linking DigiLocker account...');
      setIsLinked(true);
    } catch (error) {
      console.error('Failed to link DigiLocker:', error);
    }
  }, []);

  const fetchDocuments = useCallback(async () => {
    if (!isLinked) return [];

    try {
      // This is where you would fetch documents from DigiLocker
      // Return mock data for now
      return [
        {
          id: '1',
          name: 'Aadhaar Card',
          type: 'pdf',
          size: 1024 * 1024,
          uploadedAt: new Date(),
          source: 'digilocker'
        }
      ];
    } catch (error) {
      console.error('Failed to fetch DigiLocker documents:', error);
      return [];
    }
  }, [isLinked]);

  return {
    isLinked,
    linkAccount,
    fetchDocuments
  };
};