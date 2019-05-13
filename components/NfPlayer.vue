<template>
  <div :style="{ minHeight: '15rem' }">
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div v-if="media" class="flex flex-col lg:flex-row px-5 lg:px-10 mb-8">
        <div>
          <video class="w-full max-w-lg" controls autoplay muted>
            <source src="https://s3.eu-central-1.wasabisys.com/anv01/O/One_Punch_Man/2/480p/AnV-01.mp4" type="video/mp4">
          </video>
        </div>
        <div class="flex items-center lg:px-5 mt-5">
          <div>
            <h2 class="text-grey-darkest">
              {{ media.title }}
            </h2>
            <div class="text-xxs text-grey-darker my-4">
              <span class="border rounded py-1 px-2">
                {{ media.country }}
              </span>
              <span class="ml-2 border rounded py-1 px-2">
                {{ media.year.join(' - ') }}
              </span>
            </div>
            <p class="text-sm text-grey-darkest">
              {{ media.plot }}
            </p>
            <div class="text-xs text-grey-darker mt-5 hidden lg:block">
              <nuxt-link
                :to="{ name: 'filter', query: { type: media.type } }"
                class="capitalize text-white bg-purple no-underline hover:bg-purple-dark border p-1 inline-block rounded"
              >
                {{ media.type }}
              </nuxt-link>
              <nuxt-link
                v-for="(genre, key) in media.genre"
                :key="key"
                :to="{ name: 'filter', query: { genre: key } }"
                class="capitalize text-grey-dark no-underline hover:text-grey-darkest border p-1 inline-block rounded ml-1"
              >
                {{ key }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { db } from '~/services/firebase'
export default {
  data: () => ({
    media: null
  }),
  async mounted() {
    const doc = await db.collection('media').doc('izEIiSpiLTPcq3pTUmvD').get()
    this.media = doc.data()
  }
}
</script>
