<template>
  <div>
    <div class="w-full relative">
      <button type="button" class="absolute pin-t pin-l ml-4 mt-6 text-grey bg-transparent border-none">
        <i class="fa fa-search" />
      </button>
      <input
        ref="inputSearch"
        v-model="search"
        type="text"
        class="max-w-full mt-4 ml-12 px-2 text-grey-light bg-transparent border-b focus:outline-none leading-loose"
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
    <div v-else class="mt-4 py-2 px-1">
      <nuxt-link
        v-for="(post, index) in posts"
        :key="post.id"
        class="overflow-hidden flex flex-col sm:flex-row w-full md:mb-8 no-underline hover:bg-grey-lighter p-2 transition"
        :class="{ 'pt-8 sm:pt-2 border-t sm:border-0': index > 0 }"
        :to="{ name: 'post-slug', params: { slug: post.slug } }"
      >
        <div>
          <div
            class="h-64 bg-grey bg-cover bg-center"
            :style="{ 'width': '13rem', 'background-image': `url(${post.poster})` }"
          />
        </div>
        <div class="md:w-full flex flex-col md:justify-between h-auto md:h-64 pt-4 sm:pl-4">
          <div>
            <div class="rounded px-4 py-1 mb-2 text-xxs text-grey-dark bg-grey-lightest shadow inline-block uppercase font-mono">
              {{ post.type }}
            </div>
            <div class="text-grey-darker md:text-3xl">
              {{ post.title }}
            </div>
            <div class="sm:block max-w-sm text-grey-dark pt-2">
              {{ post.plot | truncate(99) }}
            </div>
          </div>
          <div class="text-xs font-mono uppercase pt-2">
            <div class="pb-1 text-grey">
              {{ post.runtime }}
            </div>
            <div class="pb-1 text-grey-dark">
              {{ post.genre }}
            </div>
            <div class="hidden md:block text-grey">
              Atores: {{ post.actors }}
            </div>
          </div>
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
    search: ''
  }),
  async asyncData({ params, $axios }) {
    let ref = db.collection('posts')
    if (params.query) {
      params.query.split('').map((letter) => {
        ref = ref.where(`search.title.${letter}`, '==', true)
      })
    }
    const querySnapshot = await ref.get()
    return {
      posts: parseData(querySnapshot),
      empty: querySnapshot.empty
    }
  },
  mounted() {
    this.focusInputSearch()
  },
  methods: {
    handleSearch() {
      this.$router.replace({ name: 'posts-query', params: { query: this.search.toLowerCase() } })
    },
    focusInputSearch() {
      // FIXME: Scroll to top
      this.$refs.inputSearch.focus()
    }
  }
}
</script>
