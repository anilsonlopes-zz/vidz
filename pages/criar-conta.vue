<template>
  <form class="min-h-screen overflow-hidden flex flex-col items-center justify-center bg-grey bg-cover px-5" :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1493997575474-58d1db687da3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)' }" @submit="submitForm">
    <div class="absolute pin-t pin-r pin-b pin-l bg-black opacity-75 z-0" />
    <div class="flex items-center flex-col md:flex-row animated fadeIn p-4 w-full max-w-md bg-grey-light rounded shadow border z-10">
      <div class="relative md:mr-5">
        <div
          v-if="user.data.avatar"
          class="w-32 h-32 rounded shadow-lg bg-cover"
          :style="{ backgroundImage: `url(${user.data.avatar})` }"
          :aria-label="user.data.name"
        />
        <button class="absolute pin-l pin-t bg-grey-light p-2 text-xs text-grey-dark flex items-center focus:outline-none" type="button" @click="randomizeAvatar">
          <i class="fa fa-random" />
        </button>
      </div>
      <div class="w-full mt-4 md:mt-0">
        <div>
          <label for="form-name" :class="classLabel">Nome</label>
          <input
            id="form-name"
            v-model="user.data.name"
            :class="classInput"
            type="text"
            spellcheck="false"
            required
          >
        </div>
        <div class="md:flex mt-4">
          <div class="md:w-1/2">
            <label for="form-email" :class="classLabel">E-mail</label>
            <input
              id="form-email"
              ref="nickname"
              v-model.lazy="user.data.email"
              :class="classInput"
              type="email"
              spellcheck="false"
              required
            >
            <p v-if="emailError" class="text-red text-xs italic mt-2">
              E-mail em uso
            </p>
          </div>
          <div class="md:w-1/2 md:ml-4 mt-4 md:mt-0 relative">
            <label for="form-password" :class="classLabel">Senha</label>
            <input
              id="form-password"
              ref="password"
              v-model="user.data.password"
              class="pr-8"
              :class="classInput"
              :type="showPassword ? 'text' : 'password'"
              required
            >
            <button class="absolute pin-t pin-r pin-b mt-4 mr-1 px-2 text-sm text-grey-dark flex items-center focus:outline-none" type="button" @click="toggleShowPassword">
              <i class="fa" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex items-center justify-between max-w-md mt-4 bg-grey-lighter p-5 rounded shadow z-10">
      <nuxt-link :to="{ name: 'login' }" class="group inline-block font-bold text-sm text-blue hover:text-black transition no-underline">
        Já tem conta?
        <span class="block text-xs text-grey-darker mt-1 group-hover:text-black">Faça login</span>
      </nuxt-link>
      <button v-if="!loading" class="transition select-none shadow bg-grey-darker hover:bg-black focus:outline-none text-white py-2 text-sm px-4 rounded" type="submit">
        Criar conta
      </button>
      <button v-else class="no-underline select-none pointer-events-none shadow bg-grey-darker text-white text-sm py-2 px-4 rounded" type="submit">
        <i class="fa fa-spinner fa-spin" />
      </button>
    </div>
  </form>
</template>

<script>
import User from '@/models/User.js'
import faker from 'faker'

export default {
  layout: 'auth',
  head: {
    title: 'Criar conta'
  },
  data: () => ({
    emailError: false,
    showPassword: false,
    classLabel: 'mb-1 block text-grey-darker text-xs',
    classInput: 'appearance-none focus:outline-none transition focus:shadow-lg w-full rounded py-2 px-3 text-sm text-grey-dark',
    user: new User(),
    loading: false
  }),
  methods: {
    submitForm() {
      event.preventDefault()
      this.loading = true
      this.$store.dispatch('register', this.user.data).then((user) => {
        this.loading = false
        this.$store.commit('notification', { type: 'info', message: `Bem vindo ${user.name.split(' ')[0]} ⚡` })
        this.$router.push({ name: 'index' })
      }).catch((error) => {
        this.loading = false
        this.$store.commit('notification', { type: 'error', message: error.message })
      })
    },
    randomizeAvatar() {
      this.user.data.avatar = faker.image.avatar()
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
      this.$refs.password.focus()
    }
  }
}
</script>
