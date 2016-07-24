/**
 * Created by a on 2015/12/7.
 */

//loading
loading();
function loading(){
    $(window).on('touchstart',function(){
            event.preventDefault()
        })
    var $bol = true;
    var $imgs = $("#loading").find("div img");
    var $timer = setInterval(function(){
        if($bol){
            $imgs.eq(1).show();
            $imgs.eq(0).hide();
            $bol = false;
        }else{
            $imgs.eq(0).show();
            $imgs.eq(1).hide();
            $bol = true;
        }
    },200)

    //计算loading
    var imgs = ["desk_01.png","weiye_01.png","weiye_02.png","weiye_03.png","weiye_04.png","bag.png","bailing_01.png","bailing_02.png","bailing_left.png","bailing_right.png","bg2.jpg","bg3.jpg","bg4.jpg","bg5.jpg","bg6.jpg","bg7.jpg","bg7_02.jpg","bg8.jpg","bg9.jpg","button_01.png","button_01down.png","button_02.png","button_02down.png","button_03.png","button_03down.png","button_04.png","button_04down.png","button_05.png","button_05down.png","button_06.png","button_06down.png","button_a.png","button_adown.png","button_b.png","button_bdown.png","button_c.png","button_cdown.png","chuanqi_01.png","chuanqi_02.png","duihua_01.png","duihua_02.png","duihua_03.png","duihua_04.png","hongdian_01.png","hongdian_02.png","hongdian_03.png","hongshou.png","jiantou_hong.png","jiantou_hong02.png","mi.png","pingmu.png","shou02.png","shoujiheshou.png","step1_bg.jpg","step3_bg.jpg","step3_bg1.jpg","step3_tit.png","step_dark.png","tiaowu_01.png","tiaowu_02.png","title_01.png","weiye_bg.jpg","wenzi_01.png","wenzi_02.png","wenzi_03.png","wupin_01.png","wupin_02.png","wupin_03.png","wupin_04.png","wupin_05.png","wupin_06.png","wupin_07.png","wupin_08.png","wupin_09.png","wupin_10.png","wupin_11.png","wupin_12.png","yuandian_01.png","yuandian_02.png"];
    loading(imgs,function(){
        $("#loading").fadeOut("slow",function(){
            $("#scene_one").show();
        });
        clearInterval($timer);
        scene_one();
        return;
    });


    function loading (aimg,fn) {
        var index = 0;
        for (var i = 0; i < aimg.length; i++) {
            var img = new Image();
            img.src = "images/"+aimg[i];
            img.onload = function  () {
                index++;
                var p = parseInt((index / aimg.length*100));
                $("#loading span").html(p);
                if (index==aimg.length) {
                    fn && fn();
                };
            }
        };
    }
}

//场景一
function scene_one(){
    var num = 0;
    //人物眨眼动画
    setTimeout(eyes,500)
    var $timeout;
    function eyes(){
        var bol = true;
        var $timer = setInterval(function(){
            if(bol) {
                $("#scene_one").find(".bailing").attr({src:"images/bailing_01.png"});
                bol = false;
            }else{
                $("#scene_one").find(".bailing").attr({src:"images/bailing_02.png"});
                bol = true;
                clearInterval($timer);
                $timeout = setTimeout(eyes,2000)
            }
        },500);
    }

    //对话浮现
    num++;
    $("#scene_one").find(".duihua"+num).fadeIn();
    var $timer1 = setInterval(function(){
        num++;
        $("#scene_one").find(".duihua"+num).fadeIn();
        if(num == 3){
            clearInterval($timer1);
        }
    },1500)

    //  给钱支付
    $("#pay").on("touchstart", function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_01down.png"});

    })
    $("#pay").on("touchend",function(){
        $("#scene_one").hide();
        $("#scene_two").show();
        scene_two();
        clearTimeout($timeout);
        $timeout = null;
    });

    $("#scene_one .shan").on("touchstart", function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_01down.png"});

    })
    $("#scene_one .shan").on("touchend",function(){
        $("#scene_one").hide();
        $("#scene_two").show();
        scene_two();
        clearTimeout($timeout);
        $timeout = null;
    });

}


//场景二

function scene_two(){
    var $oldY;
    var $newY;
    $(window).on("touchstart", function(e){
        event.preventDefault()
        $oldY = event.touches[0].clientY;
        $(window).on("touchmove", function(e){
            $newY = event.touches[0].clientY;

        })

    })
    $(window).on("touchend", function(e){
        if($newY<$oldY){
            $("#scene_two").hide();
            $("#scene_three").show();
            scene_three();
            $(this).off("touchstart")
            $(this).off("touchmove")
            $(this).off("touchend");
            $(window).on('touchstart',function(){
                event.preventDefault()
            })
            return;
        }
    })
}

//场景三
function scene_three(){
        var WinW = $(window).width();
        var WinH = $(window).height();
        var bol = true;
        var result = 1;
        var num = 1;
        var addbol = true;
        var $mid = $("#scene_three").find(".mid");
        var $left = $("#scene_three").find(".left");
        var $right = $("#scene_three").find(".right");
        //物品路径JSON
        var wupin = {
            mid:["wupin_02.png","wupin_05.png","wupin_08.png","wupin_11.png"],
            else:["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
        };

        addWupin("left",wupin.else,-0.487907*WinW,-0.2436053*WinH,700);

        //第一次中间物品初始
        addWupin("mid",wupin.mid,1,-0.432399512*WinH,1000);



        //生成随机路径
        function getSrc(arr,str){
            var $num = Math.floor(Math.random()*arr.length);
            var $src = str+arr[$num];
            arr.splice($num,1);
            return $src;
        }


        //判断向上滑动
        var $oldY
        var $newY
        var timer1 = setInterval(function(){
            if(num >= 3){
                addbol = false;
            }
        },20)
        var timer2 = setInterval(function(){
            num = 0;
            addbol = true;
        },1000)

    $("#bag").on("touchstart", function(e){
        event.preventDefault();
        $oldY = event.touches[0].clientY;
        $newY = event.touches[0].clientY;
        $("#bag").on("touchmove", function(e){
            event.preventDefault();
            $newY = event.touches[0].clientY;
        })
    })
    $("#bag").on("touchend", function(e){
        event.preventDefault();
        //判断向上滑动
        if($newY<$oldY){
            //如果addbol为假.停止增加,用于限制1s有效点击数为3
            if(addbol){
                result++;
                num++;
                //如果累计有效点击数15次
                if(result >= 15){
                    var chuanbol = true;
                    $mid.eq($mid.length-1).fadeOut()
                    $left.eq($left.length-1).fadeOut()
                    $right.eq($right.length-1).fadeOut();
                    clearInterval(timer1);
                    clearInterval(timer2);
                    $("#bag").off("touchstart")
                    $("#bag").off("touchmove")
                    $("#bag").off("touchend")
                    $("#scene_three #tips2").off("touchstart")
                    $("#scene_three #tips2").off("touchmove")
                    $("#scene_three #tips2").off("touchend")
                    $("#scene_three .text").hide();
                    $("#scene_three .tips2").hide();
                    $("#scene_three .bailing").hide();
                    $("#scene_three .chuanqi").show();
                    $("#scene_three .chuanqiBtn").show();
                    var timer3 = setInterval(function(){
                        if(chuanbol){
                            $("#scene_three .chuanqi").attr({src:"images/chuanqi_02.png"})
                            chuanbol = false;
                        }else{
                            $("#scene_three .chuanqi").attr({src:"images/chuanqi_01.png"})
                            chuanbol = true;
                        }
                    },800)
                }
            }

            //右边执行动画

            $mid.eq($mid.length-1).fadeOut();
            if(bol){
                if(wupin.else.length==0){
                    wupin.else = ["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
                }
                $("#scene_three .bailing").attr({src:"images/bailing_right.png"});
                addWupin("right",wupin.else,0.7838771*WinW,-0.3838771*WinW,700);
                bol = false;
            }else if(!bol){
                //左边执行动画
                if(wupin.else.length==0){
                    wupin.else = ["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
                }
                if(wupin.mid.length==0){
                    wupin.mid = ["wupin_02.png","wupin_05.png","wupin_08.png","wupin_11.png"];
                }
                $("#scene_three .bailing").attr({src:"images/bailing_left.png"});
                addWupin("left",wupin.else,-0.487907*WinW,-0.2436053*WinH,700);

                //中间执行动画
                addWupin("mid",wupin.mid,1,-0.432399512*WinH,1000);
                bol = true;
            }
        }
        $oldY = null;
        $newY = null;
    });


        $("#scene_three #tips2").on("touchstart", function(e){
            event.preventDefault();
            $oldY = event.touches[0].clientY;
            $newY = event.touches[0].clientY;
            $("#scene_three #tips2").on("touchmove", function(e){
                event.preventDefault();
                $newY = event.touches[0].clientY;
            })
        })
        $("#scene_three #tips2").on("touchend", function(e){
            event.preventDefault();
            //判断向上滑动
            if($newY<$oldY){
                //如果addbol为假.停止增加,用于限制1s有效点击数为3
                if(addbol){
                    result++;
                    num++;
                    //如果累计有效点击数15次
                    if(result >= 15){
                        var chuanbol = true;
                        var $mid = $("#scene_three").find(".mid")
                        $mid.eq($mid.length-1).fadeOut()
                        $left.eq($left.length-1).fadeOut()
                        $right.eq($right.length-1).fadeOut();
                        clearInterval(timer1);
                        clearInterval(timer2);
                        $("#scene_three #tips2").off("touchstart")
                        $("#scene_three #tips2").off("touchmove")
                        $("#scene_three #tips2").off("touchend")
                        $("#bag").off("touchstart")
                        $("#bag").off("touchmove")
                        $("#bag").off("touchend")
                        $("#scene_three .bailing").hide();
                        $("#scene_three .text").hide();
                        $("#scene_three .tips2").hide();
                        $("#scene_three .chuanqiBtn").show();
                        $("#scene_three .chuanqi").show();
                        var timer3 = setInterval(function(){
                            if(chuanbol){
                                $("#scene_three .chuanqi").attr({src:"images/chuanqi_02.png"})
                                chuanbol = false;
                            }else{
                                $("#scene_three .chuanqi").attr({src:"images/chuanqi_01.png"})
                                chuanbol = true;
                            }
                        },800)
                    }
                }

                //右边执行动画
                var $mid = $("#scene_three").find(".mid");
                $mid.eq($mid.length-1).fadeOut()
                if(bol){
                    if(wupin.else.length==0){
                        wupin.else = ["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
                    }
                    $("#scene_three .bailing").attr({src:"images/bailing_right.png"});
                    addWupin("right",wupin.else,0.7838771*WinW,-0.3838771*WinW,700);
                    bol = false;
                }else if(!bol){
                    //左边执行动画
                    if(wupin.else.length==0){
                        wupin.else = ["wupin_01.png","wupin_03.png","wupin_04.png","wupin_06.png","wupin_07.png","wupin_09.png","wupin_10.png","wupin_12.png"]
                    }
                    if(wupin.mid.length==0){
                        wupin.mid = ["wupin_02.png","wupin_05.png","wupin_08.png","wupin_11.png"];
                    }
                    $("#scene_three .bailing").attr({src:"images/bailing_left.png"});
                    addWupin("left",wupin.else,-0.487907*WinW,-0.2436053*WinH,700);

                    //中间执行动画
                    addWupin("mid",wupin.mid,1,-0.432399512*WinH,1000);
                    bol = true;
                }
            }
            $oldY = null;
            $newY = null;
        });

    function addWupin(direction,type,width,height,time){
        $("#scene_three").append("<img src="+getSrc(type,"images/")+" alt='' class=' wupin "+direction +"'/>");
        var $wupin = $("#scene_three").find("."+direction);
        var theWupin = $wupin.eq($wupin.length-1);
        theWupin.fadeIn()
        var thiswupin = new Parabola({
            el: $wupin.eq($wupin.length-1),
            offset: [width,height],
            curvature: 0.003,
            duration: time,
            callback: function () {
                theWupin.fadeOut();
            }
        });
        thiswupin.start();
    }



    $("#scene_three .btn1").on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_02down.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_02.png"});
            $("#scene_three").find("img").remove(".wupin")
            $("#scene_three").hide();
            $("#scene_three .chuanqiBtn").hide();
            $("#scene_three .chuanqi").hide();
            $("#scene_three .bailing").attr({src:"images/bailing_left.png"})
            $("#scene_three .bailing").show();
            $("#scene_three").show();
            $("#scene_three .text").show();
            $("#scene_three .tips2").show();
            scene_three();
            
            $(this).off("touchend");
        })
        $(this).off("touchstart");
    })
    $("#scene_three .btn2").on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_03down.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_03.png"});
            $("#choice").show();
            $("#bag").hide();
            choice();
        })
    })
}

//选择界面
function choice(){
    $btn = $("#choice .btn");
    $btn.eq(0).on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_adown.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_a.png"});
           $("#scene_three").hide();
            $("#choice_a").show();
            choice_a()
        })
    })
    $btn.eq(1).on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_bdown.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_b.png"})
            $("#scene_three").hide();
            $("#choice_b").show();
            choice_b()
            $("#wuqu").get(0).play()
            $("#wuqu").get(0).volume = 0;
            var volume = 0;
            var $timer = setInterval(function(){
                volume += 0.1;
                if (volume >= 1.0) {
                    clearInterval($timer);
                    return;
                };
                $("#wuqu").get(0).volume = volume;
            },250)
        })
    })
    $btn.eq(2).on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_cdown.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_c.png"})
            $("#scene_three").hide();
            $("#choice_c").show();
        })
    })
}

//选择一
function choice_a(){
    $("#choice_a a").on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_04down.png"});
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_04.png"});
            $("#scene_three").show();
            $("#choice_a").hide();
        })
    })
}
//选择二
function choice_b(){
   var bol = true;
   var $timer = setInterval(function(){
       if(bol){
           $("#choice_b .bailing").attr({src:"images/tiaowu_02.png"})
           bol = false;
       }else{
           $("#choice_b .bailing").attr({src:"images/tiaowu_01.png"})
           bol = true;
       }
   },750);

    $("#choice_b a").on("touchstart",function(){
        event.preventDefault()
        $(this).find("img").attr({src:"images/button_05down.png"})
        $(this).on("touchend",function(){
            $(this).find("img").attr({src:"images/button_05.png"})
            clearInterval($timer);
            $("#scene_three").show();
            $("#choice_b").hide();
            $("#wuqu").get(0).pause();
            $("#wuqu").get(0).currentTime=0;
        })
    })
}

//选择三
choice_c();
function choice_c(){
    $("#choice_c .shan").on("touchstart",function(){
        event.preventDefault()
        $(this).hide();
        $("#choice_c .light").fadeIn(mobileMove);
    })
}

//移动手机
function mobileMove(){
    setTimeout(function(){
        $("#choice_c").hide();
        $("#topay").show();
        $("#topay .mobile").on("touchstart",function(evt){
            event.preventDefault()
            var touch = evt.originalEvent.targetTouches[0];
            var $juliY = touch.pageY- $("#topay .mobile").position().top;
            $("#topay .mobile").on("touchmove",function(evt){
                var touch = evt.originalEvent.targetTouches[0];
                var $newY = touch.pageY;
                $(this).css({"top":$newY-$juliY});
                if($(window).height()*0.130146>$(this).position().top){
                    $("#bi").get(0).play()
                    put_pass();
                    $(this).off("touchmove");
                    setTimeout(function(){
                        $("#topay").hide();
                        $("#put_pass").show();
                    },1500)
                }
            });
        })
    },500)
}

//输入密码
function put_pass(){
    var $timer = setTimeout(function(){
            $("#put_pass").find(".tips").show();
            $("#put_pass").find(".shou").show();
            $(window).off("touchstart")
            $("#put_pass .queren").on("touchstart",function(){
                event.preventDefault()
                $("#put_pass .queren").find("img").attr({src:"images/button_06down.png"});
                $("#put_pass .queren").on("touchend",function(){
                    $("#put_pass").hide();
                    $("#weiye").show();
                    $("#put_pass .queren").find("img").attr({src:"images/button_06.png"});
                })
            })
            $("#put_pass .tips").on("touchstart",function(){
                event.preventDefault()
                $("#put_pass .queren").find("img").attr({src:"images/button_06down.png"});
                $("#put_pass .queren").on("touchend",function(){
                    $("#put_pass").hide();
                    $("#weiye").show();
                    $("#put_pass .queren").find("img").attr({src:"images/button_06.png"});
                })
            })
            $("#put_pass .shou").on("touchstart",function(){
                event.preventDefault()
                $("#put_pass .queren").find("img").attr({src:"images/button_06down.png"});
                $("#put_pass .queren").on("touchend",function(){
                    $("#put_pass").hide();
                    $("#weiye").show();
                    $("#put_pass .queren").find("img").attr({src:"images/button_06.png"});
                })
            })
    },3500)
}
