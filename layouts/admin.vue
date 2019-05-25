<template>
  <div class="overflow-hidden min-h-screen font-sans bg-grey-lighter">
    <nf-notifications />
    <nuxt />
  </div>
</template>

<script>
export default {
  components: {
    'nf-notifications': () => import('~/components/notifications.vue')
  }
}
</script>
