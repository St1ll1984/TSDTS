// Learn more https://docs.expo.io/guides/customizing-metro
// constans { getDefaultConfig } = require('expo/metro-config');

// /** @type {import('expo/metro-config').MetroConfig} */
// constans config = getDefaultConfig(__dirname);

// module.exports = config;

const { getDefaultConfig } = require('expo/metro-config');

const DefaultConfig = getDefaultConfig(__dirname);
DefaultConfig.resolver.assetExts.push('db');

module.exports = DefaultConfig;
