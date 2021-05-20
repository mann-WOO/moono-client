<template>
  <div>
    <p v-for="article in articles" 
    :key="article.id">
    <router-link :to="{ name: 'ArticleDetail', params: {id: article.id}}">
    {{ article.title }}
    </router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Articles',
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

</style>