<template>
  <div>
    <!-- article contents -->
    <p v-text="articleDetail"></p>

    
    <!-- article edit -->
    <!-- <router-link :to="{ name:'ArticleUpdate' }">
      <button>edit</button>
    </router-link> -->
    
    <!-- 삭제 - 추후 모달로 업데이트 -->
    <button @click="deleteArticle">delete</button>

    <br>
    <!-- like -->
    <button @click="toggleLike" v-show="!likeStatus">
      like
    </button>
    <button @click="toggleLike" v-show="likeStatus">
      unlike
    </button>
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
    },
    likeStatus: function () {
      return this.articleDetail.like_users.includes(this.$store.getters.decodedToken.user_id)
    }
  },
  methods: {
    deleteArticle: function () {
      this.$store.dispatch('deleteArticle', this.$route.params.id)
    },
    toggleLike: function () {
      this.$store.dispatch('toggleLike', this.$route.params.id)
    }
  }
}
</script>

<style>

</style>