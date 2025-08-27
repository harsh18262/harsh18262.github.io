# Certifications Section - Badge Logo Setup Guide

## ✅ Updated Implementation

The certifications section now displays just the badge logos/icons instead of full embedded Credly badges, providing a cleaner, more integrated look that matches your site's terminal theme.

## 🎯 How to Get Badge Image URLs from Credly

### Method 1: Direct Image URL (Recommended)

1. **Go to your Credly profile**: https://www.credly.com/users/your-username
2. **Click on the badge** you want to add
3. **Right-click on the badge image**
4. **Select "Copy image address"** (or "Copy image link")
5. The URL will look like:
   ```
   https://images.credly.com/size/340x340/images/abc123def/badge-name.png
   ```
6. **Paste this URL** in the `badgeImageUrl` field in your certifications data

### Method 2: From Badge Share Page

1. **Log into Credly**
2. **Go to your badge**
3. **Click "Share"**
4. **Look for the badge image** in the preview
5. **Right-click → Copy image address**

### Method 3: Using Credly's Image API

Credly images follow this pattern:
```
https://images.credly.com/size/340x340/images/[IMAGE_ID]/[badge-name].png
```

You can adjust the size by changing `340x340` to other dimensions like:
- `110x110` - Small
- `220x220` - Medium  
- `340x340` - Large (recommended)
- `680x680` - Extra large

## 📝 Update Your Certifications

Edit the `certificationsData` array in `src/components/Certifications.tsx`:

```typescript
const certificationsData = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    issueDate: 'January 2024',
    expiryDate: 'January 2027',
    badgeImageUrl: 'https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png', // Example AWS badge
    credentialUrl: 'https://www.credly.com/badges/your-actual-badge-url',
    description: 'Demonstrates ability to design distributed systems on AWS',
    status: 'Active',
    skills: ['AWS', 'Cloud Architecture', 'Security', 'EC2', 'S3']
  },
  // Add more certifications...
]
```

## 🎨 Features of the New Design

### Compact Card Layout
- **Badge logo** displayed on the left (80x80px)
- **Certification name** and issuer info on the right
- **Skills/tags** shown as small badges
- **Verify button** links to Credly

### Visual Effects
- Hover glow effect on badge images
- Animated status indicator
- Terminal-style color coding by vendor:
  - AWS: Amber/Orange icons
  - Azure/Microsoft: Cyan/Blue icons
  - Google Cloud: Purple icons
  - Others: Green icons

### Responsive Design
- 3 columns on large screens
- 2 columns on tablets
- 1 column on mobile

## 🔧 Customization Options

### Change Badge Size
In the component, modify the image dimensions:
```tsx
className="w-20 h-20"  // Change to w-24 h-24 for larger badges
```

### Switch to List View
The component includes a commented-out list view alternative. To use it:
1. Comment out the grid view (lines 88-179)
2. Uncomment the list view section (lines 182-228)

### Add More Skills/Tags
Add a `skills` array to each certification:
```typescript
skills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD']
```

### Custom Fallback Icons
If a badge image fails to load, the component shows a fallback icon based on the issuer. You can customize this logic in lines 103-115.

## ⚠️ Troubleshooting

### Images Not Loading?
1. **Check the URL**: Make sure it's the direct image URL (ends in .png or .jpg)
2. **CORS issues**: Credly images are CORS-enabled, but if issues persist, you can:
   - Download the badge images
   - Place them in `/public/badges/`
   - Reference as `/badges/badge-name.png`

### Want to Use Local Images?
1. Create a folder: `public/badges/`
2. Save your badge images there
3. Update the URLs:
   ```typescript
   badgeImageUrl: '/badges/aws-solutions-architect.png'
   ```

## 📦 No Additional Dependencies

This implementation uses only existing dependencies - no need to install anything new!

## 🚀 Testing

1. Update at least one certification with a real badge image URL
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to the Certifications section
4. Verify that badge images load correctly

## Example Badge URLs

Here are some example Credly badge image URLs (replace with your own):

**AWS Solutions Architect Associate:**
```
https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png
```

**Azure Fundamentals:**
```
https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png
```

**Google Cloud Digital Leader:**
```
https://images.credly.com/size/340x340/images/2784d0d8-327c-406f-971e-9f0e15097003/image.png
```

Remember to replace these with YOUR actual badge URLs from your Credly profile!
