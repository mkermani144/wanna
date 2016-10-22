/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
eslint no-underscore-dangle: ["error", { "allow": ["_id",] }]
*/

const shuffle = require('./app/components/ideas/shuffle');

const ideaControl = function ideaControl($scope, $rootScope, $mdDialog, $mdToast, db) {
  $scope.isShown = true;
  $scope.current = undefined;

  $scope.remove = (idea) => {
    db.removeIdea(idea, (err) => {
      if (!err) {
        db.findIdeas((ideas) => {
          $scope.ideas = ideas;
          $scope.$apply();
        });
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

  function SplitDialogController($scope, cur) {
    $scope.cur = cur;
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
      locals: {
        cur: $scope.current,
      },
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
            db.findIdeas((ideas) => {
              $scope.ideas = ideas;
              $scope.$apply();
            });
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

  function RandomDialogController($scope, left, right) {
    $scope.left = left;
    $scope.right = right;
    $scope.cancel = function cancel() {
      $mdDialog.cancel();
    };
    $scope.split = function update(choice) {
      $mdDialog.hide(choice);
    };
  }
  $scope.random = (ev) => {
    if ($scope.ideas.length < 5) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('Insufficient ideas')
          .textContent('You should have at least 5 ideas to get random ones.')
          .ariaLabel('Insufficient ideas alert')
          .ok('Got it!')
          .targetEvent(ev)
      );
    } else {
      const ideasShuffled = shuffle(...$scope.ideas);
      $mdDialog.show({
        controller: RandomDialogController,
        templateUrl: 'app/components/ideas/templates/randomIdeaDialog.html',
        locals: {
          left: ideasShuffled[0],
          right: ideasShuffled[1],
        },
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
      })
      .then((choice) => {
        $scope.current = choice;
        $scope.split(null, $scope.current);
      });
    }
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
