<template>
  <div>
    <p v-for="movie in movies" 
    :key="movie.id">
      <router-link :to="{ name: 'MovieDetail', params: {id: movie.id}}">
        <div class="card" style="width: 18rem;">
          <img :src="movie.poster_path" class="card-img-top" :alt="movie.title">
          <div class="card-body">
            <p class="card-text">{{ movie.title }}</p>
          </div>
        </div>
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