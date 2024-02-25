// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require("path");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  const publicPath = (process.env.PUBLIC_URL ?? '') + transformer.publicPath

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    publicPath: publicPath,
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName?.startsWith('./flutter/')) {
        return {
          filePath: path.resolve(__dirname + "/src/shim-module.js"),
          type: "sourceFile"
        };
      }
      return context.resolveRequest(context, moduleName, platform);
    }
  };

  return config;
})();
