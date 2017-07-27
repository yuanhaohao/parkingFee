platform.controller('index', ['$rootScope', '$location','$http', function ($rootScope, $location, $http) {

    // $rootScope.apiHome = "http://180.101.230.154:18080/smartparking/";
    // $rootScope.apiHome = "http://192.168.1.128:8080/smartparking/";
    $rootScope.apiHome = "http://192.168.1.31:18080/smartparking/";

    /*跳转页面*/
    $rootScope.jumpTo = function (url) {
        $location.path(url)
    };

    //删除数组中的指定元素
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    //获取数组中含有指定元素的个数
    Array.prototype.getNumOf = function (ele) {
        var results=[],len=this.length;
        for(var i=0;i<len;i++){
            if(this[i]==ele){
                results.push(i)
            }
        }
        return results.length
    };

    //获取所有片区名
    $rootScope.getAllArea=function () {
        if( sessionStorage.getItem("tokenId") == null){
            window.location.href="login.html"
        }else{
            $http.get(
                $rootScope.apiHome + 'parkLot/map'
            ).success(function (data) {
                $rootScope.areas = data.data;
                $rootScope.areaValue = [];//片区名
                for (var i = 0; i < $rootScope.areas.length; i++) {
                    $rootScope.areaValue.push($rootScope.areas[i].value)
                }
            });
        }

    };
    //初始化片区下拉列表
    $rootScope.getAllArea();

    // 停车时长
    $rootScope.duration = function (data) {
        var days = data / 1000 / 60 / 60 / 24;
        var daysRound = Math.floor(days);
        var hours = data / 1000 / 60 / 60 - (24 * daysRound);
        var hoursRound = Math.floor(hours);
        var minutes = data / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
        var minutesRound = Math.floor(minutes);
        var seconds = data / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
        if (daysRound > 0) {
            return daysRound + "天" + hoursRound + "时" + minutesRound + "分" + seconds + "秒"
        }
        if (hoursRound > 0) {
            return hoursRound + "时" + minutesRound + "分" + seconds + "秒"
        }
        if (minutesRound > 0) {
            return minutesRound + "分" + seconds + "秒"
        }
        if (seconds > 0) {
            return seconds + "秒"
        }
        else {
            return ""
        }
    };
    // 支付方式
    $rootScope.pay = function (data) {
        if (data == 1) {
            return "微信"
        }
        if (data == 2) {
            return "支付宝"
        }
        if (data == 3) {
            return "银联支付"
        }
    };
    // 日期转化
    $rootScope.date = function (data) {
        if( data == null){ return ""}
        else{
            var date = new Date(data);
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
    };

    $rootScope.userName = sessionStorage.getItem("uesrName")
    gout = function () {
     if( ($("select").find("option:selected").val()) == 1){
         $rootScope.userName = '未登录'
         sessionStorage.removeItem('tokenId')

         window.location.href="login.html"
     }
    }


    //*****输入框自动扩展输入*****//
    var inputVlaue;
    var div,ul;
    var index = -1;

    function init(id) {
        var $ele = $("#" + id);
        inputVlaue = $ele.find("input")[0];
        div = $ele.find("div")[0];
        ul = $ele.find("ul")[0];
    }

    function updateBg() {
        for (var i = 0; i < ul.getElementsByTagName('li').length; i++) {
            ul.getElementsByTagName('li')[i].className = "clear";
        }
    }

    $rootScope.startMatch = function (event, id, waitArray) {
        event = event || window.event;//兼容IE
        if (event.keyCode == 40) {//如果按了down键
            index = index + 1;
            //如果“提示”列表已经显示,则把焦点切换到列表中的第一个数据项上
            if (index == ul.getElementsByTagName('li').length) {
                index = 0;
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            } else {
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            }
            return false;
        }
        //如果按了up键
        else if (event.keyCode == 38) {
            index = index - 1;
            //如果“提示”列表已经显示,则把焦点切换到列表中的最后一个数据项上
            if (index == -2) {
                index = 0;
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            } else if (index == -1) {
                index = ul.getElementsByTagName('li').length - 1;
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            } else {
                updateBg();
                ul.getElementsByTagName('li')[index].className = "over";
                inputVlaue.value = ul.getElementsByTagName('li')[index].innerHTML;
            }
            return false;
        } else if (event.keyCode == 13) {
            return false;
        } else {
            index = -1;
            init(id);
            if (inputVlaue.value.length > 0) {
                var currMatch = [];
                for (var i = 0; i < waitArray.length; i++) {
                    if (waitArray[i].indexOf(inputVlaue.value) >= 0) {
                        currMatch.push(waitArray[i]);
                    }
                }
                /*设置显示*/
                if (currMatch.length > 0) {
                    setField(currMatch);
                } else {
                    clearField();
                }
            } else {
                clearField();
            }
        }
    };

    $rootScope.showAll = function (event,id, waitArray) {
        index = -1;
        init(id);
        var currMatch = waitArray;
        /*设置显示*/
        if (currMatch.length > 0) {
            setField(currMatch);
        } else {
            clearField();
        }
        (event || window.event).cancelBubble = true
    };
    document.onclick=function () {
        if(ul){
            clearField()
        }
    };
    /*清空*/
    function clearField() {
        for (var i = ul.childNodes.length - 1; i >= 0; i--) {
            ul.removeChild(ul.childNodes[i]);
        }
        div.className = "hide";
    }

    /*设置显示*/
    function setField(currMatch) {
        clearField();
        div.className = "show";
        var oLi;
        for (var i = 0; i < currMatch.length; i++) {
            oLi = document.createElement("li");
            ul.appendChild(oLi);
            oLi.appendChild(document.createTextNode(currMatch[i]));
            oLi.onmousemove = function () {
                updateBg();
                this.className = "mouseover";
            };
            oLi.onmouseout = function () {
                updateBg();
                this.className = "mouseout";
            };
            oLi.onclick = function () {
                inputVlaue.value = this.firstChild.nodeValue;
                clearField();
            }
        }
    }
    //*****/.输入框自动扩展输入end*****//
    
}]);

Array.prototype.indexOf = function (value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function (value) {
    var index = this.indexOf(value);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//json化
(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
})(jQuery);