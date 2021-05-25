<template>
  <div class="d-flex flex-column gap-5 mt-5 pt-5">
    <div class="container">
      <h4 class="text-start fw-bold">전체 영화</h4>
      <SplideComponent :movies="movies"/>
    </div>
    <div class="container">
      <h4 class="text-start fw-bold">전체 영화</h4>
      <SplideComponent :movies="movies"/>
    </div>
    <div class="container">
      <h4 class="text-start fw-bold">전체 영화</h4>
      <SplideComponent :movies="movies"/>
    </div>
    <div class="container">
      <h4 class="text-start fw-bold">전체 영화</h4>
      <SplideComponent :movies="movies"/>
    </div>
  </div>
  
</template>

<script>
import SplideComponent from '@/components/SplideComponent'

export default {
  name: 'Movies',
  components: {
    SplideComponent,
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