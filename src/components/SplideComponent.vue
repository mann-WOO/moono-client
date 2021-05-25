<template>
  <splide :options="options">
    <splide-slide class="movie-component" v-for="movie in movies" :key="movie.id">
      <Movie :movie="movie"/>
    </splide-slide>
  </splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import Movie from '@/components/Movie'

export default {
  name: 'SplideComponent',
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
  props: {
    movies: Array
  },
}
</script>

<style>
  .movie-component {
    height: 27rem;
  }
</style>