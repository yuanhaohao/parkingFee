platform.controller('parkspaceEquipment', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $window.scroll(0, 0);

    //删除
    $scope.delete = function (item) {
        layer.confirm('确定删除该车位信息？', function () {
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
                $http({
                    method: 'POST',
                    url: $rootScope.apiHome + 'parkPlace/delete',
                    data: {parkPlaceId: item.parkPlaceId, mansensorId: item.magsensorId, lockId: item.lockId}
                }).success(function (data) {
                    if (data.retcode == 620) {
                        layer.msg(data.retmsg || '删除成功', {time: 1000, icon: 1}, function () {
                            $scope.search();
                        });
                    } else {
                        layer.msg(data.retmsg || '删除失败！', {time: 1000, icon: 5})
                    }
                });
            }
        });
    };

    $scope.search = function () {
        if($("#areaN").val()&&$rootScope.areaValue.indexOf($("#areaN").val())!=-1){
            $("#parkLotId").val($rootScope.areas[$rootScope.areaValue.indexOf($("#areaN").val())].name);
        } else if (!$("#areaN").val()){
            $("#parkLotId").val("")
        } else {
            layer.msg('请选择或输入正确的片区名', {time: 2000, icon: 0});
            return false;
        }
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http({
                method: 'POST',
                url: $rootScope.apiHome + 'parkPlace/query',
                data: $('#searchForm').serializeJson()
            }).success(function (data) {
                if (data.retcode == 0) {
                    $scope.place = data.body;
                    $('#updateForm')
                } else {
                    layer.msg(data.retmsg || '数据为空！', {time: 1000, icon: 5})
                }
            });
        }

    };

    //init
    $scope.search();
}]);
