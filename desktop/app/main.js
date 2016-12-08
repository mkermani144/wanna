const module = angular.module('MainApp', ['ngMaterial', 'ngMessages', 'ngRoute']);
module.config(($mdThemingProvider) => {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('pink')
    .warnPalette('red');
});
module.run((db, $rootScope) => {
  db.setDefaultSettings(() => {
    db.fetchNotYet((notyet) => {
      $rootScope.notyet = notyet;
      $rootScope.$broadcast('Update not-yet');
    });
  });
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
  $routeProvider.when('/settings', {
    templateUrl: 'app/components/settings/templates/main.html',
    controller: 'SettingsControl',
  });
  $routeProvider.when('/about', {
    templateUrl: 'app/components/about/templates/main.html',
    controller: 'AboutControl',
  });
});
