<template>
  <div class="container">
    <h4 class="text-start fw-bold">영화</h4>
      <splide :options="options">
        <splide-slide v-for="movie in movies" :key="movie.id">
          <Movie :movie="movie"/>
        </splide-slide>
      </splide>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import Movie from '@/components/Movie'

export default {
  name: 'Movies',
  components: {
    Splide,
    SplideSlide,
    Movie,
  },
  data: function () {
    return {
      options: {
        rewind : false,
        speed: 1000,
        perPage: 5,
        gap    : '0rem',
        pagination: false,
        lazyLoad: 'nearby',
        preloadPages: 2,
      },
    }
	},
  created: function () {
    this.$store.dispatch('getMovies')
  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    },
  }
}
</script>

<style>

</style>