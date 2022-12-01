// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  theme: {
    extend: {
      spacing: {
        "105": "28rem",
      },
    },
  },
  variants: {
    scale: ["hover"],
  },
  // https://github.com/tailwindcss/custom-forms
  plugins: [],
  purge: false,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
