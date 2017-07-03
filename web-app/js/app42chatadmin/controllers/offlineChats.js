/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// Live Chat Controller
chatAdmin.controller("offlineChatsController", function($scope,dataService,$log) {
    $scope.openSubSideBar("dashboardSection")	
    $scope.offlineChatsList = []
    $scope.isMoreOfflineChats = false
    
    $scope.init = function(){
        $scope.startDate = moment().subtract(6, 'days').format('YYYY-MM-DD')
        $scope.endDate =moment().format('YYYY-MM-DD')
        $('#daterange-btn').val(moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' +  moment().format('YYYY-MM-DD'));
        $('#daterange-btn').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()]
            },
            startDate: moment().subtract(6, 'days'),
            endDate: moment()
        },
        function (start, end,label) {
                $scope.startDate = start.format('YYYY-MM-DD')+" 00:00:00"
                $scope.endDate =end.format('YYYY-MM-DD')+" 23:59:59"
                $('#daterange-btn').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));          
        });
    }
    
    $scope.init()
        
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
    
    $scope.beginReportGeneration = function(){
        $log.info("called beginReportGeneration")  
        window.location.href = "../main/beginReportGeneration?format=csv&extension=csv&start="+$scope.startDate+"&end="+$scope.endDate;
    }
});

