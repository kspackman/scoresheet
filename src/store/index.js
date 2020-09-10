import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function nextId(array) {
  const ids = array.map((instance) => instance.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

export default new Vuex.Store({
  state: {
    players: [],
    games: [],
    plays: [],
  },
  getters: {
    nextPlayerId(state) {
      return nextId(state.players);
    },
    nextGameId(state) {
      return nextId(state.games);
    },
    nextPlayId(state) {
      return nextId(state.plays);
    },
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
    savePlay(state, play) {
      state.plays.push(play);
    },
  },
  actions: {
  },
  modules: {
  },
});
