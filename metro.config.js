const {getDefaultConfig} = require('@react-native/metro-config');
const MetroConfig = require('@ui-kitten/metro-config');

const evaConfig = {
  evaPackage: '@eva-design/eva',
};

module.exports = MetroConfig.create(evaConfig, getDefaultConfig(__dirname));
