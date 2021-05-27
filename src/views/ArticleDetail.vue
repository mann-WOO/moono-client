<template>
  <div class="d-flex flex-column mt-5 pt-5">
    <div class="container mt-5">
      <div class="d-flex flex-column align-items-center">
        <!-- head -->
        <h2 class="mb-3">{{ articleDetail.title }}</h2>
        <p class="mb-0">
          about 
          <router-link class= "text-decoration-none"
            :to="{ name: 'MovieDetail', params: {id: articleDetail.movie} }">
            <span class="movie-of-article">{{ articleMovieTitle }}</span>
          </router-link>
        </p>
        <p class="mb-0">
          <span>{{ articleDetail.created_at.slice(0,10) }} • </span>
          <span>
            <router-link
              class= "text-decoration-none text-dark"
              :to="{ name: 'Profile', params: {username: articleDetail.user.username} }">
              <span 
                class="mb-0"
                @mouseover="onMouseProfile"
                @mouseout="outMouseProfile"
                :class="{ underline:profileUnderline }">
                by {{ articleDetail.user.username }}
              </span>
            </router-link>
          </span>
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
            <button 
              class="btn btn-outline-danger py-1 button-width"
              data-bs-toggle="modal"
              data-bs-target="#articleDeleteModal">
              delete
            </button>
          </div>
        </div>
        <!-- article content end -->
        <hr>
        <!-- article delete modal -->
        <div class="modal fade" id="articleDeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">노트 삭제</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                정말 삭제하시겠어요?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary py-1" data-bs-dismiss="modal">Close</button>
                <button @click="deleteArticle" type="button" class="btn btn-outline-danger py-1" data-bs-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- 댓글 -->
    <Comment :articleDetail="articleDetail" class="mb-5"/>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'

export default {
  name: 'ArticleDetail',
  components: {
    Comment,
  },
  data: function () {
    return {
      profileUnderline: false
    }
  },
  created: function () {
    if (!this.$store.state.userToken) {
      this.$router.push({ name:'Login' })
      return
    }
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
    },
    onMouseProfile: function () {
      this.profileUnderline = true
    },
    outMouseProfile: function () {
      this.profileUnderline = false
    },
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
  .movie-of-article {
  color: #58a798;
  margin-bottom: 0;
  text-decoration: underline;
  }
  .underline {
    text-decoration: underline;
  }
</style>