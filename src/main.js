import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import hotkey from './directives/hotkey';

Vue.config.productionTip = false;
Vue.directive('hotkey', hotkey);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
