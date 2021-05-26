<template>
  <div class="container mt-5 pt-5">
    <div class="d-flex flex-column mt-3 align-items-start">
      <div class="d-flex justify-content-center align-items-center">
        <h1 v-if="!isMyProfile" class="mb-0">{{ this.$route.params.username }}'s Profile</h1>
        <h1 v-else>My Profile</h1>
        <!-- follow -->
        <div v-if="!isMyProfile">
          <button 
          class="mt-2 ms-3 btn btn-outline-primary py-0 follow-button" 
          @click="toggleFollow" @mouseover="onMousefollow" @mouseout="outMousefollow"
          v-show="!followStatus">
            not following
          </button>
          <button @mouseover="onMouseUnfollow" @mouseout="outMouseUnfollow" @click="toggleFollow" 
          v-show="followStatus"
          class="mt-2 ms-3 btn btn-primary py-0 follow-button" >
            following
          </button>
        </div>
      </div>
      <!-- profile contents -->
      <div>
        <p class="text-start">
          <span>{{ followersCount }} followers • </span>
          <span>{{ userProfile.followings_count }} followings</span>
        </p>
        <h4 class="text-start">평점을 준 영화</h4>
        <h4 class="text-start">작성한 노트</h4>
        <p>{{ userProfile }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  created: function () {
    this.$store.dispatch('getProfile', this.$route.params.username)
  },
  watch: {
    profileUsername: function () {
      this.$store.dispatch('getProfile', this.$route.params.username)
    },
  },
  computed: {
    userProfile: function () {
      return this.$store.state.userProfile
    },
    followStatus: function () {
      return this.userProfile.followers.some((follower) => {
        return follower.id === this.$store.getters.decodedToken.user_id
      })
    },
    isMyProfile: function () {
      return this.$route.params.username===this.$store.getters.decodedToken.username
    },
    followersCount: function () {
      return this.userProfile.followers.length
    },
    profileUsername: function () {
      return this.$route.params.username
    },
  },
  methods: {
    // async await - state 변화 일어나면 프로필정보 새로고침
    toggleFollow: async function () {
      await this.$store.dispatch('toggleFollow', this.$route.params.username)
      this.$store.dispatch('getProfile', this.$route.params.username)
    },
    onMousefollow: function (event) {
      event.target.innerText = "follow"
    },
    outMousefollow: function (event) {
      event.target.innerText = "not following"
    },
    onMouseUnfollow: function (event) {
      event.target.innerText = "unfollow"
    },
    outMouseUnfollow: function (event) {
      event.target.innerText = "following"
    },
  }
}
</script>

<style scoped>
  .follow-button {
    width: 8rem;
  }
</style>