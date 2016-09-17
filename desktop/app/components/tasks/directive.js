angular.module('MainApp')
  .directive('uaf', () => { // uaf = Update after find
    return (scope, el) => {
      scope.$watch((newVal) => {
        el.text(newVal);
      }, true);
    }
  });
