/* global $ */
/* global navigator */
const oses = {
  'Linux x86_64': 'Linux',
  Win32: 'Windows',
  MacIntel: 'Mac OS X',
};
const currentOs = navigator.platform;
if (currentOs in oses) {
  $('#wrapper button').html(`Download for ${oses[currentOs]}`);
} else {
  $('#wrapper button').replaceWith('<p id="sorry">Sorry, Wanna is not supported on your platform :(</p>');
}
