'use client';

import { useEffect, useState, ComponentType } from 'react';

// Ensure the generic type extends IntrinsicAttributes to handle JSX elements correctly
function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const AuthComponent = (props: P): JSX.Element | null => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          window.location.href = '/login';
        }
      }
    }, []);

    if (isAuthenticated === null) return null;

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
}

export default withAuth;
