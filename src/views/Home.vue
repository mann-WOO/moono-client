<template>
  <div>
    <!-- 로그인 되지 않았을 때 Home -->
    <div v-if="!this.$store.state.userToken">
      <!-- section -->
      <div class="full-center flex-column d-flex align-items-center justify-content-center">
        <header class="d-flex flex-column justify-content-center section">
          <h1 class="py-5">서비스 소개</h1>

          <h2 class="py-5">서비스를 소개합니다.</h2>
        </header>
        
        <router-link :to="{ name:'Login' }" class="nav-link">
          <button type="button" class="btn btn-outline-primary px-5">
            Start
          </button>
        </router-link>
      </div>
    </div>
    <!-- 로그인 되었을 때 Home -->
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
}

</script>

<style scoped>

</style>