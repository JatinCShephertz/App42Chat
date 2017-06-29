/* jshint browser: true */
(function (window, document) {
    "use strict";  /* Wrap code in an IIFE */
    var jQuery, $, ___warpclient,baseURL = "http://localhost:8080/APP42Chat/client/", ___adminUserName = "", ___CuRrEnTUserName = "",___isAgentOffline = false; // Localize jQuery variables
    //    var jQuery, $, ___warpclient,baseURL = "http://app42chattest.cloudapp.net/client/", ___adminUserName = "ADMIN", ___CuRrEnTUserName = ""; // Localize jQuery variables
    //http://app42chat.shephertz.com/
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
        if (res == AppWarp.ResultCode.Success) {
            console.log("Client Connected");
            console.log("Checking If Agent is Online!!!!");
            ___warpclient.invokeZoneRPC("getAvailableRoomId",___CuRrEnTUserName);
        }
        else {
            console.log("Error in Connection");
        }
    }
    function handleChatWindow(isConnected){
        var widgetBoxEnteredContenT = '<div id="ChAtBoXBodYwelComeNotE" class="dhlWelcomeNote">Have Questions? Come chat with us! We’re here, send us a message.</div>'
        $("#ChAtBoXBodY").html(widgetBoxEnteredContenT);
        $("#ChaTwidgeTseNdMsgBox").show();
        if(isConnected){
            $("#ChAtBoXheAdTiTlE").html("Chat with us!");
            $("#ChAtBoXBodYwelComeNotE").html("Have Questions? Come chat with us! We’re here, send us a message.");
            $("#ChAtStatus").removeClass("inactive").addClass("active");
        }else{
            $("#ChAtBoXheAdTiTlE").html("Leave a message");
            $("#ChAtBoXBodYwelComeNotE").html("We’re not around, but we’d love to chat another time");
            $("#ChAtStatus").removeClass("active").addClass("inactive");    
        }
       
    }
    function onJoinRoomDone(response) {
        //  CONNECTION_ERROR_RECOVERABLE
        console.log("onJoinRoomDone:::"+response)
        console.log(response)
        if (response.res == AppWarp.ResultCode.Success) {
            handleChatWindow(true);
        }else{
            console.log("Error in joining room");
            handleChatWindow(false);
        }
    }
    
    function handleRPCCallForGetAvailableRoomId(response){
        if(response.success){
            ___adminUserName = response.name
            ___warpclient.joinRoom(response.roomId);
        }else{
            console.log(response.message) 
            //Offline Agents case
            ___isAgentOffline = true
            handleChatWindow(false);
        }
    }
    function handleRPCCallForSendOfflineMessage(response){
        console.log("handleRPCCallForSendOfflineMessage") 
        console.log(response) 
        if(response.success){
            $("#ChAtBoXBodYwelComeNotE").html("We received your query. Our Agent will contact you shortly.");
            $("#ChaTwidgeTseNdMsgBox").hide();
        }else{
            console.log(response.message) 
            
        }
    }
    function onZoneRPCDone(resCode,responseStr) {
        console.log(responseStr)
  
        var response = JSON.parse(responseStr["return"])
        var funCtName = responseStr["function"]
        console.log("funCtName"+funCtName)
        console.log("Getting Room Info after Connection");
       
        if (resCode == AppWarp.ResultCode.Success) {
            if(funCtName == "getAvailableRoomId"){
                handleRPCCallForGetAvailableRoomId(response)
            }
            if(funCtName == "sendOfflineMessage"){
                handleRPCCallForSendOfflineMessage(response)  
            }
        }
        else {
            console.log("Error in RPC Call");
           
            handleChatWindow(false);
        }
    }

    function onSendChatDone(res) {
        console.log(res);
        var msg = "onSendChatDone : <strong>" + AppWarp.ResultCode[res] + "</strong>";
        console.log(msg);
        if (AppWarp.ResultCode[res] == "Success") {
        //Message Sent
        } else {
        //Message Not +Sent
        }
    }

    function onChatReceived(obj) {
        console.log("onChatReceived")
        console.log(obj.getChat())
        var res = JSON.parse(obj.getChat())
        var msg = "<strong>" + res.from + "</strong> privately says <i> " + res.message + "</i>";
        //        console.log(msg);
        setResponse(res.from, res.message)
    }

    function setResponse(sender, chat) {
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
        var currDate = mm + " " + dd
        if (sender === ___CuRrEnTUserName) {
            var liHtml = '<div class="dhlUserB"><div class="dhlMsg"><div class="dhlUser">' + sender + '</div><div class="dhlUserMsg">' + chat + '</div></div><div class="dhlUserIcon"><img src="http://cdn.shephertz.com/repository/files/bb3884923279901ad527f58fd01b255e3d450728e93dfae27c2281c8a8e46cdd/07dccdf9dc9b8f0032fa70a48bb9e1f10fe5392e/userIcon.jpg"></div></div>'
            $("#ChAtBoXBodY").html($("#ChAtBoXBodY").html() + liHtml);
        }
        else {
            var liHtml = '<div class="dhlUserA"><div class="dhlMsg"><div class="dhlUser">' + sender + '</div><div class="dhlUserMsg">' + chat + '</div></div><div class="dhlUserIcon"><img src="http://cdn.shephertz.com/repository/files/bb3884923279901ad527f58fd01b255e3d450728e93dfae27c2281c8a8e46cdd/07dccdf9dc9b8f0032fa70a48bb9e1f10fe5392e/userIcon.jpg"></div></div>'
            $("#ChAtBoXBodY").html($("#ChAtBoXBodY").html() + liHtml);
        }
        var fixedScroll = document.getElementById("ChAtBoXBodY");
        fixedScroll.scrollTop = fixedScroll.scrollHeight;
    }

    function initializeAppWarpClient(usrDetailsObj) {
        console.log("initializeAppWarpClient")
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
        ___warpclient.setResponseListener(AppWarp.Events.onConnectDone, onConnectDone);
        ___warpclient.setResponseListener(AppWarp.Events.onJoinRoomDone, onJoinRoomDone);
        ___warpclient.setResponseListener(AppWarp.Events.onZoneRPCDone, onZoneRPCDone);
        ___warpclient.setResponseListener(AppWarp.Events.onSendChatDone, onSendChatDone);
        ___warpclient.setNotifyListener(AppWarp.Events.onChatReceived, onChatReceived);
        ___warpclient.connect(obj.email,usrDetailsObj);
    }

    function main(obj) {
        /* The main logic of our widget */
        jQuery(document).ready(function ($) {
            /******* Load CSS *******/
            var chatBoxContent = '<div class="dhlChatWrapper"><div class="dhlChatInner"><div class="dhlChatBox" ><div class="dhlChat" id="chatBox"><div class="dhlChatHead"> <a href="javascript:;"><div class="chatIcon"><img src="http://cdn.shephertz.com/repository/files/bb3884923279901ad527f58fd01b255e3d450728e93dfae27c2281c8a8e46cdd/7c1451c4e846094032e475c0d27f8eac9da9ce67/chatIcon.png"/></div><div class="chatTitle" id="ChAtBoXheAdTiTlE">Chat with us!</div><div class="chatStatus"><span class="active"></span></div></a></div><div class="dhlChatBody"><div class="scroll-box" id="ChAtBoXBodY"><div id="ChAtBoXBodYwelComeNotE" class="dhlWelcomeNote">Have Questions? Come chat with us! We’re here, send us a message.</div><div class="dhlFormWrapper"><input name="chatWidgetName" type="text" id="chatWidgetName" value="" placeholder="Name" class="dhlInput"><span id="chAtWidGeTNmEerroR" class="error" style="display:none;"></span><input name="chatWidgetEmail" type="text" id="chatWidgetEmail" value="" placeholder="Email" class="dhlInput"><span id="chAtWidGeTEmmaIlerroR" class="error" style="display:none;"></span><span id="loadErConTaiNeR" class="loader" style="display:none;">Please wait...</span><button id="ChAtBoXdeTaiLsSubmitBtn" type="button" class="dhlEnter">Submit</button></div><div class="cover-bar"></div></div></div><div id="ChaTwidgeTseNdMsgBox" class="type_message" style="display:none;"><input id="chatWidgetMsG" name="chatWidgetMsG" value="" placeholder="Type a message..." class="messageBox" type="text"></div></div></div></div></div>'
            $("#app42ChatWidget").html(chatBoxContent);

            $('#ChAtBoXdeTaiLsSubmitBtn').click(function () {
                // Validate form 
                $("#chAtWidGeTNmEerroR").hide();
                $("#chAtWidGeTEmmaIlerroR").hide();
                var frmChatSbmtErrFlAG = false
                if ($("#chatWidgetName").val() == "") {
                    frmChatSbmtErrFlAG = true
                    $("#chAtWidGeTNmEerroR").html("Please enter Name.").show();
                }

                if ($("#chatWidgetEmail").val() == "") {
                    frmChatSbmtErrFlAG = true
                    $("#chAtWidGeTEmmaIlerroR").html("Please enter Email.").show();
                }
                if (!validateEmail($("#chatWidgetEmail").val())) {
                    frmChatSbmtErrFlAG = true
                    $("#chAtWidGeTEmmaIlerroR").html("Invalid Email address.").show();
                }
                //                console.log("inside validation erorrr"+frmChatSbmtErrFlAG)
                if (frmChatSbmtErrFlAG) {
                    //form validation msg shows here
                    console.log("inside validation erorrr")
                    return false;
                }
                //Initialize Appwarp Client
                $("#ChAtBoXdeTaiLsSubmitBtn").hide();
                $("#loadErConTaiNeR").show();
                var usrDetailsObj = {
                    "name":$("#chatWidgetName").val(),
                    "email":$("#chatWidgetEmail").val(),
                    "phone":""
                }
                initializeAppWarpClient(usrDetailsObj)
            })
            $('.dhlChatHead a').click(function () {
                //console.log(___warpclient);
                if ($("#chatBox").hasClass('dhlChatOpen animated fadeInUp')) {
                    $("#chatBox").removeClass('dhlChatOpen animated fadeInUp')
                    $("#ChaTwidgeTseNdMsgBox").hide();
                } else {
                    if(___warpclient){
                        $("#ChaTwidgeTseNdMsgBox").show()
                    }
                    $("#chatBox").addClass('dhlChatOpen animated fadeInUp')
                }
            })

            $('#chatWidgetMsG').keydown(function (event) {
                // enter has keyCode = 13, change it if you want to use another button
                if (event.keyCode == 13) {
                    // this.form.submit();
                    if ($("#chatWidgetMsG").val() != "") {
                        console.log("___isAgentOffline:::::"+___isAgentOffline)
                        if(___isAgentOffline){
                            ___warpclient.invokeZoneRPC("sendOfflineMessage",___CuRrEnTUserName,$("#chatWidgetMsG").val());
                            // setResponse(___CuRrEnTUserName, $("#chatWidgetMsG").val())
                            $("#chatWidgetMsG").val(""); 
                           
                        }else{
                            var jsonObj = {
                                "to": ___adminUserName, 
                                "message": $("#chatWidgetMsG").val()
                            }
                            ___warpclient.sendChat(jsonObj);
                            setResponse(___CuRrEnTUserName, $("#chatWidgetMsG").val())
                            $("#chatWidgetMsG").val(""); 
                        }
                       
                    }
                }
            });
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
            /* Main App Logic    */
            main();
        });
    });
}(window, document)); /* end IIFE */