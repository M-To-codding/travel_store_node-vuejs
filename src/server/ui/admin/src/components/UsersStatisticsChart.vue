<template>
  <v-container
    fluid
    justify="center"
    style="padding-top: 90px;"
  >

    <GChart
      type="ColumnChart"
      :data="chartData"
      :options="chartOptions"
    />

  </v-container>
</template>

<script>
  import { GChart } from 'vue-google-charts';

  let moment = require('moment');

  export default {
    name: 'UsersStatistics',

    data() {
      return {
        usersData: [],
        chartData: [
          ['year', 'month'],
        ],
        chartOptions: {
          title: 'Users registration statistics',
          subtitle: 'day month, year',
          description: 'day month, year',
        },
        dates: {
          year: [],
          month: [],
        }

      }
    },

    mounted() {
      this.prepareUsersData();
    },

    methods: {
      prepareUsersData() {
        // this.usersData = this.users;
        this.users.forEach((user, index) => {
          this.parseDate(user.registered);
        })
        this.dates.year = this.checkItems(this.dates.year);
        this.dates.month = this.checkItems(this.dates.year);

      },

      parseDate(date) {
        let year,
          month,
          formattedDate = moment(date).format('l');

        month = formattedDate.substring(0, formattedDate.indexOf('/'));
        year = formattedDate.substring(formattedDate.indexOf("/") + 4);

        console.log('formattedDate', formattedDate, month, year);
      },


    },

    props: {
      users: Array,
    },

    components: {
      GChart
    }
  }
</script>

<style scoped>

</style>