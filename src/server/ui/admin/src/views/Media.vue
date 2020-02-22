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
      <v-tab @click="getAllVideos()">
        <v-icon left>mdi-file-video-outline</v-icon>
        Video
      </v-tab>

      <v-tab-item>

        <v-row justify="center">
          <v-col
            class="centered-block"
            cols="7" sm="4" md="3">


            <form method="post" enctype="multipart/form-data">
              <v-file-input name="image" enctype="multipart/form-data" accept="image/x-png,image/gif,image/jpeg"
                            label="Image input" ref="image"
                            prepend-icon="mdi-camera"
                            @change="handleFile"></v-file-input>
              <v-btn
                type="button"
                :disabled="!valid"
                color="success"
                @click="uploadImage"
                class="mr-4">
                Upload image
              </v-btn>

            </form>
          </v-col>

        </v-row>


        <v-row justify="center" v-if="!images">
          <h5>Images not found</h5>
        </v-row>
        <v-row>
          <v-col v-for="item in images" cols="4">

            <v-row class="subheading paddingHorizontal20" justify="space-between">
              <span>{{item.author}}</span>
              <v-btn x-small
                     color="secondary"
                     @click="removeMediaItem(item.id, item.fileName, item.fileType)"
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
            <p>{{item.createdAt}}</p>
          </v-col>
        </v-row>

      </v-tab-item>

      <v-tab-item>

        <v-row justify="center">
          <v-col
            class="centered-block"
            cols="7" sm="4" md="3">

            <form method="post" enctype="multipart/form-data">
              <v-file-input name="video" enctype="multipart/form-data" accept="video/*"
                            label="Video input" ref="video"
                            prepend-icon="mdi-video"
                            @change="handleFile"></v-file-input>
              <v-btn
                type="button"
                :disabled="!valid"
                color="success"
                @click="uploadImage"
                class="mr-4">
                Upload video
              </v-btn>

            </form>
          </v-col>
        </v-row>

        <v-row>

        </v-row>

      </v-tab-item>


    </v-tabs>

  </v-container>
</template>

<script>
  let moment = require('moment');

  import mediaCRUD from './../actions/mediaCRUD';

  export default {
    name: "Media",
    data() {
      return {
        images: null,
        videos: null,
        valid: true,
        fileUpload: null,
      }
    },

    mounted() {
      this.getAllImages();
    },

    methods: {
      getAllImages() {
        mediaCRUD.getAllImages().then((data) => {

          if (data.message) {
            return;
          }

          this.images = [];

          data.forEach((item) => {

            let image = {
              id: item._id,
              fileName: item.fileName,
              fileType: item.fileType,
              author: item.authorName,
              src: 'http://localhost:8080/media/images/' + item.fileName,
              createdAt: moment(item.createdAt).format('l-HH:mm')
            };

            console.log('image', image)

            this.images.unshift(image);
          })
        })
      },

     async removeMediaItem(id, name, type) {

        console.log('type', type)
        if (confirm('Confirm removing image: ' + name)) {

          await mediaCRUD.deleteFile(id).then((res) => {
            this.getAllImages();
            // if(type == 'images') {
            //   this.getAllImages();
            // } else {
            //   this.getAllVideos();
            // }
          })

        }
      },

      handleFile(e) {
        if (!e) {
          return;
        }
        let file = e;
        file.author = 'current author';
        file.dataType = 'image';

        this.fileUpload = new FormData();
        this.fileUpload.append('images', file);

      },

      uploadImage() {
        if (!this.fileUpload) {
          return alert('File must be attached')
        }

        mediaCRUD.uploadImage(this.fileUpload).then((res) => {
          this.getAllImages();
        });

      },

      getAllVideos() {
        // mediaCRUD.getAllVideos().then((data) => {
        //
        //   if (data.message) {
        //     return;
        //   }
        //
        //   this.images = [];
        //
        //   data.forEach((item) => {
        //
        //     let video = {
        //       id: item._id,
        //       fileName: item.fileName,
        //       fileType: item.fileType,
        //       author: item.authorName,
        //       src: 'http://localhost:8080/media/video/' + item.fileName,
        //       createdAt: moment(item.createdAt).format('l-HH:mm')
        //     };
        //
        //     console.log('video', video)
        //
        //     this.videos.unshift(video);
        //   })
        // })
      }
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