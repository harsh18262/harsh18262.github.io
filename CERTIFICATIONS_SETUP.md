# Certifications Section Setup Guide

## ✅ Files Created/Modified

### New Files Created:
1. **`src/components/Certifications.tsx`** - The certifications component with Credly badge integration

### Files Modified:
1. **`src/pages/index.tsx`** - Added Certifications component import and included it in the page
2. **`src/components/Navigation.tsx`** - Added "Certs" link to the navigation menu

## 🎯 Features Implemented

- **Credly Badge Integration**: Displays live, verified badges from Credly
- **Dark Theme Design**: Matches your existing dark/terminal theme with green accents
- **Responsive Layout**: Grid layout that adapts to mobile, tablet, and desktop
- **Hover Effects**: Interactive border and shadow effects matching your site's style
- **Fallback Display**: Shows an Award icon while Credly badges load
- **Smooth Animations**: Fade-in effects using Framer Motion
- **External Links**: Direct links to view credentials on Credly

## 📝 How to Add Your Certifications

### Step 1: Get Your Credly Badge IDs

1. Log in to your [Credly account](https://www.credly.com)
2. Go to your badge
3. Click the **"Share"** button
4. Select **"Embed Badge"**
5. You'll see HTML code like this:
   ```html
   <div data-iframe-width="150" 
        data-iframe-height="270" 
        data-share-badge-id="abc123def-4567-89ab-cdef-0123456789ab" 
        data-share-badge-host="https://www.credly.com">
   </div>
   ```
6. Copy the value from `data-share-badge-id` (e.g., `abc123def-4567-89ab-cdef-0123456789ab`)

### Step 2: Update Your Certifications

Open `src/components/Certifications.tsx` and find the `certificationsData` array (around line 6). Replace the sample data with your actual certifications:

```typescript
const certificationsData = [
  {
    id: 1,
    name: 'Your Actual Certification Name',
    issuer: 'Issuing Organization',
    issueDate: 'Month Year', // e.g., 'January 2024'
    expiryDate: 'Month Year', // Optional - remove if no expiry
    credlyBadgeId: 'your-actual-badge-id-from-step-1',
    credentialUrl: 'https://www.credly.com/badges/your-badge-url',
    description: 'Brief description of what this certification validates'
  },
  // Add more certifications...
]
```

### Step 3: For Non-Credly Certifications

If you have certifications not on Credly, you can still add them. Just leave out the `credlyBadgeId`:

```typescript
{
  id: 2,
  name: 'Non-Credly Certification',
  issuer: 'Other Organization',
  issueDate: 'June 2023',
  // No credlyBadgeId - will show fallback icon
  credentialUrl: 'https://certificate-url.com',
  description: 'Description here'
}
```

## 🎨 Customization Options

### Change Colors
The component uses your site's existing green terminal theme. To modify:
- Border hover color: Change `hover:border-green-500` 
- Shadow color: Modify `hover:shadow-green-500/20`
- Text accent: Update `text-green-400`

### Adjust Layout
- For 2 columns max: Change `lg:grid-cols-3` to `lg:grid-cols-2`
- For 4 columns on large screens: Change to `lg:grid-cols-4`

### Badge Size
Modify these values in the component:
```tsx
data-iframe-width="200"  // Change width
data-iframe-height="230" // Change height
```

## 🚀 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Scroll down to see the Certifications section (it appears after Achievements and before Projects)

4. Or click **"Certs"** in the navigation menu

## ⚠️ Troubleshooting

### Badges Not Showing?
1. Check browser console for errors (F12)
2. Verify your badge IDs are correct
3. Ensure your badges are set to "Public" in Credly
4. The Credly script may take a moment to load - refresh if needed

### Section Not Appearing?
1. Make sure you saved all files
2. Restart the dev server (`Ctrl+C` then `npm run dev`)
3. Clear browser cache and hard refresh (`Ctrl+Shift+R`)

## 📦 No Additional Dependencies Needed

Your project already has all required dependencies:
- ✅ framer-motion (for animations)
- ✅ lucide-react (for icons)
- ✅ React and Next.js

## 🔄 Next Steps

1. Replace the sample certification data with your actual certifications
2. Add your Credly badge IDs
3. Test in development
4. Commit your changes:
   ```bash
   git add .
   git commit -m "Add certifications section with Credly integration"
   ```
5. Deploy your updated site

## Need Help?

The certifications section is now integrated into your site and follows your existing design patterns. If you need to make adjustments, the component is self-contained in `src/components/Certifications.tsx`.
