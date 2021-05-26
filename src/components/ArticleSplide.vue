<template>
  <splide :options="options">
    <splide-slide class="article-component" v-for="article in articles" :key="article.id">
      <ArticleSplideItem :article="article"/>
    </splide-slide>
  </splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import ArticleSplideItem from '@/components/ArticleSplideItem.vue'

export default {
  name: 'AticleSplide',
  components: {
    Splide,
    SplideSlide,
    ArticleSplideItem,
  },
  data: function () {
    return {
      options: {
        rewind : false,
        speed: 1000,
        perPage: 2,
        gap    : '0rem',
        pagination: false,
        lazyLoad: 'nearby',
        preloadPages: 2,
      },
    }
	},
  props: {
    articles: Array
  },
}
</script>

<style>
  .article-component {
    height: 18rem;
  }
</style>