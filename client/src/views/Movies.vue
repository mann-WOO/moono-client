<template>
  <div>
    <p v-for="movie in movies" :key="movie.id">
      {{ movie.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Movies',
  created: function () {
    this.$store.dispatch('getMovies')
  },
  computed: {
      movies: function () {
        return this.$store.state.movies
      }
  }
}
</script>

<style>

</style>