platform.controller('addFee', ['$scope', '$rootScope', '$http', '$window', '$stateParams', function ($scope, $rootScope, $http, $window, $stateParams) {
    $window.scroll(0, 0);

    $scope.feeId = $stateParams.id;
    $scope.insert = $scope.feeId == null;
    $scope.title = $scope.insert ? "新增规则" : "编辑规则";

    //星期数选择的数组标记,长度为7且含有1.2.3.4.5.6.7表示周一到周日都选中了并且没有重复
    $scope.weekVal = [];
    $scope.rule = {
        name: '',
        types: [
            {
                typeName: null,
                maxAmount: null,
                intervalFreeMinutes: null,
                intervalMaxAmount: null,
                ladderFreeMinutes: null,
                ladderMaxAmount: null,
                startTime: null,
                endTime: null,
                weeks: [],
                intervals: [
                    {
                        startTime: null,
                        endTime: null,
                        price: null,
                        unit: null
                    }
                ],
                ladders: [
                    {
                        span: null,
                        price: null,
                        unit: null
                    }, {
                        price: null,
                        unit: null
                    }
                ]
            }
        ]
    };

    //规则日期选择复选框，记录复选框的value并且统计选择的weekVal
    $scope.checkedWeek = function ($event, type, value) {

        var checkbox = $event.target;
        var checked = checkbox.checked;
        if (checked) {
            type.weeks.push(value);
            $scope.weekVal.push(value);
            $scope.weekVal.indexOf(1)!=-1&&$scope.weekVal.indexOf(2)!=-1&&$scope.weekVal.indexOf(3)!=-1&&$scope.weekVal.indexOf(4)!=-1&&$scope.weekVal.indexOf(5)!=-1&&$scope.weekVal.indexOf(6)!=-1&&$scope.weekVal.indexOf(7)!=-1?$scope.notAdd=true:$scope.notAdd=false
        } else {
            type.weeks.remove(value);
            $scope.weekVal.remove(value);$scope.weekVal.indexOf(1)!=-1&&$scope.weekVal.indexOf(2)!=-1&&$scope.weekVal.indexOf(3)!=-1&&$scope.weekVal.indexOf(4)!=-1&&$scope.weekVal.indexOf(5)!=-1&&$scope.weekVal.indexOf(6)!=-1&&$scope.weekVal.indexOf(7)!=-1?$scope.notAdd=true:$scope.notAdd=false
        }
    };

    //添加一个计费规则类型
    $scope.addRuleType = function () {
        $scope.rule.types.push({
            typeName: null,
            maxAmount: null,
            intervalFreeMinutes: null,
            intervalMaxAmount: null,
            ladderFreeMinutes: null,
            ladderMaxAmount: null,
            startTime: null,
            endTime: null,
            weeks: [],
            intervals: [
                {
                    startTime: null,
                    endTime: null,
                    price: null,
                    unit: null
                }
            ],
            ladders: [
                {
                    span: null,
                    price: null,
                    unit: null
                }, {
                    price: null,
                    unit: null
                }
            ]
        });
        $scope.initRuleType();
        $scope.initTimePicker();
        $('#fieldFrequency' + ($scope.rule.types.length - 1)).ready(
            function () {
                $('#fieldFrequency' + ($scope.rule.types.length - 1)).attr('disabled', false);
                $('#fieldInterval' + ($scope.rule.types.length - 1)).attr('disabled', true);
                $('#fieldLadder' + ($scope.rule.types.length - 1)).attr('disabled', true);
            }
        )
    };

    //规则类型选择单选框，切换计费规则类型
    $scope.checkedRuleType = function ($event, type, value, typeIndex, fieldSet) {

        if ($event.target.checked) {
            $('#fieldFrequency' + typeIndex).attr('disabled', true);
            $('#fieldInterval' + typeIndex).attr('disabled', true);
            $('#fieldLadder' + typeIndex).attr('disabled', true);
            $('#' + fieldSet + typeIndex).attr('disabled', false);
        }

        var $ruleList = $('#ruleList' + typeIndex);
        switch (value) {
            case "FREQUENCY":
                $ruleList.find("i").attr("class", "i-1");
                $ruleList.find("div.FREQUENCY").show();
                $ruleList.find("div.INTERVAL").hide();
                $ruleList.find("div.LADDER").hide();
                break;
            case "INTERVAL":
                $ruleList.find("i").attr("class", "i-2");
                $ruleList.find("div.FREQUENCY").hide();
                $ruleList.find("div.INTERVAL").show();
                $ruleList.find("div.LADDER").hide();
                break;
            case "LADDER":
                $ruleList.find("i").attr("class", "i-3");
                $ruleList.find("div.FREQUENCY").hide();
                $ruleList.find("div.INTERVAL").hide();
                $ruleList.find("div.LADDER").show();
                break;
        }
        type.typeName = value;
    };
    //添加“按时计费”的一个时段
    $scope.addInterval = function ($event, type) {
        //验证是否可添加
        var $this = $($event.target);
        var b = $this.parent().parent().find("h3").find("input").val();
        var e = $this.parent().parent().find("h4").find("input").val();
        if ($scope.transFloat(b) >= $scope.transFloat(e)) {
            layer.msg('结束时间不能小于开始时间', {time: 1000, icon: 0});
            $this.parent().parent().find("h4").find("input").val("24:00");
            return
        }
        type.intervals.push({
            startTime: null,
            endTime: null,
            price: null,
            unit: null
        });
        $scope.initTimePicker();
    };
    //删除一个收费设置
    $scope.deleteWeek = function (weeks, week) {
        for(var dw=0;dw<week.weeks.length;dw++){
            $scope.weekVal.remove(week.weeks[dw])
        }
        weeks.remove(week);
    };
    //删除“按时计费”的一个时段
    $scope.deleteInterval = function (type, interval) {
        type.intervals.remove(interval);
    };
    //根据复选框禁用/启用对应的输入框
    $scope.forbiddenInput = function ($event, id) {
        $('#' + id).attr('disabled', !Boolean($event.target.checked));
        $event.stopPropagation();
    };
    //将时分转成浮点数(例如10:35转成10.35)
    $scope.transFloat = function (t) {
        return parseFloat(t.replace(":", "."));
    };
    //初始化默认选中的计费规则类型
    $scope.initRuleType = function () {
        $('div.one-fee').ready(function () {
            var index = $scope.rule.types.length - 1;
            $('input[name="typeName' + index + '"]').first().trigger('click');
        })
    };
    //初始化"按时计费"的timePicker控件
    $scope.initTimePicker = function () {
        //按时计费时间选择
        $('.time').ready(function () {
            $('.time').timepicker({
                'show2400': true,
                'timeFormat': 'H:i'
            })
        });
    };

    //保存规则
    $scope.save = function () {
        //验证是否有空的日期设置
        for (var w = 0; w < $scope.rule.types.length; w++) {
            if ($scope.rule.types[w].weeks.length == 0) {
                if (w == 0) {
                    layer.msg('请为第一组收费标准选择收费日期', {time: 3000, icon: 0});
                    return false
                }
                layer.msg('请删除没有选择收费标准日期的收费设置 或 为其选择收费日期', {time: 3000, icon: 0});
                return false
            }
        }
        //检查是否覆盖周一至周日，且无重叠
        if ($scope.weekVal.indexOf(1) == -1) {
            layer.msg('请添加星期一的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.indexOf(2) == -1) {
            layer.msg('请添加星期二的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.indexOf(3) == -1) {
            layer.msg('请添加星期三的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.indexOf(4) == -1) {
            layer.msg('请添加星期四的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.indexOf(5) == -1) {
            layer.msg('请添加星期五的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.indexOf(6) == -1) {
            layer.msg('请添加星期六的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.indexOf(7) == -1) {
            layer.msg('请添加星期日的收费标准', {time: 2000, icon: 0});
            return false
        }
        if ($scope.weekVal.getNumOf(1) > 1) {
            layer.msg('<span style="color: red">星期一</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(1) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        if ($scope.weekVal.getNumOf(2) > 1) {
            layer.msg('<span style="color: red">星期二</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(2) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        if ($scope.weekVal.getNumOf(3) > 1) {
            layer.msg('<span style="color: red">星期三</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(3) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        if ($scope.weekVal.getNumOf(4) > 1) {
            layer.msg('<span style="color: red">星期四</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(4) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        if ($scope.weekVal.getNumOf(5) > 1) {
            layer.msg('<span style="color: red">星期五</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(5) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        if ($scope.weekVal.getNumOf(6) > 1) {
            layer.msg('<span style="color: red">星期六</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(6) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        if ($scope.weekVal.getNumOf(7) > 1) {
            layer.msg('<span style="color: red">星期日</span> 含<span style="color: red"> ' + $scope.weekVal.getNumOf(7) + ' </span>种收费标准，请修改 (同一天只能有一种收费标准)', {
                time: 3000,
                icon: 0
            });
            return false
        }
        //检查时段收费是否覆盖24小时，是否重叠
        var st = [], ed = [];
        for (var i = 0; i < $scope.rule.types.length; i++) {
            st.push([]);
            ed.push([]);
            if (!$('#fieldInterval' + i).attr("disabled")) {
                for (var j = 0; j < $scope.rule.types[i].intervals.length; j++) {
                    if (isNaN($scope.transFloat($scope.rule.types[i].intervals[j].startTime)) || isNaN($scope.transFloat($scope.rule.types[i].intervals[j].endTime))) {
                        layer.msg('[计时计费] 收费时段信息有误，请重新选择', {time: 2000, icon: 0});
                        return false
                    }
                    st[i].push($scope.rule.types[i].intervals[j].startTime);
                    ed[i].push($scope.rule.types[i].intervals[j].endTime)
                }
                st[i].sort();
                ed[i].sort();
                for (var m = 0; m < st[i].length; m++) {
                    if (st[i][0] == '00:00' && ed[i][ed[i].length - 1] == '24:00') {
                        if (st[i].length > 1 && m + 1 < st[i].length) {
                            if (st[i][m + 1] != ed[i][m]) {
                                layer.msg('[计时计费] 所选时段有重叠 或 时段未完全覆盖"00:00"至"24:00"，请修改', {time: 2000, icon: 0});
                                return false
                            }
                        }
                    } else {
                        layer.msg('[计时计费] 所选时段未完全覆盖"00:00"至"24:00"，请修改', {time: 2000, icon: 0});
                        return false
                    }
                }
            }else {
                $scope.rule.types[i].intervals = [
                    {
                        startTime: null,
                        endTime: null,
                        price: null,
                        unit: null
                    }
                ];
                $scope.rule.types[i].intervalFreeMinutes=null;
                $scope.rule.types[i].intervalMaxAmount=null;
            }
            if($('#fieldFrequency' + i).attr("disabled")){
                $scope.rule.types[i].maxAmount=null
            }
            if($('#fieldLadder' + i).attr("disabled")){
                $scope.rule.types[i].ladders = [
                    {
                        span: null,
                        price: null,
                        unit: null
                    }, {
                        price: null,
                        unit: null
                    }
                ];
                $scope.rule.types[i].ladderFreeMinutes=null;
                $scope.rule.types[i].ladderMaxAmount=null;
            }
            if($('#intervalMinuId' + i).attr("disabled")){
                $scope.rule.types[i].intervalFreeMinutes=null
            }
            if($('#intervalMaxId' + i).attr("disabled")){
                $scope.rule.types[i].intervalMaxAmount=null
            }
            if($('#ladderMinuId' + i).attr("disabled")){
                $scope.rule.types[i].ladderFreeMinutes=null
            }
            if($('#ladderMaxId' + i).attr("disabled")){
                $scope.rule.types[i].ladderMaxAmount=null
            }
        }

        $http({
            method: 'POST',
            url: $rootScope.apiHome + ($scope.insert ? 'fee/rule' : 'fee/rule/edit'),
            data: $scope.rule
        }).success(function (data) {
            if (data.success) {
                layer.msg('保存成功', {time: 1000, icon: 1});
                $rootScope.jumpTo('feeManage')
            } else if (data.errorCode == "000001") {
                layer.msg('该规则名已存在，请重新命名', {time: 1000, icon: 0});
                $('input[name="name"]').focus()
            } else {
                layer.msg('保存失败', {time: 1000, icon: 5});
            }
        });
    };

    //初始化
    if ($scope.insert) {
        $scope.initRuleType();
        $scope.initTimePicker();
        $('#fieldFrequency0').ready(
            function () {
                $('#fieldFrequency0').attr('disabled', false);
                $('#fieldInterval0').attr('disabled', true);
                $('#fieldLadder0').attr('disabled', true);
            }
        );
    }

    //修改时，获取计费规则信息并填充
    if (!$scope.insert) {
        $http.get(
            $rootScope.apiHome + 'fee/rule/' + $scope.feeId
        ).success(function (data) {
            if (data.success) {
                $scope.rule.id = data.data.id;
                $scope.rule.name = data.data.name;
                $scope.rule.types = data.data.types;
                $scope.initTimePicker();
                for (var interT = 0; interT < $scope.rule.types.length; interT++) {
                    for (var wl = 0; wl < $scope.rule.types[interT].weeks.length; wl++) {
                        $scope.weekVal.push($scope.rule.types[interT].weeks[wl])
                    }
                    if ($scope.rule.types[interT].intervals) {
                        for (var inter = 0; inter < $scope.rule.types[interT].intervals.length; inter++) {
                            if ($scope.rule.types[interT].intervals[inter].endTime == '23:59') {
                                $scope.rule.types[interT].intervals[inter].endTime = '24:00'
                            }
                        }
                    } else {
                        $scope.rule.types[interT].intervals = [
                            {
                                startTime: null,
                                endTime: null,
                                price: null,
                                unit: null
                            }
                        ]
                    }
                    if(!$scope.rule.types[interT].ladders){
                        $scope.rule.types[interT].ladders = [
                            {
                                span: null,
                                price: null,
                                unit: null
                            }, {
                                price: null,
                                unit: null
                            }
                        ]
                    }
                }
                $scope.weekVal.indexOf(1)!=-1&&$scope.weekVal.indexOf(2)!=-1&&$scope.weekVal.indexOf(3)!=-1&&$scope.weekVal.indexOf(4)!=-1&&$scope.weekVal.indexOf(5)!=-1&&$scope.weekVal.indexOf(6)!=-1&&$scope.weekVal.indexOf(7)!=-1?$scope.notAdd=true:$scope.notAdd=false
            } else {
                layer.msg('服务器异常', {time: 1000, icon: 5})
            }
        });
    }
}]);


