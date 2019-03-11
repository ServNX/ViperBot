<template>
  <div id="app">
    <v-app id="inspire" dark>
      <v-toolbar fixed dense>
        <img class="logo" src="./assets/logo.png" alt="Logo"/>

        <v-toolbar-title>ViperBot</v-toolbar-title>

        <v-toolbar-items class="ml-3">
          <v-btn flat>Features</v-btn>
          <v-btn flat>Premium</v-btn>
          <v-btn flat>Community</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-btn icon href="http://viper.servnx.com:3050/api/auth" v-if="!logged_in">
          <v-icon>person</v-icon>
        </v-btn>

        <v-btn icon to="dashboard" v-if="logged_in">
          <v-icon>launch</v-icon>
        </v-btn>
      </v-toolbar>

      <router-view/>
    </v-app>
  </div>
</template>

<style lang="scss">
  .logo {
    margin-top: 2px;
    margin-right: -12px;
    width: 45px;
  }
</style>

<script>
  // eslint-disable-next-line
  import { getUrlParam } from './utils/uri';

  export default {
    name: 'app',
    data () {
      return {};
    },
    computed: {
      logged_in () {
        return !!localStorage.getItem('access_token');
      },
    },
    beforeCreate () {
      const token = getUrlParam('token', null);
      if (token) {
        localStorage.setItem('access_token', token);
        window.location.replace('/dashboard');
      }
    },
  };
</script>
