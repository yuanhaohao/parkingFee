$(document).ready(function () {
    $("#hx-list").children("li").each(function () {
        $(this).children('p').click(function () {
            console.log($(this).next("ul").length)
            $(this).css({"backgroundColor":"#1866b1","color":"#fff"}).parent().siblings().children("p").css({"backgroundColor":"#fcfcfc","color":"#000"})
            if($(this).next("ul").length == 0){
                $(this).parent().siblings().children("ul").hide();
                $(this).parent().siblings().find('li').css({'borderLeft':'11px solid #fcfcfc','backgroundColor':'#fcfcfc'})
            }
            if($(this).next("ul").css('display') == 'block'){$(this).next("ul").hide()}
            else{
                $(this).next("ul").show().parent().siblings().children("ul").hide();
                $(this).next("ul").show().parent().siblings().find('li').css({'borderLeft':'11px solid #fcfcfc','backgroundColor':'#fcfcfc'})
            }
        })
    })
    $("#hx-list").find('ul').children('li').each(function () {
        $(this).click(function () {
            $(this).css({'borderLeft':'11px solid #1866b1','backgroundColor':'#f4f4f4'}).siblings().css({'borderLeft':'11px solid #fcfcfc','backgroundColor':'#fcfcfc'})
        })
    })
    // layui.use('laydate', function(){
    //     var laydate = layui.laydate;
    //     var start = {
    //         max: laydate.now()
    //         ,istoday: false
    //         ,choose: function(datas){
    //             end.min = datas; //开始日选好后，重置结束日的最小日期
    //             end.start = datas //将结束日的初始值设定为开始日
    //         }
    //     };
    //     var end = {
    //         min:start.datas
    //         ,max:laydate.now()
    //         ,istoday: false
    //         ,choose: function(datas){
    //             start.max = datas; //结束日选好后，重置开始日的最大日期
    //         }
    //     };
    //     document.getElementById('startTime').onclick = function(){
    //         start.elem = this;
    //         laydate(start);
    //     }
    //     document.getElementById('endTime').onclick = function(){
    //         end.elem = this
    //         laydate(end);
    //     }
    // });
})