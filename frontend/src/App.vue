<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->


  <div class="app-admin-wrap layout-sidebar-vertical sidebar-full">
    <CompSidebar />
    <div class="main-content-wrap mobile-menu-content bg-off-white m-0">
      <CompTopbar />

      <router-view />
      
      <CompFooter />
    </div>
  </div>

</template>

<script>
import CompFooter from './components/CompFooter.vue';
import CompSidebar from './components/CompSidebar.vue';
import CompTopbar from './components/CompTopbar.vue';

export default {
  name: 'App',
  components: {
    CompSidebar,
    CompFooter,
    CompTopbar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
