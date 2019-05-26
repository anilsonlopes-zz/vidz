<template>
  <div class="text-center">
    <div class="text-2xl my-10 text-grey-light uppercase">
      {{ title }}
    </div>
    <div class="text-5xl">
      {{ emoji }}
    </div>
    <div class="font-mono text-grey text-sm mt-10 max-w-sm mx-auto">
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '...'
    },
    emoji: {
      type: String,
      required: false,
      default: '👽'
    },
    body: {
      type: String,
      required: false,
      default: 'body'
    }
  }
}
</script>
