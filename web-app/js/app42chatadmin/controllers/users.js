/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// Live Chat Controller
chatAdmin.controller("usersController", function($scope,dataService,$log,$location) {
//    $scope.openSubSideBar("dashboardSection")	
    console.log("usersController called")
    $scope.userList = []
    $scope.isMoreUser = false
    
    $scope.getAllUsers = function(){
        $log.info("called getAllUsers")  
        $scope.loadingState = true
        var params = {
            offset :  "0",
            start : $scope.startDate,
            end : $scope.endDate
        }
        var promise = dataService.getAllUsers(params)
        promise.then(
            function(payload) {
                $log.info("called getAllUsers payload ",payload)  
                $scope.userList = payload.data.userList
                if($scope.userList.length >= 10){        
                    $scope.isMoreUser = true
                }else{
                    $scope.isMoreUser = false
                }
                $log.info("$scope.isMoreUser  :::::::::;  ",$scope.isMoreUser)
                $scope.loadingState = false
            },
            function(errorPayload) {
                $log.info("failure getting agents"+errorPayload)  
                $scope.loadingState = false
            }); 
    }
    
    
    $scope.loadMoreUsers = function(){
        $log.info("called loadMoreUsers")  
        $scope.loadingState = true
        var params = {
            offset :  $scope.userList.length,
            start : $scope.startDate,
            end : $scope.endDate
        }
        var promise = dataService.getAllUsers(params)
        promise.then(
            function(payload) {
                $log.info("called loadMoreUsers payload ",payload)  
                var tempUserList =  payload.data.userList
                tempUserList.forEach(function(u){
                    $scope.userList.push(u)
                })                
                if(tempUserList.lenth >= 10){        
                    $scope.isMoreUser = true
                }else{
                    $scope.isMoreUser = false
                }
                $log.info("$scope.isMoreUser  :::::::::;  ",$scope.isMoreUser)
                $scope.loadingState = false
            },
            function(errorPayload) {
                $log.info("failure getting agents"+errorPayload)  
                $scope.loadingState = false
            });
    }
    
    $scope.openUserDetails = function(email){
        $log.info("EMAIL :::::::::::::::::;  "+email)
        $location.path("userHistory/"+email)
    }
    
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
            dateLimit : {
                days : 30
            },
            startDate: moment().subtract(6, 'days'),
            endDate: moment()
        },
        function (start, end,label) {
            $scope.startDate = start.format('YYYY-MM-DD')
            $scope.endDate =end.format('YYYY-MM-DD')
            $('#daterange-btn').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));  
            $scope.getAllUsers()
        });
        $scope.getAllUsers()
    }
    
    $scope.getAllUsersReport = function(){
        $log.info("called getAllUsersReport")  
        window.location.href = "../main/getAllUsersReport?format=csv&extension=csv&start="+$scope.startDate+"&end="+$scope.endDate;
    }
    
    $scope.init()
});

