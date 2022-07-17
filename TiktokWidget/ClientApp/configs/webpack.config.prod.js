var path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

const PATHS = {
  src: path.join(__dirname, "../src/views/Layout/index.tsx"),
  build: path.join(__dirname, "../../wwwroot/"),
  tsConfig: path.join(__dirname, "../tsconfig.json"),
};

const config = {
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
};

if (isProd) {
  config.optimization = {
    chunkIds: "named",
    concatenateModules: true,
    flagIncludedChunks: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
    moduleIds: false,
    portableRecords: true,
    removeAvailableModules: true,
  };
} else {
  config.devServer = {
    port: 9000,
    open: true,
    hot: true,
    compress: true,
    stats: "errors-only",
    overlay: true,
  };
}

module.exports = config;
