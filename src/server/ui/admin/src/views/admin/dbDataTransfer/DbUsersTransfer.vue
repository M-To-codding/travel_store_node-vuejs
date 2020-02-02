<template>
  <v-container
      fluid
      justify="center"
      style="padding-top: 90px;"
  >

    <v-row justify="center">
      <h1 class="title">Users transfer</h1>
    </v-row>

    <v-row justify="center">
      <v-col cols="1" sm="6" md="4" justify="center">
        <h3 class="title">Import data</h3>
        <v-file-input name="files[]" enctype="multipart/form-data" accept=".csv" label="File input" ref="file"
                      @change="handleFile"></v-file-input>
        <v-btn small @click="importData()">Upload</v-btn>
      </v-col>

      <v-col cols="1" sm="6" md="2" justify="center">
        <h3 class="title">Export data</h3>
        <a target="_blank" href="http://localhost:8080/api/v1/admin/users/export-csv">
          <v-btn large>Generate csv file</v-btn>
        </a>
      </v-col>

    </v-row>

    <v-row ref="preview"></v-row>

  </v-container>
</template>

<script>
  import userTransfer from '../../../actions/userTransfer';


  export default {
    name: 'DbUsersTransfer',
    data() {
      return {
        file: null,
        fileData: '',
        parsedCsv: [],
        fileLink: null,
      }
    },
    mounted() {
    },
    methods: {

      csvJSON(csv) {

        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {

          var obj = {};
          var currentline = lines[i].split(",");

          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }

          result.push(obj);
        }

        return JSON.stringify(result);
      },


      handleFile(e) {

        if (!e) {
          return;
        }

        let that = this;

        let reader = new FileReader();
        reader.readAsText(e);

        reader.onload = (event) => {

          let csv = event.target.result;
          that.fileData = that.csvJSON(csv);
          // that.importData(that.fileData);

          reader.onerror = function (event2) {
            if (event2.target.error) {
              alert("Error reading the file");
            }
          };

        }
      },

      importData() {
        if (!this.fileData) {
          return alert('File must be attached')
        }

        userTransfer.importCsv(this.fileData)
            .then((response) => {
              console.log('response', response)
              if (response.status === 200) {
                alert(response.message);
              }
              if (response.status === 500) {
                alert('Server error');
              }
            });
      },

      exportData() {
        userTransfer.exportCsv()
            .then((response) => {
              console.log('response', response)
              if (response.status === 200) {
                alert('File was generated');
                setTimeout(() => {
                  window.open(response.link);
                  // window.loadURL(response.link);
                  this.fileLink = response.link;
                }, 1000)
              }
              if (response.error) {
                alert(response.error);
              }
            });
      }
    },
  }
</script>

<style scoped>
  .title {
    padding: 30px 0;
  }

</style>