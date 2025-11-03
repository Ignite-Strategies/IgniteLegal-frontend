# Contact Management Architecture

## Overview
Contact management is split into two main areas:
1. **Contact Sources** - Where contacts come from (ContactManageHome)
2. **Campaign Lists** - Building lists FROM existing contacts (ContactListBuilder/Manager)

---

## 1. Contact Sources (`/contacts`)
**Purpose:** Add, sync, and manage WHERE your contacts come from

### Main Page: `ContactManageHome.jsx` (`/contacts`)
- **Primary function:** Contact ingestion/hydration from various sources
- Shows contact lists by TYPE (not user-created campaign lists)
- Each card represents a contact SOURCE:
  - Organization Members (from org structure)
  - Event Attendees (from events)
  - All Contacts (master database)
  - Email Sync Contacts (Microsoft 365/Outlook)

**Actions:**
- **Sync from Email** - Hydrate contacts from Microsoft 365
- **Upload CSV** - Manual CSV upload
- **Hydrate** - Load contacts from backend for a specific type

### Related Pages:
- `ContactUpload.jsx` (`/contacts/upload`) - **DEPRECATED** - Redirect to `/contacts`
- `DemoContactList.jsx` (`/contacts/demo-list/:listId`) - Demo view after hydration
- `ContactsHub.jsx` (`/contacts/hub`) - Legacy, redirects to `/contacts`

---

## 2. Campaign Lists (`/contact-list-builder`, `/contact-list-manager`)
**Purpose:** Build user-created lists FROM your existing contacts for campaigns

### Main Pages:
- **`ContactListBuilder.jsx`** (`/contact-list-builder`)
  - Select a category (All Contacts, Organization Members, Event Contacts, Custom)
  - Navigate to ContactListView where contacts hydrate and auto-select
  - User can deselect unwanted contacts
  - Create a named list for campaigns

- **`ContactListView.jsx`** (`/contact-list-view`)
  - Shows all contacts from selected category
  - ALL contacts auto-selected on load
  - User deselects ones they don't want
  - Enter list name/description
  - Create the list

- **`ContactListManager.jsx`** (`/contact-list-manager`)
  - View all user-created campaign lists
  - Shows list details, contact counts, assignment status
  - Search, view, delete lists
  - Pre-populated with mock lists for demo

- **`ContactListDetail.jsx`** (`/contact-list-detail/:listId`)
  - View details of a specific campaign list
  - Shows all contacts in that list
  - Full contact information display

---

## Key Distinctions

### Contact Sources vs Campaign Lists

| Contact Sources (`/contacts`) | Campaign Lists (`/contact-list-*`) |
|-------------------------------|-----------------------------------|
| **Where contacts COME FROM** | **Lists built FROM contacts** |
| Organization Members, Events, Email Sync | User-created lists for campaigns |
| Hydration/sync from backend | Selection from existing contacts |
| Shows contact TYPE categories | Shows user-created named lists |
| 4 source types (org, events, all, email) | Unlimited user-created lists |
| Auto-populated by system | Built by user selection |

---

## Navigation Flow

### Adding Contacts (Contact Sources):
1. `/contacts` → ContactManageHome
2. Choose sync method:
   - Click "Sync from Email" → Microsoft 365 sync
   - Click "Upload CSV" → CSV upload
   - Click a contact type card → Hydrate from backend

### Building Campaign Lists:
1. `/contacts` → ContactManageHome
2. Click "Build Campaign List" → `/contact-list-builder`
3. Select category → `/contact-list-view?type=...`
4. Contacts auto-select, user deselects unwanted ones
5. Enter name, create list → Saved to `/contact-list-manager`

### Managing Campaign Lists:
1. `/contacts` → ContactManageHome
2. Click "Manage All Lists" → `/contact-list-manager`
3. View all lists, search, delete
4. Click "View" → `/contact-list-detail/:listId`

---

## File Structure

```
src/pages/contacts/
├── ContactManageHome.jsx      # Main hub - contact sources
├── ContactUpload.jsx           # DEPRECATED - redirect to /contacts
├── DemoContactList.jsx         # Demo view after hydration
├── ContactsHub.jsx             # Legacy redirect
│
├── ContactListBuilder.jsx      # Build lists - select category
├── ContactListView.jsx         # Build lists - select contacts
├── ContactListManager.jsx      # Manage all campaign lists
└── ContactListDetail.jsx       # View specific list details
```

---

## Routes

```javascript
// Contact Sources
/contacts                    → ContactManageHome
/contacts/upload             → DEPRECATED (redirect to /contacts)
/contacts/demo-list/:listId  → DemoContactList

// Campaign Lists
/contact-list-builder        → ContactListBuilder
/contact-list-view           → ContactListView
/contact-list-manager        → ContactListManager
/contact-list-detail/:listId → ContactListDetail
```

---

## Quick Reference

**Want to add contacts?** → `/contacts` (ContactManageHome)
- Sync from email
- Upload CSV
- Hydrate from backend

**Want to build a list for campaigns?** → `/contact-list-builder`
- Select category
- Pick contacts
- Name and save

**Want to manage your campaign lists?** → `/contact-list-manager`
- View all lists
- Search, delete
- View details

---

## Common Confusion Points

1. **ContactManageHome is NOT for building campaign lists**
   - It's for adding/managing contact sources
   - Campaign lists are separate

2. **ContactLists are built FROM contacts, not sources**
   - First you need contacts (from /contacts)
   - Then you build lists from those contacts (from /contact-list-builder)

3. **"Hydrate" means load contacts from backend**
   - Used in ContactManageHome for source types
   - Different from "building a list"

4. **ContactUpload is deprecated**
   - All upload functionality now in ContactManageHome
   - Route should redirect to `/contacts`

