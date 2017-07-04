<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    Offline Chats

  </h1>
  <ol class="breadcrumb">
    <li><a href="#/dashboard"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active"> Offline Chats</li>
  </ol>
</section>

<section class="content">

  <div class="row">
    <div class="col-xs-12">
      <div class="box box-primary">
        <div class="box-header">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </div>
                  <input type="text" id="daterange-btn"  class="form-control pull-l" >
                </div><!-- /.input group -->
              </div>
            </div>
            <div class="col-md-8">
              <button type="button" ng-disabled="offlineChatsList.length == 0" class="btn btn-primary pull-right" ng-click="beginReportGeneration()"><i class="fa fa-download"></i> Generate Report</button>
            </div>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body ">

          <table class="table table-striped">

            <tbody>
              <tr>
                <th>#</th>
                <th>Sender Name</th>
                <th>Assigned To</th>
                <th>Message</th>
                <th>Received On</th>
              </tr>
              <tr ng-if="offlineChatsList.length !=0" ng-repeat="oC in  offlineChatsList ">
                <td>{{$index+1}}</td>
                <td><a href="javascript:;" ng-click="openUserDetails(oC.sender)">{{oC.sender}}</a></td>   
                <td>{{oC.agent}}</td>   
                <td><a href="javascript:;" ng-click="openPwddModal(oC.message)"><i class="fa fa-camera-retro"></i> view</a></td>   
                <td>{{oC.createdOn  | moment: 'format': 'MMM DD, YYYY hh:mm:ss' }}</td>   


              </tr>
              <tr ng-if="offlineChatsList.length ==0">
                <td colspan="5" style="text-align: center;"><b>No Offline Message(s) found.</b></td>
              </tr>


            </tbody>
          </table>
          <div class="box-footer text-center" ng-show="isMoreOfflineChats">
            <a href="javascript:;" class="uppercase" ng-click="loadMoreOfflineChats()">Load More</a>
          </div>
        </div><!-- /.box-body -->
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div><!-- /.box -->

    </div>
  </div>
</section>

<div class="modal" aria-hidden="true" aria-labelledby="myModalLabel"
     role="dialog" tabindex="-1" id="shwPwddModal" data-backdrop="static" data-keyboard="false" style="display: none;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Show Message</h4>
      </div>
      <div class="modal-body">
        <div>Message: <span class="iamCount" ng-bind="dynPwd"></span></div>
      </div>
      <div class="modal-footer">
        <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
        <!--<button class="btn btn-primary" ng-click="deleteUser(userO)" type="button">YES</button>-->
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
