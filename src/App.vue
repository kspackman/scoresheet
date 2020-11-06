<template>
  <VApp>
    <TheAppBar
      :drawer-open.sync="drawerOpen"
    />

    <TheNavigationDrawer
      :drawer-open="drawerOpen"
    />

    <VMain>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </VMain>
  </VApp>
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

  beforeCreate() {
    if (localStorage.getItem('store')) {
      this.$store.commit('initializeStore', JSON.parse(localStorage.getItem('store')));
    }
    this.$store.subscribe((mutation, state) => {
      localStorage.setItem('store', JSON.stringify(state));
    });
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter {
  opacity: 0;
}
</style>
