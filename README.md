# @ekm1/react-when

![CI/CD](https://github.com/ekm1/react-when/workflows/CI/CD%20Pipeline/badge.svg)
[![npm version](https://badge.fury.io/js/%40ekm1%2Freact-when.svg)](https://badge.fury.io/js/%40ekm1%2Freact-when)
[![npm downloads](https://img.shields.io/npm/dm/@ekm1/react-when.svg)](https://www.npmjs.com/package/@ekm1/react-when)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@ekm1/react-when)](https://bundlephobia.com/package/@ekm1/react-when)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

> **Angular-inspired deferred loading for React** - Smart, performant component loading with compound triggers, prefetching, and zero layout shift.

## ✨ Features

-  **Multiple Triggers**: viewport, interaction, timer, idle, condition, immediate
-  **Compound Triggers**: Combine multiple conditions (e.g., viewport + interaction)
-  **Smart Prefetching**: Conservative, moderate, or aggressive strategies
-  **Zero Layout Shift**: Consistent dimensions throughout loading states  
-  **Optimized Performance**: Memoized hooks, efficient re-renders
-  **Customizable**: Bring your own styling and loading states
-  **TypeScript**: Full type safety included

## 🚀 Quick Start

```bash
npm install @ekm1/react-when
```

```tsx
import { When } from '@ekm1/react-when';
import { lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));

function App() {
  return (
    <When
      triggers="viewport"
      placeholder={() => <div className="h-64 bg-gray-200 rounded">Loading chart...</div>}
      loading={() => <div className="h-64 bg-gray-200 rounded animate-pulse">Almost ready...</div>}
    >
      <HeavyChart />
    </When>
  );
}
```

## 📚 Trigger Types

### 🖥️ Viewport Triggers
Load when component enters the viewport:

```tsx
// Load once when entering viewport
<When triggers="viewport-once">
  <ExpensiveComponent />
</When>

// Load every time entering viewport
<When triggers="viewport">
  <RefreshableComponent />
</When>

// Custom intersection options
<When 
  triggers="viewport"
  intersectionOptions={{ threshold: 0.5, rootMargin: '100px' }}
>
  <Component />
</When>
```

### 👆 Interaction Triggers
Load on user interaction:

```tsx
// Default events: click, mouseenter
<When triggers="interaction">
  <InteractiveMap />
</When>

// Custom interaction events
<When 
  triggers="interaction"
  interactionEvents={['click', 'focus', 'touchstart']}
>
  <TouchComponent />
</When>
```

### ⏱️ Timer Triggers
Load after a delay:

```tsx
<When 
  triggers="timer"
  delay={3000} // 3 seconds
>
  <DelayedWidget />
</When>
```

### 🧘 Idle Triggers
Load when browser is idle:

```tsx
<When 
  triggers="idle"
  idleOptions={{ timeout: 5000 }}
>
  <BackgroundTask />
</When>
```

### 🔐 Condition Triggers
Load based on state/props:

```tsx
function UserContent({ isAuthenticated }) {
  return (
    <When 
      triggers="condition"
      condition={isAuthenticated}
    >
      <PrivateContent />
    </When>
  );
}
```

### ⚡ Immediate Triggers
Load immediately:

```tsx
<When triggers="immediate">
  <AlwaysLoadComponent />
</When>
```

## 🎯 Compound Triggers

Combine multiple triggers for advanced loading strategies:

```tsx
// Load when BOTH in viewport AND user interacts
<When triggers={['viewport', 'interaction']}>
  <ExpensiveInteractiveMap />
</When>

// Load when BOTH in viewport AND after 5 seconds
<When 
  triggers={['viewport', 'timer']}
  delay={5000}
>
  <ComponentThatNeedsBoth />
</When>

// Load when idle AND authenticated
<When 
  triggers={['idle', 'condition']}
  condition={user.isLoggedIn}
>
  <UserAnalytics />
</When>
```

## 🚀 Prefetching Strategies

Optimize loading with smart prefetching:

```tsx
// Conservative: prefetch when ALL triggers are nearly satisfied
<When 
  triggers={['viewport', 'interaction']}
  prefetchStrategy="conservative"
>
  <Component />
</When>

// Moderate: prefetch when ANY trigger is satisfied  
<When 
  triggers={['viewport', 'interaction']}
  prefetchStrategy="moderate"
>
  <Component />
</When>

// Aggressive: prefetch immediately
<When 
  triggers="viewport"
  prefetchStrategy="aggressive"
>
  <Component />
</When>

// None: disable prefetching
<When 
  triggers="interaction"
  prefetchStrategy="none"
>
  <Component />
</When>
```

## 🎨 Custom Loading States

Prevent layout shift with properly sized loading states:

```tsx
<When
  triggers="viewport"
  
  // Before triggers are met
  placeholder={({ timerState, interactions }) => (
    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 rounded-full mb-2" />
        <p>Waiting for viewport...</p>
        {timerState && <p>Timer: {timerState.remaining}ms</p>}
      </div>
    </div>
  )}
  
  // While loading
  loading={({ progress, prefetched }) => (
    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-6 h-6 border-2 border-green-500 rounded-full mb-2" />
        <p>{prefetched ? 'Using prefetched data...' : 'Loading component...'}</p>
        {progress && <div className="w-32 bg-gray-300 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{width: `${progress}%`}} />
        </div>}
      </div>
    </div>
  )}
  
  // Error handling
  error={({ errorCount, retry }) => (
    <div className="h-64 bg-red-100 border border-red-300 rounded flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-800 mb-2">Failed to load ({errorCount} attempts)</p>
        <button onClick={retry} className="px-4 py-2 bg-red-500 text-white rounded">
          Retry
        </button>
      </div>
    </div>
  )}
>
  <YourComponent />
</When>
```

## ⚙️ Advanced Configuration

### Minimum Loading Time
Prevent flickering with minimum loading duration:

```tsx
<When 
  triggers="viewport"
  minimumLoading={500} // Always show loading for at least 500ms
>
  <FastLoadingComponent />
</When>
```

### Retry Logic
Automatic retries on component load failures:

```tsx
<When 
  triggers="interaction"
  retryCount={3} // Retry up to 3 times
  onLoadError={(error, errorInfo) => {
    console.error('Component failed to load:', error);
    analytics.track('component_load_error', errorInfo);
  }}
>
  <Component />
</When>
```

### Accessibility
Built-in ARIA support:

```tsx
<When 
  triggers="viewport"
  aria-label="Loading analytics dashboard"
  className="focus:ring-2 focus:ring-blue-500"
>
  <Dashboard />
</When>
```

## 📊 Real-World Examples

### Interactive Analytics Dashboard
```tsx
function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  
  return (
    <div className="space-y-6">
      {/* Load immediately - critical data */}
      <When triggers="immediate">
        <KeyMetrics />
      </When>
      
      {/* Load when scrolled into view */}
      <When triggers="viewport" prefetchStrategy="conservative">
        <TrafficChart timeRange={selectedTimeRange} />
      </When>
      
      {/* Load only when user shows interest */}
      <When triggers="interaction" interactionEvents={['click', 'mouseenter']}>
        <DetailedAnalytics />
      </When>
      
      {/* Load in background when idle */}
      <When triggers="idle">
        <ReportGenerator />
      </When>
    </div>
  );
}
```

### Progressive Content Loading
```tsx
function ArticleReader({ article }) {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <article>
      {/* Critical content loads immediately */}
      <When triggers="immediate">
        <ArticleHeader article={article} />
      </When>
      
      <When triggers="immediate">
        <ArticleContent content={article.content} />
      </When>
      
      {/* Related articles load when scrolled */}
      <When triggers="viewport" prefetchStrategy="moderate">
        <RelatedArticles articleId={article.id} />
      </When>
      
      {/* Comments load conditionally */}
      <When 
        triggers="condition"
        condition={showComments}
        minimumLoading={300}
      >
        <CommentSection articleId={article.id} />
      </When>
      
      <button onClick={() => setShowComments(true)}>
        Load Comments
      </button>
    </article>
  );
}
```

## 🔧 API Reference

### When Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `triggers` | `TriggerType \| TriggerType[]` | `['viewport']` | When to load the component |
| `delay` | `number` | `0` | Delay in ms for timer trigger |
| `condition` | `boolean` | `true` | Boolean condition for condition trigger |
| `prefetchStrategy` | `'none' \| 'conservative' \| 'moderate' \| 'aggressive'` | `'conservative'` | Prefetching strategy |
| `minimumLoading` | `number` | `0` | Minimum loading duration in ms |
| `placeholder` | `ReactNode \| Function` | `null` | Content shown before triggers are met |
| `loading` | `ReactNode \| Function` | `null` | Content shown while loading |
| `error` | `ReactNode \| Function` | `null` | Content shown on error |
| `onLoad` | `() => void` | `() => {}` | Called when loading starts |
| `onLoadError` | `(error: Error) => void` | `() => {}` | Called when loading fails |
| `intersectionOptions` | `IntersectionObserverInit` | `{}` | Options for viewport triggers |
| `idleOptions` | `IdleRequestOptions` | `{}` | Options for idle trigger |
| `interactionEvents` | `string[]` | `['click', 'mouseenter']` | Events for interaction trigger |
| `retryCount` | `number` | `3` | Number of retry attempts on error |

### Trigger Types

- `'viewport'` - Load when entering viewport (every time)
- `'viewport-once'` - Load when entering viewport (once only)  
- `'interaction'` - Load on user interaction
- `'timer'` - Load after delay
- `'idle'` - Load when browser is idle
- `'condition'` - Load when condition is true
- `'immediate'` - Load immediately

### Function Props

#### Placeholder Function Props
```typescript
interface PlaceholderProps {
  timerState?: {
    expired: boolean;
    progress: number;
    remaining: number;
  };
  interactions?: {
    [eventType: string]: number;
  };
  idleTime?: number;
}
```

#### Loading Function Props
```typescript
interface LoadingProps {
  progress?: number;
  prefetched?: boolean;
}
```

#### Error Function Props
```typescript
interface ErrorProps {
  errorCount: number;
  retry: () => void;
}
```

## 🎯 Best Practices

### 1. **Prevent Layout Shift**
Always match dimensions between placeholder, loading, and final component:

```tsx
// ❌ Bad - causes layout shift
<When 
  triggers="viewport"
  placeholder={() => <div>Loading...</div>}
>
  <div className="h-64 w-full bg-blue-500">Large Component</div>
</When>

// ✅ Good - consistent dimensions
<When 
  triggers="viewport"
  placeholder={() => <div className="h-64 w-full bg-gray-200 animate-pulse" />}
  loading={() => <div className="h-64 w-full bg-gray-300 animate-pulse" />}
>
  <div className="h-64 w-full bg-blue-500">Large Component</div>
</When>
```

### 2. **Choose the Right Triggers**
- **Critical content**: `immediate`
- **Above-the-fold**: `immediate` or `viewport`  
- **Below-the-fold**: `viewport-once`
- **Interactive features**: `interaction`
- **Background tasks**: `idle`
- **Conditional content**: `condition`

### 3. **Optimize Bundle Size**
Use code splitting with React.lazy:

```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<When triggers="interaction">
  <HeavyComponent />
</When>
```

### 4. **Handle Errors Gracefully**
Always provide error states:

```tsx
<When 
  triggers="viewport"
  error={({ retry, errorCount }) => (
    <div className="p-4 border border-red-300 rounded">
      <p>Failed to load component (attempt {errorCount})</p>
      <button onClick={retry}>Try Again</button>
    </div>
  )}
>
  <Component />
</When>
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/ekm1/react-when.git
cd react-when
npm install

# Run tests
npm test

# Build library
npm run build

# Run example
npm run example
```

## 📄 License

MIT © [Migel Hoxha](https://github.com/ekm1)

---

## 📖 More Examples

Check out our [interactive examples](https://ekm1.github.io/react-when/) to see all features in action!

**Happy deferred loading!** 🚀
