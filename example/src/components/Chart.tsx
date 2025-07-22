import React from 'react';

const Chart = () => (
  <div className="p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl">
    <h3 className="text-2xl font-bold mb-4 text-center">📊 Analytics Chart</h3>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white/10 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">1,234</div>
        <div className="text-sm opacity-75">Users</div>
      </div>
      <div className="bg-white/10 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">5,678</div>
        <div className="text-sm opacity-75">Views</div>
      </div>
      <div className="bg-white/10 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">89%</div>
        <div className="text-sm opacity-75">Conversion</div>
      </div>
      <div className="bg-white/10 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">$12.3k</div>
        <div className="text-sm opacity-75">Revenue</div>
      </div>
    </div>
    <div className="bg-white/10 rounded-lg p-4">
      <div className="flex justify-between items-end h-20">
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <div
            key={i}
            className="bg-white/40 rounded-t"
            style={{ height: `${height}%`, width: '12%' }}
          />
        ))}
      </div>
    </div>
    <p className="text-sm opacity-90 mt-4 text-center">Loads when entering viewport</p>
  </div>
);

export default Chart;