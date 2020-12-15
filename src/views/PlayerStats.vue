<template>
  <div class="players d-flex flex-column align-center mt-3">
    <PageHeader>{{ player.name }}</PageHeader>
    <VRow>
      <DataPoint class="player-stat">
        <template v-slot:label>Plays</template>
        {{ playerPlays.length }}
      </DataPoint>
      <DataPoint class="player-stat">
        <template v-slot:label>Games</template>
        {{ totalGames }}
      </DataPoint>
      <DataPoint class="player-stat">
        <template v-slot:label>Win Rate</template>
        {{ winRate }}
      </DataPoint>
    </VRow>
  </div>
</template>

<script>
import PageHeader from '@/components/generic/PageHeader.vue';
import DataPoint from '../components/generic/DataPoint.vue';

export default {
  name: 'PlayerStatsPage',
  components: {
    PageHeader,
    DataPoint,
  },
  computed: {
    playerId() {
      return Number(this.$route.params.id);
    },
    player() {
      return this.$store.getters.player(this.playerId);
    },
    playerPlays() {
      return this.$store.getters.playerPlays(this.playerId);
    },
    totalGames() {
      return new Set(this.playerPlays.map((play) => play.gameId)).size;
    },
    winRate() {
      const wonPlays = this.playerPlays.filter((play) => play.winners
        .some((winner) => winner === this.playerId));
      return this.playerPlays.length > 0
        ? `${(wonPlays.length / this.playerPlays.length) * 100}%`
        : '0%';
    },
  },
};
</script>

<style scoped>
  .player-stat {
    margin: 0 16px;
  }
</style>
