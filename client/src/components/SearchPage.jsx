// SearchPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MusicPlayerCard from './ui/musicplayer';
import { BiLoader } from 'react-icons/bi';
import { Error } from '@mui/icons-material';
import WebPlayer from './ui/WebPlayer';

const SearchPage = ({ query }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('spotifyAccessToken'));
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Fetch search results from Spotify API
  useEffect(() => {
    const searchSongs = async () => {
      if (query.trim() === '') return;

      setLoading(true);
      setError(null); // Reset error state before making a new request
      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: query,
            type: 'track',
            limit: 10, // Limit the results to 10 tracks
          },
        });

        // Extract the songs from the response
        const trackResults = response.data.tracks.items;
        setSongs(trackResults);
      } catch (error) {
        console.error('Error fetching data from Spotify:', error);
        setError('Server error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    searchSongs();
  }, [query, token]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search Bar */}

      {/* Loading */}
      {loading && <BiLoader className="animate-spin mx-auto" />}

      {/* Error Message */}
      {error && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-red-500 text-center">
            <Error /> {error}
          </h1>
        </div>
      )}

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.id}>
              <div onClick={() => setSelectedTrack(song)}>
                <MusicPlayerCard
                  song={song.name}
                  artist={song.artists[0].name}
                  albumCover={song.album.images[0].url}
                  previewUrl={song.href}
                />
              </div>
              {selectedTrack && selectedTrack.uri === song.uri && (
                <WebPlayer token={token} uri={selectedTrack.uri} />
              )}
            </div>
          ))
        ) : (
          !loading && !error && (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-red-500 text-center">
                <Error /> Not Found
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchPage;
