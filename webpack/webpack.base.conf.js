/* eslint-disable */
var layaLoader = require('../src/layaPreLoad');
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var phaserModule = path.join(projectRoot, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js');

module.exports = {
  entry: {
    app: './src/index.ts'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'phaser': phaser,
      'pixi': pixi
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\LayaComponent.ts$/,
        loader: "laya-loader"
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: "tslint"
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /pixi\.js/, 
        loader: 'expose?PIXI'
      },
      { 
        test: /phaser-split\.js$/,
        loader: 'expose?Phaser' 
      },
      { 
        test: /p2\.js/, 
        loader: 'expose?p2'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  tslint: {
    configuration: {
      rules: {
        "member-ordering": [true, { "order": [
          "public-static-field",
          "protected-static-field",
          "private-static-field",
          "public-instance-field",
          "protected-instance-field",
          "private-instance-field",
          "constructor",
          "public-static-method",
          "protected-static-method",
          "private-static-method",
          "public-instance-method",
          "protected-instance-method",
          "private-instance-method"
        ]}],
        "switch-default": true,
        "variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore"],
        "quotemark": [true, "single", "avoid-escape"],
        "one-variable-per-declaration": [true, "ignore-for-loop"],
        "no-consecutive-blank-lines": true,
        "new-parens": true,
        "comment-format": [true, "check-space"],
        "class-name": true,
        "curly": true,
        "eofline": true,
        "indent": [true, "spaces", 4],
        "label-position": true,
        "label-undefined": true,
        "no-arg": true,
        "no-bitwise": true,
        "no-console": [true,
          "debug",
          "info",
          "time",
          "timeEnd",
          "trace"
        ],
        "no-construct": true,
        "no-debugger": false,
        "no-duplicate-key": true,
        "no-duplicate-variable": true,
        "no-empty": true,
        "no-eval": true,
        "no-string-literal": false,
        "no-trailing-whitespace": true,
        "no-unused-variable": true,
        "no-unreachable": true,
        "no-use-before-declare": true,
        "one-line": [true,
          "check-open-brace",
          "check-catch",
          "check-else",
          "check-whitespace"
        ],
        "radix": true,
        "semicolon": [true, "always", "ignore-interfaces"],
        "align": [true, "statements"],
        "triple-equals": [true],
        "whitespace": [true,
          "check-branch",
          "check-decl",
          "check-operator",
          "check-separator",
          "check-branch",
          "check-module",
          "check-type"
        ]
      }
    }, 
    // tslint errors are displayed by default as warnings
    // set emitErrors to true to display them as errors
    emitErrors: true, 
    // tslint does not interrupt the compilation by default
    // if you want any file with tslint errors to fail
    // set failOnHint to true
    failOnHint: true
  }
}
