/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 20 June 2017
 * @version 1.0
 */

// Main controller section

chatAdmin.controller("MainController", function($scope,$interval,$log,$timeout,$location) {
	
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
        //console.log("onConnectDone res ",res)
        $log.info("onConnectDone"+res)
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
    $scope.onZoneRPCDone = function (resCode,responseStr) {
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
       
        if(handle.value != "" && handle.value.length <=500){
            var jsonObj = {
                "to": sender, 
                "message": handle.value
            }
            _warpclient.sendChat(jsonObj);
            $scope.setResponse(sender, handle.value,true)
            handle.value = ""
        }else{
            
        }
    }
    $scope.endChat = function(user){
        console.log("end Chat for::::::"+user)
        _warpclient.invokeRoomRPC($scope.roomID,"endChatWithUser",user);
        var handle = "appwarpchatWidget"+user
        $(document.getElementById(handle)).slideUp("slow", function() { 
            $(this).css('display','none'); 
        });
    }
    
    $scope.onRoomRPCDone =   function (resCode,responseStr) {
        console.log("onRoomRPCDone")
        console.log(resCode)
        console.log(responseStr)
    }
    
    $scope.onUserLeftRoom =  function(roomObj,usr) {
        document.getElementById('xyzNoti').play();
        new PNotify({
            title: 'New Message',
            text: usr+" has ended chat.",
            buttons: {
                sticker: false
            }
        }).get().click(function(e) {
            $location.path("/live-chats")
        });
        var handle = "appwarpchatWidget"+usr
        $(document.getElementById(handle)).slideUp("slow", function() { 
            $(this).css('display','none'); 
        });
    }
    
    $scope.onChatReceived = function(obj) {
        console.log("onChatReceived")
        console.log(obj.getChat())
        var res = JSON.parse(obj.getChat())
        var msg = "from <strong>" + res.from + "</strong>.";
        //console.log(msg);
        $scope.createWidgetIfNotExists(res.from);
        document.getElementById('xyzNoti').play();
        new PNotify({
            title: 'New Message',
            text: msg,
            type: 'info',
            buttons: {
                sticker: false
            }
        }).get().click(function(e) {
            $location.path("/live-chats")
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
        console.log("Connecting...............",$scope.nameId);  
        
        _warpclient = AppWarp.WarpClient.getInstance();
        _warpclient.setRecoveryAllowance(120);
        _warpclient.setResponseListener(AppWarp.Events.onConnectDone, $scope.onConnectDone);      
        _warpclient.setResponseListener(AppWarp.Events.onJoinRoomDone, $scope.onJoinRoomDone);
        _warpclient.setResponseListener(AppWarp.Events.onSendChatDone, $scope.onSendChatDone);
        _warpclient.setResponseListener(AppWarp.Events.onZoneRPCDone, $scope.onZoneRPCDone);
        _warpclient.setResponseListener(AppWarp.Events.onRoomRPCDone, $scope.onRoomRPCDone);
        _warpclient.setNotifyListener(AppWarp.Events.onChatReceived, $scope.onChatReceived);
        _warpclient.setNotifyListener(AppWarp.Events.onUserLeftRoom, $scope.onUserLeftRoom);
        
        $scope.props = {
            "type":"AGENT"
        }
        _warpclient.connect($scope.nameId, $scope.props);
       
    }
    if($scope.usrRole === "AGENT"){
        $scope.initDashboard()
    }
   
});