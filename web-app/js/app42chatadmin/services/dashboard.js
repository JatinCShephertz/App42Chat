/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 June 2017
 * @version 1.0
 */

// Data Service

chatAdmin.factory('dataService', function($rootScope,$http) {
    var service = {
        getAgents: function() {
            var promise = $http({
                method: 'GET', 
                url: '../main/getAgents'
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        saveAgent : function(params) {
            var promise = $http({
                method: 'POST', 
                url: "../main/saveAgent",
                data: params
            }).success(function(data) {
                return data;
            })
            return promise;
        },
        updateAgent : function(params) {
            var promise = $http({
                method: 'POST', 
                url: "../main/updateAgent",
                data: params
            }).success(function(data) {
                return data;
            })
            return promise;
        },
        getOfflineChats: function(params) {
            var promise = $http({
                method: 'POST', 
                url: '../main/getOfflineChats',
                data: params
            }).success(function(data, status, headers, config) {
                return data;
            })
            return promise;
        },
        getAllUsers : function(params) {
            var promise = $http({
                method: 'POST', 
                url: "../main/getAllUsers",
                data: params
            }).success(function(data) {
                return data;
            })
            return promise;
        },
        getUserDetails : function(params) {
            var promise = $http({
                method: 'POST', 
                url: "../main/getUserDetails",
                data: params
            }).success(function(data) {
                return data;
            })
            return promise;
        },
        openConversation : function(params) {
            var promise = $http({
                method: 'POST', 
                url: "../main/openConversation",
                data: params
            }).success(function(data) {
                return data;
            })
            return promise;
        },
        loadMoreChats : function(params) {
            var promise = $http({
                method: 'POST', 
                url: "../main/loadMoreChats",
                data: params
            }).success(function(data) {
                return data;
            })
            return promise;
        }
    }
    return service
});