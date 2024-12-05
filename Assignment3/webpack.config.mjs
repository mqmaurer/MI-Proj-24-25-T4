import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin'; // Für Minifizierung

const __dirname = path.resolve();

// Exportiere die Konfiguration als Default
export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {

    entry: './src/app.js',

    // Ausgabe
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : 'bundle.js', // Hash für Produktion, verhindert Verwechslung von alten Dateien aus dem Cache
      clean: true, // löscht dist vor jedem Build
    },

    // Modus
    mode: isProduction ? 'production' : 'development',

    // Module und Loader
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
        template: './src/index.html', // HTML-Datei
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' }, // Kopiert alle Dateien aus src nach dist
        ],
      }),
      new ESLintPlugin({
        configType: 'flat',
        extensions: ['js'],
        fix: true,
        files: ["src/**/*.js"], // Lintet alle JavaScript-Dateien im src-Ordner
        failOnError: isProduction, // Lässt den Build im Fehlerfall scheitern, wenn es sich um Produktion handelt
        overrideConfigFile: './eslint.config.mjs',
      }),
    ],

    // Entwicklungs-Tools
    devtool: isProduction ? 'source-map' : 'eval-source-map',

    // Webpack Dev Server Konfiguration für Entwicklung
    devServer: isProduction
      ? {} // Keine spezielle Dev-Server-Konfiguration für Produktion
      : {
        static: path.resolve(__dirname, 'dist'), //  Dateien aus dem dist-Ordner
        port: 3000, // Lokaler Server läuft auf Port 3000
        open: true, // Öffnet automatisch den Browser
        hot: true, // Aktiviert Hot Module Replacement (HMR)
        liveReload: true, // Aktiviert Live Reloading
      },

    // Optimierungen für Produktion
    optimization: isProduction
      ? {
        minimize: true,
        minimizer: [
          new TerserPlugin(), // Minifiziert JavaScript
        ],
      }
      : {},
  };
};
