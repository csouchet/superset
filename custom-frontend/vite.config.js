import { defineConfig } from 'vite';
import path from "node:path";
import react from '@vitejs/plugin-react';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import Checker from 'vite-plugin-checker';




const CUSTOM_FRONTEND_DIR = path.resolve(__dirname, './');
const ORIGINAL_FRONTEND_DIR = path.resolve(__dirname, '../superset-frontend/');

// output dir
const BUILD_DIR = path.resolve(__dirname, '../superset/static/assets');
const ROOT_DIR = path.resolve(__dirname, '..');

const ASSET_BASE_URL = process.env.ASSET_BASE_URL || '';

export default defineConfig(({ mode }) => {
    // create the environment variable for configuration in the postcss config
    process.env['NODE_ENV'] = mode;

    const isDevMode = (mode !== 'production');

    return {
        root: ROOT_DIR, // Specify the root directory of your project
        base: `${ASSET_BASE_URL}/static/assets/`,
        server: {
            port: 9000,
            proxy: {
                '/': {
                    target: 'http://localhost:8088',
                    changeOrigin: true,
                },
            },
        },
        build: {
            outDir: BUILD_DIR,
            assetsDir: path.join(ORIGINAL_FRONTEND_DIR, '/static/assets'),
            manifest: true,
            rollupOptions: {
                input:{
                    preamble: path.join(ORIGINAL_FRONTEND_DIR, '/src/preamble.ts'),
                    theme: path.join(ORIGINAL_FRONTEND_DIR, '/src/theme.ts'),
                    menu: path.join(CUSTOM_FRONTEND_DIR, 'src/views/menu.tsx'),
                    spa: path.join(CUSTOM_FRONTEND_DIR, 'src/views/index.tsx'),
                    embedded: path.join(CUSTOM_FRONTEND_DIR, 'src/embedded/index.tsx'),
                    sqllab: path.join(CUSTOM_FRONTEND_DIR, 'src/SqlLab/index.tsx'),
                    profile: path.join(CUSTOM_FRONTEND_DIR, 'src/profile/index.tsx'),
                    showSavedQuery: path.join(ORIGINAL_FRONTEND_DIR, '/src/showSavedQuery/index.jsx'),
                },
                output: {
                    entryFileNames: isDevMode ? '[name].[hash].entry.js' : '[name].[hash].entry.js',
                    chunkFileNames: isDevMode ? '[name].[hash].chunk.js' : '[name].[hash].chunk.js',
                    assetFileNames: isDevMode ? '[name].[hash].[ext]' : '[name].[hash].[ext]',
                },
            },
            chunkSizeWarningLimit: 838,
            plugins: [resolve({
                modulePaths: [path.resolve(CUSTOM_FRONTEND_DIR, './node_modules'), ORIGINAL_FRONTEND_DIR, CUSTOM_FRONTEND_DIR],
                //moduleDirectories: ['node_modules'],
            }),
                copy({
                    targets: [
                        { src: `${ORIGINAL_FRONTEND_DIR}/src/assets/images`, dest: `${BUILD_DIR}/images` },
                        { src: `${ORIGINAL_FRONTEND_DIR}/src/assets/stylesheets`, dest: `${BUILD_DIR}/stylesheets` },
                    ],
                }),]
        },
        plugins: [
            //{ enforce: 'pre', ...mdx() },
            react({
                include: /\.(mdx|js|jsx|ts|tsx)$/,
               // jsxImportSource: '@emotion/react',
                babel: {
                    // Use babel.config.js files
                    configFile: true,
                }
            }),
     /*       Checker({
              typescript: { root : CUSTOM_FRONTEND_DIR},
              eslint: {
                lintCommand: 'eslint -c ./superset-frontend/.eslintrc.js --ignore-path=./superset-frontend/.eslintignore --ext .js,.jsx,.ts,tsx ./plugins/!**',
                dev: {
                  overrideConfig: {
                    // Add your ESLint configuration here if needed
                  },
                  logLevel: ['error', 'warning'],
                },
              },
            }),*/
        ],
        resolve : {
            process: 'process/browser.js',
            '@superset-ui': path.resolve(CUSTOM_FRONTEND_DIR, './node_modules/@superset-ui'),

        },
        define: {
            'process.env.REDUX_DEFAULT_MIDDLEWARE': JSON.stringify(process.env.REDUX_DEFAULT_MIDDLEWARE),
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'root-entry-name': 'default',
                    },
                },
            },
        },
    };
});
