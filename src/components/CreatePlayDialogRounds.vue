<template>
    <VCard>
        <VSimpleTable>
          <thead>
            <tr>
              <th>
              </th>
              <th
                v-for="player in selectedPlayers"
                :key="player.id"
              >
                {{ player.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(round, roundIndex) in game.rounds"
              :key="round.name"
            >
              <th>
                {{ round.name }}
              </th>
              <td
                v-for="(player, playerIndex) in selectedPlayers"
                :key="player.id"
                class="input-td"
              >
                <div>
                  <VTextField
                    v-model.number="playerScores[playerIndex].scores[roundIndex]"
                    type="number"
                    dense
                    @input="calculateTotal(playerScores[playerIndex])"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>Total</th>
              <td
                v-for="(player, index) in selectedPlayers"
                :key="player.id"
                class="input-td"
              >
                {{ playerScores[index].total }}
              </td>
            </tr>
          </tbody>
        </VSimpleTable>
        <VCardActions class="justify-end">
            <VBtn
              text
              color="primary"
              @click="cancel"
            >
              Cancel
            </VBtn>
            <VBtn
              color="primary"
              @click="createPlay"
            >
              Done
            </VBtn>
          </VCardActions>
      </VCard>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
    playInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      playerScores: [],
    };
  },
  computed: {
    selectedPlayers() {
      return this.playInfo.playerIds
        .map((id) => this.players.find((player) => player.id === id));
    },
    ...mapState(['players']),
  },
  created() {
    this.playerScores = [];
    console.log(this.game.rounds.length - 1);
    this.playInfo.playerIds.forEach((playerId, index) => {
      this.$set(this.playerScores, index, {
        playerId,
        scores: new Array(this.game.rounds.length).fill(0),
        total: 0,
      });
    });
  },
  methods: {
    calculateTotal(playerScores) {
      // eslint-disable-next-line no-param-reassign
      playerScores.total = playerScores.scores.reduce((acc, curr) => acc + curr);
    },
    cancel() {
      this.$emit('cancel');
    },
    createPlay() {
      this.$emit('create-play', this.playerScores);
    },
  },
};
</script>

<style scoped>
  .input-td > div {
    width: 50px;
  }
</style>
