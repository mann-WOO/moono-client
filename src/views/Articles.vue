<template>
  <div class="d-flex flex-column mt-5 pt-5">
    <div class="container">
      <div v-for="article in articles" :key="article.id">
        <Article :article="article"/>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
import Article from '@/components/Article'

export default {
  name: 'Articles',
  components: {
    Article,
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
hr {
  width: 70%;
}
</style>