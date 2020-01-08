<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <ul>
                <v-list-item
                        class="list-item"
                        v-for="(item, i) in links"
                        :key="'path-'+i"
                        avatar
                        @click="goToPage(item.path)"
                >

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
                            v-for="n in 2"
                            :key="n"
                            @click="() => {}"
                    >
                        <v-list-item-title>Option {{ n }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

        </v-app-bar>

    </div>
</template>


<script>
    import Vuetify from 'vuetify';

    export default {
        vuetify: new Vuetify({
            theme: {dark: true},
        }),

        data: () => ({
            drawer: null,
            model: 1

        }),
        methods: {
            goToPage(path) {
                this.drawer = !this.drawer;
                this.$router.push(path);
            }
        },
        props: {
            source: String,
            links: Array,
            currentPageTitle: String
        },
        components: {
        },

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