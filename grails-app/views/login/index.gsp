<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="layout" content="app42ChatAdminLogin" />

    <style type="text/css">
      .agLogin_wrapper a {  background: linear-gradient(#f4f5f6, #dee0e4) repeat scroll 0 0 rgba(0, 0, 0, 0);  border-radius: 5px;  color: #5a6b77;  font-family: Source Sans Pro;  font-size: 14px;  padding: 7px 16px; text-decoration:none;}
      .agLogin_wrapper a:hover {  background: none repeat scroll 0 0 #dee0e4;  color: #5a6b77; text-decoration:none;}
      .agLogin_wrapper {float: right!important; margin: 25px 40px 0 30px!important; text-align: left!important; width: auto!important;}
    </style>
  </head>
  <body >
    <div class="loginHeader">
      <!--<img src="${request.getContextPath()}/images/app42chatadmin/logo.png" class="user-image" alt="App42 API Gateway">-->
    </div>

    <div class="login-box">
      <div class="login-logo">
        <a href="javascript:;"><b>APP42</b>&nbsp;CHAT ADMIN</a>
      </div><!-- /.login-logo -->

      <div class="login-box-body">
        <g:if test="${flash.message}">
          <p class="text-red">${flash.message}</p>
        </g:if>
        <p class="login-box-msg">Sign in to start your session</p>
        <g:form action="auth" method="POST"  autocomplete="off">

          <div class="form-group has-feedback">
            <input type="text" class="form-control" id="email" name="email" placeholder="Email">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            <p style="display:none" id="emailMsg" class="text-red"></p>
          </div>
          <div class="form-group has-feedback">
            <input type="password" class="form-control" id="pwd" name="password" placeholder="Password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            <p style="display:none" id="pwdMsg" class="text-red"></p>
          </div>
          <div class="row">
            <div class="col-xs-8">
                      <a class="text-center pull-left" href="${request.getContextPath()}/login/forgotPassword">Forgot Password?</a>

            </div><!-- /.col -->
            <div class="col-xs-4">

              <button type="submit" onclick="return validateLoginForm()" class="btn btn-primary btn-block btn-flat">Sign In</button>
            </div><!-- /.col -->
          </div>
        </g:form>
        <!--<br/>-->
        <!--<a class="text-center" href="${request.getContextPath()}/login/create">Register a new membership</a>-->


      </div><!-- /.login-box-body -->
    </div><!-- /.login-box -->


  </body>
</html>
