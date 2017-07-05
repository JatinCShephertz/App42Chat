<section class="content-header"  >
  <h1>
    Live Chats
  </h1>
  <ol class="breadcrumb">
    <li><a href="#/dashboard"><i class="fa fa-dashboard"></i> Home</a></li>
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

  <div class="row mrlrtp" ng-repeat="widget in widgets"  ng-if="$index % 3 == 0">

    <div class="col-md-4" id="appwarpchatWidget{{widgets[$index].name}}">
      <!-- DIRECT CHAT PRIMARY -->
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{widgets[$index].name}}</h3>
          <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="{{widgets[$index].messages.length}} Total Messages" class="badge bg-light-blue">{{widgets[$index].messages.length}}</span>
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <!--<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <!-- Conversations are loaded here -->
          <div class="direct-chat-messages" id="chatBox{{widgets[$index].name}}"  scroll-glue="glued" >
            <div ng-repeat="obj in widgets[$index].messages"  my-scroll-directive> 
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
          <input type="text" id="txtF{{widgets[$index].name}}" placeholder="Type Message ..." class="form-control" my-enter="sendChat(widgets[$index].name)" >
        </div><!-- /.box-footer-->
      </div><!--/.direct-chat -->
    </div><!-- /.col --> 

    <div  class="col-md-4" ng-if="widgets.length > ($index + 1)" id="appwarpchatWidget{{widgets[$index+1].name}}">
      <!-- DIRECT CHAT PRIMARY -->
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{widgets[$index+1].name}}</h3>
          <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="{{widgets[$index+1].messages.length}} Total Messages" class="badge bg-light-blue" >{{widgets[$index+1].messages.length}}</span>
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <!--<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <!-- Conversations are loaded here -->
          <div class="direct-chat-messages" id="chatBox{{widgets[$index+1].name}}"  scroll-glue="glued">
            <div ng-repeat="obj in widgets[$index+1].messages"   my-scroll-directive>
              <div ng-if="obj.position" class="direct-chat-msg" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-right" ng-bind="obj.time"></span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/avatar.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div><!-- /.direct-chat-msg -->
              <div ng-if="!obj.position" class="direct-chat-msg right"  >
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
           <input type="text" id="txtF{{widgets[$index+1].name}}" placeholder="Type Message ..." class="form-control" my-enter="sendChat(widgets[$index+1].name)">
         </div><!-- /.box-footer-->
      </div><!--/.direct-chat -->
    </div><!-- /.col --> 
    <div  class="col-md-4" ng-if="widgets.length > ($index + 2)" id="appwarpchatWidget{{widgets[$index+2].name}}">
      <!-- DIRECT CHAT PRIMARY -->
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{widgets[$index+2].name}}</h3>
          <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="{{widgets[$index+2].messages.length}} Total Messages" class="badge bg-light-blue">{{widgets[$index+2].messages.length}}</span>
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <!--<button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>-->
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <!-- Conversations are loaded here -->
          <div class="direct-chat-messages" id="chatBox{{widgets[$index+2].name}}"   scroll-glue="glued" >
            <div ng-repeat="obj in widgets[$index+2].messages"   my-scroll-directive>
              <div ng-if="obj.position" class="direct-chat-msg" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-right" ng-bind="obj.time"></span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/avatar2.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div><!-- /.direct-chat-msg -->
              <div ng-if="!obj.position" class="direct-chat-msg right"  >
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
          <!--<div class="input-group">-->
            <input type="text" id="txtF{{widgets[$index+2].name}}" placeholder="Type Message ..." class="form-control" my-enter="sendChat(widgets[$index+2].name)">
<!--            <span class="input-group-btn">
              <button type="button" ng-click="sendChat(widgets[$index+2].name)" id="sendChat{{widgets[$index+2].name}}" class="btn btn-primary btn-flat">Send</button>
            </span>
          </div>-->
        </div><!-- /.box-footer-->
      </div><!--/.direct-chat -->
    </div><!-- /.col --> 
  <!--  <div  class="col-md-3" ng-if="widgets.length > ($index + 3)" id="appwarpchatWidget{{widgets[$index+3].name}}">
       DIRECT CHAT PRIMARY 
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{widgets[$index+3].name}}</h3>
          <div class="box-tools pull-right">
            <span data-toggle="tooltip" title="{{widgets[$index+3].messages.length}} Total Messages" class="badge bg-light-blue" >{{widgets[$index+3].messages.length}}</span>
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            <button class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
          </div>
        </div> /.box-header 
        <div class="box-body">
           Conversations are loaded here 
          <div class="direct-chat-messages" id="chatBox{{widgets[$index+3].name}}">
            <div ng-repeat="obj in widgets[$index+3].messages">
              <div ng-if="obj.position" class="direct-chat-msg" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-right" ng-bind="obj.time"></span>
                </div> /.direct-chat-info 
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/avatar3.png" alt="message user image"> /.direct-chat-img 
                <div class="direct-chat-text" ng-bind="obj.message">
  
                </div> /.direct-chat-text 
              </div> /.direct-chat-msg 
              <div ng-if="!obj.position" class="direct-chat-msg right"  >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-right" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-left" ng-bind="obj.time"></span>
                </div> /.direct-chat-info 
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/avatar5.png" alt="message user image"> /.direct-chat-img 
                <div class="direct-chat-text" ng-bind="obj.message">
  
                </div> /.direct-chat-text 
              </div>
  
            </div>
          </div>/.direct-chat-messages
  
        </div> /.box-body 
        <div class="box-footer">
         <div class="input-group">
              <input type="text" id="txtF{{widgets[$index+3].name}}" placeholder="Type Message ..." class="form-control">
              <span class="input-group-btn">
                <button type="button" ng-click="sendChat(widgets[$index+3].name)" id="sendChat{{widgets[$index+3].name}}" class="btn btn-primary btn-flat">Send</button>
              </span>
            </div>
  {{}}
        </div> /.box-footer
      </div>/.direct-chat 
    </div> /.col  -->


  </div>
</section>


