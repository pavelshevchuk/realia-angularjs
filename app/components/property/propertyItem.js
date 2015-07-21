angular.module('app.propertyItem', [
    'app.propertyServices',
    'ui.router'
  ])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('property', {
      url: '/property/:itemId',
      templateUrl: 'templates/propertyItem.html',
      controller: 'propertyItem',
      resolve: {
        property: function(propertyService, $stateParams) {
          return propertyService.getProperty($stateParams.itemId);
        }
      }
    });
  }])

  .controller('propertyItem', function ($scope, property, $sce) {
    $scope.property = property.data[0];
    $scope.property.notes = $sce.trustAsHtml($scope.property.notes);
  })

  .directive('appPropertyTeaser', function () {
    return {
      templateUrl: 'templates/propertyTeaser.html',
      restrict: 'E',
      replace: true,
      scope: {
        property: '='
      }
    };
  });
