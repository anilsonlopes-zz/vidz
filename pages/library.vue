<template>
  <div>
    <nf-section title="Resultado da busca" :query="$route.query" :transition="true" class="mt-4" />
  </div>
</template>

<script>
export default {
  head: {
    title: 'Biblioteca'
  },
  layout: 'tube'
}
</script>
