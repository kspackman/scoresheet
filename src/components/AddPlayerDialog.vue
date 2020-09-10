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
        <v-card-title>Add Player</v-card-title>
        <v-form
          v-model="valid"
          ref="form"
          @submit="addPlayer"
        >
          <v-text-field
            v-model="name"
            ref="name"
            label="Name"
            :counter="30"
            maxlength="30"
            required
            :rules="nameRules"
            class="px-4 pb-4"
          />
          <v-card-actions class="justify-end">
            <v-btn
              text
              color="primary"
              @click="closeDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="addPlayer"
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
    };
  },

  methods: {
    closeDialog() {
      this.name = '';
      this.showDialog = false;
      setTimeout(() => {
        this.$refs.form.resetValidation();
      }, 1000);
    },
    addPlayer() {
      this.$emit('add-player', this.name);
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
