const module = angular.module('MainApp', ['ngMaterial', 'ngMessages', 'ngRoute']);
module.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink')
    .warnPalette('red');
});
module.config(($routeProvider) => {
  $routeProvider.when('/', {
    templateUrl: 'app/components/tasks/templates/main.html',
    controller: 'TaskControl',
  });
  $routeProvider.when('/ideas', {
    templateUrl: 'app/components/ideas/templates/main.html',
    controller: 'IdeaControl',
  });
  $routeProvider.when('/about', {
    templateUrl: 'app/components/about/templates/main.html',
  });
});
