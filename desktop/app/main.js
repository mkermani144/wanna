const module = angular.module('MainApp', ['ngMaterial', 'ngMessages', 'ngRoute']);
module.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink')
    .warnPalette('red');
});
