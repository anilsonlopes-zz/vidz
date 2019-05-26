<template>
  <div class="z-50 fixed pin-r pin-b pin-l bg-grey-darkest flex justify-around items-center py-2">
    <nuxt-link
      v-for="(item, index) in items"
      :key="index"
      :class="classMenuItem"
      :to="item.to"
    >
      <i class="fa text-grey-light" :class="item.icon" />
      <span class="transition bubble inline-block w-1 h-1 rounded-full bg-grey-lightest mt-2" />
    </nuxt-link>
  </div>
</template>

<style scoped>
.bubble {
  display: none;
  height: 0;
}
.menu-item.nuxt-link-exact-active .bubble {
  display: block;
  height: .25rem;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    pkg: require('~/package.json'),
    classMenuItem: 'menu-item flex flex-col items-center justify-center transition py-2 px-3 no-underline text-grey-light mx-3 text-sm',
    items: [
      {
        name: 'Home',
        to: { name: 'index' },
        icon: 'fa-home'
      },
      {
        name: 'Search',
        to: { name: 'explore-query' },
        icon: 'fa-search'
      },
      {
        name: 'Libraries',
        to: { name: 'libraries' },
        icon: 'fa-folder'
      },
      {
        name: 'Settings',
        to: { name: 'settings' },
        icon: 'fa-cog'
      }
    ]
  }),
  computed: {
    ...mapGetters(['auth'])
  }
}
</script>
