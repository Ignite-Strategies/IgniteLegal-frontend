// Dashboard configuration - defaults can be customized per company
export const dashboardConfig = {
  revenue: {
    target: 500000,
    timeHorizon: 12, // months
  },
  // Default metrics will be calculated from actual data
  // These are fallback values when no data exists
  defaults: {
    attract: {
      upcomingEvents: 0,
      activeAdsSeo: 0,
      contentPosts: 0,
    },
    engage: {
      eventsThisMonth: 0,
      meetingsScheduled: 0,
    },
    nurture: {
      campaignsActive: 0, // Outreach email campaigns
      newslettersSent: 0, // HTML newsletters (separate from campaigns)
      socialMediaPosts: 0,
      responseRate: 0,
    },
  },
};

