<template>
  <div class="container">
    <div class="row gx-5 mt-3">
      <img class="col-5" :src="movieDetail.poster_path" :alt="movieDetail.title">
      <div class="col-7">
        <div class="d-flex flex-column justify-content-center">
          <h3 class="text-start fw-bold mt-5">{{ movieDetail.title }}</h3>
          <p class="text-start text-secondary mt-3">{{ movieDetail.release_date }} &bull; {{ genres }}</p>
          <p class="text-start">{{movieDetail.overview}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MovieDetail',
    created: function () {
      this.$store.dispatch('getMovieDetail', this.$route.params.id)
    },
    computed: {
      movieDetail: function () {
        return this.$store.state.movieDetail
      },
      genres: function () {
        return this.movieDetail.genres.map((genre) => {
          return genre.name
        }).join('/')
      }
    }
}
</script>

<style>

</style>