import { auth, db } from '~/services/firebase'

export default (context) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).get().then((doc) => {
        context.store.commit('auth', doc.exists ? doc.data() : null)
      })
    }
  })
}
