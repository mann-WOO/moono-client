<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light my-3">
  <div class="container-fluid">
    <!-- 로고 -->
    <a class="navbar-brand" href="#">
      <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
      Service Name
    </a>

    <!-- 라우터 링크 리스트 -->
    <div v-if="this.$store.state.userToken">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'Movies'}">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'Articles'}">Articles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name:'ArticleNew'}">Write</router-link>
          </li>
          <li class="nav-item">
            <router-link 
              :to="{ name:'Profile', params:{username:this.$store.getters.decodedToken.username} }" 
              class="nav-link">
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="#" @click.native="deleteToken" class="nav-link">Logout</router-link>
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

</style>