<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start select-none px-2">
      <div class="w-full md:max-w-xs">
        <div
          class="h-32 md:h-sm bg-cover bg-center rounded shadow"
          :style="{ 'background-image': `url(${post.poster})` }"
        />
      </div>
      <div class="animated fadeIn fast flex flex-col h-auto md:h-64 pt-4 sm:pl-4">
        <div v-if="auth" class="flex mb-2">
          <button
            v-for="(library, index) in libraries"
            :key="index"
            class="mr-2 flex items-center text-sm py-2 px-3 text-grey-darker border border-grey-lighter hover:bg-grey-lighter transition rounded focus:outline-none focus:shadow-md"
            :class="{ 'bg-grey-darker text-grey-lighter': index == 2 }"
            :title="library.label"
            type="button"
            @click="toggleLibrary(library)"
          >
            <span class="inline-block pr-1 font-medium font-mono text-xs">
              {{ library.count }}
            </span>
            <i class="fa" :class="`${library.icon}`" />
          </button>
        </div>
        <div id="title_plot">
          <div class="text-grey-darker text-xl pt-2 md:text-3xl" aria-label="Título do post">
            {{ post.title }}
          </div>
          <div id="year_type_seasons" class="flex uppercase font-mono text-xxs text-grey-dark mt-2">
            <div class="rounded px-4 py-1 mb-2 mr-3 bg-grey-lightest" aria-label="Ano de lançamento">
              {{ post.year }}
            </div>
            <div class="rounded px-4 py-1 mb-2 mr-3 bg-grey-lightest" aria-label="Tipo do post">
              {{ post.type }}
            </div>
            <div v-if="post.type == 'series'" class="rounded px-4 py-1 mb-2 bg-grey-lightest" aria-label="Número de temporadas">
              {{ post.totalseasons }} temporada{{ post.totalseasons > 1 ? 's' : '' }}
            </div>
          </div>
          <div class="sm:block max-w-sm text-grey-dark pt-2" aria-label="Descrição do post">
            {{ post.plot }}
          </div>
        </div>
        <div id="actors_genres" class="pt-4 text-xs text-grey">
          <div>
            Estrelando: {{ post.actors }}
          </div>
          <div class="pt-1">
            {{ post.genres }}
          </div>
        </div>
        <div id="country_language" class="uppercase pt-3 pb-1 text-grey flex text-xs font-mono">
          <div class="border border-grey-light rounded py-2 px-2 mr-2">
            {{ post.country }}
          </div>
          <div class="border border-grey-light rounded py-2 px-2">
            {{ post.language }}
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5 mt-5 border-t-2 border-grey-lighter">
      <nf-section title="Do mesmo ano" :query="['search.year', '==', 2011]" :transition="true" />
      <nf-section title="Sci-fi" :query="['search.genres.sci-fi', '==', true]" :transition="true" class="mt-4" />
    </div>
  </div>
</template>

<script>
import { db, parseData } from '~/services/firebase'
import Library from '~/models/Library.js'
import { mapGetters } from 'vuex'

export default {
  transition: 'fadeInBottom',
  layout: 'tube',
  queryQuery: ['nameResult'],
  head() {
    return {
      title: this.post.title,
      titleTemplate: 'vidz - %s'
    }
  },
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
        icon: 'fa-check',
        count: '...'
      },
      {
        slug: 'liked',
        label: 'Favoritos',
        icon: 'fa-heart-o',
        count: '...'
      },
      {
        slug: 'watch-later',
        label: 'Quero assistir',
        icon: 'fa-clock-o',
        count: '...'
      }
    ]
  }),
  computed: {
    ...mapGetters(['auth'])
  },
  async asyncData({ params, $axios }) {
    const querySnapshot = await db.collection('posts').where('slug', '==', params.slug).get()
    return { post: parseData(querySnapshot)[0] }
  },
  methods: {
    toggleLibrary(library) {
      // code
    },
    async addLibraryFromUser(library) {
      try {
        const newLibrary = new Library({
          id: `${this.auth.uid}_${library.slug}_${this.post.id}`,
          userId: this.auth.uid,
          postId: this.post.id,
          slug: library.slug
        })
        await this.$axios.$post(`//localhost:3001/libraries/`, newLibrary.data)
        this.post.libraries.push(newLibrary.data)
        this.$store.commit('notification', { message: `Adicionado em ${library.label.toLowerCase()}`, type: 'default' })
      } catch (error) {
        this.$store.commit('notification', { message: 'Essa operação não pôde ser concluída', type: 'error' })
      }
    }
  }
}
</script>
