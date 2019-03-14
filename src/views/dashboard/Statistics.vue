<template>
  <v-container grid-list-md>
    <v-layout row mb-5>
      <v-flex xs4>
        <v-card class="white--text">
          <v-layout row>
            <v-flex xs7>
              <v-card-text>
                <div>
                  <i class="fa fa-server fa-5x cyan--text"></i>
                </div>
                <div style="font-size: 24px">
                  Servers
                </div>
              </v-card-text>
            </v-flex>
            <v-flex xs5>
              <span style="font-size: 90px">{{servers.activeCount}}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card class="white--text">
          <v-layout row>
            <v-flex xs7>
              <v-card-text>
                <div>
                  <i class="fa fa-comments fa-5x cyan--text"></i>
                </div>
                <div style="font-size: 24px">
                  Channels
                </div>
              </v-card-text>
            </v-flex>
            <v-flex xs5>
              <span style="font-size: 90px">{{channels.activeCount}}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs4>
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
              <span style="font-size: 90px">{{users.activeCount}}</span>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs6>
        <SparkCard
          :labels="servers.labels"
          :values="servers.values"
          title="New Servers"
          desc="When the bot gets invited to a new server"
        >
          <div slot="footer">
            <v-icon class="mr-2" small>
              dns
            </v-icon>
            <span class="caption grey--text font-weight-light">
              last server created {{servers.last}}
            </span>
          </div>
        </SparkCard>
      </v-flex>

      <v-flex xs6>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss" scoped>

</style>

<script>
  import moment from 'moment';
  import SparkCard from '../../components/SparkCard';

  const apiUrl = process.env.VUE_APP_API_URL;

  export default {
    name: 'statistics',
    components: {
      SparkCard,
    },
    data () {
      return {
        token: '',
        servers: {
          labels: ['3/3', '3/4', '3/5', '3/6', '3/7', '3/8', '3/9'],
          values: [0, 0, 0, 0, 0, 0, 0],
          last: '',
          activeCount: 0,
        },
        channels: {
          activeCount: 0,
        },
        users: {
          activeCount: 0,
        },
      };
    },
    methods: {
      getStats () {
        this.axios.get(`${apiUrl}/api/statistics`, {
          params: {
            token: this.token,
          },
        }).then(response => {
          const serverCount = response.data.server_count;
          const channelCount = response.data.channel_count;
          const userCount = response.data.user_count;
          const createdAtGroups = response.data.created_at_groups.groups;
          const lastCreatedServerTimestamp = response.data.created_at_groups.last;

          this.servers.last = moment(lastCreatedServerTimestamp)
            .utc(true)
            .fromNow();
          this.servers.activeCount = serverCount;
          this.users.activeCount = userCount;
          this.channels.activeCount = channelCount;

          createdAtGroups.forEach(server => {
            const createdAt = new Date(server.created_at);
            const label = `${createdAt.getMonth() + 1}/${createdAt.getDate()}`;

            if (!this.servers.labels.includes(label)) this.servers.labels.push(label);

            const labels = this.servers.labels;
            this.servers.labels = labels.slice(Math.max(labels.length - 5, 1));

            this.servers.values.push(server.count);
            const values = this.servers.values;
            this.servers.values = values.slice(Math.max(values.length - 5, 1));
          });
        })
          .catch(err => console.log(err.response));
      },
    },
    mounted () {
      this.token = localStorage.getItem('access_token');
      this.getStats();
    },
  };
</script>
