/**
 * Shephertz Technologies
 * 
 * @author Jatin Chauhan
 * @date 30 April 2017
 * @version 1.0
 */

// Agents Controller
chatAdmin.controller("agentsController", function($scope,dataService,$log) {
//    $scope.openSubSideBar("agentsSection")	
    $scope.agents = []
    $scope.isNameValid = "default"
    $scope.isEmailValid = "default"
    $scope.isCapacityValid = "default"
    $scope.name= ""
    $scope.email= ""
    $scope.capacity = 1
   
    // Get All Endpoints
    $scope.getAgents = function(){  
        $log.info("called getAgents")  
        $scope.loadingState = true
        var promise = dataService.getAgents()
        promise.then(
            function(payload) {
                $scope.agents = payload.data 
                $scope.loadingState = false
            },
            function(errorPayload) {
                $log.info("failure getting agents"+errorPayload)  
                $scope.loadingState = false
            });    
    }
    $scope.getAgents()
    
    $scope.openPwddModal = function(obj){
        $scope.dynPwd = obj.password
        $("#shwPwddModal").modal("show");
    }
    
    $scope.openCreateAgent = function(obj){
        console.log(obj)
        if(obj === undefined){
            $scope.name= ""
            $scope.email= ""
            $scope.capacity = 1
            $scope.isEdit = false
        }else{
            $scope.name= obj.name
            $scope.email= obj.email
            $scope.capacity= parseInt(obj.capacity)
            $scope.isEdit = true
        }
        $scope.isNameValid = "default"
        $scope.isEmailValid = "default"
        $scope.isCapacityValid = "default"
        $("#openAgentFormModal").modal("show");
    }
    
    $scope.IsValidEmail = function(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    
    $scope.validate = function(){
        $scope.err = "false"
        $scope.isNameValid = "default"
        $scope.isEmailValid = "default"
        $scope.isCapacityValid = "default"
       
        if($scope.name === undefined || $scope.name === null || $scope.name == ""){
            $scope.err = "true"
            $scope.isNameValid = "blank"
        }
        
        if($scope.capacity === undefined || $scope.capacity === null || $scope.capacity == ""){
            $scope.err = "true"
            $scope.isCapacityValid = "blank"
        }
        
        if($scope.email === undefined || $scope.email === null || $scope.email == ""){
            $scope.err = "true"
            $scope.isEmailValid = "blank"
        }else if(!IsValidEmail($scope.email)){
            $scope.err = "true"
            $scope.isEmailValid = "invalid"
        }
        
        if($scope.err == "true"){
            return false
        }
        return true
    }
    
    $scope.saveAgent = function(){
        //validation step
        if($scope.validate()){
            //validation step success
            var params = {
                "email":$scope.email,
                "name":$scope.name,
                "capacity":$scope.capacity
            }
            $scope.loadingStateModal = true
            $scope.params = {
                "reqData":JSON.stringify(params)
            }
            var promise = dataService.saveAgent($scope.params);
            promise.then(
                function(payload) {
                    if(payload.data.success){
                        $scope.loadingStateModal = false
                        $("#openAgentFormModal").modal("hide")
                        $("#successMsgAddgent").show()
                        $scope.getAgents()
                    }else{
                        $scope.loadingStateModal = false
                        $("#errorMsgAddAgent").show()
                        $scope.errorMsg = payload.data.msg
                    }
                },
                function(errorPayload) {
                    $scope.loadingStateModal = false
                    $log.info("failure adding Agent"+errorPayload)      
                }); 
        }
       
    }
    
    $scope.updateAgent = function(){
        //validation step
        if($scope.validate()){
            //validation step success
            var params = {
                "email":$scope.email,
                "name":$scope.name,
                "capacity":$scope.capacity
            }
            $scope.loadingStateModal = true
            $scope.params = {
                "reqData":JSON.stringify(params)
            }
            var promise = dataService.updateAgent($scope.params);
            promise.then(
                function(payload) {
                    if(payload.data.success){
                        $scope.loadingStateModal = false
                        $("#openAgentFormModal").modal("hide")
                        $("#successMsgEditgent").show()
                        $scope.getAgents()
                    }else{
                        $scope.loadingStateModal = false
                        $("#errorMsgAddAgent").show()
                        $scope.errorMsg = payload.data.msg
                    }
                },
                function(errorPayload) {
                    $scope.loadingStateModal = false
                    $log.info("failure adding Agent"+errorPayload)      
                }); 
        }
       
    }
    
});