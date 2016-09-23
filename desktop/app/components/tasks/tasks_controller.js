angular.module('MainApp')
  .controller('TaskControl', ($scope, db) => {
    $scope.isShown = true;
    $scope.do = false;
    $scope.delete = false;
    db.find('open', (tasks) => {
      $scope.tasks = tasks;
    });
  });
