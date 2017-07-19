const OSes = {
  'Linux x86_64': ['Linux', 'linux'],
  Win32: ['Windows', 'windows'],
  MacIntel: ['OSX', 'apple'],
};
const currentOS = navigator.platform;
if (Object.keys(OSes).indexOf(currentOS) >= 0) {
  $('.download').html(`Download for ${OSes[currentOS][0]} &nbsp; <i class="fa fa-lg fa-${OSes[currentOS][1]}"></i>`);
}
