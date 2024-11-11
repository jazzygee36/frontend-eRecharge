'use client';

import { useEffect, useState, ComponentType } from 'react';

// Constrain P to include JSX.IntrinsicAttributes for correct prop spreading
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

    // Render loading indicator or null while authentication state is being determined
    if (isAuthenticated === null) return null;

    // Render the wrapped component if authenticated, otherwise null
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
}

export default withAuth;
