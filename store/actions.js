import { auth, db, parseData } from '~/services/firebase'
import User from '~/models/User.js'

export function register({ commit }, userInput) {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(userInput.email, userInput.password).then((response) => {
      const user = new User({
        uid: response.user.uid,
        username: userInput.name.split(' ')[0].toLowerCase(),
        name: userInput.name,
        email: userInput.email,
        avatar: userInput.avatar,
        createdAt: new Date()
      })
      return db.collection('users').doc(user.data.uid).set(user.data).then(() => {
        commit('auth', user.data)
        resolve(user.data)
      }).catch(e => reject(e))
    }).catch(e => reject(e))
  })
}

export function login({ commit }, userInput) {
  return new Promise((resolve, reject) => {
    const { email, password } = userInput
    auth.signInWithEmailAndPassword(email, password).then((response) => {
      return db.collection('users').doc(response.user.uid).get().then((doc) => {
        const userData = doc.exists ? doc.data() : null
        commit('auth', userData)
        resolve(userData)
      }).catch(e => reject(e))
    }).catch(e => reject(e))
  })
}

export function logout({ commit }) {
  return new Promise((resolve, reject) => {
    auth.signOut().then(function () {
      commit('auth', null)
      resolve()
    }).catch(e => reject(e))
  })
}

export function resetPassword({ commit }, email) {
  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email).then(() => {
      resolve()
    }).catch(e => reject(e))
  })
}

export function authenticated({ commit }, uid) {
  return new Promise((resolve, reject) => {
    try {
      db.collection('users').doc(uid).onSnapshot((doc) => {
        const userData = doc.exists ? doc.data() : null
        commit('auth', userData)
        resolve(userData)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function explore({ commit, getters }) {
  return new Promise((resolve, reject) => {
    let ref = db.collection('posts')
    if (getters.exploreText) {
      getters.exploreText.split('').map((letter) => {
        ref = ref.where(`search.title.${letter}`, '==', true)
      })
      ref.get().then((querySnapshot) => {
        const posts = parseData(querySnapshot)
        commit('exploreResult', posts)
        return querySnapshot.empty ? reject(new Error('Empty result')) : resolve()
      })
    }
  })
}
