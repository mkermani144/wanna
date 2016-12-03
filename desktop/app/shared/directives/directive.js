/**
 * Used for showing actions on hover.
 *
 * Cast on idea or task list items.
 */
angular.module('MainApp')
  .directive('showonhover', () =>  // uafi = Update after find, ideas
    (scope, el) => {
      angular.element(el[0]).on('mouseenter', () => {
        const len = angular.element(el[0]).children().length;
        angular.element(angular.element(el[0]).children()[len - 1]).css('opacity', '1');
      });
      angular.element(el[0]).on('mouseleave', () => {
        const len = angular.element(el[0]).children().length;
        angular.element(angular.element(el[0]).children()[len - 1]).css('opacity', '0');
      });
    }
  );
