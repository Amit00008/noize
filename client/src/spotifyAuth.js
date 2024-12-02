import axios from 'axios';
import queryString from 'query-string';

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const redirectUri = 'https://noize.amitfr.tech';
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-top-read',
  'streaming'
];

// Get Spotify Authorization URL
export const getAuthUrl = () => {
  const authUrl = 'https://accounts.spotify.com/authorize';
  const params = queryString.stringify({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes.join(' ')
  });

  return `${authUrl}?${params}`;
};

// Fetch Access and Refresh Tokens
export const fetchAccessToken = async (code) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('code', code);
  body.append('redirect_uri', redirectUri);
  body.append('client_id', clientId);
  body.append('client_secret', clientSecret);

  const response = await axios.post(tokenUrl, body);
  return response.data;
};

// Refresh Access Token
export const refreshAccessToken = async (refreshToken) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  const body = new URLSearchParams();
  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', refreshToken);
  body.append('client_id', clientId);
  body.append('client_secret', clientSecret);

  const response = await axios.post(tokenUrl, body);
  return response.data;
};
