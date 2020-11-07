import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';
import VuetifyConfirm from 'vuetify-confirm';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    themes: {
      dark: {
        accent: colors.blue.lighten1,
      },
    },
  },
});
Vue.use(VuetifyConfirm, { vuetify });

export default vuetify;
