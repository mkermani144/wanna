angular.module('MainApp')
  .controller('TaskControl', ($scope, db) => {
    db.find('open', (tasks) => {
      $scope.tasks = tasks;
    });
  });
