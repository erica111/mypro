var $music = $("#music").find("audio");
var $musicBol = true;
$("#music").find("img").on("touchstart",function(){
	var $src=$("#music").find("img").attr("src");
	var $da=$("#music").find("img").attr("date");
	$("#music").find("img").attr("src",$da);
	$("#music").find("img").attr("date",$src);
    if(!$musicBol){
        $music.get(0).play();
        $musicBol = true;
    }else{
        $music.get(0).pause();
        $musicBol = false;
    }
});