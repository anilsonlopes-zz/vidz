importScripts('/vidz/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/vidz/_nuxt/03abd4407b23325db9ed.js",
    "revision": "b2e635cca2a1b2e9121835049c786f66"
  },
  {
    "url": "/vidz/_nuxt/1173a2c4bdb57431bb62.js",
    "revision": "bc533f10ff18920c3931a96aae49021a"
  },
  {
    "url": "/vidz/_nuxt/122bb06dbef33ce6befa.js",
    "revision": "160583e14f176bd563a1f98aba38b814"
  },
  {
    "url": "/vidz/_nuxt/1421d573d15bf24ad263.js",
    "revision": "30c3f22f146a42beefa9606c6008668e"
  },
  {
    "url": "/vidz/_nuxt/149e06aaa1e9de7fd323.js",
    "revision": "322fa0a2c2638c7f0211fd67094c795d"
  },
  {
    "url": "/vidz/_nuxt/2a3067309e1bc84ab827.js",
    "revision": "34063db2f497d2d06e73182da805c9e6"
  },
  {
    "url": "/vidz/_nuxt/2bbe49568e119e792be6.js",
    "revision": "2c18d499e87a85214d55f655dcd62042"
  },
  {
    "url": "/vidz/_nuxt/59913fda1963ead2fea9.js",
    "revision": "1ae025b147e4079353f3c8ef5947c136"
  },
  {
    "url": "/vidz/_nuxt/6afbbfaea009351072a8.js",
    "revision": "3e9804fac45bd63e8c2afc06daf0fa38"
  },
  {
    "url": "/vidz/_nuxt/936a25e2d7b614685e26.js",
    "revision": "6e0c546e609f6a2ea551862863d8c434"
  },
  {
    "url": "/vidz/_nuxt/9ab8f270550037cdaac8.js",
    "revision": "236809217bddd5eb70d96f0cfcba280a"
  },
  {
    "url": "/vidz/_nuxt/a7c8c8eed47ad875424b.js",
    "revision": "f33aeaee4b1b52dd87bf206889a7b39c"
  },
  {
    "url": "/vidz/_nuxt/a8557643f2584014dc9b.js",
    "revision": "ea67a2888edb641cad6441ab3c736146"
  },
  {
    "url": "/vidz/_nuxt/a8798074ad7dfa547de1.js",
    "revision": "52c4564014cf19af7c4cae6bd314b897"
  },
  {
    "url": "/vidz/_nuxt/b01efba7b0842db9cbd0.js",
    "revision": "00d85ec7a49846faff963d3c8ea859c7"
  },
  {
    "url": "/vidz/_nuxt/bb718ae995036a4a9d3d.js",
    "revision": "d47dd2e9bc1fa28b563a75199ccc0586"
  },
  {
    "url": "/vidz/_nuxt/c755cde6ec07ff7c3739.js",
    "revision": "6b8b352bcec89574990b27fcf947cade"
  },
  {
    "url": "/vidz/_nuxt/c757e725d5107385d5ec.js",
    "revision": "ab846022b8afcd774d043802b94bb723"
  },
  {
    "url": "/vidz/_nuxt/db7ca866aab26916eea7.js",
    "revision": "137108d155bde1d7759fbffb94f55300"
  },
  {
    "url": "/vidz/_nuxt/e4881464d0494a4417b8.js",
    "revision": "f134213195410e0df3445099111b6d07"
  },
  {
    "url": "/vidz/_nuxt/f77b775a948e02b786f3.js",
    "revision": "6c76b0f830cc5cecee2a8ad62f6e6a6e"
  }
], {
  "cacheId": "vidz",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/vidz/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/vidz/.*'), workbox.strategies.networkFirst({}), 'GET')
