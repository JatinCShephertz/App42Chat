/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// Main controller section

chatAdmin.controller("MainController", function($scope,$interval,$base64,$timeout,$location) {
	
    $scope.dName = ""
    $scope.appKey = s2AppKey
    $scope.s2Address = s2Host
    $scope.usrRole = role
    $scope.baseURL = baseUrl
    $scope.roomID = null

    
    if($scope.usrRole == "AGENT"){
        $scope.dName = "Agent"
    }else{
        $scope.dName = "Admin"
    }
    $("#isAdminOnline").show()
    $("#isAdminOffline").hide()
 
    // Executes every 25 seconds for hiding messages
    $interval( function(){
        // $scope.getUnreadNotifications()
        $("div.alert").hide("slow") // This logic could be improved
    }, 25000);
    
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
 
    var _warpclient;
    //    $scope.encodedUsr = $base64.encode(loggedInUser);
    //    $scope.decoded = $base64.decode($scope.encodedUsr);
    //    console.log($scope.encodedUsr)
    //    console.log($scope.decoded)
    var splitEmail = loggedInUser.split("@")
    console.log(splitEmail)
    // $scope.nameId = splitEmail[0]
    $scope.nameId = loggedInUser
    console.log($scope.nameId)
    $("#isAdminOnline").hide()
    $("#isAdminDefault").show()
    $("#isAdminOffline").hide()
    
    $scope.widgets = []
    // console.log($scope.widgets)
    $scope.signout = function(){
        if($scope.usrRole == "AGENT"){
            if($scope.roomID ===null || $scope.roomID ===undefined){
            
            }else{
                _warpclient.leaveRoom($scope.roomID)
            }
        }
       
        window.location.href = $scope.baseURL+"/login/logout"
    }
    
    $scope.getDate = function(){
        Date.prototype.monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"
        ];

        Date.prototype.getShortMonthName = function () {
            return this.monthNames[this.getMonth()].substr(0, 3);
        };
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getShortMonthName();
        var currDate=mm +" "+dd
        return currDate
    }
    
    $scope.onConnectDone = function(res) {
        console.log("onConnectDone res ",res)
        if(res == AppWarp.ResultCode.Success){
            console.log("Connected");
            _warpclient.invokeZoneRPC("getAgentRoomId",$scope.nameId);
        }else if(res == AppWarp.ResultCode.ConnectionErrorRecoverable){
            $("#isAdminDefault").show()
            $("#isAdminOnline").hide()
            $("#isAdminOffline").hide()
            $timeout( function(){
                _warpclient.recoverConnection()
            }, 3000 );
           
        }else if(res == AppWarp.ResultCode.SuccessRecovered){
            $("#isAdminDefault").hide()
            $("#isAdminOffline").hide()
            $("#isAdminOnline").show()
           
        }else{
            console.log("Error in Connection");
            $("#isAdminDefault").hide()
            $("#isAdminOnline").hide()
            $("#isAdminOffline").show()
        }
       
    }
    function handleRPCCallForGetAgentRoomId(response){
        console.log("handleRPCCallForGetAgentRoomId")
        console.log(response)
        $scope.roomID = response.roomId
        if(response.success){
            _warpclient.joinRoom(response.roomId);
            console.log("response.roomId     ",response.roomId)
        }else{
            console.log(response.message) 
        //Offline Agents case
          
        }
    }
    function onZoneRPCDone(resCode,responseStr) {
        console.log(responseStr)
  
        var response = JSON.parse(responseStr["return"])
        var funCtName = responseStr["function"]
        console.log("funCtName"+funCtName)
        console.log("Getting Room Info after Connection");
       
        if (resCode == AppWarp.ResultCode.Success) {
            if(funCtName == "getAgentRoomId"){
                handleRPCCallForGetAgentRoomId(response)
            }
        }
        else {
            console.log("Error in RPC Call");
           
        // handleChatWindow(false);
        }
    }
    $scope.onJoinRoomDone = function(response) {
        console.log(response)
        console.log("joining room res ",response)
        console.log("joining room res ",response.res)
        if(response.res == AppWarp.ResultCode.Success){
            console.log("joining room successs");
            $("#isAdminDefault").hide()
            $("#isAdminOffline").hide()
            $("#isAdminOnline").show()
        }else{
            console.log("Error in joining room");
            $("#isAdminDefault").hide()
            $("#isAdminOnline").hide()
            $("#isAdminOffline").show()
        }
       
    }
			
			
    $scope.onSendChatDone = function(res) {
        console.log(res)
        var msg = "onSendChatDone : <strong>"+AppWarp.ResultCode[res]+"</strong>";
        console.log(msg);
        if(AppWarp.ResultCode[res] == "Success"){

        }else if(AppWarp.ResultCode[res] == "ResourceNotFound"){

        }
    }

    $scope.createWidgetIfNotExists = function(sender){
        // console.log("createWidgetIfNotExists called for :::"+sender)
        var id = "appwarpchatWidget"+sender
        if ($scope.widgets.filter(function(e) {
            return e.name == sender;
        }).length > 0) {
            console.log("Widget exists")
        }else{
            console.log("Widget does not exists, creating new widget")  
            $scope.widgetContent = {
                id:id,
                name:sender,
                messages:[]
            }
            $scope.widgets.push($scope.widgetContent)
        //console.log($scope.widgets)
        }
    // $scope.sendChat(sender)
    // console.log("DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>>")
    }
    
    
    $scope.sendChat = function(sender){
        console.log("sendChat to::::::"+sender)
        var ID = "txtF"+sender
        var handle = document.getElementById(ID)
        var jsonObj = {
            "to": sender, 
            "message": handle.value
        }
        _warpclient.sendChat(jsonObj);
        // _warpclient.sendPrivateChat(sender,handle.value);
        $scope.setResponse(sender, handle.value,true)
        handle.value = ""
       
    }
    
    $scope.onChatReceived = function(obj) {
        console.log("onChatReceived")
        console.log(obj)
        console.log(obj.getChat())
        var res = JSON.parse(obj.getChat())
        var msg = "New message from <strong>" + res.from + "</strong>.";
        console.log(msg);
        $scope.createWidgetIfNotExists(res.from);
        document.getElementById('xyzNoti').play();
        new PNotify({
            title: 'New Chat Message',
            text: msg,
            type: 'info'
        });
        $scope.setResponse(res.from, res.message,false)
        $scope.$apply()
    }
    
    $scope.setResponse = function(sender,chat,flag)	{
        var id = "appwarpchatWidget"+sender
        // var chatContainer = "chatBox"+sender
        $scope.chatContent = {}
        if(flag){
            $scope.isLft = false
            $scope.chatContent.name = $scope.nameId
        }else{
            $scope.isLft = true  
            $scope.chatContent.name = sender
        }
        $scope.chatContent.position = $scope.isLft
        $scope.chatContent.message = chat
        $scope.chatContent.time = $scope.getDate()
       
        var arr = []
        var result = $.grep($scope.widgets, function(e){
            if(e.id == id){
                e.messages.push($scope.chatContent)
                arr.push(e)
            }else{
                arr.push(e);
            }
        });
            
        $scope.widgets = arr;
    // console.log($scope.widgets)
    //        var fixedScroll = document.getElementById(chatContainer);
    //        fixedScroll.scrollTop = fixedScroll.scrollHeight;
    }
    
    $scope.initDashboard = function(){
        
        AppWarp.WarpClient.initialize($scope.appKey, $scope.s2Address);
        console.log("Connecting...$scope.nameId .............",$scope.nameId);  
        
        _warpclient = AppWarp.WarpClient.getInstance();
        _warpclient.setRecoveryAllowance(120);
        _warpclient.setResponseListener(AppWarp.Events.onConnectDone, $scope.onConnectDone);      
        _warpclient.setResponseListener(AppWarp.Events.onJoinRoomDone, $scope.onJoinRoomDone);
        _warpclient.setResponseListener(AppWarp.Events.onSendChatDone, $scope.onSendChatDone);
        _warpclient.setNotifyListener(AppWarp.Events.onChatReceived, $scope.onChatReceived);
        _warpclient.setResponseListener(AppWarp.Events.onZoneRPCDone, onZoneRPCDone);
        $scope.props = {
            "type":"AGENT"
        }
        _warpclient.connect($scope.nameId, $scope.props);
       
    }
    if($scope.usrRole === "AGENT"){
        $scope.initDashboard()
    }
   
});