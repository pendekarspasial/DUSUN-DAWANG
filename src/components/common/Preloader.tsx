import React, { useEffect, useState } from 'react';
import { getAssetUrl } from '../../utils/path';

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
        background: 'linear-gradient(135deg, #322922 0%, #473a2f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease',
        opacity: opacity,
        pointerEvents: opacity < 1 ? 'none' : 'all',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(212, 163, 89, 0.15)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        {/* Logo KKN Dawang */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 1.25rem auto',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          border: '2px solid rgba(249, 246, 240, 0.3)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          animation: 'preloaderFloat 2s ease-in-out infinite',
        }}>
          <img
            src={getAssetUrl('assets/images/logo_kkn_dawang.jpg')}
            alt="Logo Tim KKN Dawang"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.65rem',
          fontWeight: 'bold',
          color: '#ffffff',
          letterSpacing: '0.02em',
          marginBottom: '0.25rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
        }}>
          Dusun Dawang
        </h1>

        <p style={{
          fontSize: '0.75rem',
          color: '#f3d9a2',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          Desa Blongkeng · Ngluwar · Magelang
        </p>

        {/* Progress bar */}
        <div style={{
          width: '220px',
          height: '5px',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '999px',
          overflow: 'hidden',
          margin: '0 auto',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #e07a5f, #f4a261, #f3d9a2)',
            animation: 'preloaderProgress 1.5s ease-in-out forwards',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes preloaderFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes preloaderProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
};
