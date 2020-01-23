<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container
    fluid
    justify="center"
    style="padding-top: 50px;">

    <v-row justify="center">
      <h1 class="title">Sign up</h1>
    </v-row>

    <v-col
      class="centered-block"
      cols="8" sm="6" md="4">

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>

        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwRules"
          ref="passw"
          label="Password"
          type="password"
          required></v-text-field>

        <!--                <v-text-field-->
        <!--                        v-model="confirmPassw"-->
        <!--                        :rules="confirmPasswRules"-->
        <!--                        ref="confirmPassw"-->
        <!--                        label="Confirm password"-->
        <!--                        required></v-text-field>-->

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          type="button"
          @click="signUp"
          required>
          Sign up
        </v-btn>
        <v-btn x-small
               color="secondary"
               @click="goTo('/sign-in')"
               dark>Sign in
        </v-btn>


      </v-form>
    </v-col>

  </v-container>

</template>

<script>
  import auth from './../actions/auth';

  const axios = require('axios');


  export default {
    name: "SignUp",
    data: () => {
      return {
        valid: true,
        name: '',

        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],

        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        password: '',
        confirmPassw: '',
        passwRules: [
          v => !!v || 'Password is required',
        ],
        confirmPasswRules: [
          v => !!v || 'Password confirmation is required',
        ],
      };

    },

    methods: {
      validate() {
        this.valid = true;
        if (this.$refs.form.validate()) {
          this.snackbar = true;
        }
      },
      signUp() {
        this.validate();

        if (this.valid) {
          const user = {
            password: this.password,
            email: this.email,
            name: this.name,
          };
          auth.register(axios, user).then((res) => {
            if (res.status === 400) {
              alert(res.data.message);
            } else {
              console.log('res.data', res.data);
              this.goTo('/sign-in', res.data);
            }
          });
        } else {
          console.log('not valid !')
        }
      },

      goTo(path, userData) {
        this.$router.push({ path, query: { userData } });
      },
    },
    props: {
      isAuthorized: Function
    },
  }
</script>

<style scoped>
  .title {
    padding: 30px 0;
  }

  .centered-block {
    margin: auto;
    justify-content: center;
  }

  .not-valid {
    border-bottom: 1px solid red;
  }
</style>