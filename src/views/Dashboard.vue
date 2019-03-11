<template>
  <div>
    <v-navigation-drawer
      clipped
      fixed
      app
    >
      <v-list dense>

        <v-list-tile @click="">

          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

        <v-list-tile @click="">
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
      <img class="logo" src="../assets/logo.png" alt="Logo"/>
      <v-toolbar-title>Viperbot</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <!-- Main Content Here -->
        <component :is="comp"></component>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </div>
</template>

<script>
  import Statistics from '../components/Statistics';

  export default {
    name: 'dashboard',
    data () {
      return {
        comp: Statistics,
      };
    },
  };
</script>
