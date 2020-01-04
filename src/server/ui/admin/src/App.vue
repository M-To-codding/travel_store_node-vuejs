<template>
    <div id="app">

        <v-app id="inspire">
            <!--            <nav id="top-nav">-->
            <!--                <router-link to="/">Home</router-link>-->
            <!--                |-->
            <!--                <router-link to="/users">Users</router-link>-->
            <!--            </nav>-->

            <div id="nav">
                <LeftSideNav :links="links"/>
            </div>

            <v-content>

                <v-container
                        fluid
                >

                    <router-view/>
                </v-container>
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

        vuetify: new Vuetify({
            theme: {dark: true},
        }),

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

    .container {
        padding: 50px;
    }
</style>
