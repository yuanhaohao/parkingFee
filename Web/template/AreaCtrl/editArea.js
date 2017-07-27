platform.controller('editArea', ['$scope', '$rootScope', '$http', '$window', '$stateParams',
    function ($scope, $rootScope, $http, $window, $stateParams) {
    $window.scroll(0, 0);

    $scope.id = $stateParams.id;
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http.get(
                $rootScope.apiHome + 'parkLot/' + $scope.id
            ).success(function (data) {
                if (data.retcode == "0") {
                    $scope.parkLotId = data.body.parkLotId;
                    $scope.parkLotName = data.body.parkLotName;
                    $scope.location = data.body.location;
                    $scope.position = data.body.position;
                    $scope.longtitude = data.body.longtitude;
                    $scope.latitude = data.body.latitude;
                }
            });
        }


    $scope.save = function () {
        if (!$scope.parkLotName) {
            layer.msg('请输入片区名', {time: 1000, icon: 0});
            setTimeout(function () {
                $('input[name="parkLotName"]').focus();
            }, 1000);
            return false;
        }
        if ($scope.parkLotName.length>30) {
            layer.msg('片区名不能超过30个字符', {time: 1000, icon: 0});
            setTimeout(function () {
                $('input[name="parkLotName"]').focus();
            }, 1000);
            return false;
        }
        if (!$scope.longtitude) {
            layer.msg('请输入经度', {time: 1000, icon: 0});
            setTimeout(function () {
                $('input[name="longtitude"]').focus();
            }, 1000);
            return false;
        }
        if (!$scope.latitude) {
            layer.msg('请输入纬度', {time: 1000, icon: 0});
            setTimeout(function () {
                $('input[name="latitude"]').focus();
            }, 1000);
            return false;
        }
        $.ajax({
            cache: true,
            type: "POST",
            url: $rootScope.apiHome + 'parkLot/update',
            data: $('#myForm').serialize(),
            async: false,
            error: function (request) {
                layer.msg('内容错误', {time: 1000, icon: 0});
            },
            success: function (data) {
                if (data.retcode == "0") {
                    layer.msg('片区修改成功', {time: 1000, icon: 1});
                    $rootScope.getAllArea();
                    $rootScope.jumpTo('areaCtrl')
                } else if (data.retcode == "650"){
                    layer.msg('该片区名已存在，请重置', {time: 1000, icon: 5});
                    setTimeout(function () {
                        $('input[name="parkLotName"]').focus();
                    }, 800);
                } else {
                    layer.msg('保存失败', {time: 1000, icon: 5});
                }
            }
        });
    }

}]);