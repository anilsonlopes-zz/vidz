<template>
  <section>
    <nf-section title="Lançamentos do ano" :query="{ year: 2019 }" :transition="true" class="mt-4" />
    <nf-section title="Conteúdo infantil" :query="{ rated: 'TV-Y' }" :transition="true" class="mt-4" />
    <nf-section title="Sem gênero" :query="{ genre: 'N/A' }" :transition="true" class="mt-4" />
    <nf-section title="Aventuras" :query="{ genre_like: 'Adventure' }" :transition="true" class="mt-4" />
    <nf-section title="Audiência maduras" :query="{ rated: 'TV-MA' }" :transition="true" class="mt-4" />
    <nf-section title="Combo: Action, Adventure, Comedy, Family, Mystery, Sci-Fi" :query="{ genre: 'Action, Adventure, Comedy, Family, Mystery, Sci-Fi' }" :transition="true" class="mt-4" />
    <nf-section title="Não recomendado para menores de 14 anos" :query="{ rated: 'TV-14' }" :transition="true" class="mt-4" />
    <nf-section title="Comédias" :query="{ genre_like: 'Comedy' }" :transition="true" class="mt-4" />
    <nf-section title="Classificação destinada com a orientação parental" :query="{ rated: 'TV-PG' }" :transition="true" class="mt-4" />
    <nf-section title="Só da Warner" :query="{ production: 'Warner Bros. Pictures' }" class="mt-4" />
    <nf-section title="Não recomendado para menores de 7 anos" :query="{ rated: 'TV-Y7' }" :transition="true" class="mt-4" />
    <nf-section title="Do Japão" :query="{ country: 'Japan, USA' }" :transition="true" class="mt-4" />
    <nf-section title="Recomendado para todos os públicos" :query="{ rated: 'TV-G' }" :transition="true" class="mt-4" />
    <nf-footer />
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
