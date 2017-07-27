platform.controller("parkingRecordContr",['$scope','$rootScope','$http',function ($scope, $rootScope,$http) {

  //**************************************默认加载**********************************
    if( sessionStorage.getItem("tokenId") == null){
        window.location.href="login.html"
    }else{
        console.log(sessionStorage.getItem("uesrName"))
        $http({
            method: "POST",
            url:$rootScope.apiHome+"driverAccount/queryUserParkrecord",
            data:{
                "phonenum":"",
                "startTime":"",
                "endTime":""
            }
            // headers:{
            //     "Content-Type": "application/json"
            //     "Authorization":"Bearer "+sessionStorage.getItem("tokenId")
            // }
        }).then(function (data) {
            console.log(data)
            if(data.data.retcode==200){
                $scope.lists = data.data.body
            }else{
                layer.msg(data.data.retmsg, {time: 1200, icon:5})
            }
        },function (response) {
            layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})
        });

    }

 //**************************************查询**********************************

        $scope.search=function () {
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
				var endTime = function(){
					if(null != $("#parkingEnd").val() && "" != $("#parkingEnd").val()){
						return $("#parkingEnd").val() + " 23:59:59";
					} else {
						return $("#parkingEnd").val();
					}
				}
            $http({
                method: "POST",
                url:$rootScope.apiHome+"driverAccount/queryUserParkrecord",
                data:{
                    "phonenum":$("#parkRe").val(),
                    "startTime":$("#parkingStart").val(),
                    "endTime":endTime()
                },
                headers:{
                    "Content-Type": "application/json"

                }
            }).then(function (data) {
                if(data.data.retcode==200){
                    $scope.lists = data.data.body
                }else{
                    $scope.lists = "";
                    layer.msg(data.data.retmsg, {time: 1200, icon:5})
                }
            },function (response) {
                layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})
            });
        }

    }

    //*********************************************账号搜索模糊查询*******************************//

    $scope.forsearch = {
         searchPhone:function () {
             $scope.searchList = null;
             $scope.shown = true;
             if( sessionStorage.getItem("tokenId") == null){
                 window.location.href="login.html"
             }else{
                 $http({
                     method: "POST",
                     url:$rootScope.apiHome + "driverAccount/queryUserParkrecord",
                     data:{
                         "phonenum":$("#parkRe").val()
                     }
                   
                 }).then(function (data) {
                     if(data.data.retcode == 200){
                         $scope.searchList = data.data.body
                         console.log(data)
                     }else{
                         layer.msg('查询不到，请稍后再试', {time: 1200, icon:5})
                     }

                 },function (response) {
                     layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})

                 });
             }

         },
         phone:function (data) {
             $("#parkRe").val(data)
             $scope.shown = false;
             $scope.searchList = null;
         }
     };
     $(document).bind("click", function() {
         $scope.$apply( function (){
             $scope.shown = false;

         })
     });



// ********************************日期插件**********************************
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        var start = {
            max: laydate.now()
            ,istoday: false
            ,choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas;//将结束日的初始值设定为开始日
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
        document.getElementById('parkingStart').onclick = function(){
            start.elem = this;
            laydate(start);
        };
        document.getElementById('parkingEnd').onclick = function(){
            end.elem = this;
            laydate(end);
        }
    });


}])