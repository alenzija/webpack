function createAnalyticsTs() {
  let count: number = 0;
  let isDestoyed: boolean = false;
  const listener = (): number => count++;
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
window['analyticsTs'] = createAnalyticsTs();
