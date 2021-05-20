import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

const SERVER_URL = process.env.VUE_APP_SERVER_URL

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    movies: null,
    movieDetail: null,
  },
  mutations: {
    GET_MOVIES: function (state, movies) {
      state.movies = movies
    },
    GET_MOVIE_DETAIL: function (state, movieDetail) {
      state.movie = movieDetail
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
    getMovieDetail: function (context, movie_id) {
      axios({
        method: 'get',
        url: `${SERVER_URL}/movies/${movie_id}`
      })
        .then((res) => {
          context.commit('GET_MOVIE_DETAIL', res.data)
        })
    }
  },
  modules: {
  }
})
