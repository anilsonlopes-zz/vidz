<template>
  <div>
    <div id="search" class="w-full px-2 relative">
      <button type="button" class="absolute pin-t pin-l ml-4 mt-4 text-grey bg-transparent border-none">
        <i class="fa fa-search" />
      </button>
      <input
        ref="inputSearch"
        v-model="exploreText"
        type="text"
        class="w-full my-2 pr-2 pl-10 text-grey-darker bg-grey-light transition focus:bg-grey-darkest focus:text-grey focus:outline-none leading-loose"
        placeholder="Buscar..."
        @keyup.enter="handleSearch"
      >
    </div>
    <nf-message
      v-if="!exploreResult"
      title="Ops..."
      emoji="👽"
      body="Primeiro faça a sua busca, se não encontrar nada, faça contato. Adoramos isso."
      class="px-5"
    />
    <div v-else class="flex flex-wrap">
      <nuxt-link
        v-for="post in exploreResult"
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
import { mapGetters } from 'vuex'

export default {
  transition: 'fadeIn',
  head: {
    title: 'Assista'
  },
  layout: 'tube',
  computed: {
    ...mapGetters(['exploreResult']),
    exploreText: {
      get() {
        return this.$store.getters.exploreText
      },
      set(value) {
        this.$store.commit('exploreText', value)
      }
    }
  },
  methods: {
    handleSearch() {
      this.$store.dispatch('explore', this.exploreText.toLowerCase())
    }
  }
}
</script>
