import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyD_qajacam-RhG_C1H44J06xo6sfUbgZa8',
  authDomain: 'quila-dev.firebaseapp.com',
  databaseURL: 'https://quila-dev.firebaseio.com',
  projectId: 'quila-dev',
  storageBucket: 'quila-dev.appspot.com',
  messagingSenderId: '898205392296'
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
