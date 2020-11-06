<template>
  <div class="home">
    <VContainer>
      <VRow class="text-center">
        <VCol cols="12">
          <VImg
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="200"
          />
        </VCol>

        <VCol>
          <h1 class="display-3 font-weight-bold">
            Welcome to Scoresheet
          </h1>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>
