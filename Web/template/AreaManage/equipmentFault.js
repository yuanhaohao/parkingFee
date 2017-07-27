//设备故障信息
platform.controller("equipmentFault",['$scope','$rootScope','$http','$window',function ($scope,$rootScope,$http,$window) {
        $window.scroll(0,0);

        $scope.faultContentMap=[
            {
                id:0,
                faultContent:"地锁损坏"
            },
            {
                id:1,
                faultContent:"地磁损坏"
            },
            {
                id:2,
                faultContent:"车位锁电量低"
            }
        ];
        $scope.processStateMap=[
            {
                id:0,
                processState:"待处理"
            },
            {
                id:1,
                processState:"已处理"
            }
        ];
        $scope.faultSourceMap=[
            {
                id:0,
                faultSource:"人工推送"
            },
            {
                id:1,
                faultSource:"设备上报"
            }
        ];

        listEquipmentMsgs();

        function listEquipmentMsgs() {
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
                $.ajax({
                    cache: true,
                    type: "POST",
                    contentType: "application/json",
                    url: $rootScope.apiHome + 'device/query',
                    data: JSON.stringify({
                        startTime: $('#startTime').val(),
                        endTime: $('#endTime').val(),
                        parkLotName: $('#parkLotName').val(),
                        managerName: $('#managerName').val(),
                        jobNumber: $('#jobNumber').val(),
                        managerPhone: $('#managerPhone').val(),
                        faultContent: $scope.faulted,
                        processState: $scope.processed,
                        faultSource: $scope.faultSourced
                    }),
                    async: false,
                    error: function (request) {
                        layer.msg('请求失败', {time: 1000, icon: 5});
                    },
                    success: function (data) {
                        if (data.retcode == "0") {
                            $scope.equipmentMsgs = data.body;

                            var len=$scope.equipmentMsgs.length;
                            $scope.faultContents=[];
                            for(var i=0;i<len;i++){
                                $scope.faultContents[i] = $scope.equipmentMsgs[i].faultContent.split(",");
                                for(var j=0;j<$scope.faultContents[i].length;j++){
                                    switch ($scope.faultContents[i][j]){
                                        case "0":
                                            $scope.faultContents[i][j]="地锁损坏";
                                            break;
                                        case "1":
                                            $scope.faultContents[i][j]="地磁损坏";
                                            break;
                                        case "2":
                                            $scope.faultContents[i][j]="车位锁电量低";
                                            break;
                                    }
                                }
                                $scope.faultContents[i].remove('');
                            }
                        } else {
                            layer.msg('请求失败', {time: 1000, icon: 5});
                        }
                    }
                });
            }



        }

        $scope.tosearch=function () {
            listEquipmentMsgs();
        };

        layui.use('laydate', function(){
            var laydate = layui.laydate;
            var start = {
                istime: true,
                format: 'YYYY-MM-DD hh:mm:ss',
                max: laydate.now()
                ,istoday: false
                ,choose: function(datas){
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas; //将结束日的初始值设定为开始日
                }
            };
            var end = {
                istime: true,
                format: 'YYYY-MM-DD hh:mm:ss',
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
            };
            document.getElementById('endTime').onclick = function(){
                end.elem = this;
                laydate(end);
            }
        });

    }]);
