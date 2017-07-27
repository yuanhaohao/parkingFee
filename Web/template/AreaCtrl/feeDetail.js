platform.controller('feeDetail',['$scope','$rootScope','$http','$window','$stateParams',
    function ($scope, $rootScope, $http, $window, $stateParams) {
        $window.scroll(0, 0);

        $scope.id = $stateParams.id;
        $scope.ruleId = $stateParams.ruleId;
        $scope.linkId = $stateParams.linkId;
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http.get(
                $rootScope.apiHome + 'fee/rule/' + $scope.ruleId
            ).success(function (data) {
                if (data.success) {
                    $scope.thisRule = {};
                    $scope.thisRule.id = data.data.id;
                    $scope.thisRule.name = data.data.name;
                    $scope.thisRule.types = data.data.types;
                } else {
                    layer.msg('暂时无法查看', {time: 1000, icon: 5})
                }
            });
        }


}]);