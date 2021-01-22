const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const svgr = require('@svgr/rollup').default;

module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    options.target = 'browser';
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          }),
        ],
        extract: false,
        modules: true,
        minimize: true,
        use: ['sass'],
      })
    );
    config.plugins.push(svgr());
    return config;
  },
};
