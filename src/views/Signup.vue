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
      if (!this.credentials.username) {
        alert('ID를 입력해주세요.')
      } else if (!this.credentials.password) {
        alert('비밀번호를 입력해주세요.')
      } else if (!this.credentials.passwordConfirmation) {
        alert('비밀번호 확인란을 입력해주세요.')
      } else if (this.credentials.password !== this.credentials.passwordConfirmation) {
        alert('입력하신 비밀번호와 비밀번호 확인란이 일치하지 않습니다.')
      } else {
        axios({
          method: 'post',
          url: `${SERVER_URL}/accounts/signup/`,
          data: this.credentials,
        })
          .then(() => {
            this.$router.push({ name:'Login' })
          })
          .catch(() => {
            alert('사용할 수 없는 ID 입니다. 다른 ID를 입력해주세요.')
          })
      }
    }
  }
}
</script>

<style>

</style>