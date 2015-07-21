angular.module('app.propertyServices', [
  'ngResource'
])

  .service('propertyService', function ($resource, $http) {
    var url = '/properties';

    this.getLatestProperties = function (params) {
      return $http.jsonp(url + '?callback=JSON_CALLBACK&start=' + params.start + '&end=' + params.end);
    };

    this.getProperty = function (itemId) {
      return $http.jsonp(url + '?callback=JSON_CALLBACK&id=' + itemId);
    };
  });
