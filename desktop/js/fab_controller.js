angular.module('MainApp')
  .controller('FabControl', ($mdToast, $mdDialog, $scope, addToDB) => {
    $scope.addNew = (ev) => {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/newTaskDialog.html',
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
        }, () => {
          console.log('Empty task. Ignoring.');
        });
    }

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
  });
