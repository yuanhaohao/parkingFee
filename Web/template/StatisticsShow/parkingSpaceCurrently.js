platform.controller('parkingSpaceCurrently', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $window.scroll(0, 0);

    listParklot();

    function listParklot(parkLotId) {
        $scope.data={
            parkLotId:parkLotId?parkLotId:''
        };

        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http({
                method: 'POST',
                url: $rootScope.apiHome + 'parkLot/queryAreaDetails',
                data: $scope.data
            }).success(function (data) {
                if(data.retcode=="200"){
                    $scope.parks = data.body;
                }else {
                    layer.msg('查询失败，请稍后再试', {time: 2000, icon: 5});
                    return false;
                }
            });
        }
    }

    $scope.parkLotId = "";
    $scope.toSearch = function () {
        if ($rootScope.areaValue.indexOf($("#areaN").val()) != -1) {
            $scope.parkLotId = $rootScope.areas[$rootScope.areaValue.indexOf($("#areaN").val())].name;
        } else if (!$("#areaN").val()) {
            $scope.parkLotId = ""
        } else {
            layer.msg('请选择或输入正确的片区名', {time: 2000, icon: 0});
            return false;
        }
        listParklot($scope.parkLotId);
    };

}]);