<template>
  <section>
    <nf-section title="Releases of the year" :query="['search.year', '==', 2019]" :transition="true" class="mt-4" />
    <nf-section title="Sci-fi" :query="['search.genres.sci-fi', '==', true]" :transition="true" class="mt-4" />
    <nf-section title="Children's content" :query="['rated', '==', 'TV-Y']" :transition="true" class="mt-4" />
    <nf-section title="No gender" :query="['search.genres.na', '==', true]" :transition="true" class="mt-4" />
    <nf-section title="The best of drama" :query="['search.genres.drama', '==', true]" :transition="true" class="mt-4" />
    <nf-section title="Adventures" :query="['search.genres.adventure', '==', true]" :transition="true" class="mt-4" />
    <nf-section title="Mature audience" :query="['rated', '==', 'TV-MA']" :transition="true" class="mt-4" />
    <nf-section title="Not recommended for children under 14 years" :query="['rated', '==', 'TV-14']" :transition="true" class="mt-4" />
    <nf-section title="Comedies" :query="['search.genres.comedy', '==', true]" :transition="true" class="mt-4" />
    <nf-section title="Classification with parental guidance" :query="['rated', '==', 'TV-PG']" :transition="true" class="mt-4" />
    <nf-section title="Only from Warner" :query="[ 'production', '==', 'Warner Bros. Pictures']" class="mt-4" />
    <nf-section title="Not recommended for children under 7 years" :query="['rated', '==', 'TV-Y7']" :transition="true" class="mt-4" />
    <nf-section title="Recommended for all audiences" :query="['rated', '==', 'TV-G']" :transition="true" class="mt-4" />
  </section>
</template>

<script>
export default {
  layout: 'tube',
  head: {
    title: 'Início'
  }
}
</script>
