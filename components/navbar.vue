<template>
  <div class="z-50 overflow-hidden fixed pin-r pin-b pin-l bg-grey-darkest flex justify-around items-center">
    <nuxt-link
      v-for="(item, index) in items"
      :key="index"
      :class="`${classMenuItem} ${item.to.name == $route.name ? 'bg-grey-darkest shadow-strong' : 'text-grey-light'}`"
      :to="item.to"
    >
      <i class="fa text-grey-light" :class="item.icon" />
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    pkg: require('~/package.json'),
    classMenuItem: 'flex flex-col overflow-hidden w-1/4 items-center justify-center transition p-5 no-underline text-sm',
    items: [
      {
        name: 'Home',
        to: { name: 'index' },
        icon: 'fa-home'
      },
      {
        name: 'Search',
        to: { name: 'explore' },
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
