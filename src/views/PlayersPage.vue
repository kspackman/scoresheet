<template>
  <div class="players d-flex flex-column align-center mt-3">
    <PageHeader>Players</PageHeader>
    <VList class="d-inline-block" style="min-width:300px;">
      <VDivider />
      <template v-for="(player, index) in players">
        <VListItem
          :key="'p' + player.id"
          :to="'players/' + player.id"
        >
          <VListItemIcon>
            <VIcon>mdi-account</VIcon>
          </VListItemIcon>
          <VListItemContent>
            <VListItemTitle>{{ player.name }}</VListItemTitle>
            <VListItemSubtitle>
              Number of plays: {{ player.numberPlays }}
            </VListItemSubtitle>
            <VListItemSubtitle v-if="player.lastPlay">
              Last play: {{ player.lastPlay }}
            </VListItemSubtitle>
          </VListItemContent>
          <VListItemAction>
            <VBtn
              icon
              @click="deletePlayer(player)"
            >
              <VIcon>mdi-delete</VIcon>
            </VBtn>
          </VListItemAction>
        </VListItem>
        <VDivider :key="'d' + index" />
      </template>
    </VList>
    <AddPlayerDialog @add-player="addPlayer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddPlayerDialog from '@/components/AddPlayerDialog.vue';
import PageHeader from '@/components/generic/PageHeader.vue';

export default {
  name: 'PlayersPage',
  components: {
    AddPlayerDialog,
    PageHeader,
  },
  computed: {
    ...mapGetters(['activePlayers', 'nextPlayerId']),
    players() {
      return this.activePlayers
        .map((player) => {
          const plays = this.$store.getters.playerPlays(player.id) || [];
          return {
            ...player,
            numberPlays: plays.length,
            lastPlay: plays.length > 0 ? new Date(plays[0].date).toDateString() : null,
          };
        });
    },
  },
  methods: {
    addPlayer(name) {
      this.$store.commit('addPlayer', {
        id: this.nextPlayerId,
        name,
      });
    },
    async deletePlayer(player) {
      if (await this.$confirm(`Are you sure you want to delete ${player.name}?`)) {
        this.$store.commit('deletePlayer', player.id);
      }
    },
  },
};
</script>
