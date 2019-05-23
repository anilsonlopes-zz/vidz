<template>
  <div class="overflow-hidden min-h-screen font-sans">
    <div class="flex">
      <nf-sidebar />
      <div id="content" class="w-full px-2 content">
        <nf-navbar />
        <nuxt />
      </div>
    </div>
    <nf-notifications />
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .content {
    padding-left: 17rem;
  }
}
</style>
