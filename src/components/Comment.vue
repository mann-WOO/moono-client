<template>
  <div class="container comment-container d-flex justify-content-center">
    <div class="d-flex flex-column align-items-start comment-container">
      <h3>Comments</h3>
      <!-- comments -->
      <div 
        class="d-flex flex-column align-items-start"
        v-if="articleDetail.comment_set.length">
        <div v-for="comment in articleDetail.comment_set" 
        :key="comment.id"
        :id="'comment-' + comment.id"
        class="my-3 d-flex justify-content-start align-items-start">
          <!-- comment item content -->
          <div class="d-inline d-flex justify-content-start">
            <img class="userlogo" src="@/assets/images/diver.svg" alt="">
            <span class="ms-1 me-3"><strong>{{comment.user.username}}</strong></span>
          </div>
          <div class="d-inline text-start">
            <span>{{comment.content}}</span>
          </div>
          <!-- comment item buttons -->
          <div v-if="isMyComment(comment.user.username)" class="d-inline d-flex">
            <button
              class="mx-2 btn btn-outline-primary py-0"
              @click="startEdit(comment.id)">
              edit
            </button>
            <button 
              class="btn btn-outline-danger py-0"
              data-bs-toggle="modal"
              data-bs-target="#commentDeleteModal"
              @click="modalDeleteComment(comment.id)">
              delete
            </button>
          </div>
        </div>
      </div>
      <!-- comment form -->
      <div class="d-flex">
        <input type="text" v-model="commentContent" class="me-1 comment-input">
        <button @click="createComment" class="btn btn-outline-primary py-1">New</button>
      </div>
      <!-- comment delete modal -->
      <div class="modal fade" id="commentDeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="ModalLabel">댓글 삭제</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              정말 삭제하시겠어요?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary py-1" data-bs-dismiss="modal">Close</button>
              <button @click="deleteComment(deleteModalId)" type="button" class="btn btn-outline-danger py-1" data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      commentContent: '',
      deleteModalId: '',
    }
  },
  methods: {
    createComment: function () {
      if (!this.commentContent) {
        alert('댓글 내용을 입력해주세요!')
      } else {
        const commentData = {
          content: this.commentContent,
          user: this.$store.getters.decodedToken.user_id,
          article: this.$route.params.id
        }
        this.$store.dispatch('createComment', commentData)
        this.commentContent = ''
      }
    },
    modalDeleteComment: function (commentId) {
      this.deleteModalId = commentId
    },
    deleteComment: function (commentId) {
      this.$store.dispatch('deleteComment', commentId)
    },
    startEdit: function(commentId) {
      const targetComment = document.querySelector(`#comment-${commentId}`)
      console.log(targetComment)
    },
    isMyComment: function (username) {
      return username===this.$store.getters.decodedToken.username
    }
  }
}
</script>

<style scoped>
  .comment-container {
    width: 67%;
  }
  .comment-input {
    width: 30rem;
  }
  .userlogo {
    width: 2rem;
  }
</style>