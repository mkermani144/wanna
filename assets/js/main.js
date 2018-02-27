const OSes = {
  'Linux x86_64': ['Linux (.deb)', 'linux', '.deb'],
  Win32: ['Windows', 'windows', '.exe'],
  MacIntel: ['OSX', 'apple', '.dmg'],
};
const currentOS = navigator.platform;
if (Object.keys(OSes).indexOf(currentOS) >= 0) {
  const $button = $('.download');
  $button.html(`Download for ${OSes[currentOS][0]} &nbsp; <i class="fa fa-lg fa-${OSes[currentOS][1]}"></i>`);
  $button.attr('href', 'https://github.com/mkermani144/wanna/releases/download/1.0.0-alpha.2%2Bflex/wanna-1.0.0-alpha.2' + OSes[currentOS][2]);
} else {
  const $button = $('.download');
  $button.html('Download for your platform - <i>soon<i>');
  $button.addClass('disabled');
}
