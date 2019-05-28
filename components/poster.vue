<template>
  <div
    class="transition h-64 w-full bg-cover bg-center rounded-lg"
    :style="style"
  />
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default: '#013'
    },
    src: {
      type: String,
      required: false,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    }
  },
  computed: {
    style() {
      return {
        'background-color': this.color,
        'background-image': `url(${this.src})`
      }
    }
  }
}
</script>
