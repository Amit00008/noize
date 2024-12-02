import React from 'react';

const MusicPlayerCard = ({ song, artist, albumCover }) => {
  return (
    <div className="max-w-sm w-full bg-black text-white rounded-lg border-2 border-purple-600 overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer hover:shadow-xl">
      {/* Image container to ensure full visibility */}
      <div className="relative w-full h-48">
        <img
          src={albumCover}
          alt={`${song} album cover`}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{song}</h2>
        <p className="text-gray-300 text-sm mb-4 truncate">{artist}</p>
      </div>
    </div>
  );
};

export default MusicPlayerCard;
