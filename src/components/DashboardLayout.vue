<template>
  <div>
    <v-navigation-drawer
      clipped
      fixed
      app
    >
      <v-list dense>

        <v-list-tile
          class="invite-list-tile"
          href="https://discordapp.com/oauth2/authorize?&client_id=548947194984661072&scope=bot&permissions=402779254"
          target="_blank"
        >

          <v-list-tile-content>
            <v-list-tile-title>INVITE TO SERVER</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <i class="fa fa-arrow-right"></i>
          </v-list-tile-action>

        </v-list-tile>

        <v-list-tile @click="to('dashboard')">

          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-list-tile @click="to('/')">

          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <!--<img class="logo" src="../assets/logo.png" alt="Logo"/>-->
      <v-toolbar-title>Viperbot</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <!-- Main Content Here -->
        <slot></slot>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </div>
</template>

<style lang="scss" scoped>
  .invite-list-tile {
    background-color: #0dc8df;
    margin-top: -3px;
  }
</style>

<script>
  export default {
    name: 'dashboard-layout',
    data() {
      return {};
    },
    methods: {
      to(route) {
        this.$router.push(route);
      },
    },
  };
</script>
