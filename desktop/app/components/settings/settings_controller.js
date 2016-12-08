/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/

const settingsControl = function settingsControl($scope, $rootScope) {
  $scope.notyet = $rootScope.notyet;
  $scope.toggleNotYet = function toggleNotYet() {
    $rootScope.notyet = $scope.notyet;
  };
};

angular.module('MainApp')
  .controller('SettingsControl', settingsControl);
