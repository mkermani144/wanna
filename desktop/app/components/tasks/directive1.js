const color = require('./app/components/tasks/color');
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
        angular.element(el[0]).css('backgroundColor', color(newVal[attrs.uaf].start, newVal[attrs.uaf].end, Date.now()));
      });
    }
  )
  .directive('uafo', () =>  // uaf-o = Update after find, overdue
    (scope, el, attrs) => {
      scope.$watch('overdueTasks', (newVal) => {
        el[0].children[0].children[0].innerHTML = newVal[attrs.uafo].text;
      });
    }
  );
