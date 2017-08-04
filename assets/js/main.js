const OSes = {
  'Linux x86_64': ['Linux (.deb)', 'linux', '.deb'],
  Win32: ['Windows', 'windows', '.exe'],
  // MacIntel: ['OSX', 'apple'],
};
const currentOS = navigator.platform;
if (Object.keys(OSes).indexOf(currentOS) >= 0) {
  const $button = $('.download');
  $button.html(`Download for ${OSes[currentOS][0]} &nbsp; <i class="fa fa-lg fa-${OSes[currentOS][1]}"></i>`);
  $button.attr('href', 'https://github.com/mkermani144/wanna/releases/download/Flex-alpha/Wanna-setup-x64' + OSes[currentOS][2]);
}
