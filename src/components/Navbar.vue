<template>
  <nav class="px-3 navbar fixed-top navbar-expand-lg navbar-light my-3">
  <div class="container-fluid">
    <!-- 로고 -->
    <router-link class="navbar-brand d-flex align-items-center gap-2" :to="{ name:'Home' }">
      <img src="@/assets/images/octopus.svg" alt="octopus logo" class="d-inline-block align-text-top logo">
      <h2 class="mb-0">MOONO</h2>
    </router-link>

    <!-- 라우터 링크 리스트 -->
    <div v-if="this.$store.state.userToken">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link text-dark" :to="{ name:'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" :to="{ name:'Movies'}">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" :to="{ name:'Articles'}">Articles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" :to="{ name:'ArticleNew'}">Write</router-link>
          </li>
          <li class="nav-item">
            <router-link 
              :to="{ name:'Profile', params:{username:this.$store.getters.decodedToken.username} }" 
              class="nav-link text-dark">
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" @click.native="deleteToken" class="nav-link text-dark">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>


  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    deleteToken: function () {
      this.$store.dispatch('deleteToken')
    }
  }
}
</script>

<style>
  .logo {
    width: 2.5rem;
  }
</style>