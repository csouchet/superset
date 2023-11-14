import { StorybookConfig } from "@storybook/react-webpack5";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { argv as parsedArgs } from "yargs";

// Superset's webpack.config.js
//const customConfig = require('../../custom-frontend/webpack.config.js');
import * as customConfig from "../../custom-frontend/webpack.config";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
/*function getAbsolutePath(value: string): "@storybook/react-vite" {
  return dirname(require.resolve(join(value, 'package.json')));
}*/

const STORYBOOK_DIR = path.resolve(__dirname, "./");

const { mode = "development" } = parsedArgs;
const isDevMode = mode !== "production";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*Stories.[tj]sx"],
  addons: [
    "@storybook/addon-knobs",
    "storybook-addon-jsx",
    "@storybook/addon-actions",
    "@storybook/addon-links",

    /*    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',*/
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...customConfig.module.rules,
        {
          test: /\.css$/,
          include: [`${STORYBOOK_DIR}/.storybook`, `${STORYBOOK_DIR}/src`],
          use: [
            isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
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
  /*  docs: {
    autodocs: 'tag',
  },*/
  typescript: {
    skipBabel: true,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      propFilter: () => true,
    },
  },
};
export default config;
