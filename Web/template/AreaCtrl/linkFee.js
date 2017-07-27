platform.controller('linkFee',['$scope','$rootScope','$http','$window','$stateParams',
    function ($scope, $rootScope, $http, $window, $stateParams) {
        $window.scroll(0, 0);

        $scope.id = $stateParams.id;
        $scope.ruleId = $stateParams.ruleId;

        if ($scope.ruleId) {
            $http.get(
                $rootScope.apiHome + 'fee/rule/' + $scope.ruleId
            ).success(function (data) {
                if(data.success){
                    $scope.feeRuleName = data.data.name;
                }
            });
        }

        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http.get(
                $rootScope.apiHome + 'fee/rule/map'
            ).success(function (data) {
                if(data.success){
                    $scope.fees = data.data;
                }else {
                    layer.msg('查询收费规则列表失败', {time: 1000, icon: 5});
                }
            });
        }


        $scope.save = function () {
            if(!$("input[name='ruleId']:checked").val()){
                layer.msg('请选择关联规则', {time: 1200, icon: 0});
                return false
            }
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
                $.ajax({
                    cache: true,
                    type: "POST",
                    url: $rootScope.apiHome + 'parkLot/link',
                    data: {
                        lotId: $scope.id,
                        ruleId: $("input[name='ruleId']:checked").val()
                    },
                    async: false,
                    error: function (request) {
                        layer.msg('内容错误', {time: 1000, icon: 0});
                    },
                    success: function (data) {
                        if (data.success) {
                            layer.msg('关联成功', {time: 1000, icon: 1});
                            $rootScope.jumpTo('areaCtrl')
                        } else {
                            layer.msg('关联失败', {time: 2000, icon: 5});
                        }
                    }
                });
            }

        }
}]);