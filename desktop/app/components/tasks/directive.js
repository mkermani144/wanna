angular.module('MainApp')
  .directive('uaf', () => { // uaf = Update after find
    return (scope, el, attrs) => {
      scope.$watch('tasks', (newVal) => {
        console.log(typeof(el[0]), el[0]);
        el[0].children[0].innerHTML = newVal[attrs.uaf];
      }, true);
    }
  });
