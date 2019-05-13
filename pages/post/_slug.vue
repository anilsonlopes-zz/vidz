<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start select-none">
      <img
        :src="post.poster"
        :alt="post.title"
        class="w-full sm:max-w-64 pointer-events-none animated fadeIn slow"
      >
      <div class="animated fadeIn fast md:w-full flex flex-col md:justify-between h-auto md:h-64 pt-4 sm:pl-4">
        <div>
          <div class="rounded px-4 py-1 mb-2 mr-3 text-xxs text-grey-dark bg-grey-lightest shadow inline-block uppercase font-mono">
            {{ post.type }}
          </div>
          <div v-if="post.type == 'series'" class="rounded px-4 py-1 mb-2 text-xxs text-grey-dark bg-grey-lightest shadow inline-block uppercase font-mono">
            {{ post.totalseasons }} temporada{{ post.totalseasons > 1 ? 's' : '' }}
          </div>
          <div class="text-grey-darker md:text-3xl">
            {{ post.title }}
          </div>
          <div class="sm:block max-w-sm text-grey-dark pt-2">
            {{ post.plot | truncate(99) }}
          </div>
        </div>
        <div class="text-xs font-mono uppercase pt-2">
          <div class="py-1 text-grey">
            {{ post.runtime }}
          </div>
          <div class="py-1 text-grey-dark">
            {{ post.genre }}
          </div>
          <div class="hidden md:block py-1 text-grey">
            Estrelando: {{ post.actors }}
          </div>
          <div class="pt-3 pb-1 text-grey">
            <span class="shadow-inner transition rounded py-2 inline-block px-3 text-grey-dark">
              {{ post.year }}
            </span>
            <span class="shadow-inner transition rounded py-2 mx-2 inline-block px-3 text-grey-dark">
              {{ post.country }}
            </span>
            <span class="shadow-inner transition rounded py-2 inline-block px-3 text-grey-dark">
              {{ post.language }}
            </span>
          </div>
        </div>
        <div class="flex pt-5">
          <button
            class="text-white bg-grey-darker flex items-center text-sm py-2 px-3 border border-grey-lighter select-none transition rounded focus:outline-none cursor-default"
            type="button"
            :title="stats.views.label"
          >
            <span class="inline-block pr-1 font-medium font-mono text-xs">
              {{ stats.views.count }}
            </span>
            <i class="fa" :class="stats.views.icon" />
          </button>
          <span v-if="post.libraries && auth" class="flex">
            <button
              v-for="(library, index) in libraries"
              :key="index"
              class="ml-5 flex items-center text-sm py-2 px-3 border border-grey-lighter hover:bg-grey-lighter transition rounded focus:outline-none focus:shadow-md"
              :class="{ 'bg-grey-darkest text-white': post.libraries.find(row => row.slug == library.slug && row.userId == auth.uid)}"
              :title="library.label"
              type="button"
              @click="handleLibrary(library)"
            >
              <span class="inline-block pr-1 font-medium font-mono text-xs">
                {{ post.libraries.filter(row => row.slug == library.slug).length }}
              </span>
              <i class="fa" :class="`${library.icon}`" />
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Library from '~/models/Library.js'
import { mapGetters } from 'vuex'

export default {
  transition: 'fadeInBottom',
  layout: 'tube',
  queryQuery: ['nameResult'],
  data: () => ({
    post: {},
    stats: {
      views: {
        label: 'Visualizações',
        icon: 'fa-eye',
        count: '985.7M'
      }
    },
    libraries: [
      {
        slug: 'watched',
        label: 'Assistidos',
        icon: 'fa-check'
      },
      {
        slug: 'liked',
        label: 'Favoritos',
        icon: 'fa-heart-o'
      },
      {
        slug: 'watch-later',
        label: 'Quero assistir',
        icon: 'fa-clock-o'
      }
    ]
  }),
  computed: {
    ...mapGetters(['auth'])
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get(`//localhost:3001/posts/?slug=${params.slug}&_embed=libraries&_limit=1`)
    return { post: data[0] }
  },
  methods: {
    async handleLibrary(library) {
      const librarySaved = this.post.libraries.find(rowLib => rowLib.userId === this.auth.uid && rowLib.slug === library.slug)
      if (librarySaved) {
        // remove da library
        await this.$axios.$delete(`//localhost:3001/libraries/${librarySaved.id}`)
        this.$router.replace({ query: { nameResult: 'removedLibrary', library: library.slug } })
        this.$store.commit('notification', { message: `Removido de ${library.label.toLowerCase()}`, type: 'default' })
      } else {
        // add library
        const libraryData = new Library({
          id: `${this.auth.uid}_${library.slug}_${this.post.id}`,
          userId: this.auth.uid,
          postId: this.post.id,
          slug: library.slug
        }).data
        try {
          await this.$axios.$post(`//localhost:3001/libraries/`, libraryData)
          this.$store.commit('notification', { message: `Adicionado em ${library.label.toLowerCase()}`, type: 'default' })
        } catch (error) {
          this.$store.commit('notification', { message: 'Essa operação não pôde ser concluída', type: 'error' })
        }
      }
    }
  }
}
</script>
