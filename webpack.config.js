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
                            presets: [
                                ["@babel/preset-env", {
                                    targets: {
                                        node: "current"
                                    }
                                }]
                            ]
                        }
                    }]
                }
            ]
        },
        devtool: "source-map",
        externals: externals
    };
};
