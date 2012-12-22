'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/folder/:name', {templateUrl: 'partials/folder.html', controller: FolderCtrl});
	}]);
