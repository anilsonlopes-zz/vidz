<template>
  <div>
    <div class="flex flex-col sm:flex-row items-start select-none px-2" :class="{ 'animated fadeIn slow': post.title }">
      <div class="w-full md:max-w-xs">
        <div
          class="h-32 md:h-sm bg-blue-lightest bg-cover bg-center rounded"
          :class="{ 'shadow': post.poster }"
          :style="{ 'background-image': `url(${post.poster})` }"
        />
      </div>
      <div class="w-full animated fadeIn fast flex flex-col h-auto md:h-64 pt-4 sm:pl-4">
        <div v-if="auth && post.stats" id="libraries" class="flex mb-2">
          <button
            v-for="(library, index) in librariesPublic"
            :key="index"
            class="mr-2 flex items-center text-sm py-2 px-3 text-grey-darker border border-grey-lighter transition rounded focus:outline-none focus:shadow-md"
            :class="{ 'bg-grey-darker text-grey-lighter': library.have }"
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
          <div
            class="text-grey-darker text-xl pt-2 md:text-3xl"
            :class="{ 'bg-grey-light w-full h-10 animated': !post.title }"
            aria-label="Título do post"
          >
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
          <div
            class="sm:block max-w-sm text-grey-dark pt-2"
            :class="{ 'bg-grey w-full h-32': !post.plot }"
            aria-label="Descrição do post"
          >
            {{ post.plot }}
          </div>
        </div>
        <div id="actors_genres" class="pt-4 text-xs text-grey" :class="{ 'border-t-8 border-white w-full h-10 bg-grey-lighter': !post.actors }">
          <div v-if="post.actors">
            Estrelando: {{ post.actors }}
          </div>
          <div class="pt-1">
            {{ post.genres }}
          </div>
        </div>
        <div id="country_language" class="uppercase pt-3 pb-1 text-grey flex text-xs font-mono">
          <div
            class="border border-grey-light rounded py-2 px-2 mr-2"
            :class="{ 'w-1/3 h-6': !post.country }"
          >
            {{ post.country }}
          </div>
          <div
            class="border border-grey-light rounded py-2 px-2"
            :class="{ 'w-1/3 h-6': !post.language }"
          >
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
    librariesPublic: [
      {
        slug: 'watched',
        label: 'Assistidos',
        icon: 'fa-check',
        count: ''
      },
      {
        slug: 'liked',
        label: 'Favoritos',
        icon: 'fa-heart-o',
        count: ''
      },
      {
        slug: 'watch-later',
        label: 'Quero assistir',
        icon: 'fa-clock-o',
        count: ''
      }
    ]
  }),
  computed: {
    ...mapGetters(['auth'])
  },
  mounted() {
    this.fetchPost().then(this.fetchLibraries)
  },
  methods: {
    toggleLibrary(library) {
      // FIXME: Verificar ação (add/remove) da library
      this.addLibrary(library)
    },
    addLibrary(library) {
      try {
        const newLibrary = new Library({
          id: `${this.auth.uid}_${library.slug}_${this.post.id}`,
          userId: this.auth.uid,
          postId: this.post.id,
          slug: library.slug
        })
        const ref = db.collection('libraries').doc(newLibrary.data.id)
        ref.set(newLibrary.data, { merge: true }).then(() => {
          this.$store.commit('notification', { message: `Adicionei em ${library.label.toLowerCase()} para você`, type: 'default' })
        })
      } catch (error) {
        this.$store.commit('notification', { message: 'Tente novamente. Se não funcionar, fala com a gente.', type: 'error' })
      }
    },
    fetchLibraries() {
      this.librariesPublic.map((library) => {
        let ref = db.collection('libraries')
        ref = ref.where('postId', '==', this.post.id)
        ref = ref.where('slug', '==', library.slug)
        ref.onSnapshot((querySnapshot) => {
          this.librariesPublic.find(l => l.slug === library.slug).count = querySnapshot.size
        })
      })
    },
    fetchPost() {
      return db.collection('posts').where('slug', '==', this.$route.params.slug).get().then((posts) => {
        this.$nextTick(() => {
          this.post = parseData(posts)[0]
        })
      })
    }
  }
}
</script>
