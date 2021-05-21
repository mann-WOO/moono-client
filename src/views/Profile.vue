<template>
  <div>
    <!-- follow -->
    <button @click="togglefollow" v-show="!followStatus">
      follow
    </button>
    <button @click="togglefollow" v-show="followStatus">
      unfollow
    </button>
    <hr>
    <!-- profile contents -->
    {{ userProfile }}

  </div>
</template>

<script>
export default {
  name: 'Profile',
  created: function () {
    this.$store.dispatch('getProfile', this.$route.params.username)
  },
  computed: {
    userProfile: function () {
      return this.$store.state.userProfile
    },
    followStatus: function () {
      return this.userProfile.followers.includes(this.$store.getters.decodedToken.user_id)
    }
  },
  methods: {
    toggleFollow: function () {
      this.$store.dispatch('toggleFollow', this.$route.params.username)
    }
  }
}
</script>

<style>

</style>