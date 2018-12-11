const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: {
    "template-one": path.resolve(__dirname, "src/template-one/index.js"),
    "template-two": path.resolve(__dirname, "src/template-two/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.vue$/,
        use: [{ loader: "vue-loader" }]
      },
      {
        test: /\.jsx$/,
        use: [{ loader: "babel-loader" }]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".vue"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isProduction ? '"production"' : '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      filename: "template-one.html",
      template: path.resolve(__dirname, "src/template-one/index.html"),
      title: "template-one",
      chunks: ["template-one", "vendor"],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: "template-two.html",
      template: path.resolve(__dirname, "src/template-two/index.html"),
      title: "template-two",
      chunks: ["template-two", "vendor"],
      inject: true
    }),
    new VueLoaderPlugin()
  ]
};

if (!isProduction) {
  config.mode = "development";
  config.devtool = "#cheap-module-eval-source-map";
  config.devServer = {
    port: 8000,
    host: "0.0.0.0",
    overlay: {
      errors: true
    },
    hot: true,
    compress: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.mode = "production";
  config.entry = {
    "template-one": path.resolve(__dirname, "src/template-one/index.js"),
    "template-two": path.resolve(__dirname, "src/template-two/index.js"),
    vendor: ["vue"]
  };

  config.output.filename = "[name].[chunkhash:8].js";
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  };
}

module.exports = config;
