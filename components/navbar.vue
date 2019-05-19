<template>
  <div class="z-50 flex justify-between items-center py-2">
    <nuxt-link
      v-if="$route.name != 'index'"
      :to="{ name: 'index' }"
      class="p-4 text-grey-darker focus:text-blue focus:outline-none transition"
    >
      <i class="fa fa-undo" />
    </nuxt-link>
    <div class="w-full relative">
      <button type="button" class="absolute pin-t pin-l ml-4 mt-2 text-grey bg-transparent border-none">
        <i class="fa fa-search" />
      </button>
      <input v-model="search" type="text" class="w-full rounded focus:outline-none focus:border-grey-lighter leading-loose transition border border-white bg-transparent pl-10 pl-4 text-grey-darker" placeholder="Buscar..." @keyup.enter="handleSearch">
    </div>
    <transition enter-active-class="animated fadeInRight fast" leave-active-class="animated fadeOut">
      <div v-if="auth" class="flex items-center pr-4">
        <button type="button" class="mx-6 focus:outline-none text-grey bg-transparent border-none">
          <i class="fa fa-bell" />
        </button>
        <span class="w-10 h-10 bg-cover inline-block rounded-full" :style="{ 'background-image': `url(${auth.avatar})` }" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    pkg: require('~/package.json'),
    classMenuItem: 'no-underline text-grey hover:text-grey-dark mx-3 text-sm',
    search: '',
    items: [
      {
        name: 'Início',
        to: { name: 'index' }
      },
      {
        name: 'Filmes',
        to: { name: 'index' }
      },
      {
        name: 'Series',
        to: { name: 'index' }
      },
      {
        name: 'Pedidos',
        to: { name: 'index' }
      },
      {
        name: 'Minha lista',
        to: { name: 'index' }
      }
    ]
  }),
  computed: {
    ...mapGetters(['auth'])
  },
  methods: {
    handleSearch() {
      this.$router.replace({ name: 'posts-query', params: { query: this.search } })
    }
  }
}
</script>
