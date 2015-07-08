$(document).ready(function(e) {
	var beginX,
		beginY;
	/***设备选择提示***/
	$(function(){
		var bd = $(document.body);
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', _orientationchange, false);
		function _orientationchange() {
			scrollTo(0, 1);
			switch(window.orientation){
				case 0:		//横屏			
					break;
				case 180:	//横屏
					break;
				case -90: 	//竖屏
					alert("请竖屏查看页面，效果更佳。");
					break;
				case 90: 	//竖屏
					alert("请竖屏查看页面，效果更佳。");
					break;
			}
		}
		$(window).on('load',_orientationchange);
	});

	/***添加视察效果***/
	window.addEventListener("deviceorientation", motion);

	/******背景移动******/
	function motion(event){
		var x = Math.sin(event.gamma * Math.PI / 180) * 20;
		var y = Math.sin(event.beta * Math.PI / 180) * 20;
		beginX = x - beginX;
		beginY = y - beginY;
		$(".shift").each(function() {
			var left = $(this).css("left");
			$(this).css("left", left + "px");
		});
		$("#aris-x").html(beginX);
		$("#aris-y").html(beginY);
	}
});
