# Page Organization Plan (Revised - Flatter Structure)

## Proposed Structure

```
src/pages/
├── CompanyCentral.jsx          # Main hub
├── Settings.jsx                # Settings
├── NotFound.jsx                # 404
│
├── nda/                        # NDA Management
│   ├── NDAHub.jsx
│   ├── NDADashboard.jsx
│   ├── NDAAnalytics.jsx
│   ├── Ingest.jsx
│   ├── AssignNdaWork.jsx
│   ├── ReviewNdaWork.jsx
│   ├── Review.jsx
│   └── ApprovalFinal.jsx
│
├── financial/                  # Financial Tools
│   ├── FinancialHub.jsx
│   ├── Billing.jsx
│   ├── BillingCreate.jsx
│   ├── BillingDetail.jsx
│   ├── Forecasting.jsx
│   └── FinancialSpends.jsx
│
├── relationship/               # Relationship Management (Connect workspace)
│   ├── GrowthDashboard.jsx    # Main growth hub (could rename or keep here)
│   ├── RelationshipDashboard.jsx
│   ├── Relationship.jsx       # Connect workspace
│   ├── MeetingDashboard.jsx
│   └── MeetingPrep.jsx
│
├── outreach/                   # Outreach & Marketing
│   ├── EmailCampaigns.jsx     # Outreach Workspace
│   ├── Ads.jsx
│   ├── Content.jsx
│   └── Seo.jsx
│
├── contacts/                   # Contact/CRM Management
│   ├── ContactsHub.jsx
│   ├── CrmHub.jsx
│   ├── CrmList.jsx
│   ├── CrmCreate.jsx
│   ├── CrmPipeline.jsx
│   ├── Companies.jsx
│   ├── Pipeline.jsx
│   └── Messages.jsx
│
└── personas/                   # Persona Management
    ├── Personas.jsx
    └── PersonaCreate.jsx

# Legacy/Deprecated (clean up later)
├── BdCentral.jsx              # → relationship/GrowthDashboard?
├── BdInsights.jsx             # → relationship/GrowthDashboard?
└── ForecastingCreate.jsx      # → financial/Forecasting?
```

## Organization Logic

### ✅ Flat Structure - No "growth" wrapper
- Each functional area gets its own folder
- Easier to navigate, less nesting

### ✅ Folder Breakdown:
1. **nda/** - Legal NDA workflow
2. **financial/** - Billing, forecasting, spending
3. **relationship/** - Connect workspace, meetings, relationship dashboard
4. **outreach/** - Marketing, campaigns, content
5. **contacts/** - CRM, contacts, pipeline
6. **personas/** - Persona development

## Key Decisions

1. **GrowthDashboard** → Goes in `relationship/` folder (it's the relationship/growth hub)
2. **Relationship = Connect** - Same component, just naming
3. **No nested folders** - Keep it flat and scannable
4. **CRM = contacts** - All goes in `contacts/` folder

## Migration Steps

1. Create folder structure (no growth wrapper)
2. Move files (git mv to preserve history)
3. Update all imports in App.jsx
4. Update any internal page imports
5. Test all routes still work
