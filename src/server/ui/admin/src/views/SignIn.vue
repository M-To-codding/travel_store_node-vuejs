<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container
    fluid
    justify="center"
    style="padding-top: 50px;">

    <v-row justify="center">
      <h1 class="title">Sign in</h1>
    </v-row>

    <v-col
      class="centered-block"
      cols="8" sm="6" md="4">

      <v-form
        ref="form"
        v-model="valid"
        lazy-validation>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwRules"
          label="Password"
          type="password"
          required></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="signIn">
          Sign in
        </v-btn>
        <v-btn x-small
               color="secondary"
               @click="goTo('/sign-up')"
               dark>Sign up
        </v-btn>

      </v-form>
    </v-col>

  </v-container>

</template>

<script>
  import auth from './../actions/auth';

  const axios = require('axios');


  export default {
    name: "SignIn",

    data: () => {
      return {
        auth: false,
        valid: true,

        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        password: '',
        passwRules: [
          v => !!v || 'Password is required',],
      };

    },

    mounted() {

      this.checkAuth();
      setTimeout(() => {
        this.checkParams();
      }, 600);

    },

    methods: {
      checkAuth() {
        if (this.isAuthorized()) {
          this.$router.push('/');
        } else {
          // this.$router.push( '/sign-in');
        }
      },

      signIn(e, params, skipValidation) {
        if (skipValidation) {
          this.valid = true;
        } else {
          this.validate();
        }

        if (this.valid) {
          const user = params ? params : {
            email: this.email,
            password: this.password,
          }

          auth.signIn(axios, user).then((res) => {
            if (res && res.status === 400) {
              alert(res.data.message);
            } else {
              this.checkAuth();
            }
          })
        }
      },
      goTo(path) {
        this.$router.push(path);
      },

      validate() {
        this.valid = true;
        if (this.$refs.form.validate()) {
          this.snackbar = true;
        }
      },

      checkParams() {
        if (this.$route && this.$route.query.userData) {
          const user = {
            email: this.$route.query.userData.email,
            password: this.$route.query.userData.password
          }

          this.signIn(this.event, user, true);
        }
      }
    },

    props: {
      isAuthorized: Function
    },
  }
</script>

<style scoped>
  .title {
    padding: 30px 0;;
  }

  .centered-block {
    margin: auto;
    justify-content: center;
  }
</style>