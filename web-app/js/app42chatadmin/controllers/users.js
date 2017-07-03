/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// Live Chat Controller
chatAdmin.controller("usersController", function($scope,dataService,$log,$location) {
    $scope.openSubSideBar("dashboardSection")	
    console.log("usersController called")
    $scope.userList = []
    $scope.isMoreUser = false
    $scope.getAllUsers = function(){
        $log.info("called getAllUsers")  
        $scope.loadingState = true
        var promise = dataService.getAllUsers()
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
    $scope.getAllUsers()
    
    $scope.loadMoreUsers = function(){
        $log.info("called loadMoreUsers")  
        $scope.loadingState = true
        var params = {
            offset :  $scope.userList.length
        }
        var promise = dataService.loadMoreUsers(params)
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

    $scope.search = function(){
        console.log("callleddddS")
        // Declare variables
        var input, filter, ul, li, a, i;
        input = document.getElementById('searchUser');
        filter = input.value.toUpperCase();
        ul = document.getElementById("userList");
        li = ul.getElementsByTagName('li');

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
});

