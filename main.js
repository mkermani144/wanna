const oses = {
  'Linux x86_64': 'Linux',
  Win32: 'Windows',
  // TODO: Add Os X entry
};
document.querySelectorAll('#wanna button')[0].innerHTML += ` for ${oses[navigator.platform]}`;
