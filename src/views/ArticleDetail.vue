<template>
  <div class="d-flex flex-column mt-5 pt-5">
    <div class="container mt-5">
      <div class="d-flex flex-column align-items-center">
        <!-- head -->
        <h2 class="mb-3">{{ articleDetail.title }}</h2>
        <p class="mb-0">about {{ articleMovieTitle }}</p>
        <p class="mb-0">
          <span>{{ articleDetail.created_at.slice(0,10) }} • </span>
          <span>by {{articleDetail.user.username}}</span>
        </p>
        <hr>
        <!-- article contents -->
        <div class="a-detail-content">
          <p v-html="articleDetail.content"></p>
        </div>
        <!-- like / delete buttons -->
        <div class="article-buttons d-flex justify-content-end">
          <!-- like button -->
          <div>
            <button class="btn btn-outline-primary py-1 button-width" @click="toggleLike" v-show="!likeStatus">
              like
            </button>
            <button class="btn btn-primary py-1 button-width" @click="toggleLike" v-show="likeStatus">
              unlike
            </button>
          </div>
          <!-- delete button 추후 모달로 업데이트 -->
          <div v-if="isMyArticle" class="ms-3">
            <button class="btn btn-outline-danger py-1 button-width" @click="deleteArticle">delete</button>
          </div>
        </div>
        <!-- article content end -->
        <hr>
      </div>
    </div>



    <!-- 댓글 -->
    <Comment :articleDetail="articleDetail"/>
    <br>
    <br>
    <br>
    <br>
    <br>
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
    },
    articleMovieTitle: function () {
      const articleMovie = this.$store.state.movies.find((movie) => {
        return movie.id === this.articleDetail.movie
      })
      return articleMovie.title
    },
    isMyArticle: function () {
      return this.articleDetail.user.username===this.$store.getters.decodedToken.username
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

<style scoped>
  .a-detail-content {
    width: 65%;
  }
  .article-buttons {
    width: 65%;
  }
  .button-width {
    width: 4.5rem;
  }
</style>