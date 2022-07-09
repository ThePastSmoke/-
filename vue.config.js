const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  // 设置标题
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "黑马头条";
      return args;
    });
  },
  configureWebpack: {
    devServer: {
      host: "localhost",
      port: 3333,
    },
  },
  // 修改vant组件主体
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 可以自定义一个样式文件去覆原来的文件
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(
              __dirname,
              "src/style/theme.less"
            )}";`,
          },
        },
      },
    },
  },
});
