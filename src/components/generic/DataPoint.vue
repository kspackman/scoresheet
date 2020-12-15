<template>
  <div class="data-point">
    <div class="data-point-label"><slot name="label" /></div>
    <div class="data-point-data"> <slot /></div>
  </div>
</template>

<script>
export default {
  name: 'DataPoint',
};
</script>

<style scoped>
  .data-point-label {
    font-size: 12px;
  }
</style>
