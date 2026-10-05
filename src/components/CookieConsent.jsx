import React from 'react';
import { CookiePanel } from './ui/cookie-banner-1';

export default function CookieConsent() {
  return (
    <CookiePanel
      title="This site uses cookies"
      message="We use cookies to enhance your experience."
      acceptText="Accept all"
      customizeText="Customize"
      icon="cookie"
      privacyHref="#privacy"
      termsHref="#terms"
    />
  );
}

export { CookiePanel };
