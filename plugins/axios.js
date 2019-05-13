import keys from '~/secret.json'

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    if (config.url.indexOf('omdbapi') > -1 && config.url.indexOf('apikey') === -1) {
      config.url += `&apikey=${keys.omdbKey}`
    }
    return config
  })
}
