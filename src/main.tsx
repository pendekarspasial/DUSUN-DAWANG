import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ============================================================
// Top-level Error Boundary
// ============================================================
interface EBState { hasError: boolean; error: Error | null; }
class RootErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  state: EBState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[RootErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#141311',
          color: '#f9f6f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          gap: '1rem',
        }}>
          <div style={{ fontSize: '3rem' }}>⚠️</div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#d4a359' }}>
            Dusun Dawang — Terjadi Kesalahan
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#999488', maxWidth: '320px' }}>
            {this.state.error?.message || 'Terjadi kesalahan yang tidak diketahui.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 2rem',
              background: '#c2593f',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🔄 Muat Ulang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ============================================================
// Mount React — direct import (no lazy) for reliability
// ============================================================
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
} else {
  document.body.innerHTML = `
    <div style="min-height:100vh;background:#141311;color:#c2593f;display:flex;align-items:center;justify-content:center;font-family:sans-serif;padding:2rem;text-align:center;">
      <div>
        <h1 style="font-size:1.5rem;margin-bottom:0.5rem">FATAL ERROR</h1>
        <p style="font-size:0.875rem">#root element tidak ditemukan di DOM!</p>
      </div>
    </div>
  `;
}
