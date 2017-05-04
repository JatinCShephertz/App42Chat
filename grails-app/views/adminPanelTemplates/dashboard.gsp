<section class="content-header"  >
  <h1>
    Dashboard
    <button class="btn btn-sm btn-primary marginleft10" ng-click="refreshOnDemand()" type="button">
      <i class="fa fa-refresh"></i> </button>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#/dashboard"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Dashboard</li>
  </ol>
</section>


<section class="content" >

  <!-- Info boxes -->
  <div class="row">
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="info-box">
        <div class="info-box-icon bg-aqua"><div class="title">Users</div><div class="icon"><i class="fa fa-cog"></i></div></div>
        <div class="info-box-content">

          <div class="today">
            <span class="contLeft">Today’s</span>
            <span class="contRight" ng-if="showTodayAndTotalLoading"><i class="fa fa-refresh fa-spin"></i></span>
            <span class="contRight" ng-if="!showTodayAndTotalLoading">{{todayUsers}}</span>

          </div>         
          <div class="total">
            <span class="contLeft">Total</span>
            <span class="contRight" ng-if="showTodayAndTotalLoading"><i class="fa fa-refresh fa-spin"></i></span>
            <span  class="contRight" ng-if="!showTodayAndTotalLoading">{{totalUsers}}</span>
          </div>          
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="info-box">
        <div class="info-box-icon bg-purple"><div class="title">New Users</div><div class="icon"><i class="ion ion-ios-people-outline"></i></div></div>
        <div class="info-box-content">

          <div class="today">
            <span class="contLeft">Today’s</span>
            <span class="contRight" ng-if="showTodayAndTotalLoading"><i class="fa fa-refresh fa-spin"></i></span>
            <span class="contRight" ng-if="!showTodayAndTotalLoading">{{todayNewUsers}}</span>

          </div>         
          <div class="total">
            <span class="contLeft">Total</span>
            <span class="contRight" ng-if="showTodayAndTotalLoading"><i class="fa fa-refresh fa-spin"></i></span>
            <span  class="contRight" ng-if="!showTodayAndTotalLoading">{{totalNewUsers}}</span>
          </div>          
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->
    <div class="col-md-4 col-sm-6 col-xs-12">
      <div class="info-box">
        <div class="info-box-icon bg-olive"><div class="title">Conservation</div><div class="icon"><i class="fa fa-wechat"></i></div></div>
        <div class="info-box-content">

          <div class="today">
            <span class="contLeft">Today’s</span>
            <span class="contRight" >506</span>

          </div>         
          <div class="total">
            <span class="contLeft">Total</span>
            <span  class="contRight">1k</span>
          </div>          
        </div><!-- /.info-box-content -->
      </div><!-- /.info-box -->
    </div><!-- /.col -->


    <div class="col-md-12">
      <div class="box">
        <div class="box-body dbIAM">
          <div class="row">
            <div class="col-md-4 calender">
              <div class="form-group">
                <label>Date range:</label>
                <div class="input-group">
                  <div class="input-group-addon">
                    <i class="fa fa-calendar"></i>
                  </div>
                  <input type="text" id="daterange-btn" class="form-control pull-l active">
                </div><!-- /.input group -->
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group slctwd">
                <label>Rating:</label>             
                <select class="form-control" chosen  id="restimeSelect"  
                        ng-options="restimate.name for restimate in restimateList" 
                        ng-model="restimeSelect" 
                        ng-change="bandwidthReportChart(false,7,true)">
                  <option value=""></option>
                </select>              
              </div>
            </div>
            
            <div class="col-md-4">
              <div class="form-group slctwd">
                <label>Status:</label>             
                <select class="form-control" chosen  id="restimeSelect"  
                        ng-options="restimate.name for restimate in statusList" 
                        ng-model="statusSelect" 
                        ng-change="bandwidthReportChart(false,7,true)">
                  <option value=""></option>
                </select>              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Conversations </h3>

          <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
          </div>
        </div><!-- /.box-header -->
        <div class="box-body">
          <div class="row">
            <div class="col-md-12">
              <div id="hero-graph-bandwidth" class="graphRow">
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="col-md-6">
        <!-- DONUT CHART -->
        <div class="box box-danger">
          <div class="box-header with-border">
            <h3 class="box-title">Customer Experience </h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body" style="min-height: 150px;">
            <div id="userRating" class="graphRow">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <!-- DONUT CHART -->
        <div class="box box-danger">
          <div class="box-header with-border">
            <h3 class="box-title">User Conservation</h3>
            <div class="box-tools pull-right">
              <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
            </div>
          </div>
          <div class="box-body" style="min-height: 150px;">
            <div id="requestStatus" class="graphRow"> </div>        
          </div>
        </div><!-- /.box -->
      </div>
    </div>
  </div>
</section>


