<template>
  <div class="players d-flex flex-column align-center mt-3">
    <PageHeader>{{ player.name }}</PageHeader>
    <VRow class="mb-3">
      <DataPoint class="mx-4">
        <template v-slot:label>Plays</template>
        {{ playerPlays.length }}
      </DataPoint>
      <DataPoint class="mx-4">
        <template v-slot:label>Games</template>
        {{ totalGames }}
      </DataPoint>
      <DataPoint class="mx-4">
        <template v-slot:label>Win Rate</template>
        {{ winRate }}
      </DataPoint>
    </VRow>
    <VSimpleTable class="mb-3">
      <thead>
        <tr>
          <th>Game</th>
          <th>Plays</th>
          <th>Wins</th>
          <th>Win rate</th>
          <th>Expected win rate</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="summary in gameSummaries"
          :key="summary.id"
        >
          <td>{{ summary.name }}</td>
          <td>{{ summary.plays }}</td>
          <td>{{ summary.wins }}</td>
          <td>{{ summary.winRate }}</td>
          <td>{{ summary.expectedWinRate }}</td>
        </tr>
      </tbody>
    </VSimpleTable>
    <Chart :key="chartKey" :options="gameChartOptions" />
  </div>
</template>

<script>
import PageHeader from '@/components/generic/PageHeader.vue';
import { Chart } from 'highcharts-vue';
import { mapState } from 'vuex';
import { setDarkMode, setLightMode } from '../assets/highchartsUtils';
import DataPoint from '../components/generic/DataPoint.vue';

export default {
  name: 'PlayerStatsPage',
  components: {
    PageHeader,
    DataPoint,
    Chart,
  },
  data() {
    return {
      chartKey: 0,
    };
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
      const wonPlays = this.$_getWins(this.playerPlays);
      return this.playerPlays.length > 0
        ? `${this.$_toPercent(wonPlays.length / this.playerPlays.length)}%`
        : '0%';
    },
    gameMap() {
      const gameMap = new Map();
      this.playerPlays.forEach((play) => {
        const entry = gameMap.get(play.gameId);
        if (!entry) {
          gameMap.set(play.gameId, [play]);
        } else {
          entry.push(play);
        }
      });
      return gameMap;
    },
    gameSummaries() {
      const gameSummaries = [];

      this.gameMap.forEach((playArray, gameId) => {
        const wonPlays = this.$_getWins(playArray);
        const sum = playArray
          .map((play) => 1 / play.players.length)
          .reduce((acc, curr) => acc + curr);
        const expectedWinRate = sum / playArray.length;
        gameSummaries.push({
          id: gameId,
          name: this.$store.getters.gameName(gameId),
          plays: playArray.length,
          wins: wonPlays.length,
          winRate: `${this.$_toPercent(wonPlays.length / playArray.length)}%`,
          expectedWinRate: `${this.$_toPercent(expectedWinRate)}%`,
        });
      });

      return gameSummaries;
    },
    gameChartOptions() {
      const seriesData = [];
      this.gameMap.forEach((playArray, gameId) => {
        seriesData.push({
          name: this.$store.getters.gameName(gameId),
          y: playArray.length,
        });
      });
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        title: {
          text: 'Games played',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.2f} %',
            },
          },
        },
        series: [{
          name: 'Games',
          colorByPoint: true,
          data: seriesData,
        }],
      };
    },
    ...mapState(['darkMode']),
  },
  watch: {
    darkMode: {
      handler(val) {
        if (val) {
          setDarkMode();
        } else {
          setLightMode();
        }
        this.chartKey += 1;
      },
      immediate: true,
    },
  },
  methods: {
    $_getWins(playArray) {
      return playArray.filter((play) => play.winners.some((winner) => winner === this.playerId));
    },
    $_toPercent(value) {
      return (value * 100).toFixed(2);
    },
  },
};
</script>
