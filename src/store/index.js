import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    games: [],
  },
  mutations: {
    initializeStore(state, newState) {
      this.replaceState(Object.assign(state, newState));
    },
    addPlayer(state, player) {
      state.players.push(player);
    },
    deletePlayer(state, player) {
      const index = state.players.indexOf(player);
      if (index >= 0) {
        state.players.splice(index, 1);
      }
    },
    addGame(state, game) {
      state.games.push(game);
    },
    deleteGame(state, game) {
      const index = state.games.indexOf(game);
      if (index >= 0) {
        state.games.splice(index, 1);
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
