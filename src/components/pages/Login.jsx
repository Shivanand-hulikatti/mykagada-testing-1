import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      loginWithRedirect({
        appState: { returnTo: '/dashboard' }
      });
    }
  }, [isAuthenticated, loginWithRedirect, navigate]);

  return <div>Redirecting to login...</div>;
}

export default Login;