const path = require("path");

module.exports = {
  name: "practice",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".jsx", ".js", ".css"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  entry: {
    app: ["./client"],
  },

  module: {
    rules: [
      {
        test: [/\.jsx?/],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["react-hot-loader/babel"],
        },
      },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist",
  },
};
