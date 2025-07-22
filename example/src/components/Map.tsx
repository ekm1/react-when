import React from 'react';

const Map = () => (
  <div className="p-8 bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl">
    <h3 className="text-2xl font-bold mb-4 text-center">🗺️ Interactive Map</h3>
    <div className="bg-white/10 rounded-lg p-6 mb-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <button className="bg-red-600 px-3 py-2 rounded text-sm">📍 Markers</button>
        <button className="bg-red-600 px-3 py-2 rounded text-sm">🛣️ Routes</button>
        <button className="bg-red-600 px-3 py-2 rounded text-sm">🏢 Places</button>
      </div>
      <div className="bg-green-400 rounded h-32 flex items-center justify-center text-green-800">
        <div className="text-center">
          <div className="text-3xl mb-2">🌍</div>
          <p className="font-semibold">World Map</p>
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-2">
      <button className="bg-white/20 px-3 py-1 rounded text-sm">🔍 Zoom In</button>
      <button className="bg-white/20 px-3 py-1 rounded text-sm">🔍 Zoom Out</button>
      <button className="bg-white/20 px-3 py-1 rounded text-sm">📐 Measure</button>
    </div>
    <p className="text-sm opacity-90 mt-4 text-center">Loads on viewport + interaction</p>
  </div>
);

export default Map;