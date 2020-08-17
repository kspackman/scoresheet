<template>
  <div class="games d-flex flex-column align-center mt-3">
    <h1>Games</h1>
    <v-list class="d-inline-block" style="min-width:300px;">
      <v-divider />
      <template v-for="(game, index) in games">
        <v-list-item :key="'g' + game.id">
          <v-list-item-icon>
            <v-icon>mdi-checkerboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ game.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ game.rounds.length }} rounds</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              icon
              @click="deleteGame(game)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="'d' + index" />
      </template>
    </v-list>
    <AddGameDialog
      @add-game="addGame"
     />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AddGameDialog from '@/components/AddGameDialog.vue';

export default {
  name: 'GamesPage',
  components: {
    AddGameDialog,
  },
  computed: {
    nextId() {
      const gameIds = this.games.map((game) => game.id);
      return gameIds.length > 0 ? Math.max(...gameIds) + 1 : 1;
    },
    ...mapState(['games']),
  },
  methods: {
    addGame(game) {
      this.$store.commit('addGame', {
        id: this.nextId,
        ...game,
      });
    },
    deleteGame(game) {
      this.$store.commit('deleteGame', game);
    },
  },
};
</script>
