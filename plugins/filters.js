import Vue from 'vue'

export const truncate = (val, max = 2) => typeof val === 'string' ? val.length > max ? `${val.substr(0, max + 3)}...` : val : ''
export const capitalizeMapToString = val => Object.keys(val).map(key => key.charAt(0).toUpperCase() + key.slice(1))
export const capitalize = val => typeof val === 'string' ? val.charAt(0).toUpperCase() + val.slice(1) : ''
export const parseQuery = query => Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

Vue.filter('truncate', truncate)
Vue.filter('capitalizeMapToString', capitalizeMapToString)
Vue.filter('capitalize', capitalize)
Vue.filter('parseQuery', parseQuery)
