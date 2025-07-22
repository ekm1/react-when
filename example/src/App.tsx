import React, { useState, lazy } from 'react';
import { When } from '@ekm1/react-when';

// Code-split components with artificial delays to demonstrate loading
const Chart = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./components/Chart')), 600)
  )
);

const Map = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./components/Map')), 800)
  )
);

const Table = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./components/Table')), 600)
  )
);

const Video = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./components/Video')), 800)
  )
);

const Comments = lazy(() =>
  new Promise(resolve =>
    setTimeout(() => resolve(import('./components/Comments')), 500)
  )
);

function App() {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto p-6">
          <header className="text-center mb-12 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">@ekm1/react-when</h1>
            <p className="text-xl text-gray-600 mb-4">Deferred loading for React</p>
            <div className="flex justify-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Performance</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">User Experience</span>
            </div>
          </header>

          {/* Basic Examples */}
          <div className="space-y-8">

            {/* Viewport Trigger */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">👁️ Viewport Trigger</h2>
              <p className="text-gray-600 mb-4">Chart loads when scrolled into view</p>

              <When
                triggers="viewport"
                prefetchStrategy="moderate"
                minimumLoading={300}
                loading={() => (
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/40 animate-spin border-2 border-white/20 border-t-white"></div>
                      <h3 className="text-2xl font-bold mb-4">Loading Chart...</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/20 p-4 rounded-lg text-center animate-pulse">
                          <div className="h-6 bg-white/30 rounded mb-2"></div>
                          <div className="h-3 bg-white/30 rounded"></div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg text-center animate-pulse">
                          <div className="h-6 bg-white/30 rounded mb-2"></div>
                          <div className="h-3 bg-white/30 rounded"></div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg text-center animate-pulse">
                          <div className="h-6 bg-white/30 rounded mb-2"></div>
                          <div className="h-3 bg-white/30 rounded"></div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg text-center animate-pulse">
                          <div className="h-6 bg-white/30 rounded mb-2"></div>
                          <div className="h-3 bg-white/30 rounded"></div>
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <div className="flex justify-between items-end h-20">
                          {Array.from({length: 7}).map((_, i) => (
                            <div key={i} className="bg-white/40 rounded-t animate-pulse" style={{height: '60%', width: '12%'}} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm opacity-75 mt-4 text-center">Almost ready...</p>
                    </div>
                  </div>
                )}
                placeholder={() => (
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
                    <div className="animate-pulse">
                      <div className="skeleton w-12 h-12 mx-auto mb-4 rounded-full bg-white/20"></div>
                      <h3 className="text-2xl font-bold mb-4 text-center">Analytics Chart</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="skeleton bg-white/10 p-4 rounded-lg text-center">
                          <div className="h-6 bg-white/20 rounded mb-2"></div>
                          <div className="h-3 bg-white/20 rounded"></div>
                        </div>
                        <div className="skeleton bg-white/10 p-4 rounded-lg text-center">
                          <div className="h-6 bg-white/20 rounded mb-2"></div>
                          <div className="h-3 bg-white/20 rounded"></div>
                        </div>
                        <div className="skeleton bg-white/10 p-4 rounded-lg text-center">
                          <div className="h-6 bg-white/20 rounded mb-2"></div>
                          <div className="h-3 bg-white/20 rounded"></div>
                        </div>
                        <div className="skeleton bg-white/10 p-4 rounded-lg text-center">
                          <div className="h-6 bg-white/20 rounded mb-2"></div>
                          <div className="h-3 bg-white/20 rounded"></div>
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-end h-20">
                          {Array.from({length: 7}).map((_, i) => (
                            <div key={i} className="bg-white/20 rounded-t" style={{height: '60%', width: '12%'}} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm opacity-90 mt-4 text-center">Scroll to load...</p>
                    </div>
                  </div>
                )}
              >
                <Chart />
              </When>
            </section>

            {/* Compound Triggers */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">🎯 Compound Triggers</h2>
              <p className="text-gray-600 mb-4">Requires viewport visibility AND user interaction</p>

              <When
                triggers={['viewport', 'interaction']}
                prefetchStrategy="moderate"
                minimumLoading={300}
                loading={() => (
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl p-8 text-center">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/40 animate-spin border-2 border-white/20 border-t-white"></div>
                      <h3 className="text-2xl font-bold mb-4 text-center">Loading Map...</h3>
                      <div className="bg-white/20 rounded-lg p-6 mb-4">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-red-600/70 px-3 py-2 rounded text-sm animate-pulse">Loading...</div>
                          <div className="bg-red-600/70 px-3 py-2 rounded text-sm animate-pulse">Loading...</div>
                          <div className="bg-red-600/70 px-3 py-2 rounded text-sm animate-pulse">Loading...</div>
                        </div>
                        <div className="bg-green-400/50 rounded h-32 flex items-center justify-center animate-pulse">
                          <div className="text-center">
                            <div className="text-3xl mb-2">🌍</div>
                            <p className="font-semibold text-green-800">Loading Map...</p>
                            <div className="flex justify-center gap-2 mt-2">
                              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-2">
                        <div className="bg-white/30 px-3 py-1 rounded text-sm animate-pulse">Loading...</div>
                        <div className="bg-white/30 px-3 py-1 rounded text-sm animate-pulse">Loading...</div>
                        <div className="bg-white/30 px-3 py-1 rounded text-sm animate-pulse">Loading...</div>
                      </div>
                      <p className="text-sm opacity-90 mt-4 text-center">Almost ready...</p>
                    </div>
                  </div>
                )}
                placeholder={({ interactions }) => (
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-xl p-8 text-center cursor-pointer">
                    <div className="animate-pulse">
                      <div className="skeleton w-12 h-12 mx-auto mb-4 rounded-full bg-white/20"></div>
                      <h3 className="text-2xl font-bold mb-4 text-center">Interactive Map</h3>
                      <div className="bg-white/10 rounded-lg p-6 mb-4">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="skeleton bg-red-600/50 px-3 py-2 rounded text-sm">📍 Markers</div>
                          <div className="skeleton bg-red-600/50 px-3 py-2 rounded text-sm">🛣️ Routes</div>
                          <div className="skeleton bg-red-600/50 px-3 py-2 rounded text-sm">🏢 Places</div>
                        </div>
                        <div className="bg-green-400/30 rounded h-32 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-2">🌍</div>
                            <p className="font-semibold text-green-800">Click to Load</p>
                            <div className="flex justify-center gap-2 mt-2">
                              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center gap-2">
                        <div className="skeleton bg-white/20 px-3 py-1 rounded text-sm">🔍 Zoom In</div>
                        <div className="skeleton bg-white/20 px-3 py-1 rounded text-sm">🔍 Zoom Out</div>
                        <div className="skeleton bg-white/20 px-3 py-1 rounded text-sm">📐 Measure</div>
                      </div>
                      <div className="text-center mt-4">
                        <p className="text-sm mb-2">👆 Click or hover to load!</p>
                        <p className="text-xs opacity-75">
                          Interactions: {Object.values(interactions || {}).reduce((sum, count) => sum + count, 0)}
                        </p>
                      </div>
                      <p className="text-sm opacity-90 mt-4 text-center">Loads on viewport + interaction</p>
                    </div>
                  </div>
                )}
              >
                <Map />
              </When>
            </section>

            {/* Timer + Idle */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">⏰ Timer + Idle</h2>
              <p className="text-gray-600 mb-4">Table loads when idle AND after 3 seconds</p>

              <When
                triggers={['idle', 'timer']}
                delay={3000}
                prefetchStrategy="moderate"
                minimumLoading={300}
                loading={() => (
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl p-8">
                    <div className="animate-pulse">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/40 mr-4 animate-spin border-2 border-white/20 border-t-white"></div>
                        <h3 className="text-xl">Loading Table...</h3>
                      </div>
                      <div className="bg-white/10 rounded overflow-hidden mb-4">
                        <div className="bg-white/20 p-2 grid grid-cols-3 gap-2">
                          <div className="h-4 bg-white/40 rounded animate-pulse"></div>
                          <div className="h-4 bg-white/40 rounded animate-pulse"></div>
                          <div className="h-4 bg-white/40 rounded animate-pulse"></div>
                        </div>
                        {Array.from({length: 3}).map((_, i) => (
                          <div key={i} className="p-2 border-t border-white/10 grid grid-cols-3 gap-2">
                            <div className="h-3 bg-white/30 rounded animate-pulse"></div>
                            <div className="h-3 bg-white/30 rounded animate-pulse"></div>
                            <div className="h-3 bg-white/30 rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <p className="text-sm mb-2">✨ Fetching data...</p>
                        <div className="bg-white/10 rounded-full h-2 mb-2">
                          <div className="bg-white/50 h-2 rounded-full w-3/4 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                placeholder={({ timerState }) => (
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-xl p-8">
                    <div className="animate-pulse">
                      <div className="flex items-center justify-center mb-4">
                        <div className="skeleton w-12 h-12 rounded-full bg-white/20 mr-4"></div>
                        <h3 className="text-xl">Data Table</h3>
                      </div>
                      <div className="bg-white/10 rounded overflow-hidden mb-4">
                        <div className="bg-white/20 p-2 grid grid-cols-3 gap-2">
                          <div className="skeleton h-4 bg-white/30 rounded"></div>
                          <div className="skeleton h-4 bg-white/30 rounded"></div>
                          <div className="skeleton h-4 bg-white/30 rounded"></div>
                        </div>
                        {Array.from({length: 3}).map((_, i) => (
                          <div key={i} className="p-2 border-t border-white/10 grid grid-cols-3 gap-2">
                            <div className="skeleton h-3 bg-white/20 rounded"></div>
                            <div className="skeleton h-3 bg-white/20 rounded"></div>
                            <div className="skeleton h-3 bg-white/20 rounded"></div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center">
                        <p className="text-sm mb-2">Loading in {Math.ceil((timerState?.remaining || 0) / 1000)}s</p>
                        <div className="bg-white/10 rounded-full h-2 mb-2">
                          <div
                            className="bg-white/40 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${timerState?.progress || 0}%` }}
                          />
                        </div>
                        <div className="flex justify-center gap-2">
                          <span className="bg-green-500/20 text-green-100 px-2 py-1 rounded text-xs">🧘 Idle</span>
                          <span className="bg-yellow-500/20 text-yellow-100 px-2 py-1 rounded text-xs">⏱️ Timer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              >
                <Table />
              </When>
            </section>

            {/* Interaction Only */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">🎬 Interaction Trigger</h2>
              <p className="text-gray-600 mb-4">Video loads only when user shows intent</p>

              <When
                triggers="interaction"
                prefetchStrategy="moderate"
                minimumLoading={300}
                loading={() => (
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-8">
                    <div className="animate-pulse">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/40 animate-spin border-2 border-white/20 border-t-white"></div>
                        <h3 className="text-xl">Loading Video...</h3>
                      </div>
                      <div className="bg-black/50 rounded-lg p-8 mb-4 text-center">
                        <div className="text-6xl mb-2 animate-pulse">⏳</div>
                        <p className="text-sm">Buffering video...</p>
                        <p className="text-xs opacity-75">Loading player controls</p>
                      </div>
                      <div className="flex justify-center gap-2">
                        <div className="w-12 h-6 bg-red-500/70 rounded animate-pulse"></div>
                        <div className="w-12 h-6 bg-red-500/70 rounded animate-pulse"></div>
                        <div className="w-12 h-6 bg-red-500/70 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
                placeholder={({ interactions }) => (
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-8 cursor-pointer">
                    <div className="animate-pulse">
                      <div className="text-center mb-4">
                        <div className="skeleton w-12 h-12 mx-auto mb-4 rounded-full bg-white/20"></div>
                        <h3 className="text-xl">Video Player</h3>
                      </div>
                      <div className="bg-black/50 rounded-lg p-8 mb-4 text-center">
                        <div className="text-6xl mb-2">▶️</div>
                        <p className="text-sm">Product Demo</p>
                        <p className="text-xs opacity-75">Click to load player</p>
                      </div>
                      <div className="flex justify-center gap-2">
                        <div className="skeleton w-12 h-6 bg-red-500/50 rounded"></div>
                        <div className="skeleton w-12 h-6 bg-red-500/50 rounded"></div>
                        <div className="skeleton w-12 h-6 bg-red-500/50 rounded"></div>
                      </div>
                      {Object.keys(interactions || {}).length > 0 && (
                        <p className="text-center text-sm mt-4 bg-green-500/20 py-2 rounded">
                          ✨ Loading video player...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              >
                <Video />
              </When>
            </section>

            {/* Conditional Loading */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">🔐 Conditional Loading</h2>
              <p className="text-gray-600 mb-4">Comments load based on authentication</p>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showComments 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {showComments ? '🔓 Log Out' : '🔐 Log In'}
                </button>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  showComments 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {showComments ? '✅ Authenticated' : '❌ Not Authenticated'}
                </span>
              </div>

              <When
                triggers="condition"
                condition={showComments}
                prefetchStrategy="moderate"
                minimumLoading={300}
                loading={() => (
                  <div className="bg-gradient-to-br from-teal-400 to-green-400 text-gray-800 rounded-xl p-8">
                    <div className="animate-pulse">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/50 animate-spin border-2 border-white/30 border-t-gray-700"></div>
                        <h3 className="text-xl">Loading Comments...</h3>
                      </div>
                      <div className="space-y-3 max-w-md mx-auto">
                        {Array.from({length: 2}).map((_, i) => (
                          <div key={i} className="bg-white/70 p-3 rounded flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-400 animate-pulse"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-400 rounded mb-2 w-1/2 animate-pulse"></div>
                              <div className="h-3 bg-gray-400 rounded animate-pulse"></div>
                            </div>
                          </div>
                        ))}
                        <div className="bg-white/70 p-3 rounded">
                          <div className="h-16 bg-gray-400 rounded mb-2 animate-pulse"></div>
                          <div className="h-6 bg-gray-400 rounded w-16 animate-pulse"></div>
                        </div>
                      </div>
                      <p className="text-center text-sm mt-4 opacity-75">Fetching latest discussions...</p>
                    </div>
                  </div>
                )}
                placeholder={() => (
                  <div className="bg-gradient-to-br from-teal-400 to-green-400 text-gray-800 rounded-xl p-8 relative">
                    <div className="animate-pulse">
                      <div className="text-center mb-4">
                        <div className="skeleton w-12 h-12 mx-auto mb-4 rounded-full bg-white/30"></div>
                        <h3 className="text-xl">Comments</h3>
                      </div>
                      <div className="space-y-3 max-w-md mx-auto">
                        {Array.from({length: 2}).map((_, i) => (
                          <div key={i} className="bg-white/50 p-3 rounded flex gap-3">
                            <div className="skeleton w-10 h-10 rounded-full bg-gray-300"></div>
                            <div className="flex-1">
                              <div className="skeleton h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
                              <div className="skeleton h-3 bg-gray-300 rounded"></div>
                            </div>
                          </div>
                        ))}
                        <div className="bg-white/50 p-3 rounded">
                          <div className="skeleton h-16 bg-gray-300 rounded mb-2"></div>
                          <div className="skeleton h-6 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                    {!showComments && (
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-xl">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🔐</div>
                          <h4 className="font-semibold mb-2">Authentication Required</h4>
                          <p className="text-sm text-gray-600">Click "Log In" above to view comments</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              >
                <Comments />
              </When>
            </section>

          </div>

          <footer className="text-center py-12 mt-16 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">🎉 That's it!</h3>
            <p className="text-gray-600">Simple, powerful deferred loading for React</p>
          </footer>
        </div>
      </div>
  );
}

export default App;
