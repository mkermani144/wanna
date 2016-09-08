angular.module('MainApp')
  .controller('FabControl', ($mdToast, $mdDialog, $scope, addToDB) => {
    $scope.addNew = (ev) => {
      $mdDialog.show(
          $mdDialog.prompt()
          .title('What do you wanna do?')
          .targetEvent(ev)
          .ok('Add')
          .cancel('Cancel')
          .closeTo({
            top: 520,
            left: 0,
            width: 40,
            height: 30
          })
        )
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
  });
