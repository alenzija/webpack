function createAnalytics() {
  let count = 0;
  let isDestoyed = false;
  const listener = () => count++;
  document.addEventListener('click', listener);

  return {
    destroy() {
      document.removeEventListener('click', listener);
      isDestoyed = true;
    },
    getClicks() {
      if (isDestoyed) {
        return 'Analitics destroyed';
      }
      return count;
    },
  };
}
window.analytics = createAnalytics();
