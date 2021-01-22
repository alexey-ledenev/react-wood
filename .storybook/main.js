module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  webpackFinal: async (config) => {
    const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query
    };
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack", assetLoader]
    });
    return config;
  },
};
