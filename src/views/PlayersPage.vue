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
            <v-list-item-subtitle>
              Number of plays: {{ player.numberPlays }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="player.lastPlay">
              Last play: {{ player.lastPlay }}
            </v-list-item-subtitle>
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
    <AddPlayerDialog @add-player="addPlayer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddPlayerDialog from '@/components/AddPlayerDialog.vue';

export default {
  name: 'PlayersPage',
  components: {
    AddPlayerDialog,
  },
  computed: {
    ...mapGetters(['nextPlayerId']),
    players() {
      return this.$store.state.players
        .map((player) => {
          let plays = this.$store.getters.playerPlays(player) || [];
          plays = [...plays].sort((a, b) => a.date - b.date);
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
    deletePlayer(player) {
      this.$store.commit('deletePlayer', player);
    },
  },
};
</script>
