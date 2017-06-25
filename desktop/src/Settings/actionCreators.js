const toggleNotYet = flag => ({
  type: 'TOGGLE_NOT_YET',
  flag,
});
const toggleFullscreen = isFullscreen => ({
  type: 'TOGGLE_FULLSCREEN',
  isFullscreen,
});

export { toggleNotYet, toggleFullscreen };
