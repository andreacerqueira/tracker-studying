const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  devServer: {
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    allowedHosts: 'all',
    proxy: {
      // Proxy all API requests to the backend server
      '/api': {
        target: process.env.VUE_APP_PROXY_TARGET,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
});

// module.exports = {
//   devServer: {
//     host: process.env.VUE_APP_HOST,
//     port: process.env.VUE_APP_PORT,
//     allowedHosts: 'all',
//     proxy: {
//       // Proxy all API requests to the backend server
//       '/api': {
//         target: process.env.VUE_APP_PROXY_TARGET,
//         changeOrigin: true
//       },
//       // Proxy all WebSocket requests - for real-time (hot-reload) notifications or data streaming
//       '/ws': {
//         target: process.env.VUE_APP_WS_TARGET,
//         ws: true,
//         changeOrigin: true
//       }
//     }
//   },
//   transpileDependencies: true
// };
