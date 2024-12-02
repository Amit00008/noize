import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import './player.css'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const WebPlayer = ({ token, uri }) => {
  const [play, setPlay] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => setPlay(true), [token]);

  const nextTrack = () => {
    fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const previousTrack = () => {
    fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
 
const handleToggle = () => {
    if (!isCollapsed) {
        setIsCollapsed(true)
    } else {
        setIsCollapsed(false);
    }
}


return (
    <div>
    {uri && 
        <div className={`fixed bottom-0 left-0 w-full bg-[#1a1a1a] border-t-2 border-purple-700 z-50 shadow-lg player-container ${isCollapsed ? 'hidden' : ''}`}>
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Spotify Player */}
                <div className="flex-grow max-w-2xl mx-auto">
                    <SpotifyPlayer
                        token={token}
                        showSaveIcon={false}
                        play={play}
                        uris={[uri]} // Example URI
                        styles={{
                            activeColor: '#7C3AED',
                            bgColor: '#1F1F2E',
                            color: '#E5E7EB',
                            loaderColor: '#7C3AED',
                            sliderColor: '#7C3AED',
                            trackArtistColor: '#A1A1AA',
                            trackNameColor: '#E5E7EB',
                            height: '60px',
                            sliderHeight: '8px', // Increased slider height for wider appearance
                            // Hide default control buttons
                            sliderTrackColor: 'rgba(0,0,0,0)', // Disable track background slider for minimal look
                            sliderHandleColor: '#7C3AED', // Keep visible slider handle
                            errorColor: '#FF0000',
                            nameFontSize: '14px',
                            artistFontSize: '12px',
                            // Custom button styles
                            playIcon: {
                                transform: 'scale(1.1)', // Make play/pause button bigger on hover
                                transition: 'transform 0.3s ease-in-out',
                            },
                            prevIcon: {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.3s ease-in-out',
                            },
                            nextIcon: {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.3s ease-in-out',
                            },
                        }}
                    />
                </div>
            </div>
         
        </div>}
        <button
    onClick={handleToggle}
    className="fixed bottom-16 right-4 bg-purple-700 text-white p-2 rounded-full shadow-lg z-50"
>
    {isCollapsed ? <IoIosArrowUp /> : <IoIosArrowDown />}
</button>
    </div>
);
};

export default WebPlayer;
