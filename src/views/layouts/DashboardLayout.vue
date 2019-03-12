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

        <v-list-group>
          <div slot="activator">
            <v-list-tile>

              <v-list-tile-action>
                <v-icon>dns</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Servers</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>

          <v-list-tile
            v-for="server in myServers"
            :key="server.id"
            @click=""
          >
            <v-list-tile-action>
              <v-avatar size="30">
                <img :src="iconUrl(server.id, server.icon)" alt=""/>
              </v-avatar>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ server.name }}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list-group>

        <v-list-tile @click="to('/settings')">

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
      return {
        servers: [],
      };
    },
    computed: {
      myServers() {
        return this.servers.filter(server => {
          return server.owner === true;
        });
      },
    },
    methods: {
      iconUrl(serverId, hash) {
        return `https://cdn.discordapp.com/icons/${serverId}/${hash}.png`;
      },
      getServers() {
        const token = localStorage.getItem('access_token');
        const url = 'https://discordapp.com/api/users/@me/guilds';

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        this.axios.get(url, { headers })
          .then(response => {
            this.servers = response.data;
          })
          .catch(err => console.log(err.response));
      },
      to(route) {
        this.$router.push(route);
      },
    },
    created() {
      this.getServers();
    },
  };
</script>
