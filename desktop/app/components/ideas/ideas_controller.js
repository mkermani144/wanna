/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
/*
eslint no-underscore-dangle: ["error", { "allow": ["_id",] }]
*/

const ideaControl = function ideaControl($scope, $mdDialog, $mdToast, db) {
  $scope.isShown = true;
  db.findIdeas((ideas) => {
    $scope.ideas = ideas;
  });
};

angular.module('MainApp')
  .controller('IdeaControl', ideaControl);
