<template>
  <div class="my-1 mx-1 px-2 py-2 rounded" :class="{ shadow: upHere }" @mouseover="upHere = true" @mouseleave="upHere = false">
    <router-link class="h-100 text-decoration-none text-dark" :to="{ name: 'MovieDetail', params: {id: movie.id}}">
      <!-- <div class="card border-0">
        <img :data-splide-lazy="movie.poster_path" class="poster-card card-img-top" :alt="movie.title">
        <div class="card-body">
          <p class="card-text fw-bold">{{ movie.title }}</p>
          <p class="card-text text-secondary">{{ movie.release_date }}</p>
        </div>
      </div> -->
      <div class="d-flex flex-column h-100">
        <img 
          class="rounded"
          :src="movie.poster_path" 
          :alt="movie.title"
        >
        <div class="d-flex flex-column text-start">
          <p class="fw-bold mb-0 mt-2">{{ movieTitle }}</p>
          <p class="my-0">{{ movie.release_date }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  data: function () {
    return {
      upHere: false
    }
  },
    props: {
      movie: Object,
    },
  computed: {
    movieTitle: function () {
      if (this.movie.title.length > 14) {
        return this.movie.title.slice(0, 15) + '...'
      } else {
        return this.movie.title
      }
    },
  }
}
</script>

<style scoped>
  img {
    vertical-align: top;
    width: auto;
    height: 22rem;
    object-fit: cover;
  }
</style>