<template>
  <div class="py-3 px-3 d-flex flex-column align-items-center" >
    <!-- 영화 상세페이지 링크 -->
    <router-link
      class= "text-decoration-none mb-1"
      :to="{ name: 'MovieDetail', params: {id: article.movie} }">
    <p class="movie-of-article">{{ articleMovieTitle }}</p>
    </router-link>
    <!-- Article 상세 페이지 링크 -->
    <router-link 
      class="text-decoration-none text-dark" 
      :to="{ name: 'ArticleDetail', params: {id: article.id}}"
    >
      <div @mouseover="onMouse" @mouseout="outMouse"
        class="d-flex flex-column align-items-center">
        <h4 id="title" class="mb-3" :class="{ underline:isUnderline }">{{article.title}}</h4>
        <p class="text-center article-preview">{{ articleContent }}</p>
      </div>
    </router-link>
    <!-- 좋아요 수, 작성일 -->
    <p class="mb-0 text-dark">
      <span>{{ article.like_users.length}} likes • </span>
      <span>created at {{ article.created_at.slice(0,10) }}</span>
    </p>
    <!-- 글쓴이 프로필 링크 -->
    <router-link
      class= "text-decoration-none text-dark"
      :to="{ name: 'Profile', params: {username: article.user.username} }">
      <p 
        class="mb-0"
        @mouseover="onMouseProfile"
        @mouseout="outMouseProfile"
        :class="{ underline:profileUnderline }">
        by {{ article.user.username }}
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data: function () {
    return {
      isUnderline: false,
      profileUnderline: false
    }
  },
  props: {
    article: Object,
  },
  methods: {
    onMouse: function () {
      this.isUnderline = true
    },
    outMouseProfile: function () {
      this.profileUnderline = false
    },
    onMouseProfile: function () {
      this.profileUnderline = true
    },
    outMouse: function () {
      this.isUnderline = false
    },
  },
  computed: {
    articleContent: function () {
      const text = this.article.content.replace(/<\/?[^>]+(>|$)/g, "")
      if (text.length < 110) {
        return text
      } else {
        return text.slice(0,110) + '...'
      }
    },
    articleMovieTitle: function () {
      const articleMovie = this.$store.state.movies.find((movie) => {
        return movie.id === this.article.movie
      })
      return articleMovie.title
    },
  },
}
</script>

<style scoped>
  .underline {
    text-decoration: underline;
  }
  .movie-of-article {
    color: #58a798;
    margin-bottom: 0;
    text-decoration: underline;
  }
  .article-preview {
    color: gray;
    width: 60%;
  }
</style>