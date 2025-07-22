import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { IntersectionOptions, IdleOptions, TimerState, InteractionMap, PrefetchStrategy } from './types';

export const useIntersectionObserver = (options: IntersectionOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasEverIntersected, setHasEverIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasEverIntersectedRef = useRef(false);

  // Memoize observer options to prevent recreation on every render
  const memoizedOptions = useMemo(() => ({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '50px',
    root: options.root || null,
    ...options
  }), [options.threshold, options.rootMargin, options.root]);

  useEffect(() => {
    if (!elementRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      const intersecting = entry.isIntersecting;
      setIsIntersecting(intersecting);
      
      if (intersecting && !hasEverIntersectedRef.current) {
        hasEverIntersectedRef.current = true;
        setHasEverIntersected(true);
      }
    }, memoizedOptions);

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [memoizedOptions]);

  return [elementRef, isIntersecting, hasEverIntersected] as const;
};

export const useIdleCallback = (options: IdleOptions = {}) => {
  const [isIdle, setIsIdle] = useState(false);
  const [idleTime, setIdleTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    const handleIdle = (deadline?: IdleDeadline) => {
      setIdleTime(Date.now() - startTime);
      setIsIdle(true);
    };

    if ('requestIdleCallback' in window) {
      const idleCallback = window.requestIdleCallback(handleIdle, {
        timeout: options.timeout || 5000
      });
      return () => window.cancelIdleCallback(idleCallback);
    } else {
      // Enhanced fallback with performance monitoring
      const timer = setTimeout(() => {
        setIdleTime(Date.now() - startTime);
        setIsIdle(true);
      }, options.fallbackDelay || 100);
      return () => clearTimeout(timer);
    }
  }, [options.timeout, options.fallbackDelay]);

  return [isIdle, idleTime] as const;
};

export const useInteraction = (events: string[] = ['click', 'mouseenter', 'focus', 'touchstart']) => {
  const [interactions, setInteractions] = useState<InteractionMap>({});
  const [hasAnyInteraction, setHasAnyInteraction] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<string[]>([]);

  // Memoize events array to prevent unnecessary effect runs
  const memoizedEvents = useMemo(() => events, [JSON.stringify(events)]);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleInteraction = (event: Event) => {
      // Batch state updates for better performance
      setInteractions(prev => ({
        ...prev,
        [event.type]: (prev[event.type] || 0) + 1
      }));
      setHasAnyInteraction(true);
    };

    const element = elementRef.current;
    memoizedEvents.forEach(event => {
      element.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
      memoizedEvents.forEach(event => {
        element.removeEventListener(event, handleInteraction);
      });
    };
  }, [memoizedEvents]);

  return [elementRef, hasAnyInteraction, interactions] as const;
};

export const useTimer = (delay: number, options: { updateInterval?: number } = {}): TimerState => {
  const [timerState, setTimerState] = useState<TimerState>({
    expired: false,
    progress: 0,
    remaining: delay
  });

  // Memoize options to prevent effect recreation
  const memoizedOptions = useMemo(() => ({
    updateInterval: options.updateInterval || Math.min(delay / 10, 250) // Adaptive interval
  }), [options.updateInterval, delay]);

  useEffect(() => {
    if (delay <= 0) {
      setTimerState({ expired: true, progress: 100, remaining: 0 });
      return;
    }

    const startTime = Date.now();
    let animationFrame: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / delay) * 100, 100);
      const remaining = Math.max(delay - elapsed, 0);

      setTimerState({
        expired: elapsed >= delay,
        progress,
        remaining
      });

      if (elapsed < delay) {
        // Use setTimeout with adaptive interval for better performance
        setTimeout(() => {
          animationFrame = requestAnimationFrame(updateProgress);
        }, memoizedOptions.updateInterval);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [delay, memoizedOptions.updateInterval]);

  return timerState;
};

export const usePrefetch = (
  loadComponent: () => Promise<any>, 
  strategy: PrefetchStrategy = 'conservative', 
  triggers: boolean[] = []
) => {
  const [isPrefetched, setIsPrefetched] = useState(false);
  const [prefetchError, setPrefetchError] = useState<Error | null>(null);
  
  // Use deep comparison for triggers array to prevent unnecessary effect runs
  const triggersHash = useMemo(() => {
    return triggers.map(t => t ? '1' : '0').join('');
  }, [triggers]);

  // Memoize shouldPrefetch logic
  const shouldPrefetch = useMemo(() => {
    if (strategy === 'none' || isPrefetched) return false;
    
    switch (strategy) {
      case 'aggressive':
        return true;
      case 'moderate':
        return triggers.some(trigger => trigger);
      case 'conservative':
        return triggers.every(trigger => trigger);
      default:
        return false;
    }
  }, [strategy, triggers, isPrefetched]);

  useEffect(() => {
    if (!shouldPrefetch) return;

    loadComponent().catch(error => {
      setPrefetchError(error);
      console.warn('Prefetch failed:', error);
    }).finally(() => {
      setIsPrefetched(true);
    });
  }, [loadComponent, shouldPrefetch]);

  return { isPrefetched, prefetchError };
};