<template>
  <div class="hidden fixed animated fadeIn slow pin-t pin-l pin-b md:block max-w-xs w-64 bg-grey-lighter text-grey-lighter h-screen overflow-y-scroll scroll-custom">
    <div id="brand" class="p-4 text-center">
      <nuxt-link :to="{ name: 'index' }" tag="h2" class="cursor-pointer text-black">
        AnimesVision
      </nuxt-link>
    </div>
    <div id="mediaMenu" class="pt-4 pr-4 pb-8 pl-4 m-4 border-b">
      <nuxt-link
        v-for="(item, index) in mediaMenu"
        :key="index"
        class="flex items-center text-sm no-underline py-2"
        :to="item.to"
      >
        <i class="fa fa-angle-right text-grey-dark" />
        <span class="ml-2 text-black hover:text-grey-dark font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
    <div id="libraryMenu" class="pt-4 pr-4 pb-8 pl-4 m-4 border-b">
      <nuxt-link
        v-for="(item, index) in libraryMenu"
        :key="index"
        class="flex items-center text-sm no-underline py-2"
        :to="item.to"
      >
        <i class="fa text-grey-dark" :class="item.icon" />
        <span class="ml-2 text-black hover:text-grey-dark font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
    </div>
    <div id="accountMenu" class="pt-4 pr-4 pb-8 pl-4 m-4">
      <nuxt-link
        v-for="(item, index) in accountMenu"
        :key="index"
        class="flex items-center text-sm no-underline py-2"
        :to="item.to"
      >
        <i class="fa text-grey-dark" :class="item.class" />
        <span class="ml-2 text-black hover:text-grey-dark font-medium">
          {{ item.name }}
        </span>
      </nuxt-link>
      <button type="button" class="flex items-center text-sm no-underline py-2">
        <i class="fa fa-sign-out text-grey-dark" />
        <span class="ml-2 text-black hover:text-red font-medium">
          Sair
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    mediaMenu: [
      {
        name: 'Séries',
        to: { name: 'posts', query: { type: 'series' } }
      },
      {
        name: 'Filmes',
        to: { name: 'posts', query: { type: 'movie' } }
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
  })
}
</script>
