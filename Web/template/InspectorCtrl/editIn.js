platform.controller('editIn', ['$scope', '$rootScope', '$http', '$window', '$stateParams',
    function ($scope, $rootScope, $http, $window, $stateParams) {
        $window.scroll(0, 0);

        var id = $stateParams.id;
        $http.get(
            $rootScope.apiHome + 'manager/' + id
        ).success(function (data) {
            if (data.retcode == '0') {
                initForm(data.body);
            }
        });

        function initForm(entity) {
            $scope.accountName = entity.accountName;
            $scope.name = entity.name;
            $scope.jobNumber = entity.jobNumber;
            $scope.phoneNum = entity.phoneNum;
            $scope.idNumber = entity.idNumber;
            $scope.address = entity.address;
            $scope.parkLotId = entity.parkLotId.split(",");

            $(document).ready(function () {
                $(".js-example-basic-multiple").select2();
            });

            $scope.sexArr = [
                {
                    id: 1,
                    name: '男'
                },
                {
                    id: 0,
                    name: '女'
                }
            ];
            if (entity.sex) {
                $scope.sex = $scope.sexArr[0].id;
            } else {
                $scope.sex = $scope.sexArr[1].id;
            }
        }

        $scope.save = function () {
            if (!$scope.jobNumber) {
                layer.msg('工号获取失败，请稍后再试', {time: 1000, icon: 0});
                return
            }
            if(!(/^1[34578]\d{9}$/.test($scope.phoneNum))){
                layer.msg('请输入正确的11位手机号码', {time: 1000, icon: 0});
                $('input[name="phoneNum"]').focus();
                return false;
            }
            if(!/^\d{17}(\d|x)$/i.test($scope.idNumber)) {
                layer.msg('请输入正确的18位身份证号', {time: 1000, icon: 0});
                $('input[name="idNumber"]').focus();
                return false;
            }

            var options = $("#areaIn option:selected");
            if (options.length <= 0) {
                layer.msg('请输入或选择片区', {time: 1000, icon: 0});
                setTimeout(function () {
                    $('select[name="parkLotId"]').focus();
                }, 1000);
                return
            }
            $scope.areaId = [];
            for (var i = 0; i < options.length; i++) {
                $scope.areaId.push($(options[i]).val())
            }
            $scope.parkId = $scope.areaId.join(",");
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
                $.ajax({
                    cache: true,
                    type: "POST",
                    contentType: "application/json",
                    url: $rootScope.apiHome + 'manager/update',
                    data: JSON.stringify({
                        managerId: id,
                        accountName: $scope.accountName,
                        name: $scope.name,
                        jobNumber: $scope.jobNumber,
                        sex: $scope.sex,
                        phoneNum: $scope.phoneNum,
                        passWd: $stateParams.pwd,
                        idNumber: $scope.idNumber,
                        address: $scope.address,
                        parkLotId: $scope.parkId
                    }),
                    async: false,
                    error: function (request) {
                        layer.msg('内容错误', {time: 1000, icon: 0});
                    },
                    success: function (data) {
                        if (data.retcode == '0') {
                            layer.msg('保存成功', {time: 1000, icon: 1});
                            $rootScope.jumpTo('inspectorCtrl')
                        } else {
                            layer.msg('保存失败', {time: 1000, icon: 5});
                        }
                    }
                });
            }




        }
    }]);