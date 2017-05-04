<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="layout" content="gatewayRegister" />

  </head>
  <body >
    <div class="loginHeader"><img src="${request.getContextPath()}/images/gateway/logo.png" class="user-image" alt="App42 API Gateway"></div>
    <div class="register-box">
      <div class="register-logo">
        <a href="javascript:;"><b>APP42</b>&nbsp;API GATEWAY</a>
      </div>

      <div class="register-box-body">
        <g:if test="${flash.message}">
          <p class="text-red">${flash.message}</p>
        </g:if>
        <p class="login-box-msg">Register a new membership</p>

        <g:form action="saveUser" method="POST" autocomplete="off">

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
          <div class="form-group has-feedback">
            <input type="password" class="form-control" id="confPwd" name="confPassword" placeholder="Retype password">
            <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
            <p style="display:none" id="confPwdMsg" class="text-red"></p>
          </div>

          <div class="row">
            <div class="col-xs-8">

            </div><!-- /.col -->
            <div class="col-xs-4">
              <button type="submit" onclick="return validateCreateForm()" class="btn btn-primary btn-block btn-flat">Register</button>
            </div><!-- /.col -->
          </div>
        </g:form>


        <a href="${request.getContextPath()}/login" class="text-center">I already have a membership</a>
      </div><!-- /.form-box -->
    </div><!-- /.register-box -->
  </body>
</html>
