const path = require('path')
const VueComponentsIndex = require('./src/utils/vue-cli-plugin-componentsIndex/webpack-plugin-vueComponentsIndex')

module.exports = {
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: (config) => {
    // configure vue-svg-loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
    // configure style-resource-loader
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    function addStyleResource (rule) {
      rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, './src/assets/styles/index.scss'),
          ],
        })
    }
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  configureWebpack: {
    plugins: [new VueComponentsIndex({
      rules: {
        './src/components': ['.vue'],
        './src/assets': [ 'index.js'],
        './src/assets/icons/svg': ['.svg']
      },
      debug: false
    })],
    devtool: 'source-map'
  }
};