angular.module('MainApp', ['ngMaterial'])
  .config(($mdThemingProvider) => {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink')
      .warnPalette('red');
  })
  .controller('MainControl', ($mdDialog, $scope) => {
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
      );
    }
  });
