import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuetify from 'vuetify';

import store from './store';
import router from './router';

import App from './App';
import './App.scss';

Vue.use(VueAxios, axios);

Vue.use(Vuetify, {
  theme: {
    accent: '#0dc8df',
  },
  iconfont: 'fa',
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
