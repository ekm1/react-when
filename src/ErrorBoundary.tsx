import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Deferrable component error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: '#dc2626',
          padding: '16px',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          backgroundColor: '#fef2f2'
        }}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Component Error</div>
          <div style={{ fontSize: '14px', color: '#b91c1c', marginBottom: '8px' }}>
            {this.state.error?.message}
          </div>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '4px 12px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}