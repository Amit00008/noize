import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { refreshAccessToken } from './spotifyAuth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location (path)

  useEffect(() => {
    // Do not run authentication check on the /callback route
    if (location.pathname === '/callback') return;

    const checkAuth = async () => {
      const token = localStorage.getItem('spotifyAccessToken');
      const expiry = localStorage.getItem('spotifyTokenExpiry');

      // If no token or the token has expired, check for a valid refresh token
      if (!token || Date.now() >= expiry) {
        const refreshToken = localStorage.getItem('spotifyRefreshToken');
        if (refreshToken) {
          try {
            const newTokens = await refreshAccessToken(refreshToken);
            localStorage.setItem('spotifyAccessToken', newTokens.access_token);
            localStorage.setItem('spotifyTokenExpiry', Date.now() + newTokens.expires_in * 1000);
            setIsAuthenticated(true); // Set authenticated after refresh
          } catch (error) {
            console.error('Error refreshing token:', error);
            navigate('/'); // Redirect to login page if refresh token is invalid
          }
        } else {
          navigate('/'); // Redirect to login page if no refresh token
        }
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]); // Re-run only if the location changes (excluding '/callback')

  useEffect(() => {
    // If the user is authenticated and they are on the login page ('/'), redirect to home
    if (isAuthenticated && window.location.pathname === '/') {
      navigate('/home');
      
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated;
};
