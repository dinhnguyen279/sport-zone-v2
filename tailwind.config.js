const { join } = require('path');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, './app/**/*!(*.stories|*.spec).{ts,tsx,html,js,jsx}')],
};
