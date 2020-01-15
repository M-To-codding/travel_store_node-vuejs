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
            label="Password"
            type="password"
            required></v-text-field>

        <v-text-field
            v-model="confirmPassw"
            :rules="passwRules"
            label="Confirn password"
            required></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="password"
            @click="signUp">
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
        passwRules: [],
      };

    },

    methods: {
      signUp() {
        this.validate();

        if (valid) {
          const user = {
            password: this.password,
            email: this.email,
            name: this.name,
          }
          register(user);
        }
      },

      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
        }
      },
      goTo(path) {
        this.$router.push(path);
      },
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
</style>