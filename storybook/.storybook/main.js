// @ts-ignore
const customConfig = require('../../custom-frontend/webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const parsedArgs = require('yargs').argv;

const STORYBOOK_DIR = path.resolve(__dirname, './');

const { mode = 'development' } = parsedArgs;
const isDevMode = mode !== 'production';

module.exports = {
  core: {
    builder: 'webpack5',
  },
  addons: [
    '@storybook/addon-knobs',
    'storybook-addon-jsx',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
  stories: ['../src/stories/**/*Stories.[tj]sx'],
  webpackFinal: config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...customConfig.module.rules,
        {
          test: /\.css$/,
          include: [`${STORYBOOK_DIR}/.storybook`, `${STORYBOOK_DIR}/src`],
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      ...customConfig.resolve,
    },
  }),
  typescript: {
    reactDocgen: 'none',
  },
};
