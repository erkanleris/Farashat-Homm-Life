import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ title, description, keywords, image, url }: SEOHeadProps) {
  const { language } = useLanguage();

  React.useEffect(() => {
    // Update document title
    document.title = `${title} | Farashat Homm Life`;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    if (keywords) updateMeta('keywords', keywords);
    
    updateProperty('og:title', title);
    updateProperty('og:description', description);
    updateProperty('og:type', 'website');
    if (image) updateProperty('og:image', image);
    if (url) updateProperty('og:url', url);

    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    if (image) updateMeta('twitter:image', image);

  }, [title, description, keywords, image, url]);

  return null;
}
