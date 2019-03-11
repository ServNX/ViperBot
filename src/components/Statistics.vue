<template>
  <v-container grid-list-lg>
    <v-layout wrap>

      <v-flex xs4>
        <v-card
          class="mt-3 mx-auto"
          max-width="400"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="servers.labels"
              :value="servers.values"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">Servers</div>
            <div class="subheading font-weight-light grey--text">
              # of servers in the past 5 days
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              dns
            </v-icon>
            <span class="caption grey--text font-weight-light">
              last server added {{servers.last}} ago
            </span>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs4>

      </v-flex>

      <v-flex xs4>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'statistics',
    data () {
      return {
        token: '',
        servers: {
          labels: ['3/3', '3/4', '3/5', '3/6', '3/7', '3/8', '3/9'],
          values: [0, 0, 0, 0, 0, 0, 0],
          last: '26 Minutes',
        },
      };
    },
    methods: {
      getServers () {
        this.axios.get('http://viper.servnx.com:3050/api/servers/statistics', {
          params: {
            token: this.token,
          },
        }).then(response => {
          response.data.forEach(server => {
            const createdAt = new Date(server.created_at);
            const label = `${createdAt.getMonth() + 1}/${createdAt.getDate()}`;

            if (!this.servers.labels.includes(label)) this.servers.labels.push(label);

            const labels = this.servers.labels;
            this.servers.labels = labels.slice(Math.max(labels.length - 5, 1));

            this.servers.values.push(server.count);
            const values = this.servers.values;
            this.servers.values = values.slice(Math.max(values.length - 5, 1));
          });
        }).catch(err => {
          if (err.response.status === 401) {
            window.location.replace('http://viper.servnx.com:3050/api/auth');
          }
        });
      },
    },
    mounted () {
      this.token = localStorage.getItem('access_token');
      this.getServers();
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
</style>
