<template>
  <v-container text-center mt-5 pt-5>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary">
          <v-form @submit.prevent="handleSigninUser">
            <v-layout row>
              <v-flex xs12 px-10>
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-face"
                  label="Username"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12 px-10>
                <v-text-field
                  v-model="password"
                  prepend-icon="mdi-puzzle"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-btn color="accent" type="submit" depressed>Signin</v-btn>
                <h4>
                  Don't have an account?
                  <router-link to="/signup">Signup</router-link>
                </h4>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { UserAPI } from "../../api/users"

@Component({})
export default class Signin extends Vue {
  private username = ""
  private password = ""

  handleSigninUser() {
    UserAPI.signinUser({ username: this.username, password: this.password })
  }
}
</script>
