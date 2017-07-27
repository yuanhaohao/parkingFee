platform.controller('areaCtrl',['$scope','$rootScope','$http','$window',function($scope,$rootScope,$http,$window){
    $window.scroll(0,0);

    listArea();

    function listArea() {
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $.ajax({
                cache: true,
                type: "POST",
                url: $rootScope.apiHome + 'parkLot/query',
                data: $('#parkLotForm').serialize(),
                async: false,
                error: function (request) {
                    layer.msg('请求失败', {time: 1000, icon: 0});
                },
                success: function (data) {
                    if (data.retcode == "0") {
                        $scope.partLots = data.body;
                    } else {
                        layer.msg('请求失败', {time: 1000, icon: 5});
                    }
                }
            });
        }

    }

    // 搜索
    $scope.toSearch = function() {
        if($rootScope.areaValue.indexOf($("#key").val())!=-1){
            $('input[name="parkLotId"]').val($rootScope.areas[$rootScope.areaValue.indexOf($("#key").val())].name)
        }else if (!$("#key").val()){
            $('input[name="parkLotId"]').val('')
        }else {
            layer.msg('请选择或输入正确的片区名', {time: 2000, icon: 0});
            return false;
        }
        listArea();
    };

    //删除
    $scope.delArea=function (currId) {
        layer.confirm('确定删除该片区？', {
            btn: ['是','否'] //按钮
        }, function(){
            if( sessionStorage.getItem("tokenId") == null){
                window.location.href="login.html"
            }else{
                $http.delete(
                    $rootScope.apiHome+'parkLot/'+currId
                ).success(function (data) {
                    if(data.retcode == "0"){
                        layer.msg('删除成功', {time: 1000, icon:1});
                        listArea();
                        $rootScope.getAllArea()
                    }else {
                        layer.msg('删除失败，请稍后再试', {time: 1000, icon:5})
                    }
                });
            }

        }, function(){
        });
    };

}]);