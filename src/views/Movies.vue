<template>
  <div class="d-flex flex-column gap-5 mt-5 pt-5 mb-5">
    <div v-if="userRecommendMovies.length" class="container">
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
      <h4 class="text-start fw-bold">최근 한 달간 개봉한 영화</h4>
      <SplideComponent :movies="latestMovies"/>
    </div>
    <div class="container">
      <h4 class="text-start fw-bold">MOONO 평점이 가장 높은 영화</h4>
      <SplideComponent :movies="topRatedMovies"/>
    </div>
    <div class="container">
      <h4 class="text-start fw-bold">TMDB 투표가 가장 많은 영화</h4>
      <SplideComponent :movies="popularMovies"/>
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
    if (!this.$store.state.userToken) {
      this.$router.push({ name:'Login' })
      return
    }    
    this.$store.dispatch('getMovies')
    this.$store.dispatch('getUserRecommendMovies')
    this.$store.dispatch('getLatestMovies')
    this.$store.dispatch('getPopularMovies')
    this.$store.dispatch('getTopRatedMovies')
  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    },
    userRecommendMovies: function () {
      return this.$store.state.userRecommendMovies
    },
    latestMovies: function () {
      return this.$store.state.latestMovies
    },
    popularMovies: function () {
      return this.$store.state.popularMovies
    },
    topRatedMovies: function () {
      return this.$store.state.topRatedMovies
    },
  }
}
</script>

<style>

</style>