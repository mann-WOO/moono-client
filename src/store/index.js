import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import jwt_decode from "jwt-decode"
import router from '../router'

const SERVER_URL = process.env.VUE_APP_SERVER_URL

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    movies: null,
    movieDetail: null,
    userToken: null,
    articles: null,
    articleDetail: null,
    searchedMovies: null,
    userProfile: null,
  },
  mutations: {
    GET_MOVIES: function (state, movies) {
      state.movies = movies
    },
    GET_MOVIE_DETAIL: function (state, movieDetail) {
      state.movieDetail = movieDetail
    },
    GET_TOKEN: function (state, token) {
      state.userToken = token
    },
    DELETE_TOKEN: function (state) {
      state.userToken = null
    },
    GET_ARTICLES: function (state, articles) {
      state.articles = articles
    },
    GET_ARTICLE_DETAIL: function (state, articleDetail) {
      state.articleDetail = articleDetail
    },
    SEARCH_MOVIE: function (state, searchedMovies) {
      state.searchedMovies = searchedMovies
    },
    RESET_SEARCHED_MOVIES: function (state) {
      state.searchedMovies = null
    },
    CREATE_COMMENT: function (state, comment) {
      state.articleDetail.comment_set.push(comment)
    },
    DELETE_COMMENT: function (state, commentId) {
      state.articleDetail.comment_set = state.articleDetail.comment_set.filter((comment) => {
        return comment.id != commentId
      })
    },
    TOGGLE_LIKE: function (state, likeStatus) {
      if (likeStatus) {
        state.articleDetail.like_users.push(this.getters.decodedToken.user_id)
      } else {
        state.articleDetail.like_users = state.articleDetail.like_users.filter((userId) => {
          return userId != this.getters.decodedToken.user_id
        })
      }
    },
    GET_PROFILE: function (state, userProfile) {
      state.userProfile = userProfile
    },
    TOGGLE_FOLLOW: function (state, followStatus) {
      if (followStatus) {
        state.userProfile.followers.push(this.getters.decodedToken.user_id)
      } else {
        state.userProfile.followers = state.userProfile.followers.filter((userId) => {
          return userId != this.getters.decodedToken.user_id
        })
      }
    }
  },
  actions: {
    // 영화목록 불러오기
    getMovies: function (context) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/movies/`
      })
      .then((res) =>{
        context.commit('GET_MOVIES', res.data)
      })
    },
    // 개별 영화 정보 불러오기
    getMovieDetail: function (context, movieId) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/movies/${movieId}`
      })
        .then((res) => {
          context.commit('GET_MOVIE_DETAIL', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // JWT 토큰 발급받기(로그인)
    getToken: function (context, credentials) {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/api-token-auth/`,
        data: credentials
      })
        .then((res) => {
          context.commit('GET_TOKEN', res.data.token)
          router.push( {name:'Home'} )
        })
    },
    // JWT 토큰 삭제(로그아웃)
    deleteToken: function (context) {
      context.commit('DELETE_TOKEN')
      router.push({ name:'Login' })
    },
    // 글 목록 불러오기
    getArticles: function (context) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/articles/`
      })
        .then((res) => {
          context.commit('GET_ARTICLES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 개별 글 정보 불러오기
    getArticleDetail: function (context, articleId) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/articles/${articleId}/`
      })
        .then((res) => {
          context.commit('GET_ARTICLE_DETAIL', res.data)
        })
    },
    // 제목에 특정 단어를 포함한 영화 목록 불러오기
    // 검색한 단어를 포함한 영화가 있다면 리스트를 반환, 아니라면 null 반환
    searchMovie: function (context, searchWord) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/movies/`
      })
      .then((res) =>{
        const movies = res.data
        const searchedMovies = []
        for (let movie of movies) {
          if (movie.title.includes(searchWord)) {
            searchedMovies.push(movie)
          }
        }
        if (searchedMovies.length > 0) {
          context.commit('SEARCH_MOVIE', searchedMovies)
        } else {
          context.commit('SEARCH_MOVIE', null)
        }
      })
    },
    // 검색영화 목록 초기화하기
    resetSearchedMovies: function (context) {
      context.commit('RESET_SEARCHED_MOVIES')
    },
    // 글 생성
    createArticle: function (context, articleData) {
      axios({
        method: 'post',
        url: `${SERVER_URL}/articles/`,
        data: articleData,
        headers: {
          Authorization: `JWT ${context.state.userToken}`
        }
      })
        .then((res) => {
          // 만들어진 article로 push 시켜주기
          router.push({ name: 'ArticleDetail', params: {id: res.data.id} })
        })
        .then((err) => {
          console.log(err)
        })
    },
    // 글 삭제
    deleteArticle: function  (context, articleId) {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/articles/${articleId}/`,
        headers: {
          Authorization: `JWT ${context.state.userToken}`
        }
      })
        .then(() => {
          router.push({ name:'Articles' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 댓글 생성
    createComment: function (context, commentData) {
      axios({
        method: 'post',
        url: `${SERVER_URL}/articles/${commentData.article}/comments/`,
        data: commentData,
        headers: {
          Authorization: `JWT ${context.state.userToken}`
        }
      })
        .then((res) => {
          context.commit('CREATE_COMMENT', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 댓글 삭제
    deleteComment: function (context, commentId) {
      axios({
        method: 'delete',
        url: `${SERVER_URL}/articles/comments/${commentId}/`,
        headers: {
          Authorization: `JWT ${context.state.userToken}`
        }
      })
        .then(() => {
          context.commit('DELETE_COMMENT', commentId)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 좋아요, 좋아요 취소
    toggleLike: function (context, articleId) {
      axios({
        method: 'post',
        url: `${SERVER_URL}/articles/${articleId}/like/`,
        headers: {
          Authorization: `JWT ${context.state.userToken}`
        }
      })
        .then((res) => {
          context.commit('TOGGLE_LIKE', res.data.like)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 프로필 정보 가져오기
    getProfile: function (context, username) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/accounts/${username}/`
      })
        .then((res) => {
          context.commit('GET_PROFILE', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 팔로우, 팔로우취소
    toggleFollow: function (context, username) {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/${username}/follow/`,
        headers: {
          Authorization: `JWT ${context.state.userToken}`
        }
      })
        .then((res) => {
          context.commite('TOGGLE_FOLLOW', res.data.follow)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  getters: {
    decodedToken: function (state) {
      if (state.userToken) {
        return jwt_decode(state.userToken)
      } else {
        return null
      }
    }
  },
  modules: {
  }
})
