<!DOCTYPE html>
<html lang="en"  xmlns:ng="https://angularjs.org" id="ng-app" ng-app="chatAdmin" data-ng-controller="MainController" >
  <head>
    <title><g:layoutTitle default="APP42 Chat Admin" /></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin/bootstrap', file: 'bootstrap.min.css')}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin', file: 'AdminLTE.min.css')}">
    <link rel="stylesheet" href="${resource(dir: 'css/app42chatadmin/custom', file: 'style.css')}">
    <!-- iCheck -->
    <link rel="stylesheet" href="${resource(dir: 'js/app42chatadmin/resources/plugins/iCheck/square/', file: 'blue.css')}">
    <link rel="shortcut icon" href="${resource(dir:'images',file:'favicon.ico')}" type="image/x-icon" />
  <g:layoutHead />

</head>
<body class="hold-transition login-page" >

<g:layoutBody />
<!-- jQuery 2.1.4 -->
<script src="${resource(dir: 'js/app42chatadmin/resources/plugins/jQuery/', file: 'jQuery-2.1.4.min.js')}"></script>

<!-- Bootstrap 3.3.5 -->
<script src="${resource(dir: 'js/app42chatadmin/resources/bootstrap/', file: 'bootstrap.min.js')}"></script>

<script>
function IsValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validateEmail(){
       var errFlag = "false"
      var email = $("#email").val()
      $("#emailMsg").html("").hide()
        if($.trim(email) == ""){
          errFlag = "true"
           $("#emailMsg").show().html("Please enter email address.")
     
        }else if(!IsValidEmail($.trim(email))){
           errFlag = "true"
           $("#emailMsg").show().html("Please enter a valid email address.")
       }
       if(errFlag == "true"){
         return false 
      }
      return true      
    }

    function validateLoginForm(){
      var errFlag = "false"
      var email = $("#email").val()
      var pwd = $("#pwd").val()
      $("#emailMsg").html("").hide()
      $("#pwdMsg").html("").hide()
        if($.trim(email) == ""){
          errFlag = "true"
           $("#emailMsg").show().html("Please enter email address.")
     
        }else if(!IsValidEmail($.trim(email))){
           errFlag = "true"
           $("#emailMsg").show().html("Please enter a valid email address.")
       }
        
         if($.trim(pwd) == ""){
          errFlag = "true"
          $("#pwdMsg").show().html("Please enter password.")
            }
  
      
     if(errFlag == "true"){
        return false 
        }
return true
}
</script>

</body>
</html>