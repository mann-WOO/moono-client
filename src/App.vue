<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  methods: {
    deleteToken: function () {
      this.$store.dispatch('deleteToken')
    }
  }
}
</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.section {
  position: absolute;
  width: 100%;
  height: 100%;
}

.bg-primary {
  background-color: #61BFAD !important;
}

.btn-outline-primary {
  color: #61BFAD;
  border-color: #61BFAD;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #61BFAD;
  border-color: #61BFAD;
}

.btn-outline-primary:focus, .btn-outline-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(28, 160, 138, 0.705);
}

.btn-outline-primary.disabled, .btn-outline-primary:disabled {
  color:  #61BFAD;
  background-color: transparent;
}

.btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle {
  color: #fff;
  background-color:  #61BFAD;
  border-color:  #61BFAD;
}

.btn-primary {
  color: #fff;
  background-color: #61BFAD;
  border-color: #61BFAD;
}
.btn-primary:hover {
  color: #fff;
  background-color: #be5d6d;
  border-color: #be5d6d;
}
.btn-primary:focus, .btn-primary.focus {
  color: #fff;
  background-color: #61BFAD;
  border-color: #61BFAD;
  box-shadow: 0 0 0 0.2rem rgba(28, 160, 138, 0.705);
}
.btn-primary.disabled, .btn-primary:disabled {
  color: #fff;
  background-color: #61BFAD;
  border-color: #61BFAD;
}
.btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #61BFAD;
  border-color: #61BFAD;
}
.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-primary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.2rem rgba(28, 160, 138, 0.705);
}
</style>
