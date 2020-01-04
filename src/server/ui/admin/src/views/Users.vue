<template>
    <div>
        <v-layout>
            <h1>Users</h1>
        </v-layout>
        <v-layout v-if="users">
            <ul class="users-list">
                <li class="list-item" v-for="user of users" :key="user._id">
                    <h3>{{user.name}}</h3>
                    <p>{{user.email}}</p>
                </li>
            </ul>
        </v-layout>
    </div>
</template>

<script>
    import {userCRUD} from './../actions/userCRUD';

    const axios = require('axios');

    export default {
        name: "Users",
        data() {
            return {
                users: null,
            }
        },
        created() {
            userCRUD.getAllUsers(axios).then((res) => {
                this.users = res;
            });
        },
        mounted() {
            // eslint-disable-next-line no-console
            console.log('users', this.users);
        },
    }
</script>

<style scoped>

</style>