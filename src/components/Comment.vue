<template>
  <div>
    <h3>Comments</h3>
    <div v-if="articleDetail.comment_set.length">
      <p v-for="comment in articleDetail.comment_set" 
      :key="comment.id">
        {{comment.content}}
        <button>edit</button>
        <button @click="deleteComment(comment.id)">delete</button>
      </p>
    </div>
    <input type="text" v-model="commentContent">
    <button @click="createComment">submit</button>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    articleDetail: Object,
  },
  data: function () {
    return {
      commentContent: ''
    }
  },
  methods: {
    createComment: function () {
      const commentData = {
        content: this.commentContent,
        user: this.$store.getters.decodedToken.user_id,
        article: this.$route.params.id
      }
      this.$store.dispatch('createComment', commentData)
      this.commentContent = ''
    },
    deleteComment: function (commentId) {
      this.$store.dispatch('deleteComment', commentId)
    }
  }
}
</script>

<style>

</style>