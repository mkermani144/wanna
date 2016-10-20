/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
eslint no-underscore-dangle: ["error", { "allow": ["_id",] }]
*/

const ideaControl = function ideaControl($scope, $mdDialog, $mdToast, db) {
  $scope.isShown = true;

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

  db.findIdeas((ideas) => {
    $scope.ideas = ideas;
  });
};

angular.module('MainApp')
  .controller('IdeaControl', ideaControl);
