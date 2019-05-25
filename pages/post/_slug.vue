<template>
  <div>
    <div
      aria-label="Informações do post"
      class="select-none py-4 px-2"
      :class="{ 'animated fadeIn faster': post.title }"
    >
      <div id="poster_libraries" class="w-full flex">
        <div>
          <div
            class="h-64 w-full bg-grey-darkest bg-cover bg-center rounded-lg"
            :class="{ 'shadow': post.poster }"
            :style="{ 'background-image': `url(${post.poster})`, 'width': '13rem' }"
          />
        </div>
        <div v-if="auth" id="libraries" class="w-full h-64 flex flex-col justify-between ml-4">
          <button
            v-for="(library, index) in librariesPublic"
            :key="index"
            class="py-5 w-full mb-2 flex items-center justify-center text-sm animated bounceInRight fast transition rounded-lg focus:outline-none"
            :class="library.have ? 'bg-grey-darker text-black' : 'bg-grey-darkest text-grey-dark'"
            :title="library.label"
            :style="{ 'animation-delay': `${index}00ms` }"
            type="button"
            @click="toggleLibrary(library)"
          >
            <i class="fa" :class="`${library.icon}`" />
            <span class="font-mono ml-2">
              {{ library.count }}
            </span>
          </button>
          <button
            class="animated fadeIn py-5 w-full flex items-center justify-center text-sm bg-grey text-black transition rounded-lg focus:outline-none"
          >
            <i class="fa fa-play" />
          </button>
        </div>
      </div>
      <div class="w-full animated fadeIn fast">
        <div id="title_plot">
          <h1
            class="pb-2 text-grey-light font-serif"
            :class="{ 'bg-grey-light w-full h-10 animated': !post.title }"
            aria-label="Título do post"
          >
            {{ post.title }}
          </h1>
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
      <nf-section
        v-for="(section, index) in sections"
        :key="index"
        :title="section.title"
        :query="section.query"
        :transition="true"
      />
    </div>
  </div>
</template>

<script>
import slug from 'slug'
import { db, parseData } from '~/services/firebase'
import Library from '~/models/Library.js'
import { mapGetters } from 'vuex'

export default {
  transition: 'fadeInBottom',
  layout: 'tube',
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
        icon: 'fa-eye',
        count: '',
        have: false
      },
      {
        slug: 'liked',
        label: 'Favoritos',
        icon: 'fa-heart-o',
        count: '',
        have: false
      },
      {
        slug: 'watch-later',
        label: 'Assistir depois',
        icon: 'fa-clock-o',
        count: '',
        have: false
      }
    ],
    sections: []
  }),
  computed: {
    ...mapGetters(['auth'])
  },
  mounted() {
    this.fetchPost().then(this.fetchLibraries)
  },
  methods: {
    toggleLibrary(library) {
      if (!library.have) {
        this.addLibrary(library)
      } else {
        db.collection('libraries').doc(`${this.auth.uid}_${library.slug}_${this.post.id}`).delete().then(() => {
          this.$store.commit('notification', { message: `Removi de ${library.label.toLowerCase()} para você`, type: 'default' })
        })
      }
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
          this.userHaveThisLibrary(library.slug)
        })
      })
    },
    fetchPost() {
      return db.collection('posts').where('slug', '==', this.$route.params.slug).get().then((posts) => {
        const post = parseData(posts)[0]
        const sections = post.genres.split(',').map(genre => ({
          title: genre.trim(),
          query: [`search.genres.${slug(genre, { lower: true })}`, '==', true]
        }))
        this.post = post
        this.sections = sections
      })
    },
    userHaveThisLibrary(slug) {
      const ref = db.collection('libraries').where('slug', '==', slug).where('postId', '==', this.post.id).where('userId', '==', this.auth.uid)
      ref.get().then((querySnapshot) => {
        this.librariesPublic.find(l => l.slug === slug).have = !querySnapshot.empty
      })
    }
  }
}
</script>
