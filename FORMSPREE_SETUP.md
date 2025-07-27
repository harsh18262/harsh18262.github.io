# Formspree Integration Setup

## Steps to integrate Formspree:

### 1. Sign up for Formspree
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Click "New Form" to create a form

### 2. Get your Form Endpoint
After creating a form, you'll get an endpoint URL that looks like:
```
https://formspree.io/f/YOUR_FORM_ID
```

For example: `https://formspree.io/f/xdoqzkwp`

### 3. Update the Contact Component
Open the file: `src/components/Contact.tsx`

Find this line (around line 24):
```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID' // <-- REPLACE WITH YOUR FORMSPREE URL
```

Replace `YOUR_FORM_ID` with your actual form ID from Formspree.

### 4. Configure Formspree Settings (Optional)
In your Formspree dashboard, you can:
- Set up email notifications
- Configure autoresponse emails
- Add custom redirects
- Set up webhook integrations
- Enable reCAPTCHA for spam protection

### 5. Test the Form
1. Run your development server: `npm run dev`
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check your email for the submission

## Features Included:
- ✅ Form validation
- ✅ Loading states while sending
- ✅ Success/Error feedback
- ✅ Automatic form reset after successful submission
- ✅ Disabled form fields while sending
- ✅ Responsive design

## Formspree Free Plan Limits:
- 50 submissions per month
- Unlimited forms
- Email notifications
- File uploads up to 10MB

## Upgrading (if needed):
If you need more than 50 submissions/month, Formspree offers paid plans with:
- More submissions
- Custom redirect URLs
- Advanced spam filtering
- Priority support

## Alternative to Formspree:
If you prefer not to use Formspree, you can:
1. Use EmailJS (client-side email service)
2. Create your own backend API endpoint
3. Use Netlify Forms (if hosting on Netlify)
4. Use other services like Getform or Formsubmit
