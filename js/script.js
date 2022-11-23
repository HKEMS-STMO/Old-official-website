if($.browser.mozilla||$.browser.opera){document.removeEventListener("DOMContentLoaded",$.ready,false);document.addEventListener("DOMContentLoaded",function(){$.ready()},false)}$.event.remove(window,"load",$.ready);$.event.add( window,"load",function(){$.ready()});$.extend({includeStates:{},include:function(url,callback,dependency){if(typeof callback!='function'&&!dependency){dependency=callback;callback=null}url=url.replace('\n','');$.includeStates[url]=false;var script=document.createElement('script');script.type='text/javascript';script.onload=function(){$.includeStates[url]=true;if(callback)callback.call(script)};script.onreadystatechange=function(){if(this.readyState!="complete"&&this.readyState!="loaded")return;$.includeStates[url]=true;if(callback)callback.call(script)};script.src=url;if(dependency){if(dependency.constructor!=Array)dependency=[dependency];setTimeout(function(){var valid=true;$.each(dependency,function(k,v){if(!v()){valid=false;return false}});if(valid)document.getElementsByTagName('head')[0].appendChild(script);else setTimeout(arguments.callee,10)},10)}else document.getElementsByTagName('head')[0].appendChild(script);return function(){return $.includeStates[url]}},readyOld:$.ready,ready:function(){if($.isReady) return;imReady=true;$.each($.includeStates,function(url,state){if(!state)return imReady=false});if(imReady){$.readyOld.apply($,arguments)}else{setTimeout(arguments.callee,10)}}});
 $.include('/js/slider1.js')
$.include('/js/easyTooltip.js')
 $.include('/js/jquery.colorbox.js')
$.include('/js/jcarousel.min.js')
/*======= Slider1 =======*/
$(function(){
		$('.slider')._slider1({
			prevBu:'.prev',
			nextBu:'.next',
			playBu:'.play',
			duration:888,
			easing:'none',
			preset:'diagonalExpand',
			pagination:true,
			slideshow:6000,
			numStatus:false,
			banners:false,
		
			progressBar:'<div class="progbar"></div>'})
})
/*======= Slider2 =======*/
$(function(){
		   
		   jQuery(window).load(function(){
			var interval;
			jQuery("#myRoundabout").roundabout({
				minOpacity:1,
				minScale:.4,
				duration:600,
				easing: 'easeOutBack',
				autoplay:3000,
				btnNext: '#next',
				btnPrev: '#previous'
			})
			.hover(
					function() {
						// oh no, it's the cops!
						clearInterval(interval);
					},
					function() {
						// false alarm: PARTY!
						interval = startAutoPlay();
					}
				);
			
			interval = startAutoPlay();
			
			function startAutoPlay() {
					return setInterval(function() {
						$('#myRoundabout').roundabout_animateToNextChild();
					}, 3000);
				}
			
			jQuery("#slider-inner").show();
		})
})
/*======= Success Stories =======*/
$(function(){
			jQuery(function(){
				jQuery('#testi-cycle').cycle({
					fx: 'scrollUp', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
					timeout: 8000,
					height: 'auto',
					prev:    '#prev-testi',
					next:    '#next-testi',
					pager:   '#nav-testi',
					pagerAnchorBuilder: pagerFactory
				});
				
				function pagerFactory(idx, slide) {
						var s = idx > 9 ? ' style="display:none"' : '';
						return '<li'+s+'><a href="#">'+(idx+1)+'</a></li>';
				};
			});
})
/*======= Zoom image =======*/ 

$(function() {
	// OPACITY OF BUTTON SET TO 50%
	$(".zoom").css("opacity","0");

	// ON MOUSE OVER
	$(".zoom").hover(function () {
	 
	// SET OPACITY TO 100%
	$(this).stop().animate({opacity:1}, 500);
	},
	 
	// ON MOUSE OUT
	function () {
	 
	// SET OPACITY BACK TO 50%
	$(this).stop().animate({opacity:0}, 500);
	});
});

$(function() {
	// OPACITY OF BUTTON SET TO 50%
	$("a.zoomer").css("opacity","1");

	// ON MOUSE OVER
	$("a.zoomer").hover(function () {
	 
	// SET OPACITY TO 100%
	$(this).stop().animate({opacity:0.6}, 500);
	},
	 
	// ON MOUSE OUT
	function () {
	 
	// SET OPACITY BACK TO 50%
	$(this).stop().animate({opacity:1}, 500);
	});
});

/*======= carousel =======*/ 
jQuery(document).ready(function() {
    jQuery('#mycarousel').jcarousel({
    	wrap: 'circular'
    });
});
/*======= colorbox =======*/ 
			$(document).ready(function(){
				//Examples of how to assign the ColorBox event to elements
				$(".group1").colorbox({rel:'group1'});
				$(".group2").colorbox({rel:'group2', transition:"fade"});
				$(".group3").colorbox({rel:'group3', transition:"none", width:"75%", height:"75%"});
				$(".group4").colorbox({rel:'group4', slideshow:true});
				$(".ajax").colorbox();
				$(".youtube").colorbox({iframe:true, innerWidth:425, innerHeight:344});
				$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
				$(".inline").colorbox({inline:true, width:"50%"});
				$(".callbacks").colorbox({
					onOpen:function(){ alert('onOpen: colorbox is about to open'); },
					onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
					onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
					onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
					onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
				});
				
				//Example of preserving a JavaScript event for inline calls.
				$("#click").click(function(){ 
					$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
					return false;
				});
			});
