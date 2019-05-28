import firebase from '~/services/firebase'

// TODO: Pseudo-camada de autenticação das páginas
const protect = (name) => {
  const allow = [
    'login',
    'criar-conta'
  ]
  return !allow.includes(name)
}

export default function ({ store, route, redirect }) {
  if (protect(route.name)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        return redirect(401, '/login')
      }
      store.dispatch('authenticated', user.uid)
    })
  }
}
