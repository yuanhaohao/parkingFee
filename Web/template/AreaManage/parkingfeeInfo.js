//停车费信息
platform.controller("parkingfeeInfo",['$scope','$rootScope','$http','$window',function ($scope,$rootScope,$http,$window) {
    $window.scroll(0,0);

    listParkingFeeMsgs();

    $scope.parkLotId="";
    function listParkingFeeMsgs() {

        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $.ajax({
                cache: true,
                type: "POST",
                contentType: "application/json",
                url: $rootScope.apiHome + 'parkLot/queryAreaDetails',
                data: JSON.stringify({
                    startTime: $('#parkingStart').val(),
                    endTime: $('#parkingEnd').val(),
                    parkLotId: $scope.parkLotId
                }),
                async: false,
                error: function (request) {
                    layer.msg('请求失败', {time: 1000, icon: 5});
                },
                success: function (data) {
                    if (data.retcode == "200") {
                        $scope.parkFeeMsgs = data.body;
                    } else {
                        layer.msg('请求失败', {time: 1000, icon: 5});
                    }
                }
            });
        }




    }

    $scope.toSearch=function () {
        if($("#areaN").val()&&$rootScope.areaValue.indexOf($("#areaN").val())!=-1){
            $scope.parkLotId=$rootScope.areas[$rootScope.areaValue.indexOf($("#areaN").val())].name;
        }else if (!$("#areaN").val()){
            $scope.parkLotId=""
        }else {
            layer.msg('请选择或输入正确的片区名', {time: 2000, icon: 0});
            return false
        }
        listParkingFeeMsgs();
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
                end.start = datas;//将结束日的初始值设定为开始日
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
        document.getElementById('parkingStart').onclick = function(){
            start.elem = this;
            laydate(start);
        };
        document.getElementById('parkingEnd').onclick = function(){
            end.elem = this;
            laydate(end);
        }
    });
}]);