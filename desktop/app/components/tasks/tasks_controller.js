angular.module('MainApp')
  .controller('TaskControl', ($scope, db) => {
    db.find('open', (tasks) => {
      $scope.tasks = tasks;
      $scope.array = Array.apply(null, {length: tasks.length}).map(Number.call, Number)
    })
  });
