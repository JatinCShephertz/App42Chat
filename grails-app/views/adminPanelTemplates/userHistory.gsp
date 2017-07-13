<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<style>

  .noChatFound{
    padding: 9% 42%;
    font-weight: 700;
    height: 300px ;
  }
</style>
<section class="content-header">
  <h1>
    User Profile
  </h1>
  <ol class="breadcrumb">
    <li ng-if="usrRole=='AGENT'"><a href="#/live-chats"><i class="fa fa-dashboard"></i> Home</a></li>
    <li ng-if="usrRole!='AGENT'"><a href="#/agents"><i class="fa fa-dashboard"></i> Home</a></li>
    <li ><a href="#/users"><i class="fa fa-users"></i> Users</a></li>
    <li class="active">User profile</li>
  </ol>
</section>

<section class="content">

  <div class="row">
    <div class="col-md-3">
      <div class="box box-primary">
        <div class="box-body">
          <strong><i class="fa fa-user margin-r-5"></i> Name</strong>
          <p class="text-muted pull-right wraptext"> {{userName}} </p>
          <hr>
          <strong><i class="fa fa-envelope margin-r-5"></i> Email</strong>
          <p class="text-muted pull-right wraptext">{{email}}</p>
          <hr>
          <strong><i class="fa fa-phone margin-r-5"></i> Phone</strong>
          <p class="text-muted pull-right wraptext" ng-if="phone != '' && phone != undefinded && phone != null ">{{phone}}</p>
          <p class="text-muted pull-right wraptext" ng-if="phone == '' || phone == undefinded || phone == null ">N/A</p>
          <hr>
          <strong><i class="fa fa-calendar margin-r-5"></i> Created On</strong>
          <p class="text-muted pull-right wraptext">{{createdOn | moment: 'format': 'MMM DD, YYYY' }}</p>
        </div>
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div>

      <div class="">
        <a ng-click="gotoprofile()" class="btn btn-primary btn-block"><b>Back to User(s) List</b></a>
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
    <div class="col-md-9">
      <!-- DIRECT CHAT PRIMARY -->
      <div class="box box-primary direct-chat direct-chat-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Chat History </h3>
          <div class="box-tools pull-right">
            <a data-original-title="Refresh" title="" data-placement="top" data-toggle="tooltip" class="widget-control" ng-click="openConversation()" href="javascript:;"><i class="fa fa-refresh"></i></a>
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <div class="text-center" ng-show="loadMoreChat">
            <a href="javascript:;" class="uppercase" ng-click="loadMoreChats()">Load previous chats</a>
          </div>
          <!-- Conversations are loaded here -->
          <div  scroll-glue="glued"  class="direct-chat-messages" style="height: 400px">
            <div ng-if="msgObj.length == 0" class=""> <div class="noChatFound">No chat found.</div></div>
            <div ng-repeat="obj in msgObj | reverse"  >
              <div ng-if="obj.position && (obj.message != '' && obj.message != null && obj.message != undefined)" class="direct-chat-msg wraptext" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-right" >{{obj.createdOn  | moment: 'format': 'MMM DD, YYYY hh:mm:ss' }}</span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/default.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div><!-- /.direct-chat-msg -->
              <div ng-if="!obj.position  && (obj.message != '' && obj.message != null && obj.message != undefined)" class="direct-chat-msg right wraptext"  >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-right" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-left" >{{obj.createdOn  | moment: 'format': 'MMM DD, YYYY hh:mm:ss' }}</span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/avatar5.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div>

            </div>
          </div><!--/.direct-chat-messages-->
        </div><!-- /.box-body -->
        <div class="overlay" ng-show="loadingState1">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div><!--/.direct-chat -->
      <!-- /.nav-tabs-custom -->
    </div>
    <!-- /.col -->
  </div>
  <!-- /.row -->
</section>