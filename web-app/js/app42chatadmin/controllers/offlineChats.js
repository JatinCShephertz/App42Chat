/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// Live Chat Controller
chatAdmin.controller("offlineChatsController", function($scope,dataService,$log) {
    $scope.openSubSideBar("dashboardSection")	
    $scope.offlineChatsList = []
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
});

