# Page Organization Plan (Complete File Mapping)

## Current Files Analysis

### ✅ Keep at Root (Hubs)
- `CompanyCentral.jsx` - Main company hub
- `GrowthDashboard.jsx` - Main growth hub
- `Settings.jsx` - Settings
- `NotFound.jsx` - 404

### 📁 NDA Folder
- `NDAHub.jsx`
- `NDADashboard.jsx`
- `NDAAnalytics.jsx`
- `Ingest.jsx`
- `AssignNdaWork.jsx`
- `ReviewNdaWork.jsx`
- `Review.jsx`
- `ApprovalFinal.jsx`

### 📁 Financial Folder
- `FinancialHub.jsx`
- `Billing.jsx`
- `BillingCreate.jsx`
- `BillingDetail.jsx`
- `Forecasting.jsx`
- `FinancialSpends.jsx`
- `ForecastingCreate.jsx` - **CHECK: Merge into Forecasting.jsx or separate?**

### 📁 Relationship Folder
- `RelationshipDashboard.jsx`
- `Relationship.jsx` (Connect workspace)
- `MeetingDashboard.jsx`
- `MeetingPrep.jsx`

### 📁 Outreach Folder
- `EmailCampaigns.jsx` (Outreach Workspace)
- `Ads.jsx`
- `Content.jsx`
- `Seo.jsx`

### 📁 Contacts Folder (CRM + Messaging)
- `ContactsHub.jsx` - Main contacts view
- `CrmHub.jsx`
- `CrmList.jsx`
- `CrmCreate.jsx`
- `CrmPipeline.jsx`
- `Companies.jsx` - Company list
- `Pipeline.jsx` - Kanban board for contacts
- `Messages.jsx` - **Email/message interface for contacts**

### 📁 Personas Folder
- `Personas.jsx`
- `PersonaCreate.jsx`

### 🗑️ Legacy/Deprecated (to clean up)
- `BdCentral.jsx` - **DEPRECATED** → Replaced by GrowthDashboard
- `BdInsights.jsx` - **DEPRECATED** → Should this go somewhere or delete?

## Final Structure

```
src/pages/
├── CompanyCentral.jsx          # Main company hub
├── GrowthDashboard.jsx         # Main growth hub
├── Settings.jsx
├── NotFound.jsx
│
├── nda/
│   ├── NDAHub.jsx
│   ├── NDADashboard.jsx
│   ├── NDAAnalytics.jsx
│   ├── Ingest.jsx
│   ├── AssignNdaWork.jsx
│   ├── ReviewNdaWork.jsx
│   ├── Review.jsx
│   └── ApprovalFinal.jsx
│
├── financial/
│   ├── FinancialHub.jsx
│   ├── Billing.jsx
│   ├── BillingCreate.jsx
│   ├── BillingDetail.jsx
│   ├── Forecasting.jsx
│   ├── FinancialSpends.jsx
│   └── ForecastingCreate.jsx  # Merge or keep?
│
├── relationship/
│   ├── RelationshipDashboard.jsx
│   ├── Relationship.jsx        # Connect workspace
│   ├── MeetingDashboard.jsx
│   └── MeetingPrep.jsx
│
├── outreach/
│   ├── EmailCampaigns.jsx      # Outreach Workspace
│   ├── Ads.jsx
│   ├── Content.jsx
│   └── Seo.jsx
│
├── contacts/                   # CRM + Messaging
│   ├── ContactsHub.jsx
│   ├── CrmHub.jsx
│   ├── CrmList.jsx
│   ├── CrmCreate.jsx
│   ├── CrmPipeline.jsx
│   ├── Companies.jsx
│   ├── Pipeline.jsx            # Kanban board
│   └── Messages.jsx             # Email/messaging interface
│
└── personas/
    ├── Personas.jsx
    └── PersonaCreate.jsx
```

## Key Decisions Needed

1. **Messages.jsx** → Goes in `contacts/` (it's for messaging contacts)
2. **BdCentral.jsx** → DELETE (replaced by GrowthDashboard)
3. **BdInsights.jsx** → DELETE or merge into GrowthDashboard?
4. **ForecastingCreate.jsx** → Merge into `financial/Forecasting.jsx` or keep separate?

## Migration Checklist

- [ ] Create all folders
- [ ] Move NDA files → `nda/`
- [ ] Move Financial files → `financial/`
- [ ] Move Relationship files → `relationship/`
- [ ] Move Outreach files → `outreach/`
- [ ] Move Contacts/CRM files → `contacts/`
- [ ] Move Personas files → `personas/`
- [ ] Update all imports in App.jsx
- [ ] Update internal page imports
- [ ] Delete/clean up legacy files (BdCentral, BdInsights)
- [ ] Test all routes work
