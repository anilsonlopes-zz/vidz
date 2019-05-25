<template>
  <div class="overflow-hidden min-h-screen font-sans bg-black">
    <div class="flex">
      <nf-sidebar />
      <div class="w-full px-2 wrapper_right">
        <nuxt />
        <nf-navbar />
      </div>
    </div>
    <nf-notifications />
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .wrapper_right {
    padding-left: 17rem;
  }
}
</style>
