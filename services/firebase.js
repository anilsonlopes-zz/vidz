import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDwS7AauAFYQBZRAYm32aQzSWD-4jVt2-E',
  authDomain: 'quila-dev.firebaseapp.com',
  databaseURL: 'https://quila-dev.firebaseio.com',
  projectId: 'quila-dev',
  storageBucket: 'quila-dev.appspot.com',
  messagingSenderId: '898205392296',
  appId: '1:898205392296:web:2c93c81b6cc393d09e919d',
  measurementId: 'G-RB5RWGXPDR'
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

firebase.auth().useDeviceLanguage()

export const db = firebase.firestore()
export const auth = firebase.auth()
export const parseData = (query) => {
  const arr = []
  query.forEach((doc) => {
    arr.push(doc.data())
  })
  return arr
}
export default firebase
