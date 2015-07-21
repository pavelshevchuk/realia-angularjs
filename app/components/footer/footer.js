angular.module('app.footer', [])

  .directive('appFooter', function() {
    return {
      templateUrl: 'templates/footer.html',
      restrict: 'AE',
      replace: true
    };
  });
