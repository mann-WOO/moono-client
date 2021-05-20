<template>
  <div></div>
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
      }
    }
}
</script>

<style>

</style>