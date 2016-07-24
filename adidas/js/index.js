 loading ()
  function loading () {
     var imgs = ["anglebaby.png","back.png","back_01.png","bg.jpg","bg_01.png","bglock.jpg","bottom.jpg","camera.png","loading.png","clip.jpg","ditu.jpg","hands.jpg","jt.png","left.png","logo.jpg","map.png","radiu.png","shouxing.jpg","shouxing.png","shuru.jpg","sliarrow.png","slide.png","time.png","video.jpg","video_bg.png","weico.png","weixinshipin.png","yaoqing.png","yonghu.jpg"];
     var index = 0;
     for (var i = 0; i < imgs.length; i++) {
       var img = new Image();
       img.src = "images/"+imgs[i];
       img.onload = function  () {
         index++;
         var p = parseInt((index / imgs.length*100))
         $("#loading span").html(p)
         
         if (index==imgs.length) {

            $("#loading").delay(800).fadeOut();
         };
       }
     };
  }

	 var swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        initialSlide :2,
        onSlideChangeStart: function(swiper){
          // console.log(swiper.activeIndex)
          if (swiper.activeIndex!=1) {
            $('.swiper-container').fadeOut(500,startFn);  

          };
        	 
        }
    });     
   function startFn () {
     var audio = $("#audio").get(0);
     var wrap=document.getElementById('wrap');
     var i=1;
     var bot=document.getElementById('bot');
     var key=document.getElementById('key');
     var want=document.getElementById('want');
     var noth=document.getElementById('noth');
     var mes=document.getElementById('mes');
     var notime=document.getElementById('notime');
     var h=document.documentElement.clientHeight;
     var video=document.getElementById('video');
     var videoWrap=document.getElementById('video_wrap');
     var back=document.getElementById('back');
     var s1=document.getElementById('s1');
     var s2=document.getElementById('s2');
     var yaoqing=document.getElementById('yaoqing');
     var invite=document.getElementById('invite')
     var backIn=document.getElementById('back_in')
     wrap.style.display="block";
     audio.play();
     //时间
     var timer=setInterval(function(){
       i++;
       if (i>=5) {
         clearInterval(timer);
         botFn();
       };
       wrap.children[i].style.display="block";
       audio.play();
       scrollFn();
     },1200)
     //底部点击弹出键盘
     function botFn(){
       bot.addEventListener("touchstart",function(e){
         if (e.touches.length==1) {
           key.style.display="block";
           wrap.style.paddingBottom="310px";
           bot.removeEventListener("touchstart",arguments.callee);
           scrollFn();
         };
       },false)
     }
     //点击我想来；
     want.addEventListener("touchstart",function(e){
       if (e.touches.length==1) {
         mes.style.display="block";
         key.style.display="none";
         wrap.style.paddingBottom="50px"
         timeFn(8);
         audio.play();
       };
       
     },false)
     //点击不想来
     noth.addEventListener("touchstart",function(e){
       if (e.touches.length==1) {
         notime.style.display="block";
         key.style.display="none";
         wrap.style.paddingBottom="50px"
         timeFn(7);
         audio.play();
       };
       
     },false)
     function timeFn(num){
       var i=num;
       var time=setInterval(function(){
         i++;
         if (i>=12) {
           clearInterval(time);
           //手型出现
           s1.style.display="block";
           s2.style.display="block";
           inviteFn();
         };
         wrap.children[i].style.display="block";
         scrollFn();
         audio.play();
       },800)

     }
     //滚到底部
     function scrollFn(){       
       var offsetH=wrap.offsetHeight;
       var scrollH=offsetH-h;
       document.body.scrollTop=scrollH;         
     }
     //点击视频
     video.addEventListener("touchstart",function(e){
       if (e.touches.length==1) {
         videoWrap.style.display="block";
       };
       
     },false)
     //点击返回
     back.addEventListener("touchstart",function(e){
       if (e.touches.length==1) {
         videoWrap.style.display="none";
       };
       
     },false)
     //点击邀请函
     function inviteFn(){
       yaoqing.addEventListener("touchstart",function(e){
         if (e.touches.length==1) {
          $(invite).fadeIn(555);  
         };
       
       },false)
       //点击返回
       backIn.addEventListener("touchstart",function(e){
         if (e.touches.length==1) {
           $(invite).fadeOut(555);  
           $(".shou").hide();
         };
       
       },false)
     }

      $(".vi").on("touchstart",function (e) {           
            $(".vi")[0].play();          
       })
      $("#back").on("touchstart",function (e) {           
            $(".vi")[0].pause();          
       })

   
   }