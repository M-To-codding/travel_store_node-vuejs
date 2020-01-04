<template>
    <div>
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <ul>
                <li
                        class="list-item"
                        v-for="(item, i) in links"
                        :key="'path-'+i"
                        avatar
                        @click="goToPage(item.path)"
                >

                    <v-icon :class="[item.icon]">{{ item.icon }}</v-icon>
                    {{item.name}}

                </li>
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
        </v-app-bar>

    </div>
</template>


<script>
    import Vuetify from 'vuetify';
    // import {VListItem, VListItemTitle, VListItemContent} from "vuetify/lib";

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
                this.$router.push(path);
            }
        },
        props: {
            source: String,
            links: Array,
            currentPageTitle: String
        },
        components: {
            // 'v-list-item': VListItem,
            // 'v-list-item-title': VListItemTitle,
            // 'v-list-item-content': VListItemContent,
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