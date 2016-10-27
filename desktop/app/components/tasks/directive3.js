/*
  global parse
*/
/**
 * Used for validating periods.
 *
 * Cast on task inputs.
 */
const validator = function v() {
  return {
    require: 'ngModel',
    link: (scope, elem, attr, ngModel) => {
      ngModel.$parsers.push((value) => {
        let start;
        let end;
        let period;
        try {
          const ret = parse(value);
          start = ret.start;
          end = ret.end;
          period = ret.period;
        } catch (e) {
          return value;
        }
        if (period < (end - start) && period !== -1) {
          ngModel.$setValidity('validperiod', false);
        } else {
          ngModel.$setValidity('validperiod', true);
          return value;
        }
        return undefined;
      });
    },
  };
};
angular.module('MainApp')
  .directive('validperiod', validator);
