/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


chatAdmin.controller("userHistoryController", function($scope,dataService,$log,$location,$routeParams) {
    $scope.openSubSideBar("dashboardSection")	
    console.log("userHistoryController called")

    
    $scope.getUserDetails = function(){
        $log.info("called getAllUsers")  
        $scope.loadingState = true
        if($routeParams.name != undefined){
            var params = {
                name :  $routeParams.name
            }
            var promise = dataService.getUserDetails(params)
            promise.then(
                function(payload) {
                    $log.info("called getUserDetails payload ",payload) 
                    $scope.userName = payload.data.name
                    $scope.email = payload.data.email
                    $scope.phone = payload.data.phone
                    $scope.createdOn = payload.data.createdOn
                    $scope.loadingState = false
                },
                function(errorPayload) {
                    $log.info("failure getting getUserDetails"+errorPayload)  
                    $scope.loadingState = false
                }); 
        }else{
            $location.path("/users") 
        }
    }
    $scope.getUserDetails()
    
    $scope.openConversation = function(){
        $scope.msgObj = []
        $log.info("called openConversation")  
        $scope.loadingState1 = true
        if($routeParams.name != undefined){
            var params = {
                name :  $routeParams.name
            }
            var promise = dataService.openConversation(params)
            promise.then(
                function(payload) {
                    $log.info("called openConversation payload ",payload) 
                    $scope.msgObj = payload.data
                    $scope.loadingState1 = false
                },
                function(errorPayload) {
                    $log.info("failure getting getUserDetails"+errorPayload)  
                    $scope.loadingState1 = false
                }); 
        }else{
            $location.path("/users") 
        }
    }
    $scope.openConversation()
})