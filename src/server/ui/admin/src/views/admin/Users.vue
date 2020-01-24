<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container
    fluid
    justify="center"
    style="padding-top: 90px;"
  >

    <v-card>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account-group</v-icon>
          Users
        </v-tab>
        <v-tab>
          <v-icon left>mdi-chart-bar</v-icon>
          Statistics
        </v-tab>

        <v-tab-item>
          <v-data-table
            :headers="headers"
            :items="usersData"
            :items-per-page="5"
            class="elevation-1"
            item-key="id"
          >

            <template v-slot:top>
              <v-toolbar flat dark>
                <v-toolbar-title>All Users</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn class="mx-2" fab light small color="white" v-on="on">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ popupTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              ref="name"
                              v-model="editedItem.name"
                              :rules="fieldsValidation.name"
                              label="User name"
                              required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              ref="email"
                              v-model="editedItem.email"
                              :rules="fieldsValidation.email"
                              label="User email"
                              required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4" v-if="editedIndex <= -1">
                            <v-text-field
                              ref="email"
                              v-model="editedItem.password"
                              :rules="fieldsValidation.password"
                              label="User password"
                              required></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">

                            <v-select
                              ref="role"
                              v-model="editedItem.role"
                              :items="roles"
                              label="Select role"
                              :rules="fieldsValidation.role"
                            ></v-select>

                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">

              <v-btn
                class="mx-2"
                fab light small
                color="white"
                @click="editUser(item)">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>


              <v-btn
                class="mx-2"
                fab light small
                color="white"
                @click="deleteUser(item)">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>

            </template>

          </v-data-table>

        </v-tab-item>
        <v-tab-item>
          <UsersStatisticsChart :users="users"/>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>

</template>

<script>
  import userCRUD from '../../actions/userCRUD';
  import UsersStatisticsChart from '../../components/UsersStatisticsChart';

  const axios = require('axios');

  export default {
    name: "Users",
    data() {
      return {
        users: null,
        headers: [
          {
            text: 'All users',
            align: 'left',
            sortable: false,
            value: 'index',
          },
          {
            text: 'Name', value: 'name',
          },
          {
            text: 'Role', value: 'role',
          },
          {
            text: 'Email', value: 'email',
          },
          // {
          //   text: 'Passw', value: 'password',
          // },
          {
            text: 'Registered', value: 'registered',
          },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        usersData: [],
        editedItem: {
          name: '',
          role: '',
          email: '',
          // password: ''
        },
        defaultItem: {
          name: '',
          role: '',
          email: '',
          registered: new Date(),
          // password: ''
        },
        sendItem: {},
        dialog: false,
        editedIndex: -1,
        roles: ['author', 'admin'],
        adminExists: false,
        fieldsValidation: {
          name: [() => !!this.editedItem.name || 'This field is required'],
          email: [() => !!this.editedItem.email || 'This field is required'],
          role: [() => !!this.editedItem.role || 'This field is required']
        },
        errorMessages: '',
        formHasErrors: false
      }
    },

    props: {
      currentUser: Object
    },

    created() {
      this.prepareDataForTable.bind(this);
      // eslint-disable-next-line no-console
      console.log('users', this.users);

      this.getAllUsers();
    },

    mounted() {

    },

    computed: {
      popupTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    methods: {

      prepareDataForTable() {
        this.usersData = [];
        this.adminExists = false;
        this.roles = ['author', 'admin'];

        this.users.forEach((user, index) => {
          let options = {};

          // if(user.isAdmin|| user.role === 'admin') {
          //   user.isAdmin = true;
          //   this.adminExists = true;
          //   this.roles = ['author'];
          // }

          this.editedItem.index = index + 1;
          options.index = index + 1;
          options.id = user._id;
          options.role = user.role;
          options.name = user.name;
          options.email = user.email;
          // options.password = user.password;
          options.registered = user.createdAt;


          if (this.currentUser._id === user._id) {
            return;
          }

          this.usersData.push(options);
        })
        // eslint-disable-next-line no-console
        console.log(this.usersData)
      },

      getAllUsers() {

        userCRUD.getAllUsers(axios).then((res) => {
          if (res.respType != 'empty') {
            this.users = res;
          } else {
            // eslint-disable-next-line no-console
            console.log('empty users list');
          }
        }).then(() => {
          if (this.users) {
            this.prepareDataForTable();
          }
        });
      },

      close() {
        this.dialog = false;

        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;

        this.resetForm();
      },

      saveUser() {
        this.formHasErrors = false;

        Object.keys(this.editedItem).forEach(f => {

          if (!this.editedItem[f]) {
            this.formHasErrors = true;
          }

          if (this.$refs[f]) {
            this.$refs[f].validate(true);
          }
        });

        if (this.formHasErrors) {
          return;
        }

        if (this.editedItem.role === 'admin') {
          this.editedItem.isAdmin = true;
        } else {
          this.editedItem.isAdmin = false;
        }

        if (this.editedIndex > -1) {
          Object.assign(this.usersData[this.editedIndex], this.editedItem);

          userCRUD.updateUser(axios, this.editedItem).then((res) => {
            this.users = res;
          }).then(() => {
            this.getAllUsers();
          });

        } else {

          userCRUD.createUser(axios, this.editedItem).then((res) => {
            this.users = res;
          }).then(() => {
            this.getAllUsers();
          });
        }

        // this.sendItem = {};

        this.close();
      },

      editUser(item) {
        // eslint-disable-next-line no-console
        console.log('item', item);

        this.editedIndex = this.usersData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteUser(item) {
        let result = confirm(`Confirm deleting user ${item.name}`);

        // eslint-disable-next-line no-console
        console.log('item', item)
        if (result) {
          userCRUD.deleteUser(axios, item).then(() => {
            this.getAllUsers();
          })
        }

        return result;
      },

      resetForm() {
        this.errorMessages = [];
        this.formHasErrors = false;

        Object.keys(this.editedItem).forEach(f => {
          if (this.$refs[f]) {
            this.$refs[f].reset()
          }
        })

      }
    },

    components: {
      UsersStatisticsChart
    },

  }
</script>

<style scoped>
  .title {
    padding: 30px 0;
  }
</style>