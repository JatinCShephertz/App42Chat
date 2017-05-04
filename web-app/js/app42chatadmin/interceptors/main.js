/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// Request/Response Interceptors

chatAdmin.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 200) {
                if(response.data.message == "Session time out Error:0x10133817"){
                    $("#error_modal").modal('show')
                    return $q.reject(response);
                }
            }else if(response.status === 401) {
                if(response.data.message == "Session time out Error:0x10133817"){
                	if(!$('#error_modal').hasClass('in')){
                    	$("#error_modal").modal('show')
                    }
                    return $q.reject(response);
                }
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                if(rejection.data != undefined && rejection.data[0]!= undefined && rejection.data[0].message == "Session time out Error:0x10133817"){
                    if(!$('#error_modal').hasClass('in')){
                    	$("#error_modal").modal('show')
                    }
                    return $q.reject(rejection);
                }
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider','$sceProvider',function($httpProvider,$sceProvider) {
    // Modify post request to able to send a parameter list instead of JSON
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    $sceProvider.enabled(false);
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    // post request modification end.
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
    
    // Modify post request to able to send a parameter list instead of JSON
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    }
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
   // post request modification end.
}]);