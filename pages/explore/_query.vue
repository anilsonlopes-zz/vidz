<template>
  <div>
    <div id="search" class="w-full px-0 relative">
      <button type="button" class="absolute pin-t pin-l ml-4 mt-6 text-grey bg-transparent border-none">
        <i class="fa fa-search" />
      </button>
      <input
        ref="inputSearch"
        v-model="search"
        type="text"
        class="w-full mt-4 pl-12 pr-2 text-grey-light bg-transparent transition border-b border-transparent focus:border-white focus:outline-none leading-loose"
        placeholder="Buscar..."
        @keyup.enter="handleSearch"
      >
    </div>
    <nf-message
      v-if="empty"
      title="Ops..."
      emoji="👽"
      body="Se você acredita que deveria haver algo aqui, faça contato. Adoramos isso."
      class="px-5"
    />
    <div v-else class="flex flex-wrap">
      <nuxt-link
        v-for="post in posts"
        :key="post.id"
        class="flex flex-col w-1/2 no-underline p-2"
        :to="{ name: 'post-slug', params: { slug: post.slug } }"
      >
        <div>
          <nf-poster :src="post.poster" />
        </div>
        <div class="text-grey font-thin font-serif text-lg py-2 pr-2 pb-2 uppercase">
          {{ post.title }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { db, parseData } from '~/services/firebase'

export default {
  transition: 'fadeIn',
  head: {
    title: 'Assista'
  },
  watchQuery: ['type'],
  layout: 'tube',
  data: () => ({
    search: '',
    empty: false,
    posts: []
  }),
  async asyncData({ params, $axios }) {
    let ref = db.collection('posts')
    if (params.query) {
      params.query.split('').map((letter) => {
        ref = ref.where(`search.title.${letter}`, '==', true)
      })
      const querySnapshot = await ref.get()
      return {
        posts: parseData(querySnapshot),
        empty: querySnapshot.empty
      }
    }
  },
  mounted() {
    this.focusInputSearch()
  },
  methods: {
    handleSearch() {
      this.$router.replace({ name: 'explore-query', params: { query: this.search.toLowerCase() } })
    },
    focusInputSearch() {
      // FIXME: Scroll to top
      this.$refs.inputSearch.focus()
      if (this.$route.params.slug) {
        this.search = this.$route.params.slug.replace('-', ' ')
      }
    }
  }
}
</script>
