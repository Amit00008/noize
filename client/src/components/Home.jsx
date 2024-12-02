import React, { useEffect, useState } from 'react';
import MusicPlayerCard from './ui/musicplayer';
import WebPlayer from './ui/WebPlayer';
import PlaylistCard from './ui/albumcard';


const Home = ({ userData, handleLogout }) => {
  const [token, setToken] = useState(localStorage.getItem('spotifyAccessToken'));
  const [data, setData] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null); // Hold selected track info
  const [greet, setGreet] = useState('');
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null); // State to hold error message

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch top tracks');
        }
        const data = await response.json();
        setData(data.items); // Update the state with the fetched top tracks
      } catch (err) {
        setError('Server error: Failed to fetch top tracks');
      }
    };

    fetchTopTracks();
  }, [token]);

  const handleTrackSelect = (track) => {
    setSelectedTrack(track); // Set the selected track to play
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreet('Good Morning');
    } else if (currentHour < 18) {
      setGreet('Good Afternoon');
    } else {
      setGreet('Good Evening');
    }
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch playlists');
        }
        const als = await response.json();
        setPlaylists(als.items);
      } catch (err) {
        setError('Server error: Failed to fetch playlists');
      }
    };
    fetchAlbums();
  }, [token]);

  if (!userData) {
    return <div>Loading...</div>; // Show loading spinner or message
  }

  return (
    <div className="mt-8 ml-20 p-8 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="col-span-full">
        <h2 className="text-5xl font-bold text-white">{greet} {userData.display_name}</h2>
        <h1 className='text-white text-xl'>Welcome to <span className='font-bold text-3xl text-indigo-500'>Noize</span></h1>
      </div>

      {error && <div className="col-span-full text-red-500">{error}</div>}
      <div className="col-span-full">
        <h2 className="text-2xl font-bold text-white mb-4">Your Top-10 Songs:</h2>
      </div>
      {data && data.slice(0, 10).map((track) => {
        return (
          <div key={track.id}>
            <div onClick={() => handleTrackSelect(track)}>
              <MusicPlayerCard
                song={track.name}
                artist={track.artists[0].name}
                albumCover={track.album.images[0].url}
                previewUrl={track.href}
              />
            </div>
            {selectedTrack && selectedTrack.uri === track.uri && (
              <WebPlayer token={token} uri={selectedTrack.uri} />
            )}
          </div>
        );
      })}
      <div className="col-span-full">
        <h2 className="text-2xl font-semibold text-white mb-4">Your Playlists (in development)</h2>
      </div>
      {playlists && Array.isArray(playlists) && playlists.filter(playlist => playlist).map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default Home;
