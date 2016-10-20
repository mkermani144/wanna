/**
 * Used for saving id of the task whose status
 * is going to become 1.
 *
 * Cast on mark-as-done, edit and delete icon buttons
 */
angular.module('MainApp')
.directive('setcurrent', () =>
  (scope, el) => {
    angular.element(el[0]).on('click', () => {
      const uafVal = angular.element(el[0]).parent().parent().attr('uaf');
      scope.current = scope.openTasks[uafVal];
    });
  }
)
.directive('setcurrento', () =>
  (scope, el) => {
    angular.element(el[0]).on('click', () => {
      const uafoVal = angular.element(el[0]).parent().parent().attr('uafo');
      scope.current = scope.overdueTasks[uafoVal];
    });
  }
);
