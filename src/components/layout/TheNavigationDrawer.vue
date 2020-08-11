<template>
    <v-navigation-drawer
      v-model="drawerOpen"
      app
      clipped
      expand-on-hover
    >
      <v-list
          dense
          nav
        >
          <v-list-item
            link
            to="/"
          >
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            to="/players"
          >
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Players</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            to="/games"
          >
            <v-list-item-icon>
              <v-icon>mdi-checkerboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Games</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawerOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
