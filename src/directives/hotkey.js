export default {
  bind(el, { arg, value }) {
    if (arg) {
      const callback = value && typeof value === 'function'
        ? value
        : () => el.click();
      // eslint-disable-next-line no-param-reassign
      el.keyEventListener = (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && (e.code === arg || e.key === arg)) {
          callback();
        }
      };
      document.addEventListener('keyup', el.keyEventListener);
    }
  },
  unbind(el) {
    document.removeEventListener('keyup', el.keyEventListener);
  },
};
