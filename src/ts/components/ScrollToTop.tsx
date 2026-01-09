import { useEffect } from 'react';

export function ScrollToTop()
{
  useEffect(() => {
    const handleHashChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return null;
}
