const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'pt-br'
    },
    title: pkg.name,
    titleTemplate: '%s - ' + pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Fira+Mono:400,500' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3490DC' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/tailwind.css',
    'animate.css/animate.min.css',
    'vue-plyr/dist/vue-plyr.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/filters.js',
    '~/plugins/axios.js',
    '~/plugins/fire.js',
    '~/plugins/analytics.js',
    '~/plugins/plyr.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/font-awesome'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options,
    prefix: 'teste'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/' + pkg.name + '/' : '',
    middleware: ['auth']
  }
}
