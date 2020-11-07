<template>
  <div class="games d-flex flex-column align-center mt-3">
    <PageHeader>Games</PageHeader>
    <VList class="d-inline-block" style="min-width:300px;">
      <VDivider />
      <template v-for="(game, index) in games">
        <VListItem :key="'g' + game.id">
          <VListItemIcon>
            <VIcon>mdi-checkerboard</VIcon>
          </VListItemIcon>
          <VListItemContent>
            <VListItemTitle>{{ game.name }}</VListItemTitle>
            <VListItemSubtitle>
              Number of plays: {{ game.numberPlays }}
            </VListItemSubtitle>
            <VListItemSubtitle v-if="game.lastPlay">
              Last play: {{ game.lastPlay }}
            </VListItemSubtitle>
          </VListItemContent>
          <VListItemAction>
            <VBtn
              class="create-play-btn"
              icon
              title="Create a play"
              @click.stop="createPlay(game)"
            >
              <VIcon>mdi-plus</VIcon>
            </VBtn>
          </VListItemAction>
          <VListItemAction>
            <VBtn
              icon
              @click="deleteGame(game)"
            >
              <VIcon>mdi-delete</VIcon>
            </VBtn>
          </VListItemAction>
        </VListItem>
        <VDivider :key="'d' + index" />
      </template>
    </VList>
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
    async deleteGame(game) {
      if (await this.$confirm(`Are you sure you want to delete ${game.name}?<br>All associated plays will also be deleted.`)) {
        this.$store.commit('deleteGame', game.id);
      }
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
