<template>
  <div>
    <p v-html="articleDetail.content"></p>
    <router-link :to="{ name:'ArticleUpdate' }">
      <button>edit</button>
    </router-link>
    
    <!-- 추후 모달로 업데이트 -->
    <button @click="deleteArticle">delete</button>

    <hr>
    <!-- 댓글 -->
    <Comment :articleDetail="articleDetail"/>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'

export default {
  name: 'ArticleDetail',
  components: {
    Comment
  },
  created: function () {
    this.$store.dispatch('getArticleDetail', this.$route.params.id)
  },
  computed: {
    articleDetail: function () {
      return this.$store.state.articleDetail
    }
  },
  methods: {
    deleteArticle: function () {
      this.$store.dispatch('deleteArticle', this.$route.params.id)
    }
  }
}
</script>

<style>

</style>