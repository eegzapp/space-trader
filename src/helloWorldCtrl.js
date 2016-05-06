/*
var myModule = angular.module('HelloWorldApp', []);

var HelloWorldController =  function($scope) {
       $scope.greeting = "Hello Worldx";
};

myModule.controller("HelloWorldController", HelloWorldController);
*/

angular.module('HelloWorldApp', [])
   .controller('HelloWorldController', ['$scope', function($scope) {
       $scope.greeting = "Hello World";
}]);
