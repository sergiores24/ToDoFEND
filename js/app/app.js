var ToDoApp = angular.module('ToDoApp', [
    'ngRoute',
    'ToDoAppServices',
    'ToDoAppControllers',
    'ui.bootstrap'
]);

ToDoApp.constant('api_url','http://localhost:3000/api');

ToDoApp.config(function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        }).otherwise({
           redirectTo: '/'	
        });
});