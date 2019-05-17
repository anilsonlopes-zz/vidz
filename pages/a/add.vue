<template>
  <div class="flex w-full min-h-screen">
    <div class="w-1/2 max-w-full">
      <div class="p-5 flex items-center">
        <input v-model="imdbID" type="text" @keyup.enter="fetch">
        <button class="py-2 px-4 mx-2 bg-grey-light" type="button" :class="{ 'bg-orange-light pointer-events-none': fetchStatus.indexOf('++') == 0 }" @click="fetch">
          {{ fetchStatus }}
        </button>
        <button class="py-2 px-4 mr-2 bg-grey-light" type="button" :class="{ 'bg-orange-light pointer-events-none': saveStatus.indexOf('++') == 0 }" @click="save">
          {{ saveStatus }}
        </button>
      </div>
      <ul v-if="data && properties">
        <li v-for="(property, index) in properties" :key="index" :class="{ 'mt-2': index > 0 }">
          <span class="uppercase block text-xs text-black font-medium">
            {{ property }}
          </span>
          <span v-if="data[property]" class="block text-sm text-grey-dark">
            {{ data[property] | truncate(150) }}
          </span>
        </li>
      </ul>
    </div>
    <div class="w-1/2 max-w-full bg-red">
      <h3 class="pl-5 py-2">
        Últimos
      </h3>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
          {{ post.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db, parseData } from '~/services/firebase'
import parseGrabData from '~/services/parseGrabData.js'

export default {
  layout: 'admin',
  data: () => ({
    imdbID: '',
    data: null,
    posts: [],
    properties: [],
    fetchStatus: 'fetch',
    saveStatus: 'save'
  }),
  mounted() {
    this.fetchPosts()
  },
  methods: {
    fetch() {
      this.fetchStatus = '++verifing'
      this.verify()
        .then(() => {
          this.fetchStatus = '++fetching'
          this.$axios.$get(`//www.omdbapi.com/?i=${this.imdbID}`).then((data) => {
            if (data.Response === 'False') {
              this.fetchStatus = '++imdb fail'
              this.timeoutChangeProperty('fetchStatus', 'fetch', 3000)
              return false
            }
            this.fetchStatus = '++fetched'
            this.data = parseGrabData(data)
            this.properties = Object.keys(this.data).map(key => key)
            this.timeoutChangeProperty('fetchStatus', 'fetch')
          })
        })
        .catch((error) => {
          this.fetchStatus = `++${error}`
          this.timeoutChangeProperty('fetchStatus', 'fetch')
        })
    },
    save() {
      if (!this.data) return !1
      this.saveStatus = '++saving'
      const ref = db.collection('posts').add(this.data)
      ref.then((response) => {
        this.saveStatus = '++saved'
        this.timeoutChangeProperty('saveStatus', 'save', 2000, () => {
          this.data = null
          this.imdbID = ''
        })
        this.fetchPosts()
      })
    },
    verify() {
      return new Promise((resolve, reject) => {
        const ref = db.collection('posts').where('imdb', '==', this.imdbID)
        ref.get().then((querySnapshot) => {
          if (querySnapshot.empty) {
            resolve()
          } else {
            reject(new Error(`duplicated (${querySnapshot.length})`))
          }
        })
      })
    },
    timeoutChangeProperty(property, value, timeout, cb = null) {
      window.setTimeout(() => {
        this[property] = value
        if (cb) cb()
      }, timeout || 2000)
    },
    fetchPosts() {
      const ref = db.collection('posts').orderBy('published', 'desc')
      ref.get().then((querySnapshot) => {
        this.posts = parseData(querySnapshot)
      })
    }
  }
}
</script>
