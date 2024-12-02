import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/CallBack';
import Home from './components/Home';
import ResponsiveAppBar from './components/NavBar';
import Profile from './components/Profile';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { refreshAccessToken } from './spotifyAuth';
import { useAuth } from './middleWare';
import SearchPage from './components/SearchPage';
import ChatComponent from './components/ChatComp';
import Library from './components/Library';
import Setting from './settings';
import MusicCapsule from './capsule';

function App() {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('spotifyAccessToken'));
  const isAuthenticated = useAuth(); // Use the middleware to check authentication
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null); // State to store error messages

  const handleQuery = useCallback((newQuery) => {
    setQuery(newQuery);
  }, []);

  // Fetch User Data
  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again later.'); // Set error message
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('spotifyAccessToken');
    localStorage.removeItem('spotifyRefreshToken');
    localStorage.removeItem('spotifyTokenExpiry');
    setUserData(null);
    setToken(null); // Remove the token
    window.location.href = '/'; // Navigate to the login page after logout
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUserData(); // Fetch user data only if authenticated
    }
    setIsLoading(false); // Set loading to false after checking authentication
  }, [isAuthenticated, token]);

  function AppWithAppBar() {
    const location = useLocation();
    const shouldShowAppBar = location.pathname !== '/';

    return (
      <>
        {shouldShowAppBar && (
          <div style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000 }}>
            <ResponsiveAppBar query={query} handleQuery={handleQuery} userData={userData} handleLogout={handleLogout} />
          </div>
        )}
        <div style={{ paddingTop: shouldShowAppBar ? '64px' : '0px' }}>
          {error && <div style={errorStyle}>{error}</div>} {/* Display error message */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/callback" element={<Callback />} />
            {isAuthenticated && (
              <>
                <Route path="/home" element={<Home userData={userData} handleLogout={handleLogout} />} />
                <Route path="/profile" element={<Profile userData={userData} />} />
                <Route path="/search" element={<SearchPage query={query} />} />
                <Route path="/chat" element={<ChatComponent />} />
                <Route path='/library' element={<Library />} />
                <Route path='/settings' element={<Setting />} />
                <Route path='/capsule' element={<MusicCapsule userData={userData} />} />
              </>
            )}
          </Routes>
        </div>
      </>
    );
  }

  // Display loading screen while checking authentication
  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <div style={loadingSpinnerStyle}></div>
        <h2 style={{ color: '#fff' }}>Loading...</h2>
      </div>
    );
  }

  return <AppWithAppBar />;
}

// Loading screen styles
const loadingContainerStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1e1e2f', // Black and purplish theme background color
};

const loadingSpinnerStyle = {
  width: '50px',
  height: '50px',
  border: '6px solid #a29bfe', // Light purple spinner border
  borderTop: '6px solid transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  margin: '20px 0',
};

// Adding spinner animation
const spinnerAnimationStyle = document.createElement('style');
spinnerAnimationStyle.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerAnimationStyle);

export default App;
