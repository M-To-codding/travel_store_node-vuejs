<template>

    <v-container
            fluid
            justify="center"
            style="padding-top: 50px;"
    >

        <v-row justify="center">
            <h1 class="title">Users</h1>
        </v-row>

        <v-row class="actions" justify="center">


        </v-row>
        <v-data-table
                :headers="headers"
                :items="usersData"
                :items-per-page="5"
                class="elevation-1"
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
                                            <v-text-field v-model="editedItem.name" label="User name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.email" label="User email"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.registered" label="Date of registration"></v-text-field>
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
            <!--            <template v-slot:no-data>-->
            <!--                <v-btn color="primary" @click="initialize">Reset</v-btn>-->
            <!--            </template>-->


        </v-data-table>
    </v-container>
</template>

<script>
    import {userCRUD} from './../actions/userCRUD';

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
                        value: 'id',
                    },
                    {
                        text: 'Name', value: 'name',
                    },
                    {
                        text: 'Email', value: 'email',
                    },
                    {
                        text: 'Registered', value: 'registered',
                    },
                    {text: 'Actions', value: 'action', sortable: false},
                ],
                usersData: [],
                editedItem: {
                    name: '',
                    email: '',
                    registered: new Date()
                },
                defaultItem: {
                    name: '',
                    email: '',
                    registered: new Date()
                },
                dialog: false,
                editedIndex: -1,
            }
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
                let options = {};

                this.users.forEach((user, index) => {

                    this.editedItem.id = index + 1;
                    options.id = index + 1;
                    options.name = user.name + ' (' + user.role + ')';
                    options.email = user.email;
                    options.registered = user.createdAt;


                    this.usersData.push(options);
                })
            },

            getAllUsers() {

                userCRUD.getAllUsers(axios).then((res) => {
                    this.users = res;
                }).then(() => {
                    this.prepareDataForTable();
                });
            },

            close() {
                this.dialog = false;

                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            },

            saveUser() {
                if(this.editedIndex > -1) {
                    Object.assign(this.usersData[this.editedIndex], this.editedItem);
                } else {

                    userCRUD.updateUser(axios, this.editedItem).then((res) => {
                        this.users = res;
                    }).then(() => {
                        this.getAllUsers();
                    });
                }
            },
            editUser(item) {
                // eslint-disable-next-line no-console
                console.log('item', item);

                this.editedIndex = this.usersData.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteUser(id, name = 'User') {
                let result = confirm(`Confirm deleting user ${name}`);
                return result;
            }

        }
    }
</script>

<style scoped>
    .title {
        padding: 30px 0;
    }
</style>