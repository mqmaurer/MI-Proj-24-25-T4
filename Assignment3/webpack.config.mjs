import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
 import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin'; // for minimization

const __dirname = path.resolve();

//exports configuration as default
export default (env, argv) => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
  
    entry: './app.js',
    
    // Ausgabe
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js', // Hash for production, so there is no caching problem
      clean: true, // delete dist folder before build
    },

    // Modus
    mode: isProduction ? 'production' : 'development',

    // Module and Loader
    module: {
      rules: [
        {
          test: /\.css$/, 
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/, 
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    stats: {
        children: true,
    },      

    // Plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', 
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' }, //copies from src/assets to dist/assets
        ],
      }),
       new ESLintPlugin({
        configType: 'flat',
        extensions: ['js'],
        fix: true, 
        files: ["src/**/*.js"], // Lintet alle JavaScript-Dateien im src-Ordner
        failOnError: isProduction, // Lässt den Build im Fehlerfall scheitern, wenn es sich um Produktion handelt
       overrideConfigFile: './eslint.config.mjs',}),
    ],

    // Development-Tools
    devtool: isProduction ? 'source-map' : 'eval-source-map', 

    // Webpack Dev Server configuration
    devServer: isProduction
      ? {} //No special configuration for production
      : {
          static: path.resolve(__dirname, 'dist'), // files from dist 
          port: 3000, 
          open: true, 
          hot: true, // Hot module Replacement
          liveReload: true, // activatese live reload 
          client: {
            overlay: true, // shows errors in browser
          },
        },
        

    // Opitmization for Production
    optimization: isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin(), // Minimize JavaScript
          ],
        }
      : {},
  };
};
