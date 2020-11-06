<template>
    <VCard width="300px">
        <VCardTitle>Create a Play</VCardTitle>
        <VForm
          v-model="valid"
          ref="form"
          class="px-4 pb-4"
          @submit="createPlay"
        >
          <VTextField
            v-model="play.name"
            ref="playName"
            label="Play name"
            :counter="30"
            maxlength="30"
            required
            autofocus
            :rules="nameRules"
          />
          <VSelect
            v-model="play.playerIds"
            :items="players"
            label="Players"
            item-text="name"
            item-value="id"
            multiple
            :rules="playersRules"
          />
          <VCard-actions class="justify-end">
            <VBtn
              text
              color="primary"
              @click="cancel"
            >
              Cancel
            </VBtn>
            <VBtn
              :disabled="!valid"
              color="primary"
              @click="createPlay"
            >
              Next
            </VBtn>
          </VCard-actions>
        </VForm>
      </VCard>
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
