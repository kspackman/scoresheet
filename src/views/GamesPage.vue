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
              class="create-play-btn"
              icon
              title="Create a play"
              @click.stop="createPlay(game)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
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
    <CreatePlayDialog
      v-model="showCreatePlayDialog"
      :game="selectedGame"
      @create-play="savePlay"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AddGameDialog from '@/components/AddGameDialog.vue';
import CreatePlayDialog from '@/components/CreatePlayDialog.vue';

export default {
  name: 'GamesPage',
  components: {
    AddGameDialog,
    CreatePlayDialog,
  },
  data() {
    return {
      showCreatePlayDialog: false,
      selectedGame: {},
    };
  },
  computed: {
    ...mapState(['games']),
    ...mapGetters(['nextGameId']),
  },
  methods: {
    addGame(game) {
      this.$store.commit('addGame', {
        id: this.nextGameId,
        ...game,
      });
    },
    deleteGame(game) {
      this.$store.commit('deleteGame', game);
    },
    createPlay(game) {
      this.selectedGame = game;
      this.showCreatePlayDialog = true;
    },
    savePlay(play) {
      this.$store.commit('savePlay', play);
    },
  },
};
</script>
