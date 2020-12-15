<template>
    <VNavigationDrawer
      v-model="drawerOpen"
      app
      clipped
      expand-on-hover
    >
      <VList
          dense
          nav
        >
          <VListItem
            link
            to="/"
            v-hotkey:h
          >
            <VListItemIcon>
              <VIcon>mdi-home</VIcon>
            </VListItemIcon>
            <VListItemContent>
              <VListItemTitle>Home</VListItemTitle>
            </VListItemContent>
          </VListItem>
          <VListItem
            link
            to="/players"
            exact
            v-hotkey:p
          >
            <VListItemIcon>
              <VIcon>mdi-account-multiple</VIcon>
            </VListItemIcon>
            <VListItemContent>
              <VListItemTitle>Players</VListItemTitle>
            </VListItemContent>
          </VListItem>
          <VListItem
            link
            to="/games"
            exact
            v-hotkey:g
          >
            <VListItemIcon>
              <VIcon>mdi-checkerboard</VIcon>
            </VListItemIcon>
            <VListItemContent>
              <VListItemTitle>Games</VListItemTitle>
            </VListItemContent>
          </VListItem>
        </VList>
    </VNavigationDrawer>
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
