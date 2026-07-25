/** @type {import('tailwindcss').Config} */

/*
 * LinkedLeaders Brand Guide v1.0 (July 2026).
 *
 * Rather than rewrite ~270 utility classes by hand, the generic `blue` and
 * `slate` scales are remapped onto brand tokens. Every existing class then
 * resolves to a brand colour, and any new code written against Tailwind's
 * defaults lands on-brand automatically.
 *
 * Core palette, sampled from the 2026 master logo files:
 *   Navy          #112F5D  primary: headlines, dark backgrounds, solid CTAs
 *   Wisdom Purple #7C71BD  accent: kickers, highlights, large display text
 *   Slate Mist    #A0ACBE  support: dividers and fills only, NEVER text
 *   Body ink      #222222
 *   Table border  #D9DDE3   Panel fill  #F2F4F8
 *
 * The cerulean palette (#2596BE) that the live site still uses is retired.
 *
 * Contrast rules are enforced, and they drive two decisions here:
 *   - Solid buttons are NAVY with white text (13.2:1), not purple. White on
 *     Wisdom Purple is only 3.6:1, which fails for text at button sizes. The
 *     guide permits purple *text* on white at large sizes; that is a different
 *     measurement from a purple fill behind white text.
 *   - Nothing in the `slate` scale below is Slate Mist at a text weight. The
 *     lightest grey used for captions is #6B7484 (4.7:1) so it stays legible.
 *     Slate Mist appears only as borders and fills.
 */

const brand = {
  navy: '#112F5D',
  purple: '#7C71BD',
  mist: '#A0ACBE',
  ink: '#222222',
  border: '#D9DDE3',
  panel: '#F2F4F8',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand,

        // Action scale. Light end is Wisdom Purple for accents on navy;
        // 600 and above are navy, which is what solid buttons resolve to.
        blue: {
          50: '#F2F4F8',
          100: '#E4E7F1',
          200: '#CBCFE4',
          300: '#A9A2D4',
          400: '#8F86C8',
          500: '#7C71BD',
          600: '#112F5D',
          700: '#0D2447',
          800: '#0A1C38',
          900: '#061225',
        },

        // Neutral scale. Headings resolve to navy, body to ink, captions to a
        // grey that still passes contrast on white.
        slate: {
          50: '#F7F8FA',
          100: '#F2F4F8',
          200: '#D9DDE3',
          300: '#C3C9D3',
          400: '#6B7484',
          500: '#5B6472',
          600: '#3A4250',
          700: '#2B3240',
          800: '#112F5D',
          900: '#0D2447',
        },

        // Category colours, kept within the brand family so the activity grid
        // does not introduce hues the guide does not have.
        indigo: { 50: '#F2F4F8', 100: '#E4E7F1', 200: '#CBCFE4', 600: '#7C71BD', 700: '#6A5FA8' },
        teal: { 50: '#F2F4F8', 100: '#E4E7F1', 200: '#CBCFE4', 600: '#3A4250', 700: '#2B3240' },
        amber: { 50: '#F2F4F8', 100: '#E4E7F1', 200: '#CBCFE4', 300: '#A9A2D4', 600: '#7C71BD', 700: '#6A5FA8' },
        rose: { 50: '#FDF2F4', 200: '#F2C9D1', 500: '#B4364C', 700: '#8E2A3C' },
      },
    },
  },
  plugins: [],
};
