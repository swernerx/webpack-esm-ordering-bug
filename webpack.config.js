const path = require("path");
const fs = require("fs-extra");

const serverDirectory = "build/server";

module.exports = () => {
    let externals = {};
    fs.readdirSync(path.resolve(__dirname, "node_modules")).filter(function(x) {
        return [".bin"].indexOf(x) === -1;
    }).forEach(function(mod) {
        externals[mod] = "commonjs " + mod;
    });

    return {
        mode: "development",
        name: "server",
        entry: [
            "./src/@server/index.js"
        ],
        output: {
            libraryTarget: "commonjs2",
            path: path.resolve(__dirname, serverDirectory),
            filename: "app.js",
            publicPath: "/"
        },
        target: "node",
        node: {
            __filename: true,
            __dirname: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: false,
                            babelrc: false,
                            presets: [
                                ["@babel/preset-env", {
                                    targets: {
                                        node: "current"
                                    },
                                    useBuiltIns: "usage",
                                    modules: false,
                                    loose: true
                                }],
                                "@babel/preset-react"
                            ]
                        }
                    }]
                }
            ]
        },
        resolve: {
            alias: {
                "ENVIRONMENT_TYPE": "./@server",
                "DEVICE_TYPE": "./@" + process.env.DEVICE_TYPE
            }
        },
        devtool: "source-map",
        externals: externals
    };
};
