<template  xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <v-container
                fluid
                justify="center"
                style="padding-top: 50px;"
        >

            <v-row justify="center">
                <h1 class="title">Dashboard</h1>
            </v-row>

        </v-container>

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


<style scoped>
    .title {
        padding: 30px 0;
        color: #fff;
    }

    .centered-block {
        margin: auto;
        justify-content: center;
    }
</style>