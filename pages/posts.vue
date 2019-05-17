<template>
  <div>
    <span v-if="empty">Nada ainda.</span>
    <div class="mt-4 py-2 px-1">
      <nuxt-link
        v-for="(post, index) in posts"
        :key="post.id"
        class="overflow-hidden flex flex-col sm:flex-row w-full md:mb-8 no-underline hover:bg-grey-lighter p-2 transition"
        :class="{ 'pt-8 sm:pt-2 border-t sm:border-0': index > 0 }"
        :to="{ name: 'post-slug', params: { slug: post.slug } }"
      >
        <div>
          <div
            class="h-64 bg-grey bg-cover bg-center"
            :style="{ 'width': '13rem', 'background-image': `url(${post.poster})` }"
          />
        </div>
        <div class="md:w-full flex flex-col md:justify-between h-auto md:h-64 pt-4 sm:pl-4">
          <div>
            <div class="rounded px-4 py-1 mb-2 text-xxs text-grey-dark bg-grey-lightest shadow inline-block uppercase font-mono">
              {{ post.type }}
            </div>
            <div class="text-grey-darker md:text-3xl">
              {{ post.title }}
            </div>
            <div class="sm:block max-w-sm text-grey-dark pt-2">
              {{ post.plot | truncate(99) }}
            </div>
          </div>
          <div class="text-xs font-mono uppercase pt-2">
            <div class="pb-1 text-grey">
              {{ post.runtime }}
            </div>
            <div class="pb-1 text-grey-dark">
              {{ post.genre }}
            </div>
            <div class="hidden md:block text-grey">
              Atores: {{ post.actors }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { db, parseData } from '~/services/firebase'

export default {
  transition: 'fadeInBottom',
  head: {
    title: 'Assista'
  },
  watchQuery: ['type'],
  layout: 'tube',
  async asyncData({ query, $axios }) {
    const querySnapshot = await db.collection('posts').where('type', '==', query.type).get()
    return {
      posts: parseData(querySnapshot),
      empty: querySnapshot.empty
    }
  }
}
</script>
