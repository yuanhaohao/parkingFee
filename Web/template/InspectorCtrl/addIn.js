platform.controller('addIn', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
    $window.scroll(0, 0);

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
    $scope.sex = $scope.sexArr[0].id;

    $(document).ready(function() {
        $(".js-example-basic-multiple").select2();
    });

    $scope.save = function () {
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

        var options=$("#areaIn option:selected");
        if (options.length<=0) {
            layer.msg('请输入或选择片区', {time: 1000, icon: 0});
            setTimeout(function () {
                $('select[name="parkLotId"]').focus();
            }, 1000);
            return
        }
        $scope.areaId=[];
        for(var i=0;i<options.length;i++){
            $scope.areaId.push($(options[i]).val())
        }
        $scope.parkId=$scope.areaId.join(",");
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $.ajax({
                cache: true,
                type: "POST",
                contentType: "application/json",
                url: $rootScope.apiHome + 'manager/register',
                data: JSON.stringify({
                    accountName: $scope.accountName,
                    name: $scope.name,
                    jobNumber: $scope.jobNumber,
                    sex: $scope.sex,
                    phoneNum: $scope.phoneNum,
                    passWd: $scope.passWd,
                    idNumber: $scope.idNumber,
                    address: $scope.address,
                    parkLotId: $scope.parkId
                }),
                async: false,
                error: function (request) {
                    layer.msg('内容错误', {time: 1000, icon: 0});
                },
                success: function (data) {
                    if (data.retcode == '350') {
                        layer.msg('保存成功', {time: 1000, icon: 1});
                        $rootScope.jumpTo('inspectorCtrl')
                    } else if(data.retcode == '380'){
                        layer.msg('该身份证号巡检员已存在', {time: 3000, icon: 0});
                    } else {
                        layer.msg('保存失败', {time: 1000, icon: 5});
                    }
                }
            });
        }



    }
    }]);