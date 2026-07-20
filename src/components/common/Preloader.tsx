import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Hard guarantee: always disappear after 1.5s max
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#141311',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease',
        opacity: opacity,
        pointerEvents: opacity < 1 ? 'none' : 'all',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Icon */}
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          animation: 'preloaderFloat 2s ease-in-out infinite',
        }}>
          🗺️
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#f9f6f0',
          marginBottom: '0.25rem',
        }}>
          Dusun Dawang
        </h1>

        <p style={{
          fontSize: '0.7rem',
          color: '#d4a359',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          Desa Blongkeng · Ngluwar · Magelang
        </p>

        {/* Progress bar */}
        <div style={{
          width: '200px',
          height: '4px',
          background: '#24231f',
          borderRadius: '999px',
          overflow: 'hidden',
          margin: '0 auto',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(to right, #c2593f, #d4a359)',
            borderRadius: '999px',
            animation: 'preloaderFill 1.2s ease-out forwards',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes preloaderFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes preloaderFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
