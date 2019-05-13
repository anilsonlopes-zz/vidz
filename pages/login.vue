<template>
  <form class="relative min-h-screen overflow-hidden flex flex-col items-center z-0 justify-center bg-grey bg-cover px-5" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1493997575474-58d1db687da3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }" @submit="submitForm">
    <div class="absolute pin-t pin-r pin-b pin-l bg-black opacity-75 z-0" />
    <div class="flex justify-center items-center flex-col animated fadeIn p-10 w-full max-w-xs bg-grey-light rounded z-10 shadow border">
      <div class="w-32 h-32 bg-white rounded mb-10">
        <div
          v-if="user.avatar"
          class="w-32 h-32 rounded shadow-lg bg-cover"
          :style="{ backgroundImage: `url(${user.avatar})` }"
          :aria-label="user.username"
        />
      </div>
      <div class="w-full">
        <label for="form-email" :class="classLabel">E-mail</label>
        <input
          id="form-email"
          v-model="user.email"
          :class="classInput"
          type="email"
          spellcheck="false"
          required
        >
      </div>
      <div class="w-full mt-5 relative">
        <label for="form-password" :class="classLabel">Senha</label>
        <input
          id="form-password"
          ref="password"
          v-model="user.password"
          class="pr-8"
          :class="classInput"
          :type="showPassword ? 'text' : 'password'"
          required
        >
        <button class="absolute pin-t pin-r pin-b mt-4 mr-1 px-2 text-sm text-grey-dark flex items-center focus:outline-none" type="button" @click="toggleShowPassword">
          <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" />
        </button>
      </div>
      <div class="mt-5 w-full">
        <button type="button" class="text-sm" @click="recover">
          Recuperar conta
        </button>
      </div>
    </div>
    <div class="w-full flex items-center justify-between max-w-xs mt-3 z-10 rounded shadow bg-grey-lighter p-5">
      <nuxt-link :to="{ name: 'criar-conta' }" class="group inline-block font-bold text-sm text-blue hover:text-black transition no-underline">
        Não tem conta?
        <span class="block text-xs text-grey-darker mt-1 group-hover:text-black">Crie para fazer login</span>
      </nuxt-link>
      <button v-if="!loading" class="transition no-underline select-none shadow bg-grey-darker hover:bg-black focus:outline-none text-white text-sm py-2 px-4 rounded" type="submit">
        Entrar
      </button>
      <button v-else class="no-underline select-none pointer-events-none shadow bg-grey-darker text-white text-sm py-2 px-4 rounded" type="submit">
        <i class="fa fa-spinner fa-spin" />
      </button>
    </div>
  </form>
</template>

<script>
import firebase from '~/services/firebase'

export default {
  layout: 'auth',
  head: {
    title: 'Entrar'
  },
  data: () => ({
    showPassword: false,
    classLabel: 'mb-1 block text-grey-darker text-xs',
    classInput: 'appearance-none focus:outline-none transition focus:shadow-lg w-full rounded py-2 px-3 text-sm text-grey-dark',
    user: {
      email: '',
      password: '',
      avatar: ''
    },
    loading: false
  }),
  watch: {
    'user.email'(email) {
      if (email.indexOf('@')) {
        firebase.firestore().collection('users').where('email', '==', email).get().then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const docs = []
            querySnapshot.forEach(function (doc) {
              docs.push(doc.data())
            })
            this.user.avatar = docs[0].photoURL
          }
        })
      }
    }
  },
  methods: {
    submitForm() {
      event.preventDefault()
      this.loading = true
      const { email, password } = this.user
      this.$store.dispatch('login', { email, password }).then(() => {
        this.$store.commit('notification', { type: 'info', message: 'Conectado!' })
        this.$router.push({ name: 'index' })
        this.loading = false
      }).catch((error) => {
        this.loading = false
        this.$store.commit('notification', { type: 'error', message: error.message })
      })
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
      this.$refs.password.focus()
    },
    recover() {
      if (!this.user.email) {
        this.$store.commit('notification', { type: 'warning', message: 'Informe o email usado no cadastro' })
        return false
      }
      this.$store.dispatch('resetPassword', this.user.email).then(() => {
        this.$store.commit('notification', { type: 'info', message: 'Email de redefinição enviado' })
      }).catch((error) => {
        this.$store.commit('notification', { type: 'error', message: error.message })
      })
    }
  }
}
</script>
