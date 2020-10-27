<script>
export default {
  name: 'PageHeader',
  functional: true,
  render(h, context) {
    return h('h1', { class: 'display-2 mb-3' }, context.slots().default);
  },
};
</script>
