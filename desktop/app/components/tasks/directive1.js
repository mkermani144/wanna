/**
 * Used for changing list item texts after
 * tasks are loaded from database.
 *
 * Cast on task list items.
 */
angular.module('MainApp')
  .directive('uaf', () =>  // uaf = Update after find
    (scope, el, attrs) => {
      scope.$watch('tasks', (newVal) => {
        el[0].children[0].children[0].innerHTML = newVal[attrs.uaf].text;
      });
    }
  );
