/**
 * Used for changing list item texts after
 * ideas are loaded from database.
 *
 * Cast on idea list items.
 */
angular.module('MainApp')
  .directive('uafi', () =>  // uafi = Update after find, ideas
    (scope, el, attrs) => {
      scope.$watch('ideas', (newVal) => {
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uafi].idea}</p>`;
      });
    }
  );
