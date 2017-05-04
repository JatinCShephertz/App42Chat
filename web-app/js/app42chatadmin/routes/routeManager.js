/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// AngularJs Module and Configurations
var chatAdmin = angular.module('chatAdmin', ['ngRoute','ngAnimate','localytics.directives']);

// Routes configurations
chatAdmin.config(['$routeProvider','$httpProvider',
    function($routeProvider,$httpProvider) {
        $routeProvider
        //Dashboard Section Routes
        .when('/dashboard', {
            templateUrl: '../adminPanelTemplates/dashboard',
            controller: 'dashboardController'
        })
        .when('/live-chats', {
            templateUrl: '../adminPanelTemplates/liveChat',
            controller: 'liveChatController'
        })
        .when('/previous-chats', {
            templateUrl: '../adminPanelTemplates/previousChat',
            controller: 'previousChatController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }])
    