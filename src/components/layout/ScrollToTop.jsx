import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMeta } from '../../data/portfolioData';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });

    const meta = routeMeta[pathname] || routeMeta['/'];
    if (meta) {
      if (meta.title) {
        document.title = meta.title;
      }
      if (meta.description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', meta.description);
      }
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
