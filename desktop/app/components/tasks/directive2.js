/**
 * Used for saving id of the task whose status
 * is going to become 1.
 *
 * Cast on mark-as-done icon buttons
 */
angular.module('MainApp')
.directive('setcurrent', () =>
  (scope, el) => {
    angular.element(el[0]).on('click', () => {
      const uafVal = angular.element(el[0]).parent().parent().attr('uaf');
      scope.current = scope.openTasks[uafVal];
    });
  }
);
