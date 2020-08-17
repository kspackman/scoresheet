<template>
  <v-dialog
    v-model="showDialog"
    width="300"
    @input="focus"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fab
        color="accent"
        v-bind="attrs"
        fixed
        right
        bottom
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-card-title>Add Game</v-card-title>
        <v-form
          v-model="valid"
          ref="form"
          class="px-4 pb-4"
          @submit="addGame"
        >
          <v-text-field
            v-model="name"
            ref="name"
            label="Name"
            :counter="30"
            maxlength="30"
            required
            :rules="nameRules"
          />
          <v-divider class="my-1" />
          <v-card-subtitle class="pt-0 pl-0">Rounds</v-card-subtitle>
          <v-text-field
            v-for="(round, index) in rounds"
            :key="index"
            v-model="round.name"
            dense
          />
          <v-btn
            icon
            @click="addRound"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-card-actions class="justify-end">
            <v-btn
              text
              color="primary"
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="addGame"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
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
    };
  },

  methods: {
    addRound() {
      this.rounds.push({ name: '' });
    },
    closeDialog() {
      this.name = '';
      this.rounds = [{ name: 'Points' }];
      this.showDialog = false;
      setTimeout(() => {
        this.$refs.form.resetValidation();
      }, 200);
    },
    addGame() {
      this.$emit('add-game', { name: this.name, rounds: this.rounds });
      this.closeDialog();
    },
    focus(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.name.focus();
        });
      }
    },
  },
};
</script>
