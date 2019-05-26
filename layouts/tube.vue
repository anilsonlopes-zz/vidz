<template>
  <div class="overflow-hidden min-h-screen font-sans bg-black">
    <div class="flex">
      <div class="w-full">
        <div class="pb-20">
          <nuxt />
        </div>
        <nf-navbar />
      </div>
    </div>
    <nf-notifications />
  </div>
</template>

<script>
export default {
  components: {
    'nf-navbar': () => import('~/components/navbar.vue'),
    'nf-notifications': () => import('~/components/notifications.vue')
  }
}
</script>
