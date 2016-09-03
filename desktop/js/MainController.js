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
        );
      }
    });
