<template>
  <div class="bg-white" @mouseover="upHere = true" @mouseleave="upHere = false">
    <router-link 
      class="text-decoration-none text-dark" 
      :to="{ name: 'ArticleDetail', params: {id: article.id}}"
    >
      <h5 class="p-3 mb-0" :class="{ title: upHere }">{{ article.title }}</h5>
      <div class="p-2" v-html="article.content"></div>
      <p class="text-secondary mb-0">{{ article.user.username }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data: function () {
    return {
      upHere: false,
    }
  },
  props: {
    article: Object,
  },
}
</script>

<style>

</style>