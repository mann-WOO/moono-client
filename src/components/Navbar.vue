<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
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
            v-if="this.$store.state.userToken"
            class="nav-link">
            Profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name:'Login' }" v-if="!this.$store.state.userToken" class="nav-link">
            Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="#" @click.native="deleteToken" class="nav-link">Logout</router-link>
        </li>
      </ul>
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