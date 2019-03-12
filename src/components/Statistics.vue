<template>
  <v-container grid-list-md>
    <v-layout row mb-5>
      <v-flex xs3>
        <v-card class="white--text">
          <v-layout row>
            <v-flex xs7>
              <v-card-text>
                <div>
                  <i class="fa fa-user fa-5x cyan--text"></i>
                </div>
                <div style="font-size: 24px">
                  Users
                </div>
              </v-card-text>
            </v-flex>
            <v-flex xs5>
              <span style="font-size: 40px">18</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs3>

      </v-flex>

      <v-flex xs3>

      </v-flex>

      <v-flex xs3>

      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs6>
        <StatCard
          :labels="servers.labels"
          :values="servers.values"
          title="Servers"
          desc="# of servers over the past 5 days"
        >
          <div slot="footer">
            <v-icon class="mr-2" small>
              dns
            </v-icon>
            <span class="caption grey--text font-weight-light">
              last server added {{servers.last}}
            </span>
          </div>
        </StatCard>
      </v-flex>

      <v-flex xs6>
        <StatCard
          :labels="servers.labels"
          :values="servers.values"
          title="Users"
          desc="# of users over past 5 days"
          color="indigo"
        >
          <div slot="footer">
            <v-icon class="mr-2" small>
              dns
            </v-icon>
            <span class="caption grey--text font-weight-light">
              last users added {{servers.last}}
            </span>
          </div>
        </StatCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>

</style>

<script>
  import moment from 'moment';
  import StatCard from './StatCard';

  export default {
    name: 'statistics',
    components: {
      StatCard,
    },
    data () {
      return {
        token: '',
        servers: {
          labels: ['3/3', '3/4', '3/5', '3/6', '3/7', '3/8', '3/9'],
          values: [0, 0, 0, 0, 0, 0, 0],
          last: '',
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
          response.data.groups.forEach(server => {
            const createdAt = new Date(server.created_at);
            const label = `${createdAt.getMonth() + 1}/${createdAt.getDate()}`;

            if (!this.servers.labels.includes(label)) this.servers.labels.push(label);

            const labels = this.servers.labels;
            this.servers.labels = labels.slice(Math.max(labels.length - 5, 1));

            this.servers.values.push(server.count);
            const values = this.servers.values;
            this.servers.values = values.slice(Math.max(values.length - 5, 1));
          });

          this.servers.last = moment(response.data.last).utc(true).fromNow();
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
