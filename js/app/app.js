var ToDoApp = angular.module('ToDoApp', [
    'ngRoute',
    'ToDoAppServices',
    'ToDoAppControllers',
    'satellizer',
    'ngFileUpload',
    'uiGmapgoogle-maps',
    'angular-loading-bar',
	'datatables'
]);

ToDoApp.config(function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        }).otherwise({
           redirectTo: '/'	
        });
});