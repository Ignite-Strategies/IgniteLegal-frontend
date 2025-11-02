import { useState, useCallback } from 'react';
import { getGraphContacts, sendMailViaGraph } from '../services/microsoftGraphMock';

// Custom hook for Microsoft Graph operations
export const useMicrosoftGraph = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hydrateContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const graphContacts = await getGraphContacts();
      
      // Transform Graph contacts to our format and save to localStorage
      const existingContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const existingGraphIds = new Set(existingContacts.map(c => c.graphId));
      
      const newContacts = graphContacts
        .filter(contact => !existingGraphIds.has(contact.id))
        .map(contact => ({
          id: `contact-${Date.now()}-${Math.random()}`,
          name: contact.displayName,
          email: contact.email,
          phone: contact.businessPhones?.[0] || '',
          title: contact.jobTitle,
          company: contact.companyName,
          graphId: contact.id,
          photoUrl: contact.photoUrl,
          status: 'Cold',
          stage: 'Prospect',
          lastTouch: new Date().toISOString().split('T')[0],
          nextTouch: null,
          notes: `Hydrated from Microsoft Graph on ${new Date().toLocaleDateString()}`
        }));

      const updatedContacts = [...existingContacts, ...newContacts];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));

      return {
        success: true,
        count: newContacts.length,
        contacts: newContacts
      };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendMailViaGraph(message);
      
      // Save to localStorage
      const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      existingMessages.push({
        ...result,
        contactId: message.contactId,
        contactName: message.contactName
      });
      localStorage.setItem('messages', JSON.stringify(existingMessages));

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    hydrateContacts,
    sendMessage,
    loading,
    error
  };
};

