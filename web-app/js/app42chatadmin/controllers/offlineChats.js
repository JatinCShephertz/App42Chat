/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// Live Chat Controller
chatAdmin.controller("offlineChatsController", function($scope,dataService,$log) {
    $scope.openSubSideBar("dashboardSection")	
    $scope.offlineChatsList = []
    $scope.isMoreOfflineChats = false
    $scope.getOfflineChats = function(){
        $log.info("called getAllUsers")  
        $scope.loadingState = true
        var promise = dataService.getOfflineChats()
        promise.then(
            function(payload) {
                $log.info("called getOfflineChats payload ",payload)  
                $scope.offlineChatsList = payload.data.OfflineChats
                $scope.loadingState = false
            },
            function(errorPayload) {
                $log.info("failure getting getOfflineChats"+errorPayload)  
                $scope.loadingState = false
            }); 
    }
    $scope.getOfflineChats()
    
    $scope.loadMoreOfflineChats = function(){
        $log.info("called loadMoreOfflineChats")  
        $scope.loadingState = true
        var params = {
            offset :  $scope.offlineChatsList.length
        }
        var promise = dataService.loadMoreOfflineChats(params)
        promise.then(
            function(payload) {
                $log.info("called loadMoreOfflineChats payload ",payload) 
                var chats = payload.data.OfflineChats
                chats.forEach(function(c){
                    $scope.offlineChatsList.push(c) 
                })
                if(chats.length == 10){        
                    $scope.isMoreOfflineChats = true
                }else{
                    $scope.isMoreOfflineChats = false
                }
                $scope.loadingState = false
            },
            function(errorPayload) {
                $log.info("failure getting loadMoreOfflineChats"+errorPayload)  
                $scope.loadingState = false
            }); 
    }
    $scope.loadMoreOfflineChats()
});

