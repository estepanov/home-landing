const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    // Keep any existing plugins present and append the following:
		require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')
  ],
};

module.exports = config;
