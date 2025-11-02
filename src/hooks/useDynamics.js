import { useState, useCallback } from 'react';
import { getDynamicsAccounts, getDynamicsOpportunities } from '../services/dynamicsMock';

// Custom hook for Dynamics 365 operations
export const useDynamics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const syncAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const accounts = await getDynamicsAccounts();
      
      // Transform Dynamics accounts to our format and save to localStorage
      const existingCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
      const existingDynamicsIds = new Set(existingCompanies.map(c => c.dynamicsId));
      
      const newCompanies = accounts
        .filter(account => !existingDynamicsIds.has(account.accountid))
        .map(account => ({
          id: `company-${Date.now()}-${Math.random()}`,
          name: account.name,
          industry: account.industrycode_label,
          city: account.address1_city,
          state: account.address1_stateorprovince,
          employees: account.numberofemployees,
          revenue: account.revenue,
          dynamicsId: account.accountid,
          contacts: [],
          opportunities: []
        }));

      // Also sync opportunities
      for (const account of accounts) {
        const opportunities = await getDynamicsOpportunities(account.accountid);
        const company = newCompanies.find(c => c.dynamicsId === account.accountid);
        if (company) {
          company.opportunities = opportunities.map(opp => ({
            id: opp.opportunityid,
            name: opp.name,
            stage: opp.stagecode_label,
            value: opp.estimatedvalue,
            probability: opp.closeprobability
          }));
        }
      }

      const updatedCompanies = [...existingCompanies, ...newCompanies];
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));

      return {
        success: true,
        count: newCompanies.length,
        companies: newCompanies
      };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    syncAccounts,
    loading,
    error
  };
};

