const sidenavControl = function sidenavControl($scope, $location) {
  $scope.switch = (path) => {
    $location.path(path);
  };
};

angular.module('MainApp')
  .controller('SidenavControl', sidenavControl);
