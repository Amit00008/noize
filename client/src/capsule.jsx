import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MusicCapsule = ({ userData }) => {
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchTopData = async () => {
            const accessToken = localStorage.getItem('spotifyAccessToken');

            if (!accessToken) {
                setError('No access token found');
                return;
            }

            try {
                // Fetch top artists
                const artistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=5', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setTopArtists(artistsResponse.data.items);

                // Fetch top tracks
                const tracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=5', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setTopTracks(tracksResponse.data.items);
            } catch (err) {
                setError('Failed to fetch data from Spotify');
                console.error(err);
            }
        };

        fetchTopData();
    }, []);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className=" text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4"> Your Music Capsule</h2>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Top Artists</h3>
                <ul className="space-y-4">
                    {topArtists.map((artist) => (
                        <li key={artist.id} className="flex items-center space-x-4 border border-purple-500 p-2 rounded-lg">
                            <img src={artist.images[0]?.url} alt={artist.name} className="w-16 h-16 rounded-full" />
                            <span className="text-lg">{artist.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Top Tracks</h3>
                <ul className="space-y-4">
                    {topTracks.map((track) => (
                        <li key={track.id} className="flex items-center space-x-4 border border-purple-500 p-2 rounded-lg">
                            <img src={track.album.images[0]?.url} alt={track.name} className="w-16 h-16 rounded" />
                            <span className="text-lg">{track.name} - {track.artists.map(artist => artist.name).join(', ')}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MusicCapsule;