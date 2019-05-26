<template>
  <div
    class="h-64 w-full bg-grey bg-cover bg-center rounded-lg"
    :style="{ 'background-image': `url(${src})` }"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    }
  }
}
</script>
