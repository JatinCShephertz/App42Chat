/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// Live Chat Controller
chatAdmin.controller("usersController", function($scope,dataService,$log) {
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
                $scope.totalUsers = payload.data.totalCount
                if($scope.totalUsersgth > 10){
                    $scope.isMoreUser = true
                }else{
                    $scope.isMoreUser = false
                }
                $scope.loadingState = false
            },
            function(errorPayload) {
                $log.info("failure getting agents"+errorPayload)  
                $scope.loadingState = false
            }); 
    }
    $scope.getAllUsers()
    
    $scope.showConversation = false
    $scope.openConversation = function(name,icon){
        $scope.showConversation = true 
        $scope.selectedName = name
        $scope.selectedIcon = icon
        $scope.msgObj = []
        var userObj = {}
        userObj.message = "hi"
        userObj.name = "Chauhan2"
        userObj.position = true
        userObj.time = "May2"
        $scope.msgObj.push(userObj)
        userObj = {}
        userObj.message =  "Good Morning.How can I help you?"
        userObj.name =  "ADMIN"
        userObj.position =  false
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {} 
        userObj.message =  "I need your help with TrackinID = 89234568"
        userObj.name =  "Chauhan2"
        userObj.position =  true
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {} 
        userObj.message =  "I need it's latest status"
        userObj.name =  "Chauhan2"
        userObj.position =  true
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {} 
        userObj.message =  "Ok;wait a min"
        userObj.name =  "ADMIN"
        userObj.position =  false
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {} 
        userObj.message =  "Okie"
        userObj.name =  "Chauhan2"
        userObj.position =  true
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {}
        userObj.message =  "Your order is in gurgaon warehouse and will be reaching jaipur tomorrow."
        userObj.name =  "ADMIN"
        userObj.position =  false
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {}
        userObj.message =  "Thanks alot"
        userObj.name =  "Chauhan2"
        userObj.position =  true
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)
        userObj = {} 
        userObj.message =  "Welcome sir"
        userObj.name =  "ADMIN"
        userObj.position =  false
        userObj.time =  "May2"
        $scope.msgObj.push(userObj)

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

