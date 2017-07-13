/* jshint browser: true */
(function (window, document) {
    "use strict";  /* Wrap code in an IIFE */
          var jQuery, $, ___warpclient,baseURL = "http://app42chat.shephertz.com/client/", ___adminUserName = "", ___CuRrEnTUserName = "",___CuRrEnTMeSsAgE="",___isAgentOffline = false,___isAgentOfflineByRoom= false,___chatCounter = 0,___retryCounter=0,___roomID,immmgG = baseURL +"close.png"; // Localize jQuery variables
//    var jQuery, $, ___warpclient,baseURL = "http://localhost:8080/APP42Chat/client/", ___adminUserName = "", ___CuRrEnTUserName = "",___CuRrEnTMeSsAgE="",___isAgentOffline = false,___isAgentOfflineByRoom= false,___chatCounter = 0,___retryCounter=0,___roomID,immmgG = baseURL +"close.png"; // Localize jQuery variables
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
   
    function loadScript(url, callback) {
        /* Load script from url and calls callback once it's loaded */
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute("type", "text/javascript");
        scriptTag.setAttribute("src", url);
        if (typeof callback !== "undefined") {
            if (scriptTag.readyState) {
                /* For old versions of IE */
                scriptTag.onreadystatechange = function () {
                    if (this.readyState === 'complete' || this.readyState === 'loaded') {
                        callback();
                    }
                };
            } else {
                scriptTag.onload = callback;
            }
        }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
    }
    
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function getScriptVariable(scriptName, key) {
        var scripts = document.getElementsByTagName('script'),
        n = scripts.length, scriptSource, i, r;
        for (i = 0; i < n; i++) {
            scriptSource = scripts[i].src;
            if (scriptSource.indexOf(scriptName) >= 0) {
                r = new RegExp("[\\?&]" + key + "=([^&#]*)");
                var keyValues = r.exec(scriptSource);
                return keyValues[1];
            }
        }
    }

    function onConnectDone(res) {
        //  CONNECTION_ERROR_RECOVERABLE
        console.log(res)
        var msg = ''
        if (res == AppWarp.ResultCode.Success) {
            console.log("Client Connected");
            console.log("Checking If Agent is Online!!!!");
            ___warpclient.invokeZoneRPC("getAvailableRoomId",___CuRrEnTUserName);
        }else  if (res == AppWarp.ResultCode.AuthError) {
            console.log("Client already Connected. Auth Error");
            $("#ChAtBoXdeTaiLsSubmitBtn").show();
            $("#loadErConTaiNeR").hide();
            $("#chAtWidGeTEmmaIlerroR").html("Auth Error. User with same email is already connected.").show();
        }else if(res == AppWarp.ResultCode.ConnectionErrorRecoverable){
            //connection broken
            msg = '<div class="chatSpecilMsg">Chat disconnected.Please wait while we try to establish connection.</div>'
            setSpecialMessage(msg);
            while(___retryCounter <=9){
                setTimeout(function(){
                    ___warpclient.recoverConnection();
                }, 10000);
                ___retryCounter = ___retryCounter+1
            }
            
        }else if(res == AppWarp.ResultCode.SuccessRecovered){
            //connection recovered
            ___retryCounter = 0
            msg = '<div class="chatSpecilMsg">Connection established successfully. Chat started.</div>'
            setSpecialMessage(msg);
        }else {
            console.log("Error in Connection");
        }
    }
    function onDisconnectDone(res) {
        
        console.log("onDisconnectDone")
        console.log(res)
       
        if (res == AppWarp.ResultCode.Success) {
            console.log("Client DisConnected");
          
        }else {
            console.log("Error in DisConnection");
        }
    }
    function handleChatWindow(isConnected){
        var widgetBoxEnteredContenT = '<div id="ChAtBoXBodYwelComeNotE" class="dhlWelcomeNote">Have Questions? Come chat with us! We’re here, send us a message.</div>'
        $("#ChAtBoXBodY").html(widgetBoxEnteredContenT);
        $("#ChaTwidgeTseNdMsgBox").show();
        
        if(isConnected){
            $("#ChAtBoXheAdTiTlE").html("Chat with us");
            $("#ChAtBoXBodYwelComeNotE").html("Have Questions? Come chat with us! We’re here, send us a message.");
            $("#ChAtStatus").removeClass("inactive").addClass("active");
            $("#eNdChAt").show();
        }else{
            $("#ChAtBoXheAdTiTlE").html("Leave a message");
            $("#ChAtBoXBodYwelComeNotE").html("We’re not around, but we’d love to chat another time");
            $("#ChAtStatus").removeClass("active").addClass("inactive");    
        }
       
    }
    function onJoinRoomDone(response) {
        //  CONNECTION_ERROR_RECOVERABLE
        console.log("onJoinRoomDone:::"+response)
        //console.log(response)
        if (response.res == AppWarp.ResultCode.Success) {
            handleChatWindow(true);
        }else{
            console.log("Error in joining room");
            handleChatWindow(false);
        }
    }
    function onLeaveRoomDone(response) {
        //  CONNECTION_ERROR_RECOVERABLE
        //        console.log("onLeaveRoomDone:::"+response)
        //        console.log("onLeaveRoomDone:::"+response.res)
        //console.log(response)
        if (response.res == AppWarp.ResultCode.Success) {
            ___warpclient.disconnect()
        }else{
            console.log("Error in leaving room");
           
        }
    }
    
    function handleRPCCallForGetAvailableRoomId(response){
        if(response.success){
            ___adminUserName = response.name
            ___warpclient.joinRoom(response.roomId);
        }else{
            // console.log(response.message) 
            //Offline Agents case
            ___isAgentOffline = true
            handleChatWindow(false);
        }
    }
    function handleRPCCallForSendOfflineMessage(response){
        //console.log("handleRPCCallForSendOfflineMessage") 
        console.log(response) 
        if(response.success){
            $("#ChAtBoXBodYwelComeNotE").html("We received your query. Our Agent will contact you shortly.");
            $("#chatWidgetMsG").attr("disabled",true);
            //$("#ChAtStatus").removeClass("active").addClass("inactive"); 
            // $("#eNdChAt").hide();
            $("#chatWidgetMsG").val(""); 
            var msg =  '<div class="chatSpecilMsg">Message sent successfully. Our Agent will contact you shortly.</div>'
            setSpecialMessage(msg)
        // ___warpclient.disconnect()
        // $("#ChaTwidgeTseNdMsgBox").hide();
        }else{
            console.log(response.message) 
        }
    }
    
    function onZoneRPCDone(resCode,responseStr) {
        console.log(responseStr)
        var response = JSON.parse(responseStr["return"])
        var funCtName = responseStr["function"]
        // console.log("funCtName"+funCtName)
        console.log("Getting Room Info after Connection");
       
        if (resCode == AppWarp.ResultCode.Success) {
            if(funCtName == "getAvailableRoomId"){
                ___roomID = response.roomId
                handleRPCCallForGetAvailableRoomId(response)
            }
            if(funCtName == "sendOfflineMessage"){
                handleRPCCallForSendOfflineMessage(response)  
            }
            if(funCtName == "sendOfflineMessageToAgent"){
                handleRPCCallForSendOfflineMessage(response)  
            }
        }else {
            console.log("Error in RPC Call");
            handleChatWindow(false);
        }
    }
    
    function onSendChatDone(res) {
        console.log(res);
        //var msg = "onSendChatDone : <strong>" + AppWarp.ResultCode[res] + "</strong>";
        //  console.log(msg);
        var msg = ''
        if (AppWarp.ResultCode[res] == "Success") {
            //Message Sent
            setResponse(___CuRrEnTUserName, ___CuRrEnTMeSsAgE)
            $("#chatWidgetMsG").val(""); 
            ___CuRrEnTMeSsAgE = "" 
        }else if(AppWarp.ResultCode[res] == "ResourceNotFound"){
            //Message Not Sent coz Agent is offline
            $("#ChAtStatus").removeClass("active").addClass("inactive"); 
           
            if(___chatCounter > 0){
                msg =  '<div class="chatSpecilMsg">We could not establish the connection with the Agent. Sorry for the inconvienience caused.</div>'
            //           SEND CHAT AS OFFLINE MSG
            }else{
                ___chatCounter = ___chatCounter + 1
                msg = '<div class="chatSpecilMsg">Agent is offline.Please wait while we try to establish connection.</div>'
                var jsonObj = {
                    "to": ___adminUserName, 
                    "message": ___CuRrEnTMeSsAgE
                }
                setTimeout(function () {
                    ___warpclient.sendChat(jsonObj);
                }, 3000);
            }
            setSpecialMessage(msg);
        } else {
        
        }
    }

    function onChatReceived(obj) {
        console.log("onChatReceived")
        console.log(obj.getChat())
        var res = JSON.parse(obj.getChat())
        console.log(res);
        if(res.status == "chatEnded"){
            var msg =  '<div class="chatSpecilMsg">Agent has ended the chat. Please refresh your browser to start the conversation again.</div>'
            setSpecialMessage(msg)
            $("#chatWidgetMsG").attr("disabled",true);
            $("#ChAtStatus").removeClass("active").addClass("inactive"); 
            $("#eNdChAt").hide();
            //  reSeTvIeWfOrChaT();
            ___warpclient.disconnect();
        //            ___warpclient.leaveRoom(___roomID);
        }else{
            //            console.log(res.message)
            //            console.log(Base64.decode(res.message))
            setResponse(res.from, Base64.decode(res.message))  
        }
   
       
    }
    function onUserLeftRoom(roomObj,usr) {
        console.log("onUserLeftRoom")
        if(___adminUserName == usr){
            // $("#ChAtStatus").removeClass("active").addClass("inactive"); 
            var msg =  '<div class="chatSpecilMsg">Chat disconnected. We could not establish the connection with any Agent. Messages will be sent as an offline message to the agents. Sorry for the inconvienience caused.</div>'
            setSpecialMessage(msg);
            ___isAgentOfflineByRoom = true
        }
    }

    function setResponse(sender, chat) {
        var liHtml = ""
        if (sender === ___CuRrEnTUserName) {
            liHtml = '<div class="dhlUserB"><div class="dhlMsg"><div class="dhlUser">' + sender + '</div><div class="dhlUserMsg">' + chat + '</div></div><div class="dhlUserIcon"><img src="http://cdn.shephertz.com/repository/files/bb3884923279901ad527f58fd01b255e3d450728e93dfae27c2281c8a8e46cdd/07dccdf9dc9b8f0032fa70a48bb9e1f10fe5392e/userIcon.jpg"></div></div>'
            $("#ChAtBoXBodY").html($("#ChAtBoXBodY").html() + liHtml);
        }
        else {
            liHtml = '<div class="dhlUserA"><div class="dhlMsg"><div class="dhlUser">' + sender + '</div><div class="dhlUserMsg">' + chat + '</div></div><div class="dhlUserIcon"><img src="http://cdn.shephertz.com/repository/files/bb3884923279901ad527f58fd01b255e3d450728e93dfae27c2281c8a8e46cdd/07dccdf9dc9b8f0032fa70a48bb9e1f10fe5392e/userIcon.jpg"></div></div>'
            $("#ChAtBoXBodY").html($("#ChAtBoXBodY").html() + liHtml);
        }
        var fixedScroll = document.getElementById("ChAtBoXBodY");
        fixedScroll.scrollTop = fixedScroll.scrollHeight;
    }
    
    function reSeTvIeWfOrChaT(){
        
        //        var initialContent = '<div class="dhlChatWrapper"><div class="dhlChatInner"><div class="dhlChatBox" ><div class="dhlChat" id="chatBox"><div class="dhlChatHead"> <a href="javascript:;"><div class="chatIcon"><span id="ChAtStatus" class="inactive"></span></div><div class="chatTitle" id="ChAtBoXheAdTiTlE">Chat with us</div></a><a href="javascript:;" id="eNdChAt" title="End Chat"><div class="chatStatus"><img src="'+immmgG+'" alt="Leave" /></div></a></div><div class="dhlChatBody"><div class="scroll-box" id="ChAtBoXBodY"><div id="ChAtBoXBodYwelComeNotE" class="dhlWelcomeNote">Have Questions? Come chat with us! We’re here, send us a message.</div><div class="dhlFormWrapper"><input name="chatWidgetName" type="text" id="chatWidgetName" value="" placeholder="Name" class="dhlInput"><span id="chAtWidGeTNmEerroR" class="error" style="display:none;"></span><input name="chatWidgetEmail" type="text" id="chatWidgetEmail" value="" placeholder="Email" class="dhlInput"><span id="chAtWidGeTEmmaIlerroR" class="error" style="display:none;"></span><input name="chatWidgetPhone" type="text" id="chatWidgetPhone" value="" placeholder="Phone (Optional)" class="dhlInput"><span id="chAtWidGeTPhOnEerroR" class="error" style="display:none;"></span><span id="loadErConTaiNeR" class="loader" style="display:none;">Please wait...</span><button id="ChAtBoXdeTaiLsSubmitBtn" type="button" class="dhlEnter">Submit</button></div><div class="cover-bar"></div></div></div><div id="ChaTwidgeTseNdMsgBox" class="type_message" style="display:none;"><input id="chatWidgetMsG" name="chatWidgetMsG" value="" placeholder="Type a message..." class="messageBox" type="text"></div></div></div></div></div>'
        //        $("#app42ChatWidget").html(initialContent);
        
        // $("#chatBox").removeClass('dhlChatOpen animated fadeInUp')
        // $(".dhlChatHead a").click();
        // $("#ChaTwidgeTseNdMsgBox").css('display','none'); 
        //        $("#chatWidgetMsG").hide(); 
        //        $("#eNdChAt").hide();
        ___adminUserName = ""
        ___CuRrEnTUserName = ""
        ___CuRrEnTMeSsAgE=""
        ___isAgentOffline = false
        ___isAgentOfflineByRoom= false
        ___chatCounter = 0
        ___roomID = null
       
    }

    function initializeAppWarpClient(usrDetailsObj) {
        //console.log("initializeAppWarpClient")
        var apiKey = getScriptVariable('widget.js', '3qrCXaewr45dsXozq2RPQ2orj5');
        var secreteKey = getScriptVariable('widget.js', '7qrCXaewr45dsXozq2RPQ2orj9');
        var obj = {
            "appKey": apiKey, 
            "host": secreteKey, 
            "email": usrDetailsObj.email
        }
        ___CuRrEnTUserName = obj.email;
 
        AppWarp.WarpClient.initialize(obj.appKey, obj.host);
        ___warpclient = AppWarp.WarpClient.getInstance();
        ___warpclient.setRecoveryAllowance(120);
        ___warpclient.setResponseListener(AppWarp.Events.onConnectDone, onConnectDone);
        ___warpclient.setResponseListener(AppWarp.Events.onDisconnectDone, onDisconnectDone);
        ___warpclient.setResponseListener(AppWarp.Events.onJoinRoomDone, onJoinRoomDone);
        ___warpclient.setResponseListener(AppWarp.Events.onLeaveRoomDone, onLeaveRoomDone);
        ___warpclient.setResponseListener(AppWarp.Events.onZoneRPCDone, onZoneRPCDone);
        ___warpclient.setResponseListener(AppWarp.Events.onSendChatDone, onSendChatDone);
        ___warpclient.setNotifyListener(AppWarp.Events.onChatReceived, onChatReceived);
        ___warpclient.setNotifyListener(AppWarp.Events.onUserLeftRoom, onUserLeftRoom);
        ___warpclient.connect(obj.email,usrDetailsObj);
    }
    
    function setSpecialMessage(msg){
        $("#ChAtBoXBodY").html($("#ChAtBoXBodY").html() + msg);
        var fixedScroll = document.getElementById("ChAtBoXBodY");
        fixedScroll.scrollTop = fixedScroll.scrollHeight;
    }
    
   
    window.onbeforeunload = function (e) {
        console.log("tried to close or refresh")
        //        console.log(___warpclient)
        //        console.log(___roomID)
        if(___warpclient && ___roomID !=undefined && ___roomID !=null){
            ___warpclient.leaveRoom(___roomID);
            ___warpclient.disconnect();
        }
    };
    function activateChatWidget(obj) {
        /* The main logic of our widget */
        jQuery(document).ready(function ($) {
            var chatBoxContent = '<div class="dhlChatWrapper"><div class="dhlChatInner"><div class="dhlChatBox" ><div class="dhlChat" id="chatBox"><div class="dhlChatHead"> <a href="javascript:;" id="toGGleChatWinDoW"><div class="chatIcon"><span id="ChAtStatus" class="inactive"></span></div><div class="chatTitle" id="ChAtBoXheAdTiTlE">Chat with us</div></a><a href="javascript:;" id="eNdChAt" title="End Chat"><div class="chatStatus"><img src="'+immmgG+'" alt="Leave" /></div></a></div><div class="dhlChatBody"><div class="scroll-box" id="ChAtBoXBodY"><div id="ChAtBoXBodYwelComeNotE" class="dhlWelcomeNote">Have Questions? Come chat with us! We’re here, send us a message.</div><div class="dhlFormWrapper"><input name="chatWidgetName" type="text" id="chatWidgetName" value="" placeholder="Name" class="dhlInput"><span id="chAtWidGeTNmEerroR" class="error" style="display:none;"></span><input name="chatWidgetEmail" type="text" id="chatWidgetEmail" value="" placeholder="Email" class="dhlInput"><span id="chAtWidGeTEmmaIlerroR" class="error" style="display:none;"></span><input name="chatWidgetPhone" type="text" id="chatWidgetPhone" value="" placeholder="Phone (Optional)" class="dhlInput"><span id="chAtWidGeTPhOnEerroR" class="error" style="display:none;"></span><span id="loadErConTaiNeR" class="loader" style="display:none;">Please wait...</span><button id="ChAtBoXdeTaiLsSubmitBtn" type="button" class="dhlEnter">Submit</button></div><div class="cover-bar"></div></div></div><div id="ChaTwidgeTseNdMsgBox" class="type_message" style="display:none;"><form id="cHat-fOrm" ><input id="chatWidgetMsG" name="chatWidgetMsG" value="" placeholder="Type a message..." class="messageBox" type="text"></form></div></div></div></div></div>'
            
            $("#app42ChatWidget").html(chatBoxContent);
            $("#eNdChAt").hide();
            
            $('#eNdChAt').click(function () {
                console.log("End chat initiated")
                $("#chatWidgetMsG").attr("disabled",true);
                $("#eNdChAt").hide();
                var msg =  '<div class="chatSpecilMsg">Chat ended. Reload your browser to chat again.</div>'
                setSpecialMessage(msg);
                $("#ChAtStatus").removeClass("active").addClass("inactive"); 
                if(___warpclient && ___roomID){
                    ___warpclient.leaveRoom(___roomID);
                }
            });
           
            $('#ChAtBoXdeTaiLsSubmitBtn').click(function () {
                // Validate form 
                $("#chAtWidGeTNmEerroR").hide();
                $("#chAtWidGeTEmmaIlerroR").hide();
                $("#chAtWidGeTPhOnEerroR").hide();
                var frmChatSbmtErrFlAG = false
                if ($("#chatWidgetName").val() == "") {
                    frmChatSbmtErrFlAG = true
                    $("#chAtWidGeTNmEerroR").html("Please enter Name.").show();
                }
                if ($("#chatWidgetEmail").val() == "") {
                    frmChatSbmtErrFlAG = true
                    $("#chAtWidGeTEmmaIlerroR").html("Please enter Email.").show();
                } else if (!validateEmail($("#chatWidgetEmail").val())) {
                    frmChatSbmtErrFlAG = true
                    $("#chAtWidGeTEmmaIlerroR").html("Invalid Email address.").show();
                }
                //                console.log("inside validation erorrr"+frmChatSbmtErrFlAG)
                if (frmChatSbmtErrFlAG) {
                    //form validation msg shows here
                    //console.log("inside validation erorrr")
                    return false;
                }
                //Initialize Appwarp Client
                $("#ChAtBoXdeTaiLsSubmitBtn").hide();
                $("#loadErConTaiNeR").show();
                var usrDetailsObj = {
                    "name":$("#chatWidgetName").val(),
                    "email":$("#chatWidgetEmail").val(),
                    "phone":$("#chatWidgetPhone").val()
                }
                initializeAppWarpClient(usrDetailsObj)
            })
            
           
            $('#toGGleChatWinDoW').click(function () {
                //console.log(___warpclient);
                if(!___isAgentOffline){
                    if ($("#chatBox").hasClass('dhlChatOpen animated fadeInUp')) {
                        $("#chatBox").removeClass('dhlChatOpen animated fadeInUp')
                        $("#ChaTwidgeTseNdMsgBox").hide();
                    } else {
                        if(___warpclient){
                            $("#ChaTwidgeTseNdMsgBox").show()
                        }
                        $("#chatBox").addClass('dhlChatOpen animated fadeInUp')
                    }
                }
               
            });
            $("#cHat-fOrm").off("submit");
            $("#cHat-fOrm").on("submit", function(e) {
                e.preventDefault();
                //console.log("I was submitted!");
                var mMsG = $.trim($("#chatWidgetMsG").val())
                if(mMsG.length === 0){
                    return false
                }
                if (mMsG.length > 0) {
                    if (mMsG.length <=500) {
                        ___CuRrEnTMeSsAgE = mMsG
                        if(___isAgentOffline){
                            ___warpclient.invokeZoneRPC("sendOfflineMessage",___CuRrEnTUserName,Base64.encode(mMsG));
                            $("#chatWidgetMsG").val(""); 
                        }else if(___isAgentOfflineByRoom){
                            ___warpclient.invokeZoneRPC("sendOfflineMessageToAgent",___CuRrEnTUserName,___adminUserName,Base64.encode(___CuRrEnTMeSsAgE));
                        }else{
                            var jsonObj = {
                                "to": ___adminUserName, 
                                "message": Base64.encode(mMsG)
                            }
                                   
                            ___warpclient.sendChat(jsonObj);
                        // return false
                        }
                        return false
                    }else{
                        console.log("msg length exceeded")
                    }
                }
            })
            
          
        //            var presseddd = false
        //            $('#chatWidgetMsG').unbind('keydown').keydown(function (event) {
        //                //  event.preventDefault();
        //                event.stopImmediatePropagation(); 
        //                // enter has keyCode = 13, change it if you want to use another button
        //                if (event.keyCode == 13) {
        //                    var mMsG = $.trim($("#chatWidgetMsG").val())
        //                    // console.log(mMsG.length)
        //                    presseddd = true
        //                    if(presseddd){
        //                        if(mMsG.length === 0){
        //                            return false
        //                        }
        //                        if (mMsG.length > 0) {
        //                            if (mMsG.length <=500) {
        //                                ___CuRrEnTMeSsAgE = mMsG
        //                                if(___isAgentOffline){
        //                                    ___warpclient.invokeZoneRPC("sendOfflineMessage",___CuRrEnTUserName,Base64.encode(mMsG));
        //                                    $("#chatWidgetMsG").val(""); 
        //                                }else if(___isAgentOfflineByRoom){
        //                                    ___warpclient.invokeZoneRPC("sendOfflineMessageToAgent",___CuRrEnTUserName,___adminUserName,Base64.encode(___CuRrEnTMeSsAgE));
        //                                }else{
        //                                    var jsonObj = {
        //                                        "to": ___adminUserName, 
        //                                        "message": Base64.encode(mMsG)
        //                                    }
        //                                   
        //                                    ___warpclient.sendChat(jsonObj);
        //                               
        //                                }
        //                                return false
        //                            }else{
        //                                console.log("msg length exceeded")
        //                            }
        //                        }
        //                    }
        //                   
        //                }
        //            }).keyup(function() {
        //                presseddd = false
        //            });
        });
    }


    /* Load jQuery */
    loadScript(baseURL+"jquery-1.10.2.min.js", function () {
        /* Restore $ and window.jQuery to their previous values and store the
       new jQuery in our local jQuery variables. */
        $ = jQuery = window.jQuery.noConflict(true);
        /*Load CSS*/
        var css_link = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: baseURL+"chat.min.css"
        });
        css_link.appendTo('head');
        /* Load Appwarp JS */
        loadScript(baseURL+"appwarp.min.js", function () {
            activateChatWidget();/* Call Main App Logic    */
        });
    });
   
}(window, document)); /* end IIFE */