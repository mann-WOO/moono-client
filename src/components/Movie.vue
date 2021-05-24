<template>
  <div class="mb-4 mx-3 rounded" :class="{ shadow: upHere }" @mouseover="upHere = true" @mouseleave="upHere = false">
    <router-link class="text-decoration-none text-dark" :to="{ name: 'MovieDetail', params: {id: movie.id}}">
      <div class="card border-0">
        <img :data-splide-lazy="movie.poster_path" class="card-img-top" :alt="movie.title">
        <div class="card-body">
          <p class="card-text fw-bold">{{ movie.title }}</p>
          <p class="card-text text-secondary">{{ movie.release_date }}</p>
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
  }
}
</script>

<style>

</style>