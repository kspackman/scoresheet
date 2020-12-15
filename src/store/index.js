import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function nextId(array) {
  const ids = array.map((instance) => instance.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

export default new Vuex.Store({
  state: {
    darkMode: false,
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
    playerPlays(state) {
      return (playerId) => state.plays
        .filter((play) => play.players.some((player) => player.playerId === playerId))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    gamePlays(state) {
      return (game) => state.plays.filter((play) => play.gameId === game.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    activePlayers(state) {
      return state.players.filter((player) => !player.deleted);
    },
    player(state) {
      return (id) => state.players.find((player) => player.id === id);
    },
  },
  mutations: {
    initializeStore(state, newState) {
      this.replaceState(Object.assign(state, newState));
    },
    addPlayer(state, player) {
      state.players.push(player);
    },
    deletePlayer(state, playerId) {
      const foundPlayer = state.players.find((player) => player.id === playerId);
      if (foundPlayer) {
        Vue.set(foundPlayer, 'deleted', true);
      }
    },
    addGame(state, game) {
      state.games.push(game);
    },
    deleteGame(state, gameId) {
      const index = state.games.findIndex((game) => game.id === gameId);
      if (index >= 0) {
        state.games.splice(index, 1);
        state.plays = state.plays.filter((play) => play.gameId !== gameId);
      }
    },
    savePlay(state, play) {
      state.plays.push(play);
    },
    setDarkMode(state, darkMode) {
      state.darkMode = darkMode;
    },
  },
  actions: {
  },
  modules: {
  },
});
