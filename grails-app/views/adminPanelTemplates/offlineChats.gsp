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
        </div><!-- /.box-header -->
        <div class="box-body ">

          <table class="table table-striped">

            <tbody>
              <tr>
                <th>#</th>
                <th>Sender Name</th>
                <th>Assign To</th>
                <th>Message</th>
                <th>Created On</th>
              </tr>
              <tr ng-if="offlineChatsList.length !=0" ng-repeat="oC in  offlineChatsList ">
                <td>{{$index+1}}</td>
                <td>{{oC.sender}}</td>   
                <td>{{oC.agent}}</td>   
                <td>{{oC.message}}</td>   
                <td>{{oC.createdOn}}</td>   


              </tr>
              <tr ng-if="offlineChatsList.length ==0">
                <td colspan="11" style="text-align: center;"><b>No Offline Chats</b></td>
              </tr>


            </tbody>
          </table>
        </div><!-- /.box-body -->
        <div class="overlay" ng-show="loadingState">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div><!-- /.box -->

    </div>
  </div>
</section>

