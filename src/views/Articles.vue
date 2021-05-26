<template>
    <div class="d-flex flex-column mt-5 pt-5 mb-5">
      <div v-if="userRecommendArticles.length" class="container">
        <h4 class="text-start fw-bold">
          {{this.$store.getters.decodedToken.username}}님이 좋아할 만한 노트
        </h4>
        <ArticleSplide :articles="userRecommendArticles"/>
      </div>
      <div class="container">
        <h4 class="text-start fw-bold my-3">전체 노트</h4>
        <div v-for="article in articles" :key="article.id">
          <Article :article="article"/>
          <hr>
        </div>
      </div>
    </div>
</template>

<script>
import Article from '@/components/Article'
import ArticleSplide from '@/components/ArticleSplide'

export default {
  name: 'Articles',
  components: {
    Article,
    ArticleSplide,
  },
  created: function () {
    if (!this.$store.state.userToken) {
      this.$router.push({ name:'Login' })
      return
    }
    this.$store.dispatch('getArticles')
    this.$store.dispatch('getUserRecommendArticles')
  },
  computed: {
    articles: function () {
      return this.$store.state.articles
    },
    userRecommendArticles: function () {
      return this.$store.state.userRecommendArticles 
    },
  }
}
</script>
  
<style>
.title {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
hr {
  width: 70%;
}
</style>