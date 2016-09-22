/*
eslint no-shadow: ["error", { "allow": ["$scope"] }]
*/
angular.module('MainApp')
  .controller('FabControl', ($mdToast, $mdDialog, $scope, db) => {
    function DialogController($scope) {
      $scope.cancel = function cancel() {
        $mdDialog.cancel();
      };

      $scope.add = function add(task) {
        if (task) {
          $mdDialog.hide(task);
        }
      };
    }
    $scope.addNew = (ev) => {
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
        db.insert(task);
        $mdToast.show(
          $mdToast.simple()
          .textContent('Task added.')
          .position('bottom start')
        );
      });
    };
  }
);
