platform.controller("homePage",['$scope','$rootScope','$http','$window',function ($scope,$rootScope,$http,$window) {
    $window.scroll(0,0);

    if( sessionStorage.getItem("tokenId") == null){
        window.location.href="login.html"
    }else{
        $http.post(
            $rootScope.apiHome+'home/queryRecord'
        ).success(function (data) {
            if(data.retcode==0){
                $scope.homeData = data.body;

                $('#indicatorContainer').radialIndicator({
                    barColor: {
                        0: '#33CC33',
                        33: '#0066FF',
                        66: '#FFFF00',
                        100: '#FF0000'
                    },
                    percentage: true,
                    radius:73,
                    fontSize:36
                }).data('radialIndicator').animate(parseFloat($scope.homeData.utilizationRate));

            }else {
                layer.msg('数据请求失败，请稍后再试', {time: 1200, icon:5})
            }

        }).error(function () {
            layer.msg('服务器无响应，请稍后再试', {time: 2000, icon:5})
        });
    }




}]);
