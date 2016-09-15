angular.module('MainApp', ['ngMaterial', 'ngMessages'])
  .config(($mdThemingProvider) => {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink')
      .warnPalette('red');
  });
