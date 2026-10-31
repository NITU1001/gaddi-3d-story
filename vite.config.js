import { defineConfig } from 'vite';

// Relative base so the built site works from any sub-folder
// (GitHub Pages, Netlify, Vercel, or a plain file server).
const BASE = './';

// src/main.js loads its data with absolute paths like '/data/...'.
// Those break when the site lives in a sub-folder such as
// https://<user>.github.io/gaddi-3d-story/. This plugin rewrites
// them to relative paths at BUILD time only, so the source files
// stay untouched and `npm run dev` behaves exactly as before.
function relativeDataPaths() {
  return {
    name: 'relative-data-paths',
    apply: 'build',
    transform(code, id) {
      if (!id.replace(/\\/g, '/').endsWith('/src/main.js')) return null;
      return {
        code: code.replace(/(['"`])\/data\//g, `$1${BASE}data/`),
        map: null
      };
    }
  };
}

export default defineConfig({
  base: BASE,
  plugins: [relativeDataPaths()]
});
