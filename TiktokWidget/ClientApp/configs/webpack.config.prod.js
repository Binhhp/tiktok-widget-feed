var path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src/views/Layout/index.tsx"),
  build: path.join(__dirname, "../../wwwroot/"),
  tsConfig: path.join(__dirname, "../tsconfig.json"),
};

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "inline-source-map",
  entry: {
    tiktok: PATHS.src,
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    alias: {
      src: path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(tsx|ts)?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|woff(2)?|ttf|png|gif|svg)$/i,
        loader: "file-loader?name=/public/[name].[ext]",
      },
      {
        test: /\.(sass|less|css)$/,
        loader: ["style-loader", "css-loader", "less-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    chunkIds: "named",
    concatenateModules: true,
    flagIncludedChunks: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
      }),
      new TerserPlugin({
        minify: TerserPlugin.terserMinify,
      }),
      new UglifyJsPlugin({
        extractComments: false,
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    moduleIds: false,
    portableRecords: true,
    removeAvailableModules: true,
  },
  plugins: [new UglifyJsPlugin(), new TerserPlugin()],
};
