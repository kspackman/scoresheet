<template>
    <v-card width="300px">
        <v-card-title>Create a Play</v-card-title>
        <v-form
          v-model="valid"
          ref="form"
          class="px-4 pb-4"
          @submit="createPlay"
        >
          <v-text-field
            v-model="play.name"
            ref="playName"
            label="Play name"
            :counter="30"
            maxlength="30"
            required
            autofocus
            :rules="nameRules"
          />
          <v-select
            v-model="play.playerIds"
            :items="players"
            label="Players"
            item-text="name"
            item-value="id"
            multiple
            :rules="playersRules"
          />
          <v-card-actions class="justify-end">
            <v-btn
              text
              color="primary"
              @click="cancel"
            >
              Cancel
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="createPlay"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      play: {
        name: '',
        playerIds: [],
      },
      nameRules: [
        (v) => !!v || 'Play name is required',
        (v) => (v && v.length <= 30) || 'Play name must be less than 30 characters',
      ],
      playersRules: [
        (v) => (v && v.length > 0) || 'At least one player must be selected',
      ],
    };
  },
  computed: {
    ...mapState(['players']),
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    createPlay() {
      this.play.playerIds = this.play.playerIds.map((id) => Number.parseInt(id, 10));
      this.$emit('create-play', this.play);
    },
  },
};
</script>
