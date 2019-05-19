<template>
  <div class="hidden fixed animated fadeIn slow pin-t pin-l pin-b md:block max-w-xs w-64 bg-grey-lighter text-grey-lighter h-screen overflow-y-auto scroll-custom">
    <div id="brand" class="p-4 text-center">
      <nuxt-link :to="{ name: 'index' }" tag="h2" class="cursor-pointer text-black">
        {{ pkg.name }} <sub class="text-grey-dark text-sm font-thin"><small>{{ pkg.version }}</small></sub>
      </nuxt-link>
    </div>
    <div id="mediaMenu" class="pt-4 pb-8 my-4 border-b">
      <nuxt-link
        v-for="(item, index) in mediaMenu"
        :key="index"
        class="flex items-center no-underline py-3 pl-8 pr-4 hover:bg-white"
        :class="$route.name == item.to.name && $route.query.type == item.to.query.type ? 'bg-grey-lightest text-grey-darker' : 'text-grey-dark'"
        :to="item.to"
      >
        <i class="fa fa-angle-right" />
        <span class="ml-2 font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
    <div id="libraryMenu" class="pt-4 pb-8 my-4 border-b">
      <nuxt-link
        v-for="(item, index) in libraryMenu"
        :key="index"
        class="flex items-center no-underline py-3 pl-8 pr-4 hover:bg-white"
        :class="$route.name == item.to.name && $route.query.slug == item.to.query.slug ? 'bg-grey-lightest text-grey-darker' : 'text-grey-dark'"
        :to="item.to"
      >
        <i class="fa" :class="item.icon" />
        <span class="ml-2 font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
    <div id="accountMenu" class="pt-4 pr-4 pb-8 pl-4 m-4">
      <nuxt-link
        v-for="(item, index) in accountMenu"
        :key="index"
        class="flex items-center text-sm no-underline py-2 text-grey-dark hover:text-grey-darkest"
        :to="item.to"
      >
        <i class="fa" :class="item.class" />
        <span class="ml-2 font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
      <button
        type="button"
        class="flex items-center text-sm no-underline py-2 text-grey-dark hover:text-grey-darkest"
        @click="logout"
      >
        <i class="fa fa-sign-out" />
        <span class="ml-2 font-medium">
          Sair
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import pkg from '~/package.json'

export default {
  data: () => ({
    pkg,
    mediaMenu: [
      {
        name: 'Séries',
        to: { name: 'filter', query: { type: 'series' } }
      },
      {
        name: 'Filmes',
        to: { name: 'filter', query: { type: 'movie' } }
      }
    ],
    libraryMenu: [
      {
        name: 'Assistidos',
        to: { name: 'library', query: { slug: 'watched' } },
        icon: 'fa-check'
      },
      {
        name: 'Favoritos',
        to: { name: 'library', query: { slug: 'liked' } },
        icon: 'fa-heart-o'
      },
      {
        name: 'Quero assistir',
        to: { name: 'library', query: { slug: 'watch-later' } },
        icon: 'fa-clock-o'
      }
    ],
    accountMenu: [
      {
        name: 'Configurações',
        to: { name: 'index' },
        class: 'fa-cog'
      },
      {
        name: 'Ajuda e suporte',
        to: { name: 'index' },
        class: 'fa-user'
      }
    ]
  }),
  methods: {
    logout() {
      if (window.confirm('Deseja desconectar?')) {
        this.$store.dispatch('logout').then(() => {
          this.$store.commit('notification', { type: 'info', message: 'Desconectado!? Ver se não esquece a senha.' })
        })
      }
    }
  }
}
</script>
