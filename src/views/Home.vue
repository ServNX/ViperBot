<template>
  <div class="home">
    <div v-for="server in servers" :key="server.id">
      {{server.guild_id}}<br>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      servers: [],
    };
  },
  methods: {
    getServers() {
      axios.get('http://viper.servnx.com:3050/api/servers')
        .then(res => {
          console.log(res);
          this.servers = res.data;
        })
        .catch(err => console.log(err.message));
    },
  },
  mounted() {
    this.getServers();
  },
};
</script>
