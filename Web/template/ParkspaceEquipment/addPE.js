platform.controller('addPE', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {
    $window.scroll(0, 0);

    $scope.placenum = $stateParams.id;
    $scope.insert = $scope.placenum == null;
    $scope.title = $scope.insert ? "添加车位设备" : "修改车位设备";
    $scope.place = {
        parkLotId: '',
        placenum: '',
        mansensorId: '',
        lockId: '',
        position: '',
        location: '',
        longtitude: '',
        latitude: ''
    };
    //修改时，获取车位信息并填充表单
    if (!$scope.insert) {
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http({
                method: 'POST',
                url: $rootScope.apiHome + 'parkPlace/query',
                data: {placenum: $scope.placenum}
            }).success(function (data) {
                if (data.retcode == 0) {
                    $scope.place.parkPlaceId = data.body[0].parkPlaceId;
                    $scope.place.parkLotId = data.body[0].parkLotId;
                    $scope.place.placenum = data.body[0].placenum;
                    $scope.place.mansensorId = data.body[0].magsensorId;
                    $scope.place.lockId = data.body[0].lockId;
                    $scope.place.position = data.body[0].position;
                    $scope.place.location = data.body[0].location;
                    $scope.place.longtitude = data.body[0].longitude;
                    $scope.place.latitude = data.body[0].latitude;
                } else {
                    layer.msg(data.retmsg || '数据为空！', {time: 1000, icon: 5})
                }
            });
        }



    }

    $scope.save = function (leave) {
        if(!$scope.place.parkLotId){
            layer.msg('请选择一个片区', {time: 1000, icon: 0});
            $('select[name="place.parkLotId"]').focus();
            return false;
        }
        if(!$scope.place.placenum){
            layer.msg('请输入车位号', {time: 1000, icon: 0});
            $('input[name="place.placenum"]').focus();
            return false;
        }
        if(!$scope.place.mansensorId){
            layer.msg('请输入地磁ID', {time: 1000, icon: 0});
            $('input[name="place.mansensorId"]').focus();
            return false;
        }
        if(!$scope.place.lockId){
            layer.msg('请输入地锁ID', {time: 1000, icon: 0});
            $('input[name="place.lockId"]').focus();
            return false;
        }
        if(!$scope.place.longtitude){
            layer.msg('请输入经度', {time: 1000, icon: 0});
            $('input[name="place.longtitude"]').focus();
            return false;
        }
        if(!$scope.place.latitude){
            layer.msg('请输入纬度', {time: 1000, icon: 0});
            $('input[name="place.latitude"]').focus();
            return false;
        }
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http({
                method: 'POST',
                url: $rootScope.apiHome + ($scope.insert ? 'parkPlace/add' : 'parkPlace/update'),
                data: $scope.place
            }).success(function (data) {
                if (data.retcode == '600' || data.retcode == '610') {
                    layer.msg(data.retmsg || '保存成功', {time: 1000, icon: 1});
                    if (leave) {
                        $rootScope.jumpTo('parkspaceEquipment')
                    } else {
                        $scope.place = {};
                    }
                } else {
                    layer.msg(data.retmsg || '保存失败', {time: 1000, icon: 5});
                }
            });
        }


    };
    $scope.saveAndLeave = function () {
        $scope.save(true);
    };
    $scope.saveAndStay = function () {
        $scope.save(false);
    }
}]);