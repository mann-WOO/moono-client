<template>
  <div>
    <p v-html="articleDetail.content"></p>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetail',
  created: function () {
    this.$store.dispatch('getArticleDetail', this.$route.params.id)
  },
  computed: {
    articleDetail: function () {
      return this.$store.state.articleDetail
    }
  }
}
</script>

<style>

</style>