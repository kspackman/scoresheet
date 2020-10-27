<template>
  <div class="games d-flex flex-column align-center mt-3">
    <PageHeader>Games</PageHeader>
    <v-list class="d-inline-block" style="min-width:300px;">
      <v-divider />
      <template v-for="(game, index) in games">
        <v-list-item :key="'g' + game.id">
          <v-list-item-icon>
            <v-icon>mdi-checkerboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ game.name }}</v-list-item-title>
            <v-list-item-subtitle>
              Number of plays: {{ game.numberPlays }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="game.lastPlay">
              Last play: {{ game.lastPlay }}
            </v-list-item-subtitle>
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
    <AddGameDialog @add-game="addGame" />
    <CreatePlayDialog
      v-if="showCreatePlayDialog"
      v-model="showCreatePlayDialog"
      :game="selectedGame"
      @create-play="savePlay"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddGameDialog from '@/components/AddGameDialog.vue';
import PageHeader from '@/components/generic/PageHeader.vue';

const CreatePlayDialog = () => import('@/components/CreatePlayDialog.vue');

export default {
  name: 'GamesPage',
  components: {
    AddGameDialog,
    CreatePlayDialog,
    PageHeader,
  },
  data() {
    return {
      showCreatePlayDialog: false,
      selectedGame: {},
    };
  },
  computed: {
    ...mapGetters(['nextGameId']),
    games() {
      let { games } = this.$store.state;
      games = games.map((game) => {
        let plays = this.$store.getters.gamePlays(game) || [];
        plays = [...plays].sort((a, b) => a.date - b.date);
        return {
          ...game,
          numberPlays: plays.length,
          lastPlay: plays.length > 0 ? new Date(plays[0].date).toDateString() : null,
        };
      });
      return games;
    },
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
