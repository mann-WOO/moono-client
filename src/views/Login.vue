<template>
  <div class="section d-flex align-items-center justify-content-center">
    <div class="d-flex flex-column align-items-center">
      <h1 class="my-3">Login</h1>
      <p class="my-1">ID</p>
      <input type="text" v-model="credentials.username">
      <p class="mt-3 mb-1">PW</p>
      <input type="password" @keyup.enter="getToken" v-model="credentials.password">
      <button @click="getToken" class="my-3 py-1 d-block btn btn-outline-primary">Login</button>
      <p>아직 회원이 아니세요? <router-link :to="{ name:'Signup' }">Sign up</router-link></p>
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