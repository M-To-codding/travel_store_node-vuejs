<template>
  <div id="app">

    <v-app id="app-content">

      <div id="nav" v-if="auth">
        <LeftSideNav :links="links"/>
      </div>

      <v-content id="main-content">
        <router-view/>
      </v-content>

      <v-footer app>
        <span>&copy; 2019</span>
      </v-footer>

    </v-app>

  </div>
</template>

<script>
  import LeftSideNav from './components/navigation/LeftSideNav';
  import Vuetify from 'vuetify';

  export default {
    name: "Home",

    data() {
      return {
        auth: false,
        pageTitle: '',
        links: [{
          name: 'Dashboard',
          path: '/',
          icon: 'mdi-view-dashboard'
        },
          {
            name: 'Users',
            path: '/users',
            icon: 'mdi-view-dashboard'
          },]
      }
    },

    created() {
      if (!this.auth) {
        this.$router.push('/sign-up');
      }

      this.checkAuth();
    },

    vuetify: new Vuetify({
      theme: { dark: true },
    }),

    methods: {
      checkAuth() {
        this.auth = true;
      }
    },

    components: {
      LeftSideNav
    }
  }
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #top-nav {
    padding: 30px;
  }

  #top-nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #top-nav a.router-link-exact-active {
    color: #42b983;
  }

</style>
