/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/

const settingsControl = function settingsControl($scope, $rootScope, db) {
  $scope.notyet = $rootScope.notyet;
  $scope.fullscreen = $rootScope.fullscreen;
  $scope.toggleNotYet = function toggleNotYet() {
    $rootScope.notyet = $scope.notyet;
    db.setNotYet($scope.notyet);
  };
  $scope.toggleFullscreen = function toggleFullscreen() {
    $rootScope.fullscreen = $scope.fullscreen;
    db.setFullscreen($scope.fullscreen);
  };
};

angular.module('MainApp')
  .controller('SettingsControl', settingsControl);
