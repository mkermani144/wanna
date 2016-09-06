angular.module('MainApp')
  .controller('FabControl', ($mdDialog, $scope) => {
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
        console.log(task);
      }, () => {
        console.log('nothing');
      });
    }
  });
