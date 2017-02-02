/* global $ */
/* global navigator */
const os = {
  'Linux x86_64': 'Linux',
  Win32: 'Windows',
  MacIntel: 'Mac OS X',
};
$('#wanna button').html(`Download for ${os[navigator.platform]}`);
