/**
 * Used for changing list item texts after
 * tasks are loaded from database.
 *
 * Cast on task list items.
 */
angular.module('MainApp')
  .directive('uaf', () =>  // uaf = Update after find
    (scope, el, attrs) => {
      scope.$watch('openTasks', (newVal) => {
        el[0].children[0].children[0].innerHTML = newVal[attrs.uaf].text;
      });
    }
  )
  .directive('uafo', () =>  // uaf-o = Update after find, overdue
    (scope, el, attrs) => {
      scope.$watch('overdueTasks', (newVal) => {
        console.log('hhh');
        el[0].children[0].children[0].innerHTML = newVal[attrs.uafo].text;
      });
    }
  );
