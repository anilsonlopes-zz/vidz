import firebase from '~/services/firebase'

export default (context) => {
  context.firebase = firebase
  context.firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get().then((doc) => {
        context.store.commit('auth', doc.exists ? doc.data() : null)
      })
    }
  })
}
