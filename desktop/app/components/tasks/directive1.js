const color = require('./app/components/tasks/color');
/**
 * Used for changing list item texts after
 * tasks are loaded from database.
 *
 * Cast on task list items.
 */
angular.module('MainApp')
  .directive('uaf', $compile =>  // uaf = Update after find
    (scope, el, attrs) => {
      scope.$watch('openTasks', (newVal) => {
        const icon = $compile('<md-icon md-svg-src="assets/img/cube.svg" class="small md-primary"></md-icon>')(scope);
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uaf].text}</p>&nbsp;&nbsp;<h6 class="inline mp">${newVal[attrs.uaf].units}</h6>`;
        angular.element(el[0].children[0].children[0]).append(icon);
        const borderLeft = `5px solid ${color.returnColor(newVal[attrs.uaf].start, newVal[attrs.uaf].end, Date.now())}`;
        angular.element(el[0]).css('borderLeft', borderLeft);
      });
    }
  )
  .directive('uafo', $compile =>  // uaf-o = Update after find, overdue
    (scope, el, attrs) => {
      scope.$watch('overdueTasks', (newVal) => {
        const icon = $compile('<md-icon md-svg-src="assets/img/cube.svg" class="small md-warn"></md-icon>')(scope);
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uafo].text}</p>&nbsp;<h6 class="inline mw">${newVal[attrs.uafo].units}</h6>`;
        angular.element(el[0].children[0].children[0]).append(icon);
        const borderLeft = `5px solid ${color.returnColor(newVal[attrs.uafo].start, newVal[attrs.uafo].end, Date.now())}`;
        angular.element(el[0]).css('borderLeft', borderLeft);
      });
    }
  );
