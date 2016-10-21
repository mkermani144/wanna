/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
eslint no-underscore-dangle: ["error", { "allow": ["_id",] }]
*/

const ideaControl = function ideaControl($scope, $rootScope, $mdDialog, $mdToast, db) {
  $scope.isShown = true;
  $scope.current = undefined;

  $scope.remove = (idea) => {
    db.removeIdea(idea, (err) => {
      if (!err) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Idea deleted.')
          .position('bottom start')
          .hideDelay(1000)
        );
      }
    });
  };

  function EditDialogController($scope, idea) {
    $scope.idea = idea;
    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };
    $scope.update = function update(newIdea) {
      if (newIdea) {
        $mdDialog.hide(newIdea);
      }
    };
  }
  $scope.edit = (ev, cur) => {
    $mdDialog.show({
      controller: EditDialogController,
      locals: {
        idea: cur.idea,
      },
      templateUrl: 'app/components/ideas/templates/editIdeaDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    })
    .then((idea) => {
      db.editIdea(cur._id, idea, (err) => {
        if (!err) {
          db.findIdeas((ideas) => {
            $scope.ideas = ideas;
            $scope.$apply();
          });
          $mdToast.show(
            $mdToast.simple()
            .textContent('Idea edited.')
            .position('bottom start')
            .hideDelay(1000)
          );
        }
      });
    });
  };

  function SplitDialogController($scope) {
    $scope.tasks = [];
    $scope.numOfTasks = 1;
    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };
    $scope.split = function update(splittedTasks, numOfTasks) {
      if (splittedTasks.length === numOfTasks) {
        $mdDialog.hide(splittedTasks);
      }
    };
  }
  $scope.split = (ev, cur) => {
    $mdDialog.show({
      controller: SplitDialogController,
      templateUrl: 'app/components/ideas/templates/splitIdeaDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    })
    .then((tasks) => {
      let hasErr = false;
      tasks.forEach((task) => {
        db.insert(task, (err) => {
          if (err) {
            hasErr = true;
          }
        });
      });
      if (!hasErr) {
        db.removeIdea(cur._id, (err) => {
          if (!err) {
            $rootScope.$broadcast('Update tasks');
            $rootScope.$broadcast('Update ideas');
            $mdToast.show(
              $mdToast.simple()
              .textContent('Idea splitted into tasks.')
              .position('bottom start')
            );
          }
        });
      }
    });
  };

  function RandomDialogController($scope) {
    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };
    $scope.split = function update() {
      console.log(left, right);
    };
  }
  $scope.random = (ev) => {
    $mdDialog.show({
      controller: RandomDialogController,
      templateUrl: 'app/components/ideas/templates/randomIdeaDialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
    })
    .then((choice) => {
      console.log(choice);
    });
  };

  $scope.$on('Update ideas', () => {
    db.findIdeas((ideas) => {
      $scope.ideas = ideas;
    });
  });
  db.findIdeas((ideas) => {
    $scope.ideas = ideas;
    $scope.$apply();
  });
};

angular.module('MainApp')
  .controller('IdeaControl', ideaControl);
