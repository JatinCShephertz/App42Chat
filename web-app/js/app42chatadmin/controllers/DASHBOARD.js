/**
 * Shephertz Technologies
 * 
 * @author Jatin Chauhan
 * @date 30 April 2017
 * @version 1.0
 */

// Dashboard Controller
chatAdmin.controller("dashboardController", function($scope) {
//    $scope.openSubSideBar("dashboardSection")	
    console.log("Dashboard called")
    $scope.statusList = [{
        name:"Closed",
        value:"Closed"
    },
    {
        name:"Ongoing",
        value:"Ongoing"
    },
    {
        name:"Unanswered",
        value:"Unanswered"
    }]
    $scope.restimateList = [
    {
        name:"Excellent",
        value:"Excellent"
    },
    {
        name:"Very Good",
        value:"Very Good"
    },
    {
        name:"Good",
        value:"Good"
    },
    {
        name:"Average",
        value:"Average"
    },
    {
        name:"Poor",
        value:"Poor"
    }
    ]
    $scope.drawCustomerExperience = function(){
        var graphElement = $("#userRating")
        var status_donut_data = []
        var rating = {}
        rating.name="Good"
        rating.count=38
        rating.y=38
        status_donut_data.push(rating)
        
        rating = {}
        rating.name="Very Good"
        rating.count=21
        rating.y=21
        status_donut_data.push(rating)
        
        rating = {}
        rating.name="Poor"
        rating.count=3
        rating.y=3
        status_donut_data.push(rating)
        
        rating = {}
        rating.name="Excellent"
        rating.count=28
        rating.y=28
        status_donut_data.push(rating)
        
        rating = {}
        rating.name="Average"
        rating.count=22
        rating.y=22
        status_donut_data.push(rating)
       
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
 
        graphElement.highcharts({
            chart: {
                type: 'pie',
                plotBackgroundColor: null,

                plotBorderWidth: null,

                plotShadow: false
            },
            title: {
                text: "",
                x: -20 //center
            },
            credits: {
                enabled: false
            },
            subtitle: {
                //text: 'Status Donut',
                x: -20
            },
            tooltip: {
                formatter: function () {
             
                    return this.y > 0 ? '<b>'+'Count :'+ this.point.count+'<b>'+ '<br>' +this.y +'% of Total' : null
                }
            },
       
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    shadow: false,
                    center: ['50%', '50%'],
                    enableMouseTracking: true,
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'

                    }
                }
            },
            series: [{
                data: status_donut_data,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 1 ? '<b>' + this.point.name + '</b> ' : null;
                    }
                }
            }],
            navigation: {
                buttonOptions: {
                    verticalAlign: 'bottom',
                    y: -20
                }
            }
        });
    }
  
    
    $scope.drawRequestStatus = function(){
        var graphElement = $("#requestStatus")
        var status_donut_data = []
        var rating = {}
        rating.name="Ongoing"
        rating.count=64
        rating.y=64
        status_donut_data.push(rating)
        
        rating = {}
        rating.name="Closed"
        rating.count=30
        rating.y=30
        status_donut_data.push(rating)
        
        rating = {}
        rating.name="Unanswered"
        rating.count=6
        rating.y=6
        status_donut_data.push(rating)
       
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
 
        graphElement.highcharts({
            chart: {
                type: 'pie',
                plotBackgroundColor: null,

                plotBorderWidth: null,

                plotShadow: false
            },
            title: {
                text: "",
                x: -20 //center
            },
            credits: {
                enabled: false
            },
            subtitle: {
                //text: 'Status Donut',
                x: -20
            },
            tooltip: {
                formatter: function () {
             
                    return this.y > 0 ? '<b>'+'Count :'+ this.point.count+'<b>'+ '<br>' +this.y +'% of Total' : null
                }
            },
       
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    shadow: false,
                    center: ['50%', '50%'],
                    enableMouseTracking: true,
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'

                    }
                }
            },
            series: [{
                data: status_donut_data,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        return this.y > 1 ? '<b>' + this.point.name + '</b> ' : null;
                    }
                }
            }],
            navigation: {
                buttonOptions: {
                    verticalAlign: 'bottom',
                    y: -20
                }
            }
        });
    }
 
    $scope.bandwidthReportChart = function(isrefresh,days,fromrating){
        var graph_data = []
        var rating = {}
        if(!fromrating){
            rating.date="2017-04-28"
            rating.counter_req=4
            graph_data.push(rating)
            if(days == 7  || days == 30){
                rating = {}
                rating.date="2017-04-29"
                rating.counter_req=78
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-04-30"
                rating.counter_req=143
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-01"
                rating.counter_req=144
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-02"
                rating.counter_req=69
                graph_data.push(rating)
            }
            if(days == 30){
                rating = {}
                rating.date="2017-05-03"
                rating.counter_req=13
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-04"
                rating.counter_req=44
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-05"
                rating.counter_req=80
                graph_data.push(rating)
            }
        }else{
            rating.date="2017-04-28"
            rating.counter_req=1
            graph_data.push(rating)
            if(days == 7 || days == 30){
                rating = {}
                rating.date="2017-04-29"
                rating.counter_req=38
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-04-30"
                rating.counter_req=113
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-01"
                rating.counter_req=134
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-02"
                rating.counter_req=59
                graph_data.push(rating)
            }
            if(days == 30){
                rating = {}
                rating.date="2017-05-03"
                rating.counter_req=11
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-04"
                rating.counter_req=34
                graph_data.push(rating)
        
                rating = {}
                rating.date="2017-05-05"
                rating.counter_req=60
                graph_data.push(rating)
            } 
        }
        $('#hero-graph-bandwidth').show();
      
        var dateArray;
        var bandwidthTotal_reqArray;
       
        dateArray = Object.keys(graph_data).map(function(k){
            return graph_data[k].date
        });
        bandwidthTotal_reqArray = Object.keys(graph_data).map(function(k){
            return graph_data[k].counter_req
        });
        $('#hero-graph-bandwidth').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: dateArray,
                crosshair: true
               
            },
            yAxis: {
                min: 0,
                allowDecimals:false,
                title: {
                    text: 'Conversations'
                }
            },

            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            tooltip: {
                formatter: function() {
                    return 'Date :<b>' + this.x + '</b></br>Data:<b> ' + this.y.toFixed(2)+'</b>';
                },
                useHTML: true
            },
            series: [{
                maxPointWidth: 50,
                name: 'Conversations',
                data: bandwidthTotal_reqArray
            }
            ],
            navigation: {
                buttonOptions: {
                    verticalAlign: 'bottom',
                    y: -20
                }
            }
        }); 
    }
   
    
    $scope.init = function(){
        $scope.showTodayAndTotalLoading = true
        $scope.todayNewUsers = Math.floor((Math.random() * 15) + 1);
        $scope.totalNewUsers = Math.floor((Math.random() * 80) + 15);
        $scope.todayUsers = Math.floor((Math.random() * 20) + 1)+$scope.todayNewUsers;
        $scope.totalUsers = Math.floor((Math.random() * 100) + 1)+$scope.totalNewUsers ;
        
        $scope.startDate = moment().subtract(6, 'days').format('YYYY-MM-DD')
        $scope.endDate =moment().format('YYYY-MM-DD')
        $('#daterange-btn').val(moment().subtract(6, 'days').format('YYYY-MM-DD') + ' - ' +  moment().format('YYYY-MM-DD'));
        $('#daterange-btn').daterangepicker(
        {
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()]
            },
            startDate: moment().subtract(6, 'days'),
            endDate: moment()
        },
        function (start, end,label) {
            var days = 1
            if(label == "Last 7 Days"){
                days = 7
            }else if(label == "Last 30 Days"){
                days = 30
            }else{
                days = 1
            }
            $scope.bandwidthReportChart(true,days,false)
            $scope.drawRequestStatus()
            $scope.drawCustomerExperience()
            $scope.showTodayAndTotalLoading = false
        });
        $scope.bandwidthReportChart(false,7,false)
        $scope.drawRequestStatus()
        $scope.drawCustomerExperience()
        $scope.showTodayAndTotalLoading = false
    }
    $scope.init()
    
    $scope.refreshOnDemand = function(){
        $scope.showTodayAndTotalLoading = true
        $scope.todayNewUsers = Math.floor((Math.random() * 15) + 1);
        $scope.totalNewUsers = Math.floor((Math.random() * 80) + 15);
        $scope.todayUsers = Math.floor((Math.random() * 20) + 1)+$scope.todayNewUsers;
        $scope.totalUsers = Math.floor((Math.random() * 100) + 1)+$scope.totalNewUsers ;
        $scope.bandwidthReportChart(false,7,false)
        $scope.showTodayAndTotalLoading = false
    }
    
});

// Live Chat Controller
chatAdmin.controller("liveChatController", function($scope) {
//    $scope.openSubSideBar("dashboardSection")	
    console.log("Live chat called")
    $scope.glued = true;
 
});

