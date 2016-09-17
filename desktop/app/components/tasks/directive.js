angular.module('MainApp')
  .directive('uaf', () => { // uaf = Update after find
    return (scope, el, attrs) => {
      scope.$watch('tasks', (newVal) => {
        el.text(newVal[attrs.uaf]);
      }, true);
    }
  });
