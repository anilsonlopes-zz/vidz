import firebase from '~/services/firebase'
import User from '~/models/User.js'

export function register({ commit }, userInput) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(userInput.email, userInput.password).then((response) => {
      const user = new User({
        uid: response.user.uid,
        username: userInput.name.split(' ')[0].toLowerCase(),
        name: userInput.name,
        email: userInput.email,
        avatar: userInput.avatar,
        createdAt: new Date()
      })
      return firebase.firestore().collection('users').doc(user.data.uid).set(user.data).then(() => {
        commit('auth', user.data)
        resolve(user.data)
      }).catch(e => reject(e))
    }).catch(e => reject(e))
  })
}

export function login({ commit }, userInput) {
  return new Promise((resolve, reject) => {
    const { email, password } = userInput
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      return firebase.firestore().collection('users').doc(response.user.uid).get().then((doc) => {
        const userData = doc.exists ? doc.data() : null
        commit('auth', userData)
        resolve(userData)
      }).catch(e => reject(e))
    }).catch(e => reject(e))
  })
}

export function logout({ commit }) {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(function () {
      commit('auth', null)
      resolve()
    }).catch(e => reject(e))
  })
}

export function resetPassword({ commit }, email) {
  return new Promise((resolve, reject) => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      resolve()
    }).catch(e => reject(e))
  })
}

export function auth({ commit }, uid) {
  return new Promise((resolve, reject) => {
    try {
      firebase.firestore().collection('users').doc(uid).onSnapshot((doc) => {
        const userData = doc.exists ? doc.data() : null
        commit('auth', userData)
        resolve(userData)
      })
    } catch (error) {
      reject(error)
    }
  })
}
