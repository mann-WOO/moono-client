<template>
  <div class="bg-light mt-5">
    <div class="container pt-5">
      <p class="text-start h4 fw-bold px-3 pb-3 mb-0">이야기</p>
      <splide :options="options">
        <splide-slide class="" v-for="article in articles" :key="article.id">
          <Article :article="article"/>
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import Article from '@/components/Article'

export default {
  name: 'Articles',
  components: {
    Splide,
    SplideSlide,
    Article,
  },
  data: function () {
    return {
      options: {
        rewind : false,
        speed: 1000,
        perPage: 4,
        gap    : '1rem',
        pagination: false,
      },
    }
	},
  created: function () {
    this.$store.dispatch('getArticles')
  },
  computed: {
    articles: function () {
      return this.$store.state.articles
    }
  }
}
</script>
  
<style>
.title {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
</style>