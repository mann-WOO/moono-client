<template>
  <div class="section d-flex align-items-center justify-content-center">
      <div class="d-flex flex-column align-items-center">
        <h1 class="my-3">Signup</h1>
        <p class="my-1">ID</p>
        <input type="text" v-model="credentials.username">
        <p class="my-1">PW</p>
        <input type="password" v-model="credentials.password">
        <p class="my-1">PW Confirmation</p>
        <input type="password" @keyup.enter="signup" v-model="credentials.passwordConfirmation">
        <button @click="signup" class="my-3 py-1 d-block btn btn-outline-primary">Signup</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/signup/`,
        data: this.credentials,
      })
        .then((res) => {
          console.log(res)
          this.$router.push({ name:'Login' })
        })
        .then((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>