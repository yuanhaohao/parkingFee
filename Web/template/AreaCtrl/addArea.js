platform.controller('addArea', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $window.scroll(0, 0);

    $scope.parkLotName = "";

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
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $.ajax({
                cache: true,
                type: "POST",
                url: $rootScope.apiHome + 'parkLot/add',
                data: $('#myForm').serialize(),
                async: false,
                error: function (request) {
                    console.log(request);
                    layer.msg('内容错误', {time: 1000, icon: 0});
                },
                success: function (data) {
                    if (data.retcode == "0") {
                        layer.msg('片区添加成功', {time: 1000, icon: 1});
                        $rootScope.getAllArea();
                        $rootScope.jumpTo('areaCtrl');
                    }else if (data.retcode == "650"){
                        layer.msg('该片区名已存在，请重置', {time: 1000, icon: 5});
                        setTimeout(function () {
                            $('input[name="parkLotName"]').focus();
                        }, 800);
                    }else {
                        layer.msg('保存失败', {time: 1000, icon: 5});
                    }
                }
            });
        }


    }
}]);