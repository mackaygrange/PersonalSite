import { useEffect } from 'react';

export function ScrollToTop()
{
  useEffect(() => {
    const handleHashChange = () => {
      // Use setTimeout to ensure the scroll happens after route change
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}
