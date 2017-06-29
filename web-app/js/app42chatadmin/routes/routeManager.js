/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// AngularJs Module and Configurations
var chatAdmin = angular.module('chatAdmin', ['ngRoute','ngAnimate','localytics.directives','base64']);

// Routes configurations
chatAdmin.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider
        //Dashboard Section Routes
        .when('/dashboard', {
            templateUrl: '../adminPanelTemplates/dashboard',
            controller: 'dashboardController'
        })
         .when('/agents', {
            templateUrl: '../adminPanelTemplates/agents',
            controller: 'agentsController'
        })
        .when('/live-chats', {
            templateUrl: '../adminPanelTemplates/liveChat',
            controller: 'liveChatController'
        })
        .when('/users', {
            templateUrl: '../adminPanelTemplates/users',
            controller: 'usersController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }])
    