import { useEffect } from 'react';

export default function useMetaTags(title, description, keywords) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');

    // Twitter
    setMeta('property', 'twitter:title', title);
    setMeta('property', 'twitter:description', description);
    setMeta('property', 'twitter:card', 'summary_large_image');
  }, [title, description, keywords]);
}
