<template>
  <div class="home">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>

        <v-col>
          <h1 class="display-3 font-weight-bold">
            Welcome to Scoresheet
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>
