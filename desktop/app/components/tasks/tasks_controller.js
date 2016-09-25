/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
angular.module('MainApp')
  .controller('TaskControl', ($scope, $mdDialog, db) => {
    $scope.current = undefined;
    $scope.isShown = true;
    $scope.do = false;
    $scope.delete = false;
    $scope.markAsDone = db.markAsDone;
    $scope.remove = db.remove;
    $scope.tasks = 123;
    function DialogController($scope) {
      $scope.cancel = function cancel() {
        $mdDialog.cancel();
      };
      $scope.update = function update(task) {
        if (task) {
          $mdDialog.hide(task);
        }
      };
    }
    $scope.edit = (ev, cur) => {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/tasks/templates/editTaskDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
      })
      .then((task) => {
        db.edit(cur, task);
      });
    };
    db.find('open', (tasks) => {
      $scope.tasks = tasks;
    });
  });
