<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped>
            <ul>
                <v-list-item
                        class="list-item"
                        v-for="(item, i) in links"
                        v-if="!item.isAdmin"
                        :key="'path-'+i"
                        @click="goToPage(item.path)">

                    <v-icon :class="[item.icon]">{{ item.icon }}</v-icon>
                    {{item.name}}

                </v-list-item>
                <v-list-item
                        class="list-item"
                        v-for="(item, i) in links"
                        v-if="item.isAdmin && currentUser.is_admin"
                        :key="'path-'+i"
                        @click="goToPage(item.path)">

                    <v-icon :class="[item.icon]">{{ item.icon }}</v-icon>
                    {{item.name}}

                </v-list-item>
            </ul>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>
                {{currentPageTitle}}
                Dashboard
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu
                    left
                    bottom
            >
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item
                            v-for="action in userActions"
                            v-if="action.auth === auth"
                            :key="action.name"
                            @click="goToPage(action.path, action.name)">
                        <v-list-item-title>{{ action.name }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

    </div>
</template>


<script>
  import Vuetify from 'vuetify';

  const axios = require('axios');
  import auth from './../../actions/auth';


  export default {
    vuetify: new Vuetify({
      theme: { dark: true },
    }),

    data: () => ({
      drawer: null,
      model: 1,
      userActions: [
        {
          name: 'sign in',
          path: '/sign-in',
          auth: false
        },
        {
          name: 'sign up',
          path: '/sign-up',
          auth: false
        },
        {
          name: 'sign out',
          path: '/sign-out',
          auth: true
        },
      ]

    }),

    props: {
      currentUser: Object,
      source: String,
      links: Array,
      currentPageTitle: String,
      auth: Boolean,
      isAuthorized: Function,
    },

    methods: {
      checkAuth() {
        if (!this.isAuthorized()) {
          this.$router.push('/sign-in');
        } else {
          // this.$router.push( '/sign-in');
        }
      },

      goToPage(path, name) {
        if (name === 'sign out') {
          this.signOut();
        } else {
          this.drawer = !this.drawer;
          this.$router.push(path);
        }
      },

      signOut() {
        auth.signOut(axios).then(() => {
          this.checkAuth();
        });

      }
    },
    components: {},

  }
</script>

<style scoped>
    .list-item {
        cursor: pointer;
        list-style: none;
        padding: 10px 20px;
        text-align: left;
    }

</style>