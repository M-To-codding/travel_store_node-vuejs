<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container
    fluid
    justify="center"
    style="padding-top: 50px;">

    <v-row>
      <h1 class="title">Media</h1>
    </v-row>

    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-file-image-outline</v-icon>
        Images
      </v-tab>
      <v-tab>
        <v-icon left>mdi-file-video-outline</v-icon>
        Video
      </v-tab>

      <v-tab-item>

        <v-row justify="center">
          <v-col
            class="centered-block"
            cols="7" sm="4" md="3">


            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4">
              Upload image
            </v-btn>
          </v-col>

        </v-row>


        <v-row>
          <v-col v-for="item in images" cols="5">

            <v-img
              :src="item.src"
              :lazy-src="item.src"
              aspect-ratio="1.7"
              class="grey darken-4"
              contain>
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="grey darken-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div class="subheading">{{item.author}}</div>
          </v-col>
        </v-row>

      </v-tab-item>

      <v-tab-item>

        <v-row justify="center">
          <v-col
            class="centered-block"
            cols="7" sm="4" md="3">


            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4">
              Upload video
            </v-btn>
          </v-col>
        </v-row>

        <v-row>

        </v-row>

      </v-tab-item>


    </v-tabs>

  </v-container>
</template>

<script>
  export default {
    name: "Media",
    data() {
      return {
        images: [],
        valid: true

      }
    },

    mounted() {
      this.images = [
        {
          src: require('./../../../../public/media/images/img1.jpg'),
          author: 'Asd',
          date: new Date()
        },
        {
          src: require('./../../../../public/media/images/img2.jpg'),
          author: 'Qwe',
          date: new Date()
        },
        {
          src: require('./../../../../public/media/images/img3.jpg'),
          author: 'Qdmin',
          date: new Date()
        },
      ];
    },

    methods: {}
  }
</script>

<style scoped>
  .title {
    padding: 30px;
  }

  .centered-block {
    margin: auto;
    justify-content: center;
  }
</style>