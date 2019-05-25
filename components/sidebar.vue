<template>
  <div class="hidden fixed animated fadeIn slow pin-t pin-l pin-b md:block max-w-xs w-64 bg-grey-darker text-grey-lighter h-screen overflow-y-auto scroll-custom">
    <div id="brand" class="p-4 text-center">
      <nuxt-link :to="{ name: 'index' }" tag="h2" class="cursor-pointer text-black">
        {{ pkg.name }} <sub class="text-grey-dark text-sm font-thin"><small>{{ pkg.version }}</small></sub>
      </nuxt-link>
    </div>
    <div id="libraryMenu" class="py-4 my-4 px-4 border-b">
      <div class="mb-2 uppercase text-xl pl-4 text-grey-darkest font-medium font-serif">
        Library
      </div>
      <nuxt-link
        v-for="(item, index) in libraryMenu"
        :key="index"
        class="sidebar-item flex items-center no-underline py-3 px-4 mb-2 text-grey rounded-lg"
        :to="item.to"
      >
        <i class="fa text-grey-light text-xl" :class="item.icon" />
        <span class="ml-2 font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
    <div id="accountMenu">
      <button
        type="button"
        class="flex items-center text-xs no-underline py-3 pl-8 pr-4 text-grey-dark hover:text-grey-darkest"
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

<style scoped>
.sidebar-item {
  border: 1px solid transparent;
  transition: 300ms all;
}
.sidebar-item.nuxt-link-exact-active,
.sidebar-item:hover {
  color: rgb(220, 220, 220);
  border-color: rgb(68, 80, 90);
}
.sidebar-item.nuxt-link-exact-active > .fa {
  color: rgb(10, 10, 10);
}
</style>

<script>
import pkg from '~/package.json'

export default {
  data: () => ({
    pkg,
    libraryMenu: [
      {
        name: 'Explore',
        to: { name: 'filter' },
        icon: 'fa-wpexplorer'
      },
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
        name: 'Assistir depois',
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
