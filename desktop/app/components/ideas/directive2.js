/**
 * Used for saving id of the idea whose status
 * is going to become 1.
 *
 * Cast on edit and delete icon buttons
 */
angular.module('MainApp')
.directive('setcurrenti', () =>
  (scope, el) => {
    angular.element(el[0]).on('click', () => {
      const uafiVal = angular.element(el[0]).parent().parent().attr('uafi');
      scope.current = scope.ideas[uafiVal];
    });
  }
);
