const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    open: true,
    host: "localhost",
    port: 6666,
  },
});
