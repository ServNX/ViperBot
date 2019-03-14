<template>
  <div id="app">
    <v-app id="inspire" dark>
      <v-toolbar fixed dense>
        <!--<img class="logo" src="./assets/logo.png" alt="Logo"/>-->

        <v-toolbar-title>ViperBot</v-toolbar-title>

        <v-toolbar-items class="ml-3">
          <v-btn flat>Features</v-btn>
          <v-btn flat>Premium</v-btn>
          <v-btn flat>Community</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-btn icon :href="auth_url" v-if="!logged_in">
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
  import * as socketIo from 'socket.io-client';

  const apiUrl = process.env.VUE_APP_API_URL;
  const socket = socketIo(apiUrl);

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
      auth_url () {
        return `${apiUrl}/api/auth`;
      },
    },
    beforeCreate () {
      const token = getUrlParam('token', null);
      if (token) {
        localStorage.setItem('access_token', token);
        window.location.replace('/dashboard');
      }
    },
    mounted() {
      socket.on('hello', data => console.log(data));
    },
  };
</script>
