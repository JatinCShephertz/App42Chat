/**
 * Shephertz Technologies
 * @author Jatin Chauhan
 * @date 29 Oct 2015
 * @version 1.0
 */

// Main controller section

chatAdmin.controller("MainController", function($scope,$interval) {
	
    //  Sidebar Menu states
    $scope.dashboardSection = false
    $scope.sidebar = {}
    // Dashboard Section Sub Menus
    $scope.sidebar.dashboard = "Live Chat"
    $scope.apiKey = apiKey
    $scope.secretKey = secretKey
    $scope.baseURL = "http://localhost:8085/APP42ChatAdmin"
    $("#isAdminOnline").show()
    $("#isAdminOffline").hide()
 
 
    
    $scope.openSubSideBar = function(module){
        if(module == "dashboardSection"){
            $scope.dashboardSection = true
        }
    }
 
    var _warpclient;
    $scope.nameId = "ADMIN"
    $("#isAdminOnline").hide()
    $("#isAdminDefault").show()
    $("#isAdminOffline").hide()
    
    $scope.widgets = []
    // console.log($scope.widgets)
    
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
            console.log("Admin Connected");
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
			
			
    $scope.onSendPrivateChatDone = function(res) {
        var msg = "onSendPrivateChatDone : <strong>"+AppWarp.ResultCode[res]+"</strong>";
        console.log(msg);
        if(AppWarp.ResultCode[res] == "Success"){

        }else{

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
       
        _warpclient.sendPrivateChat(sender,handle.value);
        $scope.setResponse(sender, handle.value,true)
        handle.value = ""
       
    }
    
    $scope.onPrivateChatReceived = function(sender, chat) {
        var msg = "New message from <strong>" + sender + "</strong>.";
        console.log(msg);
        $scope.createWidgetIfNotExists(sender);
        document.getElementById('xyzNoti').play();
        new PNotify({
            title: 'New Chat Message',
            text: msg,
            type: 'info'
        });
        $scope.setResponse(sender, chat,false)
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
        
        AppWarp.WarpClient.initialize($scope.apiKey, $scope.secretKey);
        console.log("Connecting................");  
        _warpclient = AppWarp.WarpClient.getInstance();
        _warpclient.setResponseListener(AppWarp.Events.onConnectDone, $scope.onConnectDone);      
        _warpclient.setResponseListener(AppWarp.Events.onSendPrivateChatDone, $scope.onSendPrivateChatDone);
        _warpclient.setNotifyListener(AppWarp.Events.onPrivateChatReceived, $scope.onPrivateChatReceived);
        _warpclient.connect($scope.nameId);
    }
    $scope.initDashboard()
   
});