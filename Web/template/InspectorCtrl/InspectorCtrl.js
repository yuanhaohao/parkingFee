platform.controller('inspectorCtrl', ['$scope', '$rootScope', '$http', '$window',
    function ($scope, $rootScope, $http, $window) {
        $window.scroll(0, 0);

        listInspectors();

        function listInspectors(parkLotId) {
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
                $.ajax({
                    cache: true,
                    type: "POST",
                    contentType: "application/json",
                    url: $rootScope.apiHome + 'manager/query',
                    data: JSON.stringify({
                        name: $('#name').val(),
                        jobNumber: $('#jobNumber').val(),
                        phoneNum: $('#phoneNum').val(),
                        parkLotId: parkLotId
                    }),
                    async: false,
                    error: function (request) {
                        layer.msg('请求失败', {time: 1000, icon: 5});
                    },
                    success: function (data) {
                        if (data.retcode == "0") {
                            $scope.managers = data.body;
                        } else {
                            layer.msg('请求失败', {time: 1000, icon: 5});
                        }
                    }
                });
            }


        }

        $scope.parkLotId="";
        $scope.toSearch = function () {
            if($rootScope.areaValue.indexOf($("#areaN").val())!=-1){
                $scope.parkLotId=$rootScope.areas[$rootScope.areaValue.indexOf($("#areaN").val())].name;
            }else if (!$("#areaN").val()){
                $scope.parkLotId=""
            }else {
                layer.msg('请选择或输入正确的片区名', {time: 2000, icon: 0});
                return false;
            }
            listInspectors($scope.parkLotId);
        };

        $scope.delIn = function (currId) {
            layer.confirm('确定禁用该巡检员？', {
                btn: ['是', '否'] //按钮
            }, function () {
                if( sessionStorage.getItem("tokenId") == null){
                    window.location.href="login.html"
                }else{
                    $http({
                        url: $rootScope.apiHome + 'manager/disableManager',
                        method: "POST",
                        data: { 'managerId' : currId }
                    }).success(function (data) {
                        if (data.retcode == '370') {
                            layer.msg('禁用成功', {time: 1000, icon: 1});
                            listInspectors();
                        } else {
                            layer.msg('禁用失败，请稍后再试', {time: 1000, icon: 5})
                        }
                    });
                }
            }, function () {
            });
        };

        $scope.resetPwd = function(jobNumber){
            layer.confirm('确定重置密码？', {
                btn: ['是', '否'] //按钮
            }, function () {
                if( sessionStorage.getItem("tokenId") == null){
                    window.location.href="login.html"
                }else{
                    $http({
                        url: $rootScope.apiHome + 'manager/resetPassword',
                        method: "POST",
                        data: { 'jobNumber' : jobNumber }
                    }).success(function (data) {
                        if (data.retcode == '320') {
                            layer.msg(data.retmsg, {time: 3000, icon: 1});
                            listInspectors();
                        } else {
                            layer.msg('重置失败，请稍后再试', {time: 1000, icon: 5})
                        }
                    });
                }
                

            }, function () {
            });
        }

    }]);