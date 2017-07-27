platform.controller('feeCtrl',['$scope','$rootScope','$http','$window',function($scope,$rootScope,$http,$window){
    $window.scroll(0,0);
    if( sessionStorage.getItem("tokenId") == null){
        window.location.href="login.html"
    }else{
        $http.get(
            $rootScope.apiHome+'fee/rule?pageNo=1&pageSize=100'
        ).success(function (data) {
            $scope.fees=data.data.results;
        });
    }


    //分页
    $scope.paginationNums=6;
    $scope.paginationCurr=0;
    $scope.pagination=[];
    for($scope.i=0;$scope.i<$scope.paginationNums;$scope.i++){
        $scope.pagination[$scope.i]=$scope.i+1
    }
    $scope.paginationClicked=function (curr) {
        $scope.paginationCurr=curr
    };
    $scope.paginationLClicked=function () {
        $scope.paginationCurr--
    };
    $scope.paginationRClicked=function () {
        $scope.paginationCurr++
    };
    //end分页

    // 搜索
    $scope.toSearch=function (keys) {
        $scope.getFeelist(1,100,keys);
    };
    $scope.filterFee=function (keys) {
        var keyCode = (navigator.appname=="Netscape")?event.which:event.keyCode;
        if ( keyCode == 13 ){
            $scope.getFeelist(1,100,keys);
            $scope.feeDetailShow=false
        }
        else{
            return false;
        }
    };

    //删除
    $scope.delRule=function (currId) {
        layer.confirm('确定删除本条规则？', {
            btn: ['是','否'] //按钮
        }, function(){
            $http.delete(
                $rootScope.apiHome+'fee/rule/'+currId
            ).success(function (data) {
                if(data.success){
                    layer.msg('删除成功', {time: 1000, icon:1});
                    setTimeout(function () {
                        $scope.getFeelist(1,100);
                        $scope.feeDetailShow=false;
                    },1000)
                }else if(data.errorCode=='000011'){
                    layer.msg('有片区在使用此计费规则，无法删除!', {time: 3000, icon:0})
                }else {
                    layer.msg('删除失败，请稍后再试', {time: 1000, icon:5})
                }
            });
        }, function(){
        });
    };

    $scope.getFeelist = function (pageNo,pageSize,keys) {
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            if(keys){
                $http.get(
                    $rootScope.apiHome+'fee/rule?pageNo='+pageNo+'&pageSize='+pageSize+'&name='+keys
                ).success(function (data) {
                    $scope.fees=data.data.results;
                });
            }else {
                $http.get(
                    $rootScope.apiHome+'fee/rule?pageNo='+pageNo+'&pageSize='+pageSize
                ).success(function (data) {
                    $scope.fees=data.data.results;
                });
            }
        }

    };

    // 计费详情控制
    $scope.feeDetail=function (currId) {
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http.get(
                $rootScope.apiHome+'fee/rule/'+currId
            ).success(function (data) {
                if(data.success){
                    $scope.feeDetailShow=true;
                    $scope.thisRule={};
                    $scope.thisRule.id=data.data.id;
                    $scope.thisRule.name=data.data.name;
                    $scope.thisRule.types=data.data.types;
                }else {
                    layer.msg('暂时无法查看', {time: 1000, icon:5})
                }
            });
        }


    };

}]);