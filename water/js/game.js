
var indexs = window.location.search.split("=")[1];
game(indexs);
var $deg = 5;
function game(index){
    var $bol = true;
    var $num = 0;
    $("#peo").find(".head").attr({src:"images/game/peo"+index+"_head.png"});
    $("#peo").find(".body").attr({src:"images/game/peo"+index+"_body.png"});
    $("#head").on("touchstart",function(){
        if (event.touches.length==1) {
            $("#hand").css({display:"none"});
            $num++;
            $deg*=-1;
            $("#peo").find(".head").css({"transform":"rotate("+$deg+"deg)"});
            setTimeout(
                function(){
                    $("#peo").find(".head").css({"transform":"rotate(0deg)"});
                },50);
            if($bol){
                $("#foot").find(".cp_logo").attr({src:"images/game/product.gif"});
                $bol =false;
                gametime()
            }
        }
    });

    $("#hand").on("touchstart",function(){
        if (event.touches.length==1) {
            $("#hand").css({display:"none"});
            $num++;
            $deg*=-1;
            $("#peo").find(".head").css({"transform":"rotate("+$deg+"deg)"});
            setTimeout(
                function(){
                    $("#peo").find(".head").css({"transform":"rotate(0deg)"});
                },50);
            if($bol){
                $("#foot").find(".cp_logo").attr({src:"images/game/product.gif"});
                $bol =false;
                gametime()
            }
        }
    });
$("#peo").on("touchstart", function (ev){
	ev.preventDefault();
});

    //ÓÎÏ·Ê±¼ä
    function gametime(){
            var $times = 20;
            var $nums = $times.toFixed(2);
            var $timeshow = $("#time");
            var $secondshow = $("#second");
            var $timer = setInterval(
                function(){
                    $nums-=0.02;
                    var $thetime =　$nums.toFixed(2);
                    var $timearr = $thetime.toString().split(".");
                    if($nums<10){

                        if($nums.toFixed(2) == 0.00){
                            $timeshow.text(0);
                            $secondshow.text("00");
                            clearInterval($timer);
                            $("#head").unbind("click");
                            $("#game").css({display:"none"});
                            $("#result").css({display:"block"});
                            getresul($num);
                        }
                        $timeshow.text("0"+$timearr[0]);
                        $secondshow.text($timearr[1]);
                        if($nums.toFixed(2) == 5.00){
                            $("#peo").find(".biao1 img").toggleClass("img4",true).attr({src:"images/game/biao151.png"});
                            $("#peo").find(".biao2 img").toggleClass("img4",true).attr({src:"images/game/biao152.png"});
                          
                            $("#chat").find("img").attr({src:"images/game/chat3.png"}).toggleClass("chat3",true);
                        }
                    }else if($nums<20){
                        if($nums.toFixed(2) == 10.00){
                            $("#peo").find(".biao1 img").toggleClass("img3",true).attr({src:"images/game/biao101.png"});
                            $("#peo").find(".biao2 img").toggleClass("img3",true).attr({src:"images/game/biao102.png"});
                            $("#chat").find("img").attr({src:"images/game/chat2.png"}).toggleClass("chat2",true);
                        }
                        if($nums.toFixed(2) == 15.00){
                            $("#peo").find(".biao1 img").toggleClass("img2",true).attr({src:"images/game/biao51.png"});
                            $("#peo").find(".biao2 img").toggleClass("img2",true).attr({src:"images/game/biao52.png"});
                              $("#chat").find("img").attr({src:"images/game/chat1.png"}).toggleClass("chat1",true);
                        }
                        $timeshow.text($timearr[0]);
                        $secondshow.text($timearr[1]);
                    }
                },20)
        }
}

//ÓÎÏ·½á¹û
function getresul(num) {
    var names = ["吕绍聪","佟梦实","邵明明","袁雨萱","宋妍霏","刑菲","左溢","赵顺然","史文翔","葛洧吟","程星源","高旻睿","万国鹏","张予曦"];
    $("#theName").text(names[indexs]);
    var nums = num;
    var $result = $("#r_score");
    var $result_m = $("#result_m").find(".result_con");
    var $result_b = $("#result_b").find("img");
    if (nums < 100) {
        $result_m.eq(0).show();
        $result_b.eq(0).show();
    } else if (nums < 110) {
        $result_m.eq(1).show();
        $result_b.eq(1).show();
    } else {
        $result_m.eq(2).show();
        $result_b.eq(2).show();
    }
    function result(nums) {
        var arr = nums.toString().split("");
        $result.css({width: arr.length * 22 + "%"});
        for (var i = 0; i < arr.length; i++) {
            $result.append("<img src='images/game/" + arr[i] + ".png'/>");
        }
        $result.find("img").css({width: 100 / arr.length + "%"});
        // $("#music").hide();
        $("#bot").on("touchstart", function () {
            if (event.touches.length == 1) {
                // $("#music").show();
                $("#result").css({display: "none"});
                $("#lottery").css({display: "block"}).find("#submitBtn").css({"animation": "flash 1s",
                "-webkit-animation": "flash 1s"})
            }
        });
    }
    result(nums);

    /*手机检测开始*/

  function checkPhone(tel) {

    if ( /^13\d{9}$/g.test(tel) || /^14\d{9}$/g.test(tel) || /^15\d{9}$/g.test(tel) || /^17\d{9}$/g.test(tel) || /^18\d{9}$/g.test(tel)){

      return true;

    }else{

      return false;

    }

  }


//Ìá½»

    $("#submitBtn").on("touchend", function () {
        // alert(1);
		var tel = $('#phone').val();
        if(checkPhone(tel)){
            $.post("http://wetcode.hooyeah.cn/water/include/index.php",{"phone":tel},function(data){
                    //alert(data);
                    //if(data[0]==2){
                    //window.location.href="http://www.wst-media.cn/spacehome/gift/redpacket1.php";
                    //}else{
                    //  alert('¸ÃºÅÂëÊ¹ÓÃ£¡');
                    //}
                     $("#lottery").css({display: "none"});
                    $("#share").css({display: "block"});
                    sendWeixin('水密码《一年级》鲜肉鲜花喊你来补水啦！','你为他们的肌肤补补水，他们就会把最美的青春给你哦~任你抱着睡亲亲脸......',"http://wechat.palm-h.com/game/waters/index.html",function(){
                        // alert(11);
                        window.location.href="http://wetcode.hooyeah.cn/water/b_share.php";

                    });
                        
                });
        }else{
            alert("请输入正确的手机号码");
        }
		
		
        // if (event.touches.length == 1) {
        //     $("#lottery").css({display: "none"});
        //     $("#share").css({display: "block"});
        // }
    });

//·¢½±ÏêÏ¸
    $("#awardRule").on("touchstart", function () {
        if (event.touches.length == 1) {
            $("#lottery").css({display: "none"});
            $("#award_bg").css({display: "block"});
        }
    });

//¹Ø±Õ·¢½±ÏêÏ¸
    $("#award_close").on("touchstart", function () {
        if (event.touches.length == 1) {
            $("#lottery").css({display: "block"});
            $("#award_bg").css({display: "none"});
        }
    })
}
//
//$(document).on("touchstart", function (ev){
//    ev.preventDefault();
//})
