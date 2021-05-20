import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import jwt_decode from "jwt-decode"

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
    searchedMovies: null
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
    }
  },
  actions: {
    getMovies: function (context) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/movies/`
      })
      .then((res) =>{
        context.commit('GET_MOVIES', res.data)
      })
    },
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
    getToken: function (context, credentials) {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/api-token-auth/`,
        data: credentials
      })
        .then((res) => {
          context.commit('GET_TOKEN', res.data.token)
        })
    },
    deleteToken: function (context) {
      context.commit('DELETE_TOKEN')
    },
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
    getArticleDetail: function (context, articleId) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/articles/${articleId}/`
      })
        .then((res) => {
          context.commit('GET_ARTICLE_DETAIL', res.data)
        })
    },
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
    resetSearchedMovies: function (context) {
      context.commit('RESET_SEARCHED_MOVIES')
    },
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
          console.log(res)
        })
        .then((err) => {
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
