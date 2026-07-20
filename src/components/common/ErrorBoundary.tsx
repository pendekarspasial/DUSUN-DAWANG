import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#141311] text-[#f9f6f0] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#1c1b18] border border-white/10 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#c2593f]/20 text-[#d97757] flex items-center justify-center text-3xl mx-auto">
              🗺️
            </div>
            <h1 className="text-xl font-bold">Dusun Dawang WebGIS</h1>
            <p className="text-xs text-[#d1cdc3]">
              Terjadi penyesuaian muat sistem. Silakan muat ulang halaman.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-[#c2593f] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
