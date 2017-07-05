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
    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">User profile</li>
  </ol>
</section>

<section class="content">

  <div class="row">
    <div class="col-md-3">

      <!-- Profile Image -->
      <div class="box box-primary">
        <div class="box-body box-profile">
          <ul class="list-group list-group-unbordered">
            <li class="list-group-item">
              <b>Name</b> <a class="pull-right">{{userName}}</a>
            </li>
            <li class="list-group-item">
              <b>Email</b> <a class="pull-right">{{email}}</a>
            </li>
            <li class="list-group-item">
              <b>Phone</b> <a class="pull-right" ng-if="phone != '' && phone != undefinded && phone != null ">{{phone}}</a>
              <a class="pull-right" ng-if="phone == '' || phone == undefinded || phone == null ">N/A</a>
            </li>
            <li class="list-group-item">
              <b>Created On</b> <a class="pull-right">{{createdOn | moment: 'format': 'MMM DD, YYYY' }}</a>
            </li>
          </ul>
        </div>
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
        <!-- /.box-body -->
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
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <div class="text-center" ng-show="loadMoreChat">
            <a href="javascript:;" class="uppercase" ng-click="loadMoreChats()">Load More</a>
          </div>
          <!-- Conversations are loaded here -->
          <div  scroll-glue="glued" ng-if="msgObj.length > 0" class="direct-chat-messages" style="height: 400px">
            <div ng-repeat="obj in msgObj | reverse"  my-scroll-directive>
              <div ng-if="obj.position && (obj.message != '' && obj.message != null && obj.message != undefined)" class="direct-chat-msg" >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-left" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-right" >{{obj.createdOn  | moment: 'format': 'MMM DD, YYYY hh:mm:ss' }}</span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}/images/app42chatadmin/default.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div><!-- /.direct-chat-msg -->
              <div ng-if="!obj.position  && (obj.message != '' && obj.message != null && obj.message != undefined)" class="direct-chat-msg right"  >
                <div class="direct-chat-info clearfix">
                  <span class="direct-chat-name pull-right" ng-bind="obj.name"></span>
                  <span class="direct-chat-timestamp pull-left" >{{obj.createdOn  | moment: 'format': 'MMM DD, YYYY hh:mm:ss' }}</span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="${request.getContextPath()}//images/app42chatadmin/avatar5.png" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text" ng-bind="obj.message">

                </div><!-- /.direct-chat-text -->
              </div>

            </div>
          </div><!--/.direct-chat-messages-->
          <div ng-if="msgObj.length == 0" class=""> <div class="noChatFound">No chat found.</div></div>
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