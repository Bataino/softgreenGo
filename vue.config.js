module.exports = {
  configureWebpack: {
    externals: {
      Vue: "vue"
    }
  },
  pwa: {
    manifestOptions: {
      name: "Softgreen GO",
      short_name: "Softgreen GO",
      start_url: "./",
      display: "standalone",
      theme_color: "#000000",
      icons: [
        {
          src: "img/icons/favicon-32x32.png",
          sizes: "512x512",
          // type: "image/svg+xml",
          purpose: "any maskable",
        }, , ,
      ],
    },
    workboxOptions: {
      skipWaiting: true
    },
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    iconPaths: {
      maskicon: null,
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: null,
      msTileImage: null,
    },
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
  },
};