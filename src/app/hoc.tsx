'use client';

import { useEffect, useState, ComponentType } from 'react';

// Constrain T to ensure it can be used as valid props for a React component
function withAuth<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  const AuthComponent = (props: T): JSX.Element | null => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    // This effect will run only on the client side
    useEffect(() => {
      setIsClient(true); // Ensure that we are on the client side
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
        } else {
          window.location.href = '/login'; // Use window.location to redirect if no token
        }
        setLoading(false);
      }
    }, []);

    // If loading or not on the client, return null (avoid rendering before component is mounted)
    if (loading || !isClient) return null;

    // If not authenticated, return null, otherwise return WrappedComponent
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
}

export default withAuth;
