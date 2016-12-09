/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/

const settingsControl = function settingsControl($scope, $rootScope, db) {
  $scope.notyet = $rootScope.notyet;
  $scope.toggleNotYet = function toggleNotYet() {
    $rootScope.notyet = $scope.notyet;
    db.setNotYet($scope.notyet);
  };
};

angular.module('MainApp')
  .controller('SettingsControl', settingsControl);
