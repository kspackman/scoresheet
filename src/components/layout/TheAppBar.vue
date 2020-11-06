<template>
    <VAppBar
      app
      :color="darkMode ? undefined : 'primary'"
      clipped-left
      dark
    >
      <div class="d-flex align-center">
        <VAppBarNavIcon @click.stop="$emit('update:drawerOpen', !drawerOpen)" />
        <VToolbarTitle class="ml-3">Scoresheet</VToolbarTitle>
      </div>

      <VSpacer />

      <div class="d-flex align-center">
        <VSwitch
          v-hotkey:d="toggleDarkMode"
          v-model="darkMode"
          label="Dark Mode"
          hide-details
          class="mr-5"
        />
        <VBtn
          icon
          to="/"
        >
          <VImg
            alt="Scoresheet Logo"
            class="shrink mr-2"
            contain
            src="../../assets/logo.png"
            transition="scale-transition"
            width="40"
          />
        </VBtn>
      </div>
    </VAppBar>
</template>

<script>
export default {
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    darkMode: {
      get() {
        return this.$store.state.darkMode;
      },
      set(val) {
        this.$store.commit('setDarkMode', val);
        this.$vuetify.theme.dark = val;
      },
    },
  },
  created() {
    this.$vuetify.theme.dark = this.darkMode;
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>
