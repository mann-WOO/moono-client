<template>
  <div class="d-flex flex-column gap-5 mt-5 pt-5">
    <div class="container">
      <h4 class="text-start fw-bold">
        {{this.$store.getters.decodedToken.username}}님이 좋아할 만한 영화
        </h4>
      <SplideComponent :movies="userRecommendMovies"/>
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
    this.$store.dispatch('getUserRecommendMovies')

  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    },
    userRecommendMovies: function () {
      return this.$store.state.userRecommendMovies
    }
  }
}
</script>

<style>

</style>