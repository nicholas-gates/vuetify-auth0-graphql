importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/app.41fb63f97e7bcaab5bd8.js",
    "revision": "8efba0f1b178ba93fa4760b1fa753df4"
  },
  {
    "url": "/_nuxt/common.1df855041760e9f25cec.js",
    "revision": "c5949eef1aba3e0fd6866e3a0b257ad8"
  },
  {
    "url": "/_nuxt/layouts/default.f11c80fd9ba9255a60c2.js",
    "revision": "d8b118c45fe5ac4681040d3cfc25d743"
  },
  {
    "url": "/_nuxt/manifest.f5ba58ff26d25d6e85e3.js",
    "revision": "71edbeba08e623ac631d75ba23b0e5dd"
  },
  {
    "url": "/_nuxt/pages/auth/createUser.3fad9db7fe0915b15b92.js",
    "revision": "c95303c75cf6ca7cc0a4118225aa7920"
  },
  {
    "url": "/_nuxt/pages/auth/sign-in.35aca56097ffbbb8b90a.js",
    "revision": "7937a7d7adb88df9fa034fc06ae52659"
  },
  {
    "url": "/_nuxt/pages/auth/sign-off.61eb34aab54a5ae92cae.js",
    "revision": "e14a0c813735fc881e4702f0e32de272"
  },
  {
    "url": "/_nuxt/pages/auth/signed-in.641a4d0c1165b0c73765.js",
    "revision": "d4e986838f80673d102b1eac60a6896a"
  },
  {
    "url": "/_nuxt/pages/charts.09cc0122ea5a000e1ed4.js",
    "revision": "19671666dc15feb8d38035a388b3554f"
  },
  {
    "url": "/_nuxt/pages/graphql.f94ad338f0be6b08246c.js",
    "revision": "617f5a955db7c619661e0c8abaeb9507"
  },
  {
    "url": "/_nuxt/pages/index.e2da72f298e83c04ed88.js",
    "revision": "8a8661cc8112adaae3a035c5909c8668"
  },
  {
    "url": "/_nuxt/pages/inspire.8986b56190ef5054dd8f.js",
    "revision": "190d06dc0838d68835122ce3856c6e2c"
  },
  {
    "url": "/_nuxt/pages/inspire/child.10562d7698d638d08b3b.js",
    "revision": "d742ed3dd3620ab30988aa5e81376951"
  },
  {
    "url": "/_nuxt/pages/login.56e63dea24c6b7607d09.js",
    "revision": "f4a17cf700e806bc66b386e225b883db"
  },
  {
    "url": "/_nuxt/pages/responsiveChart.042e59f927a23c131ac4.js",
    "revision": "05456ad2405c687a13d63d52551505a4"
  },
  {
    "url": "/_nuxt/pages/secret.ca225464a404ab0ad56a.js",
    "revision": "a5d300b294d11ca0288d33dda7ec08cb"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "vuetify2_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
