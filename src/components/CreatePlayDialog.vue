<template>
  <VDialog
    v-model="showDialog"
    @input="$emit('input', $event)"
    :width="mode === Modes.PLAY ? '300px' : 'unset'"
  >
    <template>
      <CreatePlayDialogPlay
        v-if="mode === Modes.PLAY"
        @cancel="closeDialog"
        @create-play="switchMode"
      />
      <CreatePlayDialogRounds
        v-else
        :game="game"
        :play-info="playInfo"
        @cancel="closeDialog"
        @create-play="createPlay"
      />
    </template>
  </VDialog>
</template>

<script>
import { mapGetters } from 'vuex';
import CreatePlayDialogPlay from './CreatePlayDialogPlay.vue';
import CreatePlayDialogRounds from './CreatePlayDialogRounds.vue';

const Modes = {
  PLAY: 'PLAY',
  ROUNDS: 'ROUNDS',
};

export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    game: {
      type: Object,
      required: true,
    },
  },
  components: {
    CreatePlayDialogPlay,
    CreatePlayDialogRounds,
  },
  data() {
    return {
      showDialog: false,
      mode: Modes.PLAY,
      Modes,
      playInfo: null,
    };
  },
  computed: {
    ...mapGetters(['nextPlayId']),
  },
  methods: {
    closeDialog() {
      this.$emit('input', false);
      this.playInfo = null;
      this.mode = Modes.PLAY;
    },
    switchMode(play) {
      this.playInfo = play;
      this.mode = Modes.ROUNDS;
    },
    createPlay(playerScores) {
      this.$emit('create-play', {
        id: this.nextPlayId,
        gameId: this.game.id,
        players: playerScores,
        date: new Date(),
      });
      this.closeDialog();
    },
  },
  watch: {
    value: {
      handler(val) {
        this.showDialog = val;
      },
      immediate: true,
    },
  },
};
</script>
