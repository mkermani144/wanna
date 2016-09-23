angular.module('MainApp')
  .controller('TaskControl', ($scope, db) => {
    $scope.isShown = true;
    db.find('open', (tasks) => {
      $scope.tasks = tasks;
    });
  });
