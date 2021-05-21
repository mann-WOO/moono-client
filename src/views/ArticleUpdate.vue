<template>
  <div>
    <h1>기능 완성 안됨</h1>
    <p>Title</p>
    <input type="text" v-model="articleTitle">
    <p>Select Movie</p>
    <input disabled type="text" v-model="movieTitle">
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
    <button @click="updateArticle">submit</button>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MovieSearchModal from '@/components/MovieSearchModal'

export default {
  name: 'ArticleUpdate',
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
    updateArticle: function () {
      const articleData = {
        title: this.articleTitle,
        content: this.editorData,
        movie: this.movieId,
        user: this.$store.getters.decodedToken.user_id
      }
      this.$store.dispatch('updateArticle', articleData)
    }
  },
  // 일단 글 디테일에서 들어왔다고 가정하고 기존 글 입력
  computed: {
    articleDetail: function () {
      return this.$store.state.articleDetail
    }
  },
  mounted: function() {
    this.articleTitle = this.$store.state.articleDetail.title
    this.editorData += this.$store.state.articleDetail.content
    console.log(this.$store.state.articleDetail.content)
    this.movieId = this.$store.state.articleDetail.movie
    this.movieTitle = this.$store.state.articleDetail.movie
    this.user = this.$store.state.articleDetail.user_id
  }
}
</script>

<style>

</style>