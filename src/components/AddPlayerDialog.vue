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
        <VCardTitle>Add Player</VCardTitle>
        <VForm
          v-model="valid"
          ref="form"
          @submit="addPlayer"
        >
          <VTextField
            v-model="name"
            ref="name"
            label="Name"
            :counter="30"
            maxlength="30"
            required
            :rules="nameRules"
            class="px-4 pb-4"
            autofocus
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
              @click="addPlayer"
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
    };
  },

  methods: {
    closeDialog(val = false) {
      if (!val) {
        this.name = '';
        this.showDialog = false;
        setTimeout(() => {
          this.$refs.form.resetValidation();
        }, 200);
      }
    },
    addPlayer() {
      this.$emit('add-player', this.name);
      this.closeDialog();
    },
    openDialog() {
      this.showDialog = true;
    },
  },
};
</script>
