var platform=angular.module('controller',['ui.router'])
    .controller("gatewayContr",function () {

    })
    .controller("generationContr",function () {
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            var start = {
                max: laydate.now()
                ,istoday: false
                ,choose: function(datas){
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };
            var end = {
                min:start.datas
                ,max:laydate.now()
                ,istoday: false
                ,choose: function(datas){
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };
            document.getElementById('startTime').onclick = function(){
                start.elem = this;
                laydate(start);
            }
            document.getElementById('endTime').onclick = function(){
                end.elem = this
                laydate(end);
            }
        });
    })
    .controller("agentUnlockContr",function () {
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            var start = {
                max: laydate.now()
                ,istoday: false
                ,choose: function(datas){
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };
            var end = {
                min:start.datas
                ,max:laydate.now()
                ,istoday: false
                ,choose: function(datas){
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };
            document.getElementById('startTime').onclick = function(){
                start.elem = this;
                laydate(start);
            }
            document.getElementById('endTime').onclick = function(){
                end.elem = this
                laydate(end);
            }
        });
    })

    .controller("fixedTimeLiftLockContr",function () {

    })
    .controller("parkingfeeStatisticsContr",function () {
        $('#containerT').highcharts({
            chart:{
                type:'line'
            },
            title:{
                text:null,
                align: 'left'
            },
            subtitle:{
                text:'停车收费（元）',
                align: 'left'
            },
            xAxis:{
                categories:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis:{
                title:{
                    text:null
                }
                // ,
                // tickPositions: [0, 2000, 4000, 6000,8000,10000,12000]
            },
            legend: {
                align: 'right', //水平方向位置
                verticalAlign: 'top', //垂直方向位置
                x: 0, //距离x轴的距离
                y: 0 //距离Y轴的距离
            },
            polotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }

            },
            series:[{
                name: '合计',
                color: 'red',
                marker:{radius: 3, symbol:'circle'},
                data: [  6000, 8000, 6000, 6000, 5900, 9800, 5800,8000,9000,6000,8000,9000]
            }, {
                name: '代缴费',
                color: 'blue',
                marker:{radius: 3, symbol:'circle'},
                data: [  1000, 1200, 500, 3000, 2500, 3000, 1800,1100,1340,1360,2000,2090]
            },{
                name: '微信',
                color:'green',
                marker:{radius: 3, symbol:'circle'},
                data: [  3200, 3050, 2050, 1400, 2510, 3900, 1830,2600,2970,2030,2600,3100]
            },{
                name: '支付宝',
                color:'orange',
                marker:{radius: 3, symbol:'circle'},
                data: [  2200, 3150, 3050, 1200, 1510, 2500, 2830,2600,2707,1603,2800,3400]
            }, {
                name: '其他',
                color:'pink',
                marker:{radius: 3, symbol:'circle'},
                data: [  100, 200, 300, 120, 230, 60, 190,150,115,80,140,163]
                }
            ],
            credits:{
                enabled:false
            }
        })
        $('#containerM').highcharts({
            chart:{
                type:'line'
            },
            title:{
                text:null,
                align: 'left'
            },
            subtitle:{
                text:'停车收费（元）',
                align: 'left'
            },
            xAxis:{
                categories:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            },
            yAxis:{
                title:{
                    text:null
                }
                // ,
                // tickPositions: [0, 2000, 4000, 6000,8000,10000,12000]
            },
            legend: {
                align: 'right', //水平方向位置
                verticalAlign: 'top', //垂直方向位置
                x: 0, //距离x轴的距离
                y: 0 //距离Y轴的距离
            },
            polotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }

            },
            series:[{
                name: '合计',
                color: 'red',
                marker:{radius: 3, symbol:'circle'},
                data: [  600, 800, 680, 600, 590, 980, 580,800,900,600,800,900,600, 800, 600, 600, 590, 980, 580,800,900,600,800,900, 600, 800, 600, 600, 590, 980, 580]
            }, {
                name: '代缴费',
                color: 'blue',
                marker:{radius: 3, symbol:'circle'},
                data: [  300, 200, 300, 100, 150, 200, 180,300,100,236,200,240,220, 205, 105, 140, 151, 330, 183,360,300,143,110,330,103,280,310, 120, 195, 270,230]
            },{
                name: '微信',
                color:'green',
                marker:{radius: 3, symbol:'circle'},
                data: [  120, 250, 150, 210, 351, 390, 118,260,307,203,600,310,120, 205, 305, 240, 151, 150, 113,460,207,213,220,310,190,260, 280, 160, 160,320, 305]
            },{
                name: '支付宝',
                color:'orange',
                marker:{radius: 3, symbol:'circle'},
                data: [  120, 205, 150, 240, 251, 335, 183,160,327,303,206,310, 320, 305, 325, 140, 351, 170, 183,260,270,240,300,250, 290, 180,300,290,280,260,260]
            }, {
                name: '其他',
                color:'pink',
                marker:{radius: 3, symbol:'circle'},
                data: [  20, 15, 23, 22, 20, 30, 11,33,66,68,20, 32, 11,33, 20, 11, 23,20, 20, 24, 32, 19,33,19,33, 20, 65, 20,30,85, 60]
            }
            ],
            credits:{
                enabled:false
            }
        })
        $('#containerB').highcharts({
            chart:{
                type:'line'
            },
            title:{
                text:null,
                align: 'left'
            },
            subtitle:{
                text:'停车收费（元）',
                align: 'left'
            },
            xAxis:{
                categories:['1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时','0时']
            },
            yAxis:{
                title:{
                    text:null
                }
                // ,
                // tickPositions: [0, 2000, 4000, 6000,8000,10000,12000]
            },
            legend: {
                align: 'right', //水平方向位置
                verticalAlign: 'top', //垂直方向位置
                x: 0, //距离x轴的距离
                y: 0 //距离Y轴的距离
            },
            polotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }

            },
            series:[{
                name: '合计',
                color: 'red',
                marker:{radius: 3, symbol:'circle'},
                data: [  7200, 8050, 9050, 8400, 6510, 9500, 8830,5600,7070,6030,8000,9100, 8200, 9050, 7050, 10400, 8510, 9900, 7830,10600,9070,8030,6000,5500]
            }, {
                name: '代缴费',
                color: 'blue',
                marker:{radius: 3, symbol:'circle'},
                data: [  500, 900, 650, 1000, 550, 220, 800,880,300,1000,780,690, 380, 320, 340, 1000, 1100, 1900, 780,310,290,1800,1180,1060]
            },{
                name: '微信',
                color:'green',
                marker:{radius: 3, symbol:'circle'},
                data: [  2200, 3050, 3050, 3400, 1510, 2900, 2830,2600,1070,2030,3000,2200,2200, 3050, 2050, 3400, 5510, 2300, 3830,1060,2070,3030,2600,1610]
            },{
                name: '支付宝',
                color:'orange',
                marker:{radius: 3, symbol:'circle'},
                data: [  3720, 2050, 1050, 2840, 3510, 3500, 3830,1600,2707,3030,1030,3100, 3200, 3450, 2950, 4400, 1610, 2500, 2880,2560,1707,2630,2800,1910]
            }, {
                name: '其他',
                color:'pink',
                marker:{radius: 3, symbol:'circle'},
                data: [  200, 115, 230, 220, 240, 320, 119,33, 200, 115, 230, 220, 240, 320, 119,33,240, 320, 119,33, 200, 115, 230, 220]
            }
            ],
            credits:{
                enabled:false
            }
        })
    });