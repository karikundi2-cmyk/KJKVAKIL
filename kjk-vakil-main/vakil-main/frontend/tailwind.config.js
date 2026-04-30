module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#F5F5F7',
          tertiary: '#EBEBEF',
        },
        text: {
          primary: '#111111',
          secondary: '#555555',
          inverse: '#FFFFFF',
          accent: '#002FA7',
        },
        accent: {
          primary: '#002FA7',
          warning: '#FFB800',
          danger: '#FF3B30',
          success: '#00C853',
        },
        border: {
          default: '#E5E5E5',
          focus: '#111111',
        },
      },
      fontFamily: {
        heading: ['Cabinet Grotesk', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        none: '0',
        sm: '4px',
      },
    },
  },
  plugins: [],
}
