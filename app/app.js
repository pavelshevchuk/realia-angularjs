(function () {
  "use strict";
  angular.module("app", [
    'ui.bootstrap',
    'ui.router',
    'ngResource',
    'ngTouch',
    'angular-carousel',
    'uiGmapgoogle-maps',
    'infinite-scroll',
    'ngCordova',

    'app.loading',

    'app.navigation',
    'app.footer',

    'app.propertyServices',
    'app.propertyLatest',
    'app.propertyItem',
    'app.error'
  ])
    .config(function(uiGmapGoogleMapApiProvider, $urlRouterProvider, $locationProvider, $provide) {
      $urlRouterProvider.otherwise('/');
      //$locationProvider.html5Mode(true);

      uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyC-jowdEo48vjV4FCVxgfM3TYrtONT3btc'
      });

      $provide.decorator('$uiViewScroll', function () {
        return function () {
          window.scrollTo(0, 0);
        };
      });

    })

    .controller('myGoogleMap', function ($scope) {

      $scope.map = {
        center: {
          latitude: 40.1451,
          longitude: -99.6680
        },
        zoom: 12,
        marker: {
          latitude: 40.1451,
          longitude: -99.6680
        },
        options: {
          scrollwheel: false,
          draggable: false
        }
      };
    });
})();
