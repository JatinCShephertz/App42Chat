<section class="content-header"  >
  <h1>
    Live Chats
  </h1>
  <ol class="breadcrumb">
    <li ng-if="usrRole=='AGENT'"><a href="#/live-chats"><i class="fa fa-dashboard"></i> Home</a></li>
    <li ng-if="usrRole!='AGENT'"><a href="#/agents"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Live Chats</li>
  </ol>
</section>


<section class="content" >
  <div class="row" ng-if="widgets.length == 0">
    <div class="col-md-12">
      <div class="box box-solid">
        <div class="box-header ">
        </div><!-- /.box-header -->
        <div class="box-body">
          <div style="text-align: center;"><b>No Live Chat(s) yet.</b></div>
          <!--<h5>No Live Chat(s) yet.</h5>-->
        </div><!-- /.box-body -->
      </div><!-- /.box -->
    </div><!-- ./col -->

  </div>

  <div class="row mrlrtp"   >

    <div class="col-md-4 appwarpchatWidget{{widgets[$index].name}}" ng-repeat="widget in widgets" id="appwarpchatWidget{{widgets[$index].name}}">
      <!-- DIRECT CHAT PRIMARY -->
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{widget.name}}</h3>
          <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="{{widget.messages.length}} Total Messages" class="badge bg-light-blue">{{widget.messages.length}}</span>
            <button data-toggle="tooltip" title="Minimize"  class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button data-toggle="tooltip" title="End Chat"  class="btn btn-box-tool" ng-click="endChat(widget.name)" data-widget="remove"><i class="fa fa-times"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <!-- Conversations are loaded here -->
          <div class="direct-chat-messages" id="chatBox{{widget.name}}"  scroll-glue="!!glued" >
            <div ng-repeat="obj in widget.messages"  > 
              <div ng-if="obj.position" class="direct-chat-msg wraptext" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-right" ng-bind="obj.time"></span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/default.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div><!-- /.direct-chat-msg -->
              <div ng-if="!obj.position" class="direct-chat-msg right wraptext"  >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-right" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-left" ng-bind="obj.time"></span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/avatar5.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div>

            </div>
          </div><!--/.direct-chat-messages-->

        </div><!-- /.box-body -->
        <div class="box-footer">
          <input type="text" id="txtF{{widget.name}}" placeholder="Type Message ..." class="form-control" ng-disabled="isOffline" my-enter="sendChat(widget.name)" >
          <!--<button type="button" ng-click="endChat(widgets[$index].name)" id="endChat{{widgets[$index].name}}" class="btn btn-primary btn-flat">End Chat</button>-->
        </div><!-- /.box-footer-->
      </div><!--/.direct-chat -->
    </div><!-- /.col --> 

<!--{{}}-->

  </div>
</section>


