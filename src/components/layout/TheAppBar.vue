<template>
    <v-app-bar
      app
      :color="darkMode ? undefined : 'primary'"
      clipped-left
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="$emit('update:drawerOpen', !drawerOpen)" />
        <v-toolbar-title class="ml-3">Scoresheet</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-switch
          v-model="darkMode"
          label="Dark Mode"
          hide-details
          class="mr-5"
        />
        <v-btn
          icon
          to="/"
        >
          <v-img
            alt="Scoresheet Logo"
            class="shrink mr-2"
            contain
            src="../../assets/logo.png"
            transition="scale-transition"
            width="40"
          />
        </v-btn>
      </div>
    </v-app-bar>
</template>

<script>
export default {
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      darkMode: false,
    };
  },

  watch: {
    darkMode() {
      this.$vuetify.theme.dark = this.darkMode;
    },
  },
};
</script>
