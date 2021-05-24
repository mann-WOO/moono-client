<template>
  <div class="section d-flex align-items-center justify-content-center container">
    <div class="d-flex flex-column align-items-start">
      <p class="mb-0">Title</p>
      <input class="my-1" type="text" v-model="articleTitle">
      <p class="mt-2 mb-0">Select Movie</p>
      <div class="d-flex">
        <input class="me-1" disabled type="text" v-model="movieTitle">
        <!-- button trigger modal -->
        <button class="btn btn-outline-secondary py-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Search
        </button>
      </div>
      <!-- Modal -->
      <MovieSearchModal @select-movie="onSelect"/>
      <p class="mt-2 mb-0">Content</p>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      <button class="mt-1 py-1 btn btn-outline-primary" @click="createArticle">submit</button>
    </div>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MovieSearchModal from '@/components/MovieSearchModal'

export default {
  name: 'ArticleNew',
  components: {
    ckeditor: CKEditor.component,
    MovieSearchModal: MovieSearchModal,
  },
  data: function () {
    return {
      // CKEditor
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {},
      //
      articleTitle: '', 
      movieTitle: '',
      movieId: null,
    }
  },
  methods: {
    onSelect: function (title, id) {
      this.movieTitle = title
      this.movieId = id
    },
    createArticle: function () {
      const articleData = {
        title: this.articleTitle,
        content: this.editorData,
        movie: this.movieId,
        user: this.$store.getters.decodedToken.user_id
      }
      this.$store.dispatch('createArticle', articleData)
    }
  }
}
</script>

<style>

</style>