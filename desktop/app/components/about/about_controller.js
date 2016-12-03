const { shell } = require('electron');

const aboutControl = function aboutControl($scope) {
  $scope.open = (arg) => {
    const mapping = {
      repo: 'https://github.com/mkermani144/wanna',
      star: 'https://github.com/mkermani144/wanna/stargazers',
      license: 'https://github.com/mkermani144/wanna/blob/master/LICENSE.md',
    };
    shell.openExternal(mapping[arg]);
  };
};

angular.module('MainApp')
  .controller('AboutControl', aboutControl);
