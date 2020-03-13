<template>
    <div id="app">

        <v-app id="app-content">

            <div id="nav" v-if="auth">
                <LeftSideNav :currentUser="user" :links="links" :auth="auth" :isAuthorized="isAuthorized"/>
            </div>

            <v-content id="main-content">
                <router-view :isAuthorized="isAuthorized" :currentUser="user"/>
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
        token: null,
        user: null,
        role: null,
        auth: false,
        pageTitle: '',
        links: [{
          name: 'Dashboard',
          path: '/',
          icon: 'mdi-view-dashboard',
          isAdmin: false
        },
          {
            name: 'Users',
            path: '/users',
            icon: 'mdi-account-group',
            isAdmin: true
          },
          {
            name: 'Data transfer',
            path: '/data-transfer',
            icon: 'mdi-file-upload-outline',
            isAdmin: true
          },
          {
            name: 'Media',
            path: '/media',
            icon: 'mdi-library-video',
            isAdmin: false
          },
          {
            name: 'Invoice-test',
            path: '/invoice',
            icon: 'mdi-credit-card',
            isAdmin: false
          },
        ]
      }
    },

    created() {
    },

    mounted() {
      if (!this.isAuthorized() && this.$route.name !== 'sign-in') {
        this.$router.push('/sign-up');
      } else {
        this.receiveCurrentUserData();
      }

    },

    updated() {
      this.isAuthorized()
    },

    vuetify: new Vuetify({
      theme: { dark: true },
    }),

    methods: {
      isAuthorized() {
        this.token = localStorage.getItem('user-token');

        if (this.token) {
          this.auth = true;
          return true;
        } else {
          this.auth = false;
          return false;
        }
      },

      receiveCurrentUserData() {
        const token = this.token;

        if(token) {
          const base64Url = token.split('.')[1];
          const decodedValue = JSON.parse(window.atob(base64Url));

          this.user = decodedValue;
          console.log('decodedValue', decodedValue);
        }
      },
    },

    watch:{
     $route(to, from) {
       if(from.name === 'sign-in') {
         this.receiveCurrentUserData();
       }
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
