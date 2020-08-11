<template>
  <v-app>
    <TheAppBar
      :drawer-open.sync="drawerOpen"
    />

    <TheNavigationDrawer
      :drawer-open="drawerOpen"
    />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheAppBar from './components/layout/TheAppBar.vue';
import TheNavigationDrawer from './components/layout/TheNavigationDrawer.vue';

export default {
  name: 'App',

  components: {
    TheAppBar,
    TheNavigationDrawer,
  },

  data: () => ({
    drawerOpen: true,
  }),
};
</script>
