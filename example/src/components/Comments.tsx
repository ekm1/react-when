import React from 'react';

const Comments = () => (
  <div className="p-8 bg-gradient-to-br from-teal-400 to-green-400 text-gray-800 rounded-xl">
    <h3 className="text-2xl font-bold mb-4 text-center">💬 Comments</h3>
    <div className="space-y-3 max-w-md mx-auto">
      {[
        { user: "Alice", comment: "Great example!", time: "2h ago" },
        { user: "Bob", comment: "Very helpful tutorial", time: "1h ago" },
      ].map((comment, i) => (
        <div key={i} className="bg-white/80 p-3 rounded">
          <div className="font-semibold">{comment.user} <span className="text-sm text-gray-500">{comment.time}</span></div>
          <p className="text-sm mt-1">{comment.comment}</p>
        </div>
      ))}
      <div className="bg-white/80 p-3 rounded">
        <textarea className="w-full p-2 border rounded text-sm" placeholder="Add comment..."></textarea>
        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm mt-2">Post</button>
      </div>
    </div>
    <p className="text-sm opacity-75 mt-4 text-center">Conditional loading</p>
  </div>
);

export default Comments;