// Mock Microsoft Graph API responses

// Simulates Graph /me/contacts response
export const mockGraphContacts = [
  {
    id: "graph-1",
    displayName: "Sarah Kim",
    email: "sarah.kim@horizoncredit.com",
    jobTitle: "VP, Capital Partnerships",
    companyName: "Horizon Credit",
    businessPhones: ["+1 555-421-9034"],
    photoUrl: "https://ui-avatars.com/api/?name=Sarah+Kim&background=0078d4&color=fff"
  },
  {
    id: "graph-2",
    displayName: "Michael Rodriguez",
    email: "mrodriguez@arscapital.com",
    jobTitle: "Senior Portfolio Manager",
    companyName: "Ares Capital",
    businessPhones: ["+1 555-312-7845"],
    photoUrl: "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=0078d4&color=fff"
  },
  {
    id: "graph-3",
    displayName: "Jennifer Park",
    email: "jpark@orionholdings.com",
    jobTitle: "Investment Director",
    companyName: "Orion Holdings",
    businessPhones: ["+1 555-789-4521"],
    photoUrl: "https://ui-avatars.com/api/?name=Jennifer+Park&background=0078d4&color=fff"
  },
  {
    id: "graph-4",
    displayName: "David Chen",
    email: "dchen@meridianpartners.com",
    jobTitle: "Capital Partner",
    companyName: "Meridian Partners",
    businessPhones: ["+1 555-234-5678"],
    photoUrl: "https://ui-avatars.com/api/?name=David+Chen&background=0078d4&color=fff"
  },
  {
    id: "graph-5",
    displayName: "Lisa Thompson",
    email: "lthompson@techventures.com",
    jobTitle: "Managing Director",
    companyName: "TechVentures Capital",
    businessPhones: ["+1 555-901-2345"],
    photoUrl: "https://ui-avatars.com/api/?name=Lisa+Thompson&background=0078d4&color=fff"
  },
  {
    id: "graph-6",
    displayName: "Robert Wilson",
    email: "rwilson@solartrust.com",
    jobTitle: "General Counsel",
    companyName: "SolarTrust LLC",
    businessPhones: ["+1 555-678-9012"],
    photoUrl: "https://ui-avatars.com/api/?name=Robert+Wilson&background=0078d4&color=fff"
  },
  {
    id: "graph-7",
    displayName: "Amanda Lee",
    email: "alee@growthcapital.com",
    jobTitle: "VP, Business Development",
    companyName: "Growth Capital Partners",
    businessPhones: ["+1 555-345-6789"],
    photoUrl: "https://ui-avatars.com/api/?name=Amanda+Lee&background=0078d4&color=fff"
  },
  {
    id: "graph-8",
    displayName: "James Martinez",
    email: "jmartinez@enterprisefund.com",
    jobTitle: "Investment Partner",
    companyName: "Enterprise Fund",
    businessPhones: ["+1 555-567-8901"],
    photoUrl: "https://ui-avatars.com/api/?name=James+Martinez&background=0078d4&color=fff"
  },
  {
    id: "graph-9",
    displayName: "Emily Chen",
    email: "echen@strategicventures.com",
    jobTitle: "Portfolio Manager",
    companyName: "Strategic Ventures",
    businessPhones: ["+1 555-890-1234"],
    photoUrl: "https://ui-avatars.com/api/?name=Emily+Chen&background=0078d4&color=fff"
  },
  {
    id: "graph-10",
    displayName: "Christopher Brown",
    email: "cbrown@capitalpartners.com",
    jobTitle: "Senior Director",
    companyName: "Capital Partners Fund",
    businessPhones: ["+1 555-123-4567"],
    photoUrl: "https://ui-avatars.com/api/?name=Christopher+Brown&background=0078d4&color=fff"
  }
];

// Simulates Graph /me/sendMail
export const sendMailViaGraph = async (message) => {
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: `msg-${Date.now()}`,
    subject: message.subject,
    body: message.body,
    to: message.to,
    sentAt: new Date().toISOString(),
    status: 'sent'
  };
};

// Get contacts from Graph
export const getGraphContacts = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockGraphContacts;
};

