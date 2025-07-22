import { ReactNode, ReactElement, HTMLAttributes } from 'react';

export type TriggerType = 
  | 'viewport' 
  | 'viewport-once' 
  | 'idle' 
  | 'interaction' 
  | 'timer' 
  | 'condition' 
  | 'immediate';

export type PrefetchStrategy = 'none' | 'conservative' | 'moderate' | 'aggressive';

export interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export interface IdleOptions {
  timeout?: number;
  fallbackDelay?: number;
}

export interface TimerState {
  expired: boolean;
  progress: number;
  remaining: number;
}

export interface InteractionMap {
  [eventType: string]: number;
}

export interface LoadState {
  shouldLoad: boolean;
  isLoading: boolean;
  hasLoaded: boolean;
  hasError: boolean;
  errorCount: number;
  loadStartTime: number | null;
}

export interface PlaceholderProps {
  timerState?: TimerState;
  interactions?: InteractionMap;
  idleTime?: number;
}

export interface LoadingProps {
  progress?: number;
  prefetched?: boolean;
}

export interface ErrorProps {
  errorCount: number;
  retry: () => void;
}

export interface WhenProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onError'> {
  children: ReactNode;
  triggers?: TriggerType | TriggerType[];
  delay?: number;
  condition?: boolean;
  prefetchStrategy?: PrefetchStrategy;
  minimumLoading?: number;
  placeholder?: ReactNode | ((props: PlaceholderProps) => ReactNode);
  loading?: ReactNode | ((props: LoadingProps) => ReactNode);
  error?: ReactNode | ((props: ErrorProps) => ReactNode);
  onLoad?: () => void;
  onLoadError?: (error: Error, errorInfo?: any) => void;
  intersectionOptions?: IntersectionOptions;
  idleOptions?: IdleOptions;
  interactionEvents?: string[];
  retryCount?: number;
  'aria-label'?: string;
}