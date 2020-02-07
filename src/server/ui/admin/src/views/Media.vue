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


            <form method="post" enctype="multipart/form-data">
              <v-file-input name="files[]" enctype="multipart/form-data" accept="image/x-png,image/gif,image/jpeg"
                            label="File input" ref="file"
                            @change="handleFile"></v-file-input>
              <v-btn
                type="button"
                :disabled="!valid"
                color="success"
                class="mr-4">
                Upload image
              </v-btn>

            </form>
          </v-col>

        </v-row>


        <v-row>
          <v-col v-for="item in images" cols="5">

            <v-row class="subheading paddingHorizontal20" justify="space-between">
              <span>{{item.author}}</span>
              <v-btn x-small
                     color="secondary"
                     @click="removeMediaItem(item.src)"
                     dark>
                X
              </v-btn>
            </v-row>
            <v-img
              :key="item.src"
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
        valid: true,
        fileUpload: null,
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

    methods: {
      removeMediaItem(url) {
        if (confirm('Confirm removing image: ' + url)) {
          alert('Image removed');
        }
      },
      handleFile(e) {
        if (!e) {
          return;
        }

        let that = this;
        this.fileUpload = e;
        const formData = new FormData();
        formData.append('files[]', e);
        console.log('file', e, formData);
      },
    },
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

  .paddingHorizontal20 {
    padding: 0 20px;
  }
</style>