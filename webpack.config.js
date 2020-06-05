const path =  require('path');


const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = [
  {
    entry: ["./src/style/app.scss", "./src/app.ts"],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: "bundle.js"
    },
    devServer: {
      writeToDisk: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "bundle.css",
              },
            },
            { loader: "extract-loader" },
            { loader: "css-loader" },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer()],
              },
            },
            {
              loader: "sass-loader",
              options: {
                // Prefer Dart Sass
                implementation: require("sass"),

                webpackImporter: false,
                sassOptions: {
                  includePaths: ["./node_modules"],
                },
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/,
          loader: "babel-loader",
          query: {
            presets: ["@babel/preset-env"],
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
  }
];
