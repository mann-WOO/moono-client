<template>
  <div id="app">
    <Navbar/>
    <!-- 
    <div id="nav">
      <router-link :to="{ name:'Home' }">Home</router-link> |
      <router-link :to="{ name:'Movies'}">Movies</router-link> |
      <router-link :to="{ name:'Articles'}">Articles</router-link> |
      <router-link :to="{ name:'ArticleNew'}">Write</router-link> |

      <router-link 
      :to="{ name:'Profile', params:{username:this.$store.getters.decodedToken.username} }" 
      v-if="this.$store.state.userToken">
        Profile |
      </router-link>

      <router-link :to="{ name:'Login' }" v-if="!this.$store.state.userToken">
        Login
      </router-link>

      <router-link to="#" @click.native="deleteToken" v-else>Logout</router-link>

    </div>
     -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  methods: {
    deleteToken: function () {
      this.$store.dispatch('deleteToken')
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
