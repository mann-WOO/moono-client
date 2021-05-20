<template>
  <div>
    <h1>Signup</h1>
    <p>ID</p>
    <input type="text" v-model="credentials.username">
    <p>PW</p>
    <input type="password" v-model="credentials.password">
    <p>PW Confirmation</p>
    <input type="password" @keyup.enter="signup" v-model="credentials.passwordConfirmation">
    <br>
    <br>
    <button @click="signup">Signup</button>
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