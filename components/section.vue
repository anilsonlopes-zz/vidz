<template>
  <div v-if="!empty">
    <div class="px-2">
      <h3 v-if="title" class="text-grey-dark font-thin">
        {{ title }}
      </h3>
    </div>
    <div class="py-2 px-1 overflow-x-visible overflow-y-hidden whitespace-no-wrap">
      <nuxt-link
        v-for="(item, index) in list"
        :key="item.id"
        class="inline-block w-32 lg:w-1/6 xxl:w-64 mb-4 px-1 no-underline"
        :class="transition ? 'animated fadeIn fast' : ''"
        :style="transition ? { 'animation-delay': `${index}00ms`, 'pointer-events': !item.slug ? 'none' : '' } : {}"
        :to="{ name: 'post-slug', params: { slug: item.slug } }"
      >
        <div
          class="item"
          :class="classItem"
          :style="{ 'background-image': `url(${item.poster})` }"
        />
        <div>
          <h5 class="truncate text-black my-2">
            {{ item.title }}
          </h5>
          <div class="text-xxs text-grey-dark font-medium uppercase flex items-center">
            <span class="mr-4">
              Views 28.1K
            </span>
            <span>
              1h atrás
            </span>
          </div>
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
    },
    limit: {
      type: Int8Array,
      required: false,
      default: 6
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
    ],
    classItem: 'md:h-64 h-32 p-3 bg-cover bg-center bg-grey-light shadow'
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
