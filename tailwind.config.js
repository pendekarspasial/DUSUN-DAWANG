/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dawang: {
          dark: '#141311',       // Volcanic Charcoal
          surface: '#1c1b18',    // Deep Earth Surface
          card: '#24231f',       // Elevated Card
          border: '#36342e',     // Subtle Divider
          
          clay: '#c2593f',       // Terracotta Clay
          clayLight: '#d97757',  // Light Terracotta Accent
          
          paddy: '#2e5a44',      // Paddy Leaf Green
          paddyLight: '#407b5e', // Vibrant Paddy Green
          paddyGold: '#8cb369',  // Young Rice Sprout
          
          gold: '#d4a359',       // Harvest Gold
          goldLight: '#e5b869',   // Warm Gold Glow
          
          sand: '#f9f6f0',       // Parchment Sand (Text Light)
          sandMuted: '#d1cdc3',  // Muted Sand Body
          sandDim: '#999488',    // Subtle Dim Text
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        '2.5d-sm': '0 4px 12px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        '2.5d-md': '0 8px 24px -4px rgba(0, 0, 0, 0.5), 0 2px 6px -1px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        '2.5d-lg': '0 16px 36px -6px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
