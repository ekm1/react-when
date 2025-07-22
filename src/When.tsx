import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { 
  useIntersectionObserver, 
  useIdleCallback, 
  useInteraction, 
  useTimer, 
  usePrefetch 
} from './hooks';
import { WhenProps, LoadState, TriggerType } from './types';

export const When: React.FC<WhenProps> = ({ 
  children, 
  triggers = ['viewport'], 
  delay = 0,
  condition = true,
  prefetchStrategy = 'conservative',
  minimumLoading = 0,
  placeholder = null,
  loading = null,
  error = null,
  onLoad = () => {},
  onLoadError = () => {},
  intersectionOptions = {},
  idleOptions = {},
  interactionEvents = ['click', 'mouseenter'],
  retryCount = 3,
  className = '',
  'aria-label': ariaLabel,
  ...props 
}) => {
  const [loadState, setLoadState] = useState<LoadState>({
    shouldLoad: false,
    isLoading: false,
    hasLoaded: false,
    hasError: false,
    errorCount: 0,
    loadStartTime: null
  });

  // Trigger hooks
  const [viewportRef, isInViewport, hasEverIntersected] = useIntersectionObserver(intersectionOptions);
  const [isIdle, idleTime] = useIdleCallback(idleOptions);
  const [interactionRef, hasInteracted, interactions] = useInteraction(interactionEvents);
  const timerState = useTimer(delay);

  // Prefetch logic
  const loadComponent = useCallback(() => {
    if (typeof (children as any)?.type?._payload?._result === 'undefined') {
      return (children as any)?.type?._payload?._factory?.() || Promise.resolve();
    }
    return Promise.resolve();
  }, [children]);

  // Optimize triggerValues with better memoization
  const triggerValues = useMemo(() => {
    return [
      isInViewport,
      hasEverIntersected,
      isIdle,
      hasInteracted,
      timerState.expired,
      condition
    ];
  }, [isInViewport, hasEverIntersected, isIdle, hasInteracted, timerState.expired, condition]);

  // Memoize triggers for better performance  
  const triggersMemo = useMemo(() => {
    return Array.isArray(triggers) ? triggers : [triggers];
  }, [JSON.stringify(triggers)]);

  const { isPrefetched } = usePrefetch(loadComponent, prefetchStrategy, triggerValues);

  // Determine if we should load based on trigger combinations
  const shouldTrigger = useMemo(() => {
    const triggerMap: Record<TriggerType, boolean> = {
      viewport: isInViewport,
      'viewport-once': hasEverIntersected,
      idle: isIdle,
      interaction: hasInteracted,
      timer: timerState.expired,
      condition: condition,
      immediate: true
    };

    // Support for compound triggers (e.g., ['viewport', 'interaction'])
    if (triggersMemo.includes('immediate')) return true;
    
    // Check if all triggers in array are satisfied
    return triggersMemo.every(trigger => triggerMap[trigger] === true);
  }, [triggersMemo, isInViewport, hasEverIntersected, isIdle, hasInteracted, timerState.expired, condition]);

  // Loading state management with retry logic
  useEffect(() => {
    if (shouldTrigger && !loadState.shouldLoad && !loadState.hasLoaded) {
      setLoadState(prev => ({ 
        ...prev, 
        shouldLoad: true, 
        isLoading: true,
        loadStartTime: Date.now()
      }));
      onLoad();
    }
  }, [shouldTrigger, loadState.shouldLoad, loadState.hasLoaded, onLoad]);

  // Minimum loading time enforcement
  useEffect(() => {
    if (loadState.isLoading && loadState.loadStartTime) {
      const actualMinimumLoading = minimumLoading;
      const elapsed = Date.now() - loadState.loadStartTime;
      
      if (elapsed < actualMinimumLoading) {
        const timer = setTimeout(() => {
          setLoadState(prev => ({ ...prev, isLoading: false, hasLoaded: true }));
        }, actualMinimumLoading - elapsed);
        
        return () => clearTimeout(timer);
      } else {
        setLoadState(prev => ({ ...prev, isLoading: false, hasLoaded: true }));
      }
    }
  }, [loadState.isLoading, loadState.loadStartTime, minimumLoading]);

  const handleError = useCallback((error: Error) => {
    setLoadState(prev => {
      const newErrorCount = prev.errorCount + 1;
      const shouldRetry = newErrorCount < retryCount;
      
      return {
        ...prev,
        hasError: !shouldRetry,
        errorCount: newErrorCount,
        isLoading: shouldRetry,
        shouldLoad: shouldRetry
      };
    });
    
    onLoadError(error);
  }, [retryCount, onLoadError]);

  // Suspense fallback - memoize better for performance
  const suspenseFallback = useMemo(() => {
    if (loading) {
      return typeof loading === 'function' 
        ? loading({ progress: timerState.progress, prefetched: isPrefetched })
        : loading;
    }
    
    return <div>Loading...</div>;
  }, [loading, timerState.progress, isPrefetched]);

  // Combined ref callback for handling multiple triggers
  const combinedRef = useCallback((node: HTMLDivElement | null) => {
    const hasViewportTrigger = triggersMemo.includes('viewport') || triggersMemo.includes('viewport-once');
    const hasInteractionTrigger = triggersMemo.includes('interaction');
    
    if (hasViewportTrigger) {
      viewportRef.current = node;
    }
    if (hasInteractionTrigger) {
      interactionRef.current = node;
    }
    
    // Default fallback
    if (!hasViewportTrigger && !hasInteractionTrigger) {
      viewportRef.current = node;
    }
  }, [triggersMemo, viewportRef, interactionRef]);

  // Memoize className to prevent recreation
  const customClass = useMemo(() => className || '', [className]);

  // Error state with retry option
  if (loadState.hasError && error) {
    const retryFunction = () => {
      setLoadState(prev => ({ ...prev, hasError: false, shouldLoad: true, isLoading: true, errorCount: 0 }));
    };
    
    const errorContent = typeof error === 'function' 
      ? error({ errorCount: loadState.errorCount, retry: retryFunction })
      : error;

    return (
      <div 
        ref={combinedRef} 
        className={customClass}
        aria-label={ariaLabel}
        {...props}
      >
        <div>
          {errorContent}
        </div>
      </div>
    );
  }

  // Not triggered yet - show placeholder
  if (!loadState.shouldLoad) {
    const placeholderContent = placeholder || (
      <div>
        Waiting for: {Array.isArray(triggers) ? triggers.join(' + ') : triggers}
      </div>
    );

    const finalPlaceholder = typeof placeholderContent === 'function' 
      ? placeholderContent({ timerState, interactions, idleTime })
      : placeholderContent;

    return (
      <div 
        ref={combinedRef} 
        className={customClass}
        aria-label={ariaLabel || 'Loading placeholder'}
        {...props}
      >
        {finalPlaceholder}
      </div>
    );
  }

  // Loading state
  if (loadState.isLoading) {
    const loadingContent = loading || (
      <div>
        Loading...
      </div>
    );

    const finalLoading = typeof loadingContent === 'function'
      ? loadingContent({ progress: timerState.progress, prefetched: isPrefetched })
      : loadingContent;

    return (
      <div 
        ref={combinedRef} 
        className={customClass}
        aria-label={ariaLabel || 'Loading content'}
        {...props}
      >
        {finalLoading}
      </div>
    );
  }

  return (
    <div 
      ref={combinedRef} 
      className={customClass}
      aria-label={ariaLabel}
      {...props}
    >
      <Suspense fallback={suspenseFallback}>
        <ErrorBoundary onError={handleError}>
          {children}
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};