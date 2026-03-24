module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import com.reactnativealioss.AliOssPackage;',
        packageInstance: 'new AliOssPackage()',
      },
      ios: {
        podspecPath: './react-native-alioss.podspec',
      },
    },
  },
};
