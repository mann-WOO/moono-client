<template>
  <div>
    <!-- 로그인 되지 않았을 때 Home -->
    <div v-if="!this.$store.state.userToken" class="d-flex sections">
      <!-- section1 -->
      <div class="section d-flex gap-5 align-items-center justify-content-center">
        <div>
          <img src="@/assets/images/octopus.svg" alt="" class="cover-image">
        </div>
        <div>
          <header class="d-flex flex-column justify-content-center">
            <h1 class="py-5">Movie Note, MOONO</h1>
            <p>MOONO는 영화에 관한 글을 공유하는 플랫폼입니다.</p>
            <p>매일 다른 키워드가 사용자에게 주어집니다.</p>
            <p>키워드에 맞는 추천 영화와 다른 사용자의 글을 확인하세요!</p>
          </header>

          <router-link :to="{ name:'Login' }" class="nav-link my-3">
            <button type="button" class="btn btn-outline-primary px-5">
              시작하기
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 로그인 되었을 때 Home -->
    <div v-if="this.$store.state.userToken" class="d-flex flex-column gap-5 mt-5 pt-5">
      <div class="container">
        <h4 class="text-start fw-bold">키워드 추천 영화</h4>
        <SplideComponent :movies="movies"/>
      </div>
      <div class="container">
        <h4 class="text-start fw-bold">키워드 추천 영화</h4>
        <SplideComponent :movies="movies"/>
      </div>
    </div>
  </div>
</template>

<script>
import SplideComponent from '@/components/SplideComponent.vue'

export default {
  name: 'Home',
  components: {
    SplideComponent,
  },
  created: function () {
    this.$store.dispatch('getKeywordMovies')
    // 슬라이드 위해서 뿐 아니라 반드시 있어야함 Article에서 쓴다.
    this.$store.dispatch('getMovies')
  },
  computed: {
    movies: function () {
      return this.$store.state.movies
    },
    keywordMovies: function () {
      return this.$store.state.keywordMovies
    }
  }
}

</script>

<style scoped>
  .logo {
    width: 2.5rem;
  }
  .cover-image {
    width: 80%
  }
</style>