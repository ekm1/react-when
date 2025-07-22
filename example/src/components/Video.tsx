import React from 'react';

const Video = () => (
  <div className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl">
    <h3 className="text-2xl font-bold mb-4 text-center">🎥 Video Player</h3>
    <div className="bg-black rounded-lg p-8 mb-4 text-center">
      <div className="text-6xl mb-4">▶️</div>
      <p>Product Demo Video</p>
      <p className="text-sm opacity-75">Duration: 5:43 | 1080p HD</p>
    </div>
    <div className="flex justify-center gap-2 flex-wrap">
      <button className="bg-red-500 px-3 py-1 rounded text-sm">⏯️ Play</button>
      <button className="bg-red-500 px-3 py-1 rounded text-sm">🔊 Volume</button>
      <button className="bg-red-500 px-3 py-1 rounded text-sm">⚙️ Settings</button>
    </div>
    <p className="text-sm opacity-90 mt-4 text-center">Loads on user interaction</p>
  </div>
);

export default Video;