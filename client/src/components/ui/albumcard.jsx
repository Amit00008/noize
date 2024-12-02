import React from 'react';

const PlaylistCard = ({ playlist }) => {
  const playlistImage = playlist.images[0]?.url;
  const playlistName = playlist.name;
  const ownerName = playlist.owner.display_name;

  return (
    <div className="max-w-sm bg-[#1f1f2e] border-2 border-purple-600 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all">
      <img
        src={playlistImage}
        alt={playlistName}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{playlistName}</h3>
        <p className="text-sm text-gray-300">{ownerName}</p>
      </div>
    </div>
  );
};

export default PlaylistCard;
