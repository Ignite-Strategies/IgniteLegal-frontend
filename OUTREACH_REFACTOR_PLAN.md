# Outreach Refactor Plan

## Current State
- `EmailCampaigns.jsx` - Shows personas, ecosystem, campaigns, building blocks
- `Messages.jsx` - Email composer in contacts/ folder (should move)

## Target Pattern (from CampaignCreator.jsx & CampaignHome.jsx)

### 1. OutreachHome.jsx (Hub/Dashboard)
**Location**: `outreach/OutreachHome.jsx` (or keep EmailCampaigns name?)

**Purpose**: Main hub for outreach - like CampaignHome.jsx

**Layout**:
- Header: "Outreach Dashboard" / "Campaign Dashboard"
- Metrics cards: Total Campaigns | Active Campaigns | Total Recipients
- Quick Actions:
  - Launch New Campaign (→ CampaignCreator)
  - Contact Lists
  - Templates
  - Analytics
  - Personal Email (→ Messages/composer)
- Draft Campaigns section
- Sent Campaigns section
- Gmail Auth section (if needed)

### 2. CampaignCreator.jsx (Multi-Step Wizard)
**Location**: `outreach/CampaignCreator.jsx`

**Purpose**: Multi-step campaign creation - like CampaignCreator.jsx pattern

**Steps**:
1. Campaign Name (create campaign first, get ID)
2. Pick Contact List (shows conflict detection)
3. Write Message (with token insertion)
4. Add Attachments (optional)
5. Preview → Send

**Key Features**:
- Clean URLs (no params, use state)
- Modular steps
- Auto-save as draft
- List conflict detection
- Gmail auth integration

### 3. Messages.jsx → Move & Rename
**Location**: `outreach/OutreachComposer.jsx` or `outreach/PersonalEmail.jsx`

**Purpose**: 1:1 personal email composer (not campaigns)

**Features**:
- Select contact
- Compose message
- Send via Outlook/Gmail
- Quick templates
- Message history

## Proposed Structure

```
outreach/
├── OutreachHome.jsx         # Hub/dashboard (like CampaignHome)
├── CampaignCreator.jsx      # Multi-step wizard (modular)
├── CampaignPreview.jsx      # Preview before send
├── CampaignDashboard.jsx    # Results/analytics for sent campaigns
├── PersonalEmail.jsx        # 1:1 email composer (renamed from Messages)
├── Templates.jsx            # Template management
├── ContactLists.jsx         # List management (or link to contacts/)
└── Analytics.jsx            # Campaign analytics
```

## Questions

1. **EmailCampaigns.jsx** → Rename to `OutreachHome.jsx` or keep name?
2. **Messages.jsx** → Move to outreach/ and rename to `PersonalEmail.jsx`?
3. **Modular steps** → Create separate step components or keep inline in CampaignCreator?
4. **Templates** → Separate page or integrate into CampaignCreator?

## Migration Steps

1. Move Messages.jsx → outreach/PersonalEmail.jsx
2. Refactor EmailCampaigns.jsx → OutreachHome.jsx (hub pattern)
3. Create CampaignCreator.jsx (multi-step wizard)
4. Update routes and navigation
5. Add template management if needed

