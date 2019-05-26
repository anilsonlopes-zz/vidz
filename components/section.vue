<template>
  <div v-if="!empty">
    <div class="px-2">
      <h3 v-if="title" class="text-grey font-thin font-serif text-xl uppercase">
        {{ title }}
      </h3>
    </div>
    <div class="py-2 pl-1 overflow-x-visible overflow-y-hidden whitespace-no-wrap">
      <nuxt-link
        v-for="(item, index) in list"
        :key="item.id"
        class="inline-block w-32 lg:w-1/6 xxl:w-64 mb-4 px-1 no-underline"
        :class="transition ? 'animated fadeIn fast' : ''"
        :style="transition ? { 'animation-delay': `${index}00ms`, 'pointer-events': !item.slug ? 'none' : '' } : {}"
        :to="{ name: 'post-slug', params: { slug: item.slug } }"
      >
        <nf-poster :src="item.poster" />
        <div class="text-grey-dark truncate pt-2">
          {{ item.title }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { db, parseData } from '~/services/firebase'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    transition: {
      type: Boolean,
      required: false,
      default: false
    },
    query: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  data: () => ({
    empty: false,
    list: [
      { id: 1, title: '', poster: '' },
      { id: 2, title: '', poster: '' },
      { id: 3, title: '', poster: '' },
      { id: 4, title: '', poster: '' },
      { id: 5, title: '', poster: '' }
    ]
  }),
  mounted() {
    if (this.query) {
      const ref = db.collection('posts').where(...this.query).limit(6)
      ref.get().then((querySnapshot) => {
        this.empty = querySnapshot.empty
        this.list = parseData(querySnapshot)
      })
    }
  }
}
</script>
