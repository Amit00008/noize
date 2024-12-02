import React, { useEffect } from 'react';
import { fetchAccessToken } from '../spotifyAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (code) {
      fetchAccessToken(code)
        .then((data) => {
          localStorage.setItem('spotifyAccessToken', data.access_token);
          localStorage.setItem('spotifyRefreshToken', data.refresh_token);
          localStorage.setItem('spotifyTokenExpiry', Date.now() + data.expires_in * 1000);
          navigate('/home'); // Redirect to Home component
        })
        .catch((error) => console.error('Error fetching access token:', error));
    }
  }, [location.search, navigate]);

  return <div>Redirecting...</div>;
};

export default Callback;
