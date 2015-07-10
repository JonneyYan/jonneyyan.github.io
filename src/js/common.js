$(document).ready(function(e) {
	//预先加载的图片资源
	var openBgMotion = false;
	var imgResource = ["bg_1.jpg", "bg_2.jpg", "download_active.png"];
	//
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

	var count = 1;
	var timer;
	loading();
	function loading () {
		timer = setTimeout(function(){
			$('.percent').text(count);
			loading();
		}, 500);
		if (count === 85) {
			clearTimeout(timer);
		}
		count += 1;
	}

	loadImage(imgResource, function(){		
		$('.percent').text("100");
		$(".onload").addClass("removeOnload");

		new PageSlide({
        pages: $('.page-wrap .page'),
	        // gestureFollowing: true,
	        onchange: function(i) {
	            ;
	        },
	        // dev: 1
	    });
		
		$(".page").first().addClass("bigShake");	    
	    setTimeout(function(){
			$(".page").first().removeClass("bigShake");
			$(".onload").remove();
			$(".page").first().addClass("moveToRight");
		}, 2000);

		setTimeout(function(){
			$(".page").first().removeClass("moveToRight");
			openBgMotion = true;
		}, 5000);
	});
	/***加载图片***/
	function loadImage(resource, callback){
		preloadImage(resource, function(percent){
			count = count > percent ? count : percent;
			if(percent == 100){
				clearTimeout(timer);
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
		var x = parseInt(Math.sin(event.gamma * Math.PI / 180) * 100);
		var y = parseInt(Math.sin(event.beta * Math.PI / 180) * 200);
		
		if (bufferX === 0 && bufferY === 0) {
			bufferX = x;
			bufferY = y;
		}else{
			beginX += x - bufferX;
			beginY += y - bufferY;

			if (beginX < 60 && beginX > -60 && beginY < 60 && beginY > -60){
				var offsetX,
					offsetY;
				for (var i = 0; i < imgs.length; ++i) {
					offsetX = beginX;
					offsetY = beginY;
					$(".current " + imgs[i]).css("-webkit-transform", "translate3d(" + offsetX + "px, 0, 0)");
				};			
			}else {
				beginX -= x - bufferX;
				beginY -= y - bufferY;
			}
			

			if (beginX < 20 && beginX > -20 && openBgMotion) {
				offsetX = 74 - beginX;
				$(".page:first-child").css("background-position-x", offsetX + "%");
				console.log($(".page:first-child").css("background-position-x"));
			} else{
				beginX -= x - bufferX;
				beginY -= y - bufferY;
			}
			bufferX = x;
			bufferY = y;
		}
	}
});
