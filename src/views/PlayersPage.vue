<template>
  <div class="players d-flex flex-column align-center mt-3">
    <h1>Players</h1>
    <v-list class="d-inline-block" style="min-width:300px;">
      <v-divider />
      <template v-for="(player, index) in players">
        <v-list-item :key="'p' + player.id">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ player.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              icon
              @click="deletePlayer(player)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="'d' + index" />
      </template>
    </v-list>
    <AddPlayerDialog
      @add-player="addPlayer"
     />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddPlayerDialog from '@/components/AddPlayerDialog.vue';

export default {
  name: 'PlayersPage',
  components: {
    AddPlayerDialog,
  },
  computed: {
    nextId() {
      const playerIds = this.players.map((player) => player.id);
      return playerIds.length > 0 ? Math.max(...playerIds) + 1 : 1;
    },
    ...mapState(['players']),
  },
  methods: {
    addPlayer(name) {
      this.$store.commit('addPlayer', {
        id: this.nextId,
        name,
      });
    },
    deletePlayer(player) {
      this.$store.commit('deletePlayer', player);
    },
  },
};
</script>
