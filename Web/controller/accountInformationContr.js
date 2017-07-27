platform.controller("accountInformationContr",['$scope','$rootScope','$http',function ($scope, $rootScope,$http) {

 //************************************************默认加载***********************************************************
    if( sessionStorage.getItem("tokenId") == null){
        window.location.href="login.html"
    }
    else{
        $http({
            method: "POST",
            url:$rootScope.apiHome+"useraccount/queryUserAccountInfo",
            data:{
                "userPhone":"",
                "startTime":"",
                "endTime":""
            },
            headers:{
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            console.log(sessionStorage.getItem("tokenId"))
            if(data.data.retcode==-10){
                window.location.href="login.html"
            }
            if(data.data.retcode==0){
                $scope.lists = data.data.body
            }
            else{ layer.msg(data.data.retmsg, {time: 1200, icon:5})}
        },function (response) {
            layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})
        });
    }


//***********************************************************查询********************************************************
$scope.search=function () {
    if( sessionStorage.getItem("tokenId") == null){
        window.location.href="login.html"
    }
    else{
		var endTime = function(){
			if(null != $("#endTime").val() && "" != $("#endTime").val()){
				return $("#endTime").val() + " 23:59:59";
			} else {
				return $("#endTime").val();
			}
		}
        $http({
            method: "POST",
            url:$rootScope.apiHome+"useraccount/queryUserAccountInfo",
            data:{
                "userPhone":$("#accountInfo").val(),
                "startTime":$("#startTime").val(),
                "endTime": endTime()
            },
            headers:{
                "Content-Type": "application/json"
            }
        }).then(function (data) {
            if(data.data.retcode==-10){
                window.location.href="login.html"
            }
            if(data.data.retcode==0){
                $scope.lists = data.data.body
            }
            else{ $scope.lists = "";
                layer.msg(data.data.retmsg, {time: 1200, icon:5})}
        },function (response) {
            layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})
        });
    }

}
//    *********************************************************余额不足时 标红******************************************//

    $scope.compare = function (a,b) {
        if(a >=  b){ return b ;}
    }
    //*********************************************账号搜索模糊查询*******************************//
     $rootScope.forsearch = {
         searchPhone:function () {
             $scope.searchList = null;
             $scope.shown = true;
             if( sessionStorage.getItem("tokenId") == null){
                 window.location.href="login.html"
             }
             else{
                 $http({
                     method: "POST",
                     url:$rootScope.apiHome + "useraccount/queryUserAccountInfo",
                     data:{
                         "phonenum":$("#accountInfo").val()
                     },
                     headers:{
                         "Content-Type": "application/json"
                        
                     }
                 }).then(function (data) {
                    
                     if(data.data.retcode == 0){
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
              $("#accountInfo").val(data)
             $scope.shown = false;
             $scope.searchList = null;
         }
     };
     $(document).bind("click", function() {
         $scope.$apply( function (){
             $scope.shown = false;

         })
     });
    //******************************************************************************************************//




// **************************************************************日期插件************************************************
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


}])