<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Search Movie</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <!-- modal body -->
      <div class="modal-body">
        <input type="text" v-model="searchInput" @keyup.enter="searchMovie">
        <button @click="searchMovie">search</button>
        <div v-if="searchedMovies">
          <br>
          <p v-for="movie in searchedMovies" :key="movie.id">
            {{movie.title}}
            <button @click="selectMovie(movie.title, movie.id)" data-bs-dismiss="modal">
              select
            </button>
          </p>
        </div>
      </div>
      <!-- modal body end -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'MovieSearchModal',
  data: function () {
    return {
      searchInput: ''
    }
  },
  methods: {
    searchMovie: function () {
      this.$store.dispatch('searchMovie', this.searchInput)
    },
    selectMovie: function (title, id) {
      this.$emit('select-movie', title, id)
      this.$store.dispatch('resetSearchedMovies')
      this.searchInput = ''
    }
  },
  computed: {
    searchedMovies: function() {
      return this.$store.state.searchedMovies
    }
  },
}
</script>

<style>

</style>