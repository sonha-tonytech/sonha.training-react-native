const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    extraNodeModules: {
      shared: path.resolve(__dirname, 'shared'),
      src: path.resolve(__dirname, 'src'),
    },
  },
  watchFolders: [
    path.resolve(__dirname, 'shared'),
    path.resolve(__dirname, 'src'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
