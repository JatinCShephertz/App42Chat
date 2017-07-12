/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 20 June 2017
 * @version 1.0
 */

// Main controller section

chatAdmin.controller("MainController", function($scope,$interval,$log,$timeout,$location,$window,dataService) {
	
    $scope.dName = ""
    $scope.appKey = s2AppKey
    $scope.s2Address = s2Host
    $scope.usrRole = role
    $scope.baseURL = baseUrl
    $scope.roomID = null
    $scope.retryCounter = 0
    $scope.isOldPwdValid = "default"
    $scope.isNewPwdValid = "default"
    $scope.isConfNewPwdValid = "default"
    $scope.disablePwdFormBtn = false
    $scope.isOffline =false
    
    var Base64 = {


        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


        encode: function(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },


        decode: function(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        _utf8_decode: function(utftext) {
            var string = "";
            var i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    }
    
    
    $scope.openChangePwd = function(){
        console.log("calleddd openChangePwd")
        $scope.isOldPwdValid = "default"
        $scope.isNewPwdValid = "default"
        $scope.isConfNewPwdValid = "default"
        $scope.disablePwdFormBtn = false
        $scope.oldPwd = ""
        $scope.password = ""
        $scope.repPwd = ""
        $("#openChangePwdModal").modal("show")
    }
    $scope.validateUpdatePwdForm = function(){
        $scope.err = "false"
        $scope.isOldPwdValid = "default"
        $scope.isNewPwdValid = "default"
        $scope.isConfNewPwdValid = "default"
       
        if($scope.oldPwd === undefined || $scope.oldPwd === null || $scope.oldPwd == ""){
            $scope.err = "true"
            $scope.isOldPwdValid = "blank"
        }
        
        if($scope.password === undefined || $scope.password === null || $scope.password == ""){
            $scope.err = "true"
            $scope.isNewPwdValid = "blank"
        }
        
        if($scope.repPwd === undefined || $scope.repPwd === null || $scope.repPwd == ""){
            $scope.err = "true"
            $scope.isConfNewPwdValid = "blank"
        }else if($scope.repPwd != $scope.password){
            $scope.err = "true"
            $scope.isConfNewPwdValid = "MisMatch"
        }
        
        if($scope.err == "true"){
            return false
        }
        return true
    }
    $scope.updatePassword = function(){
        console.log("calleddd updatePassword")
        
        if($scope.validateUpdatePwdForm()){
            $scope.disablePwdFormBtn = true
            var params = {
                "oldPwd":$scope.oldPwd,
                "newPwd":$scope.password
            }
           
            $scope.params = {
                "reqData":JSON.stringify(params)
            }
            var promise = dataService.updatePwd($scope.params);
            promise.then(
                function(payload) {
                    if(payload.data.success){
                        $("#successMsgChangePassword").show()
                        $timeout( function(){
                            $scope.disablePwdFormBtn = false
                            $("#openChangePwdModal").modal("hide")
                        }, 3000 );
                        
                    }else{
                        $scope.disablePwdFormBtn = false
                        $("#errorMsgChangePwd").show()
                        $scope.errorMsg = payload.data.msg
                    }
                },
                function(errorPayload) {
                    $("#errorMsgChangePwd").show()
                    $scope.disablePwdFormBtn = false
                    $scope.errorMsg = "Something went wrong. Please try again later."
                    $log.info("failure adding Agent"+errorPayload)      
                }); 
            
           
        }
   
    }
    
    function ConfirmLeave() {
        console.log("tried to close")
        if(_warpclient && $scope.roomID !=null){
            _warpclient.leaveRoom($scope.roomID);
        }
    }
    $(window).on('mouseover', (function () {
        window.onbeforeunload = null;
    }));
    $(window).on('mouseout', (function () {
        window.onbeforeunload = ConfirmLeave;
    }));
             
    var prevKey="";
    $(document).keydown(function (e) {            
        if (e.key=="F5") {
            window.onbeforeunload = ConfirmLeave;
        }
        else if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {                
            window.onbeforeunload = ConfirmLeave;   
        }
        else if (e.key.toUpperCase() == "R" && prevKey == "CONTROL") {
            window.onbeforeunload = ConfirmLeave;
        }
        else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
            window.onbeforeunload = ConfirmLeave;
        }
        prevKey = e.key.toUpperCase();
    //return confirmationMessage;
    });

    
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

    //var splitEmail = loggedInUser.split("@")
 
    $scope.nameId = loggedInUser

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
            while($scope.retryCounter <=9){
               
                $timeout( function(){
                    _warpclient.recoverConnection()
                }, 10000 );
                $scope.retryCounter = $scope.retryCounter + 1
            }
           
           
        }else if(res == AppWarp.ResultCode.SuccessRecovered){
            $scope.retryCounter = 0
            $("#isAdminDefault").hide()
            $("#isAdminOffline").hide()
            $("#isAdminOnline").show()
           
        }else{
            console.log("Error in Connection");
            $("#isAdminDefault").hide()
            $("#isAdminOnline").hide()
            $("#isAdminOffline").show()
            $scope.isOffline =true
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
    
    $scope.removeWidget = function(id){
        var remainingArr = []
        var result = $.grep($scope.widgets, function(op){
            if(op.id == id){
                
            }else{
                remainingArr.push(op)
            }
        });
        $scope.widgets = remainingArr
    //  $scope.$apply()
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
       
        }
  
    }
    
    $scope.sendChat = function(sender){
        console.log("sendChat to::::::"+sender)
        var ID = "txtF"+sender
        var handle = document.getElementById(ID)
        console.log($.trim(handle.value))
        console.log(Base64.encode($.trim(handle.value)))
        if($.trim(handle.value) != "" && $.trim(handle.value).length <=500){
            var jsonObj = {
                "to": sender, 
                "message": Base64.encode($.trim(handle.value))
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
        $scope.removeWidget(handle)
    }
    
    $scope.onRoomRPCDone =   function (resCode,responseStr) {
        console.log("onRoomRPCDone")
       
        var response = JSON.parse(responseStr["return"])
      
        document.getElementById('xyzNoti').play();
        new PNotify({
            title: 'New Message',
            text: "Chat ended with "+response.user,
            buttons: {
                sticker: false
            }
        });
        var handle = "appwarpchatWidget"+response.user
        
        $scope.removeWidget(handle)
    
    }

    
    $scope.onUserLeftRoom =  function(roomObj,usr) {
        console.log("onUserLeftRoom")
        console.log("onUserLeftRoom"+usr)
        if ($scope.widgets.filter(function(e) {
            return e.name == usr;
        }).length > 0) {
            console.log("Widget exists")
            document.getElementById('xyzNoti').play();
            new PNotify({
                title: 'New Message',
                text: usr+" has ended chat.",
                buttons: {
                    sticker: false
                }
            });
            var handle = "appwarpchatWidget"+usr
            $scope.removeWidget(handle)
        }
    }
    
    $scope.onChatReceived = function(obj) {
        console.log("onChatReceived")
        console.log(obj.getChat())
        var res = JSON.parse(obj.getChat())
        console.log(res)
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
        console.log(res.message)
        console.log(Base64.decode(res.message))
        $scope.setResponse(res.from, Base64.decode(res.message),false)
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
    
    //    $scope.reconnect = function(){
    //        _warpclient.connect($scope.nameId, $scope.props);  
    //    }
    
    if($scope.usrRole === "AGENT"){
        $scope.initDashboard()
    }
   
});