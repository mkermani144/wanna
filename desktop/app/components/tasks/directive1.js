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
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uaf].text}</p>&nbsp;<h6 class="inline">${newVal[attrs.uaf].units}</h6>`;
        angular.element(el[0]).css('backgroundColor', color.returnColor(newVal[attrs.uaf].start, newVal[attrs.uaf].end, Date.now()));
      });
    }
  )
  .directive('uafo', () =>  // uaf-o = Update after find, overdue
    (scope, el, attrs) => {
      scope.$watch('overdueTasks', (newVal) => {
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uafo].text}</p>&nbsp;<h6 class="inline">${newVal[attrs.uafo].units}</h6>`;
        angular.element(el[0]).css('backgroundColor', color.returnColorO(newVal[attrs.uafo].end, Date.now()));
      });
    }
  );
