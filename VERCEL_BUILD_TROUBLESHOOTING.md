# Vercel Build Troubleshooting Guide

## What Happened (The Build Crisis)

**Date**: January 2025  
**Issue**: Vercel builds failing with permission errors and app-breaking syntax errors

### The Cascade of Failures:
1. **PersonalEmail.jsx** had syntax errors → White screen of death
2. Multiple attempts to fix imports → More breakage
3. Moving `vite` to `dependencies` → Permission denied errors (`/vercel/path0/node_modules/.bin/vite: Permission denied`)
4. Adding explicit build configs → Still failing
5. **Solution**: Revert to last successful build (`b7580ea`) and comment out broken routes

---

## Golden Rules: DO NOT DO THIS

### ❌ NEVER Move Build Tools to `dependencies`

**WRONG:**
```json
{
  "dependencies": {
    "vite": "^5.4.10"  // ❌ NO! This causes permission errors
  }
}
```

**CORRECT:**
```json
{
  "devDependencies": {
    "vite": "^5.4.10"  // ✅ Always in devDependencies
  }
}
```

**Why**: Vercel installs `devDependencies` during builds, but when build tools are in `dependencies`, they can cause permission issues with the binary execution.

### ❌ NEVER Over-Configure `vercel.json`

**WRONG:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,  // ❌ Don't specify unless needed
  "rewrites": [...]
}
```

**CORRECT:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Why**: Vercel auto-detects Vite projects. Let it do its job. Only add what you need (SPA rewrites).

### ❌ NEVER Push Syntax Errors to Main

**Always test locally first:**
```bash
npm run build  # Test build locally BEFORE pushing
npm run preview  # Test the built app locally
```

---

## Correct Configuration (The Working Setup)

### `package.json` (Pattern 2: Demo/Scaffold)
```json
{
  "name": "nda-command-central",
  "version": "0.1.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",  // ✅ Simple, no npx needed
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "lucide-react": "^0.472.0"
    // ✅ NO vite here!
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^5.4.10"  // ✅ Build tools in devDependencies
  }
}
```

### `vercel.json` (Minimal Configuration)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**That's it.** Vercel auto-detects:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist` (from Vite config)
- ✅ Framework: Vite (from `vite.config.js`)

---

## Emergency Recovery Process

### Step 1: Find Last Successful Build
```bash
git log --oneline -20
# Look for last commit that had successful Vercel build
```

### Step 2: Revert to That Commit
```bash
git reset --hard <last-successful-commit-hash>
# Example: git reset --hard b7580ea
```

### Step 3: Force Push (If Needed)
```bash
git push --force origin main
# ⚠️ Only if you're sure you want to remove commits after that point
```

### Step 4: Verify Build Works
- Check Vercel dashboard for new deployment
- Wait for build to complete
- Verify app loads without errors

---

## Prevention Checklist (Before Every Push)

### ✅ Pre-Push Checklist
- [ ] Run `npm run build` locally - does it succeed?
- [ ] Run `npm run preview` locally - does the built app work?
- [ ] Check for syntax errors in any new/modified files
- [ ] Verify `vite` is in `devDependencies` (not `dependencies`)
- [ ] Verify `vercel.json` is minimal (just rewrites, no buildCommand/framework)
- [ ] Test any new routes/components locally before pushing
- [ ] If adding new imports, verify they don't break existing routes

### 🚨 Red Flags (Don't Push If You See These)
- ❌ `vite` moved to `dependencies`
- ❌ Syntax errors in any `.jsx` file
- ❌ Missing imports in `App.jsx` (component imported but route broken)
- ❌ `vercel.json` has `buildCommand` or `framework` specified unnecessarily
- ❌ Local build fails with `npm run build`

---

## Safe Development Workflow

### 1. Make Changes Locally
```bash
npm run dev  # Start dev server
# Make your changes
# Test in browser
```

### 2. Test Build Locally
```bash
npm run build  # Must succeed
npm run preview  # Test built app
```

### 3. Test Locally First (Don't Trust Dev Mode)
- Dev mode (`npm run dev`) is forgiving
- Build mode (`npm run build`) catches real errors
- **Always test build before pushing**

### 4. Commit Small, Incremental Changes
- Don't bundle multiple risky changes in one commit
- Test each major change separately
- Makes it easier to revert if something breaks

### 5. Comment Out Instead of Delete
- If a component is broken, **comment out** the route
- Don't delete - makes it easier to fix later
- Add clear comment: `// COMMENTED OUT - [reason]`

---

## Common Vercel Build Errors & Fixes

### Error: `Permission denied` for `/vercel/path0/node_modules/.bin/vite`
**Cause**: `vite` is in `dependencies` instead of `devDependencies`  
**Fix**: Move `vite` back to `devDependencies`

### Error: `Command "npm run build" exited with 126`
**Cause**: Usually permission issues or wrong dependency location  
**Fix**: Check that all build tools are in `devDependencies`

### Error: White Screen / App Won't Load
**Cause**: Syntax errors in imported components  
**Fix**: Comment out broken routes, fix component, then uncomment

### Error: `Cannot find module` in build
**Cause**: Wrong import paths or missing files  
**Fix**: Test build locally first - it will catch these

---

## When to Comment Out Routes

**Comment out routes if:**
- Component has syntax errors
- Component imports broken dependencies
- Component causes white screen
- You're not sure if component works in build mode

**Example:**
```jsx
// Outreach imports
// import OutreachHome from './pages/outreach/OutreachHome'; // COMMENTED OUT - breaking app

// In Routes:
{/* COMMENTED OUT - OutreachHome breaking app */}
{/* <Route path="/outreach" element={<OutreachHome />} /> */}
```

**When to uncomment:**
- After fixing the component
- After testing build locally
- After verifying no syntax errors

---

## Key Takeaways

1. **Build tools (`vite`) → Always in `devDependencies`**
2. **`vercel.json` → Keep it minimal (just rewrites)**
3. **Test build locally BEFORE pushing**
4. **Comment out broken routes, don't delete**
5. **Revert to last successful build if things go wrong**
6. **Small, incremental commits are safer**

---

## Reference: Last Successful Configuration

**Commit**: `b7580ea`  
**Date**: November 2, 2025  
**Status**: ✅ Successful Vercel build

**Key Files:**
- `package.json`: `vite` in `devDependencies`, simple build script
- `vercel.json`: Minimal rewrites only
- All routes working without syntax errors

**When in doubt, revert to this configuration.**

---

**Last Updated**: January 2025  
**Lessons Learned**: Don't over-complicate, test locally first, revert when needed

