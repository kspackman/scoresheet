<template>
  <VDialog
    v-model="showDialog"
    width="300"
    v-hotkey:a="openDialog"
    @input="closeDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <VBtn
        fab
        color="accent"
        v-bind="attrs"
        fixed
        right
        bottom
        v-on="on"
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </template>
    <template>
      <VCard>
        <VCardTitle>Add Game</VCardTitle>
        <VForm
          v-model="valid"
          ref="form"
          class="px-4 pb-4"
          @submit="addGame"
        >
          <VTextField
            v-model="name"
            ref="name"
            label="Name"
            :counter="30"
            maxlength="30"
            required
            :rules="nameRules"
            autofocus
          />
          <VDivider class="my-1" />
          <VCard-subtitle class="pt-0 pl-0">Rounds</VCard-subtitle>
          <VTextField
            v-for="(round, index) in rounds"
            :key="index"
            v-model="round.name"
            dense
          />
          <VBtn
            icon
            @click="addRound"
          >
            <VIcon>mdi-plus</VIcon>
          </VBtn>
          <VCheckbox
            v-model="lowScoreWins"
            label="Low score wins"
          />
          <VCard-actions class="justify-end">
            <VBtn
              text
              color="primary"
              @click="closeDialog(false)"
            >
              Cancel
            </VBtn>
            <VBtn
              :disabled="!valid"
              color="primary"
              @click="addGame"
            >
              Add
            </VBtn>
          </VCard-actions>
        </VForm>
      </VCard>
    </template>
  </VDialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      valid: false,
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 30) || 'Name must be less than 30 characters',
      ],
      rounds: [{ name: 'Points' }],
      lowScoreWins: false,
      open: false,
    };
  },

  methods: {
    addRound() {
      this.rounds.push({ name: '' });
    },
    closeDialog(val = false) {
      if (!val) {
        this.name = '';
        this.rounds = [{ name: 'Points' }];
        this.showDialog = false;
        setTimeout(() => {
          this.$refs.form.resetValidation();
        }, 200);
      }
    },
    addGame() {
      this.$emit('add-game', { name: this.name, rounds: this.rounds, lowScoreWins: this.lowScoreWins });
      this.closeDialog();
    },
    openDialog() {
      this.showDialog = true;
    },
  },
};
</script>
