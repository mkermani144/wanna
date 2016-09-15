angular.module('MainApp')
  .controller('FabControl', ($mdToast, $mdDialog, $scope, addToDB) => {
    function DialogController($scope, $mdDialog) {
      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.add = function(task) {
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
            height: 30
          }
        })
        .then(task => {
          addToDB(task);
          $mdToast.show(
            $mdToast.simple()
            .textContent('Task added.')
            .position('bottom start')
          );
        });
    }

  });
