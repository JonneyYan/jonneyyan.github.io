$(document).ready(function(e) {
	var imgResource = ["bg_1.jpg", "bg_2.jpg", "bg_3.jpg", "bg_4.jpg"];
	var imgs = [
		"#p1-1",
		"#p1-2",
		"#p1-3",
		"#p1-4",
		"#p2-1",
		"#p2-2",
		"#p2-3",
		"#p2-4",
		"#p2-5",
		"#p2-6",
		"#p4-1",
		"#p4-2",
		"#p4-3",
		"#p4-4",
		"#p4-5",
		"#p4-6"
	];
	loadImage(imgResource, function(){		
		$(".onload").remove();

		new PageSlide({
        pages: $('.page-wrap .page'),
	        gestureFollowing: true,
	        onchange: function(i) {
	            ;
	        },
	        // dev: 2
	    });
	    $(".page").addClass("bigShake");
	    setTimeout(function(){
			$(".page").removeClass("bigShake");
		}, 800);
	});
	/***加载图片***/
	function loadImage(resource, callback){
		preloadImage(resource, function(percent){
			$('.percent').text(percent);
			if(percent == 100){
				callback();
			}
		});
	}


	/***预加载图片函数***/
	function preloadImage(imgs, callback){
		var count = imgs.length;
		var num = 0;
		callback(num);
		for(var i = 0; i < count; i++){
			var img = new Image();
			img.src = 'src/img/' + imgs[i];
			img.onload = function(){
				num++;
				callback(parseInt(num / count * 100));
			}
		}
	}

	var beginX = 0,
		beginY = 0,
		bufferX = 0,
		bufferY = 0;
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
		var x = parseInt(Math.sin(event.gamma * Math.PI / 180) * 20);
		var y = parseInt(Math.sin(event.beta * Math.PI / 180) * 50);
		
		if (bufferX === 0 && bufferY === 0) {
			bufferX = x;
			bufferY = y;
		}else{
			beginX += x - bufferX;
			beginY += y - bufferY;

			if (beginX < 20 && beginX > -20 && beginY < 20 && beginY > -20){
				var offsetX;
				for (var i = imgs.length - 1; i >= 0; i--) {
					offsetX = beginX + parseInt($(imgs[i]).css("left"));
					offsetY = beginY + parseInt($(imgs[i]).css("top"));
					$(imgs[i]).css("transform", "translate(" + offsetX + "px," + offsetY + "px)");
				};			
			}else {
				beginX -= x - bufferX;
				beginY -= y - bufferY;
			}
			bufferX = x;
			bufferY = y;
		}
	}
});
