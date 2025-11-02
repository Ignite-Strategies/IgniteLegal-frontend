// Mock Dynamics 365 CRM API responses

// Simulates Dynamics /accounts endpoint
export const mockDynamicsAccounts = [
  {
    accountid: "dynamics-1",
    name: "Horizon Credit",
    industrycode: 100000001, // Financial Services
    industrycode_label: "Financial Services",
    address1_city: "New York",
    address1_stateorprovince: "NY",
    _primarycontactid_value: "graph-1",
    numberofemployees: 250,
    revenue: 50000000
  },
  {
    accountid: "dynamics-2",
    name: "Ares Capital",
    industrycode: 100000001,
    industrycode_label: "Financial Services",
    address1_city: "Los Angeles",
    address1_stateorprovince: "CA",
    _primarycontactid_value: "graph-2",
    numberofemployees: 500,
    revenue: 150000000
  },
  {
    accountid: "dynamics-3",
    name: "Orion Holdings",
    industrycode: 100000002, // Technology
    industrycode_label: "Technology",
    address1_city: "San Francisco",
    address1_stateorprovince: "CA",
    _primarycontactid_value: "graph-3",
    numberofemployees: 180,
    revenue: 75000000
  }
];

// Simulates Dynamics opportunities/leads
export const mockDynamicsOpportunities = [
  {
    opportunityid: "opp-1",
    name: "Horizon Credit - Legal Services",
    accountid: "dynamics-1",
    stagecode: 100000001, // Prospect
    stagecode_label: "Prospect",
    estimatedvalue: 125000,
    closeprobability: 25
  },
  {
    opportunityid: "opp-2",
    name: "Ares Capital - Portfolio Support",
    accountid: "dynamics-2",
    stagecode: 100000002, // Warm
    stagecode_label: "Warm",
    estimatedvalue: 250000,
    closeprobability: 50
  }
];

// Get accounts from Dynamics
export const getDynamicsAccounts = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockDynamicsAccounts;
};

// Get opportunities for an account
export const getDynamicsOpportunities = async (accountId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockDynamicsOpportunities.filter(opp => opp.accountid === accountId);
};

