<template>
  <div>
    <nuxt />
    <nf-notifications />
  </div>
</template>

<script>
export default {
  components: {
    'nf-notifications': () => import('~/components/notifications.vue')
  }
}
</script>
