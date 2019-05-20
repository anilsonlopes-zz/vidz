<template>
  <div class="bg-grey-lightest rounded-full flex justify-between items-center px-5 lg:px-10 py-4 mt-10">
    <div class="flex items-center">
      <nuxt-link :to="{ name: 'index' }" class="text-grey-dark no-underline hover:text-grey-darker mr-8">
        {{ pkg.name }}
      </nuxt-link>
    </div>
    <div class="flex items-center ml-3 md:-ml-0">
      <div class="hidden lg:flex lg:items-center">
        <nuxt-link v-for="(item, index) in items" :key="index" :to="{ name: 'index' }" :class="classMenuItem">
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    pkg: require('~/package.json'),
    classMenuItem: 'no-underline text-grey hover:text-grey-dark mx-3 text-sm',
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
        name: 'Gerenciar usuários',
        to: { name: 'index' }
      },
      {
        name: 'Configurações da conta',
        to: { name: 'index' }
      },
      {
        name: 'Central de ajuda',
        to: { name: 'index' }
      }
    ]
  })
}
</script>
