/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
global ipc
*/
angular.module('MainApp')
  .controller('FabControl', ($mdToast, $mdDialog, $scope, $rootScope, db) => {
    function DialogController($scope) {
      $scope.cancel = function cancel() {
        $mdDialog.cancel();
      };

      $scope.add = function add(taskOrIdea) {
        if (taskOrIdea) {
          $mdDialog.hide(taskOrIdea);
        }
      };
    }
    $scope.addNewTask = (ev) => {
      $scope.taskDialogIsOpen = 1;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/fab/templates/newTaskDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        closeTo: {
          top: 520,
          left: 0,
          width: 40,
          height: 30,
        },
      })
      .then((task) => {
        db.insert(task, () => {
          $rootScope.$broadcast('Update tasks');
        });
        $mdToast.show(
          $mdToast.simple()
          .textContent('Task added.')
          .position('bottom start')
        );
      })
      .finally(() => {
        $scope.taskDialogIsOpen = 0;
      });
    };
    $scope.addNewIdea = (ev) => {
      $scope.ideaDialogIsOpen = 1;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/fab/templates/newIdeaDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        closeTo: {
          top: 520,
          left: 0,
          width: 40,
          height: 30,
        },
      })
      .then((idea) => {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Idea added.')
          .position('bottom start')
        );
      })
      .finally(() => {
        $scope.taskDialogIsOpen = 0;
      });
    };
    ipc.on('Add new task', () => {
      if (!$scope.taskDialogIsOpen) {
        $scope.addNewTask();
      }
    });
    ipc.on('Add new idea', () => {
      if (!$scope.ideaDialogIsOpen) {
        $scope.addNewIdea();
      }
    });
  }
);
