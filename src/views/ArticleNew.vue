<template>
  <div>
    <p>Title</p>
    <input type="text" v-model="articleTitle">
    <p>Select Movie</p>
    <input type="text" v-model="movieTitle">
    <!-- button trigger modal -->
    <button data-bs-toggle="modal" data-bs-target="#exampleModal">
    Search
    </button>
    <!-- Modal -->
    <MovieSearchModal @select-movie="onSelect"/>
    <br>
    <br>
    <p>Content</p>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    <br>
    <button @click="createArticle">submit</button>
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