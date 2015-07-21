angular.module('app.propertyLatest', [
    'app.propertyServices',
    'ui.router'
  ])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'templates/propertyLatest.html',
      controller: 'propertyLatest',
      resolve: {
        properties: function(propertyService) {
          return propertyService.getLatestProperties({start: 0, end: 8});
        }
      }
    });
  }])

  .controller('propertyLatest', function ($scope, propertyService, properties, $http) {
    $http.get('http://realia.dev/properties/latest').
      success(function(data, status, headers, config) {
        $scope.data = data;
        console.dir(data);
        // this callback will be called asynchronously
        // when the response is available
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    $scope.properties = properties.data;

    $scope.isEnd = false;
    $scope.isLoading = false;

    $scope.propertiesPagingLoad = function() {
      var params = {
        start: $scope.properties.length,
        end: $scope.properties.length + 8
      };

      if (!$scope.isEnd && !$scope.isLoading) {
        $scope.isLoading = true;
        propertyService.getLatestProperties(params).success(function (data) {
          $scope.isLoading = false;
          if (data.length) {
            $scope.properties = $scope.properties.concat(data);
            if (data.length < 8) {
              $scope.isEnd = true;
            }
          }
          else {
            $scope.isEnd = true;
          }
        });
      }
    };
  });
