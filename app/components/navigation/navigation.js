angular.module('app.navigation', [])

  .directive('appNavigation', function () {
    return {
      templateUrl: 'templates/navigation.html',
      restrict: 'AE',
      replace: true
    };
  });
