/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
eslint no-underscore-dangle: ["error", { "allow": ["_id",] }]
*/

const taskControl = function taksControl($scope, $mdDialog, $mdToast, db) {
  $scope.current = undefined;
  $scope.isShown = true;
  $scope.do = false;
  $scope.delete = false;

  $scope.markAsDone = (taskId) => {
    db.markAsDone(taskId, (err) => {
      if (!err) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Task done.')
          .position('bottom start')
          .hideDelay(1000)
        );
      }
    });
  };
  $scope.remove = (taskId) => {
    db.remove(taskId, (err) => {
      if (!err) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Task deleted.')
          .position('bottom start')
          .hideDelay(1000)
        );
      }
    });
  };

  function DialogController($scope, task) {
    $scope.task = task;
    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };
    $scope.update = function update(newTask) {
      if (newTask) {
        $mdDialog.hide(newTask);
      }
    };
  }
  $scope.edit = (ev, cur) => {
    $mdDialog.show({
      controller: DialogController,
      locals: {
        task: cur.text,
      },
      templateUrl: 'app/components/tasks/templates/editTaskDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    })
    .then((task) => {
      db.edit(cur._id, task, (err) => {
        if (!err) {
          db.find('open', (tasks) => {
            $scope.openTasks = tasks;
            $scope.$apply();
          });
          db.find('overdue', (tasks) => {
            $scope.overdueTasks = tasks;
            $scope.$apply();
          });
          $mdToast.show(
            $mdToast.simple()
            .textContent('Task edited.')
            .position('bottom start')
            .hideDelay(1000)
          );
        }
      });
    });
  };
  $scope.$on('Update tasks', () => {
    db.find('open', (tasks) => {
      $scope.openTasks = tasks;
    });
    db.find('overdue', (tasks) => {
      $scope.overdueTasks = tasks;
    });
  });
  db.find('open', (tasks) => {
    $scope.openTasks = tasks;
  });
  db.find('overdue', (tasks) => {
    $scope.overdueTasks = tasks;
  });
};

angular.module('MainApp')
  .controller('TaskControl', taskControl);
