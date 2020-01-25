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


  export default {
    name: 'UsersStatistics',

    data() {
      return {
        usersData: [],
        chartData: [
          ['Name', 'Sales', 'Expenses', 'Profit'],
        ],
        chartOptions: {
          title: 'Users statistics',
          subtitle: 'day month, year',
          description: 'day month, year',
        },
        dates: {
          year: [],
          month: [],
          monthYear: [],
        }

      }
    },

    mounted() {
      if (this.users && this.users.length > 0) {
        this.prepareUsersData();
      }
    },

    methods: {
      prepareUsersData() {
        console.log('this.chartData', this.chartData, this.users)
        // this.usersData = this.users;
        this.users.forEach((user, index) => {

          if (user.chartData) {
            this.chartData.push(
              [user.name, user.chartData.sales, user.chartData.expenses, user.chartData.profit]
            )
          }
        });


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