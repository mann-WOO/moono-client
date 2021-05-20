<template>
  <div>
    <p v-for="movie in movies" 
    :key="movie.id">
    <router-link :to="{ name: 'MovieDetail', params: {id: movie.id}}">
    {{ movie.title }}
    </router-link>
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