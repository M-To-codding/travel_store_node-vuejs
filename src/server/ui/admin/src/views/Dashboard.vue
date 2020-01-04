<template>
    <v-app>
        <v-content>
            <h1>Dashboard</h1>
        </v-content>
    </v-app>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'dashboard',
        data: () => {
            return {
                user: null,
                apiData: null
            }
        },

        components: {}
    }
</script>
