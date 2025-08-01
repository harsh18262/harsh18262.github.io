// components/StaticVisitorTracker.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router'; // For Pages Router
// import { usePathname } from 'next/navigation'; // For App Router

export default function StaticVisitorTracker() {
  const router = useRouter();
  // const pathname = usePathname(); // For App Router

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Your Google Apps Script Web App URL
        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzC0EyRVZQejSSAQEWqh_6DztGJWY5A9pRnlby3S3P7m6ftFMEVKN-kF7a8ikOG85O3/exec';
        
        // Get current page
        const currentPage = router.asPath; // For Pages Router
        // const currentPage = pathname; // For App Router
        
        // Get client info
        const userAgent = navigator.userAgent;
        const timestamp = new Date().toISOString();
        const referer = document.referrer || 'Direct';
        const language = navigator.language;
        const screenResolution = `${screen.width}x${screen.height}`;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Get IP using a third-party service
        let visitorIP = 'Unknown';
        try {
          // Using ipify API (free service)
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          visitorIP = ipData.ip;
        } catch (ipError) {
          console.warn('Could not fetch IP:', ipError);
          // Fallback: try another service
          try {
            const ipResponse2 = await fetch('https://ipapi.co/json/');
            const ipData2 = await ipResponse2.json();
            visitorIP = ipData2.ip;
          } catch (ipError2) {
            console.warn('Could not fetch IP from fallback:', ipError2);
          }
        }

        // Send data to Google Apps Script
        const response = await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Important for cross-origin requests
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: visitorIP,
            userAgent: userAgent,
            timestamp: timestamp,
            referer: referer,
            page: currentPage,
            language: language,
            screenResolution: screenResolution,
            timezone: timezone,
            url: window.location.href
          })
        });

        // Note: With no-cors mode, we can't check response status
        console.log('Visitor tracking sent successfully');
        
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Track on component mount (with a small delay to ensure page is loaded)
    const timeoutId = setTimeout(trackVisitor, 1000);

    // Optional: Track on route changes
    const handleRouteChange = (url) => {
      setTimeout(() => {
        trackVisitor();
      }, 500);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      clearTimeout(timeoutId);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return null; // This component doesn't render anything
}

// Alternative: Custom hook version
export function useStaticVisitorTracking() {
  const router = useRouter();
  // const pathname = usePathname(); // For App Router

  useEffect(() => {
    let isMounted = true;

    const trackVisitor = async () => {
      if (!isMounted) return;

      try {
        const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
        
        // Get visitor IP
        let visitorIP = 'Unknown';
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          visitorIP = ipData.ip;
        } catch (error) {
          console.warn('Could not fetch IP:', error);
        }

        const currentPage = router.asPath; // For Pages Router
        // const currentPage = pathname; // For App Router

        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip: visitorIP,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            referer: document.referrer || 'Direct',
            page: currentPage,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            url: window.location.href
          })
        });

      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    const timeoutId = setTimeout(trackVisitor, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [router.asPath]); // For Pages Router
  // }, [pathname]); // For App Router
}

// Event-based tracking for specific actions
export const trackEvent = async (eventName, eventData = {}) => {
  try {
    const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
    
    let visitorIP = 'Unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      visitorIP = ipData.ip;
    } catch (error) {
      console.warn('Could not fetch IP for event tracking:', error);
    }

    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip: visitorIP,
        eventName: eventName,
        eventData: eventData,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    });

  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Usage examples:
/*
// In your _app.js or layout.js
import StaticVisitorTracker from '../components/StaticVisitorTracker';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <StaticVisitorTracker />
      <Component {...pageProps} />
    </>
  );
}

// Or use the hook in any component
import { useStaticVisitorTracking, trackEvent } from '../components/StaticVisitorTracker';

export default function HomePage() {
  useStaticVisitorTracking();
  
  const handleButtonClick = () => {
    trackEvent('button_click', { buttonName: 'hero_cta' });
  };
  
  return (
    <div>
      <h1>Welcome to my static site!</h1>
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
}
*/