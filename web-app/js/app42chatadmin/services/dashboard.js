/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
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
        }
    }
    return service
});