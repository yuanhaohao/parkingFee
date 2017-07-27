/**
 * Created by Administrator on 2017/1/16.
 */
platform.controller("accountDetailContr",['$scope','$rootScope','$http','$stateParams',function ($scope, $rootScope,$http,$stateParams) {
    if( sessionStorage.getItem("tokenId") == null){
        window.location.href="login.html"
    }
    else{
        $http({
            method: "POST",
            url:$rootScope.apiHome+"recharge/querybillrecord",
            data:{
                "userPhone":$stateParams.phone,
            },
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("tokenId")
            }
        }).then(function (data) {
            console.log(data)
            if(data.data.retcode==-10){
                window.location.href="login.html"
            }
            if(data.data.retcode==0){
                var temp = data.data.body
                var lists = new Array();
                for(var i=0;i< temp.length;i++){
                    for(var a= 0;a<temp[i].yearList.length;a++){
                        for(var b=0;b<temp[i].yearList[a].monthList.length;b++){
                            lists.push(temp[i].yearList[a].monthList[b])
                        }
                    }
                }
                $scope.lists=lists;
            }else {
                layer.msg('数据请求失败，请稍后再试', {time: 1200, icon:5})
            }

        },function (response) {
            layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})
        });
        $scope.phone = $stateParams.phone;
    }

}])
