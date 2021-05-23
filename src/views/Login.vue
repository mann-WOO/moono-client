<template>
  <div class="section d-flex align-items-center justify-content-center">
    <div>
      <h1>Login</h1>
      <p>ID</p>
      <input type="text" v-model="credentials.username">
      <p>PW</p>
      <input type="password" @keyup.enter="getToken" v-model="credentials.password">
      <br>
      <br>
      <button @click="getToken">Login</button>
      <br>
      <br>
      <router-link :to="{ name:'Signup' }">Sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    getToken: function () {
      this.$store.dispatch('getToken', this.credentials)
    }
  }
}
</script>

<style scoped>

</style>