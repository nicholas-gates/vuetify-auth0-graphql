const { resolve } = require('path')

module.exports = {
  srcDir: resolve('./src'),
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Deepmole Warrior',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vuetify',
      'apollo-client',
      'vue-apollo',
    ]
  },
  plugins: [
    '~plugins/vuetify.js',
    {
      src: '~plugins/googleCharts.js',
      ssr: false
    },
    {
      src: '~plugins/apollo.js',
      injectAs: 'apolloProvider',
      ssr: false
    },
  ],
  css: [
    { src: '~assets/style/app.styl', lang: 'styl' }
  ],
  /*
  ** Environement variables
  */
  env: {
    AUTH0_CLIENT_ID: '',
    AUTH0_CLIENT_DOMAIN: ''
  }
}
