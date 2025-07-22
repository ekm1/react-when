import React from 'react';

const Table = () => (
  <div className="p-8 bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl">
    <h3 className="text-2xl font-bold mb-4 text-center">📋 Data Table</h3>
    <div className="bg-white/10 rounded overflow-hidden">
      <table className="w-full">
        <thead className="bg-white/20">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {['John', 'Jane', 'Bob'].map((name, i) => (
            <tr key={i} className="border-t border-white/10">
              <td className="p-2">#{1000 + i}</td>
              <td className="p-2">{name}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  i % 2 ? 'bg-green-500' : 'bg-yellow-500'
                }`}>
                  {i % 2 ? 'Active' : 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-sm opacity-90 mt-4 text-center">Loads when idle or after timer</p>
  </div>
);

export default Table;