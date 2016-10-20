/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
eslint no-underscore-dangle: ["error", { "allow": ["_id",] }]
*/

const ideaControl = function ideaControl($scope, $mdDialog, $mdToast, db) {
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

  function DialogController($scope, idea) {
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
      controller: DialogController,
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

  db.findIdeas((ideas) => {
    $scope.ideas = ideas;
  });
};

angular.module('MainApp')
  .controller('IdeaControl', ideaControl);
