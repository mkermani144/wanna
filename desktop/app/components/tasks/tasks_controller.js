angular.module('MainApp')
  .controller('TaskControl', ($scope, db) => {
    $scope.isShown = true;
    $scope.do = false;
    $scope.delete = false;
    $scope.current = undefined;
    $scope.markAsDone = db.markAsDone;
    $scope.remove = db.remove;
    db.find('open', (tasks) => {
      $scope.tasks = tasks;
    });
  });
