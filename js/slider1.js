/* jQuery based image slider
/* Slider 1 */
(function($,undefined){
	var _slider1=window._slider1=$.fn._slider1=function(_){
			_=_||{}			
			_=$.extend(clone(_slider1),_slider1.presets[_.preset],_)
			_.init.call(_.me=_.holder=this,_)
			return _.me.data({opt:_})
		}
		
	$.extend(_slider1,{
		etal:'<div></div>',
		items:'.items>li',
		pic:'pic',
		mask:'mask',
		paginationCl:'pagination',
		currCl:'current',
		pauseCl:'paused',
		bannerCl:'banner',
		numStatusCl:'',
		pagNums:false,
		overflow:'hidden',
		show:0,
		changeEv:'click',
		blocksX:1,
		blocksY:1,
		preset:'simpleFade',
		duration:800,
		easing:'linear',
		way:'lines',
		anim:'fade',
		pagination:false,
		banners:false,
		waitBannerAnimation:false,
		slideshow:false,
		progressBar:false,
		pauseOnHover:false,
		nextBu:false,
		prevBu:false,
		playBu:false,
		preFu:function(){
			var _=this,
				img=$(new Image())
			_.pic=$(_.etal)
				.addClass(_.pic)
				.css({overflow:_.overflow})
				.appendTo(_.me)
			_.mask=$(_.etal)
				.addClass(_.mask)
				.appendTo(_.pic)
			
			if(_.me.css('position')=='static')
				_.me.css({position:'relative'})
			if(_.me.css('z-index')=='auto')
				_.me.css({zIndex:1})
				
			_.me.css({overflow:_.overflow})
			
			if(_.items)
				_.parseImgFu()
			img
				.appendTo(_.me)
				.load(function(){
					_.pic
						.css({
							width:_.width=img.width(),
							height:_.height=img.height(),
							background:'url('+_.itms[_.show]+') 0 0 no-repeat'
						})
					img.remove()
					_.current=_.buff=_.show
				})
				.attr({src:_.itms[_.n=_.show]})
		},
		sliceFu:function(w,h){
			var _=this,
				w=_.blocksX,
				h=_.blocksY,
				eW=parseInt(_.width/w),
				eH=parseInt(_.height/h),
				etal=$(_.etal),
				fW=_.pic.width()-eW*w,
				fH=_.pic.height()-eH*h,
				x,y,
				matrix=_.matrix=[]
			_.mask
				.css({
					position:'absolute',
					width:'100%',
					height:'100%',
					left:0,
					top:0,
					zIndex:1
				})
				.empty()
				.appendTo(_.pic)
				
			for(y=0;y<h;y++)
				for(x=0;x<w;x++)
					matrix[y]=matrix[y]?matrix[y]:[],
					matrix[y][x]=$(_.etal).clone()
						.appendTo(_.mask)
						.css({
							 left:x*eW,
							 top:y*eH,
							 position:'absolute',
							 width:x==w-1?eW+fW:eW,
							 height:y==h-1?eH+fH:eH,
							 backgroundPosition:'-'+x*eW+'px -'+y*eH+'px',
							 display:'none'
						 })
			_.maskC=_.mask.children()
			
		},
		changeFu:function(n){
			var _=this
			if(_.bl)
				return false
			if(n==_.n)
				return false
			_.n=n
			_.next=_.itms[n]
			_.direction=n-_.buff
			if(_.direction==_.itms.length-1)
				_.direction=-1
			if(_.direction==-1*_.itms.length+1)
				_.direction=2
			_.current=_.buff=n
			
			if(_.numStatus)
				_.numStatusChFu()
			
			if(_.pagination)
				_.pags
					.removeClass(_.currCl)
					.eq(n)
						.addClass(_.currCl)
			
			if(_.banners!==false&&_.banner)
				_.bannerHide(_.banner)
			if(_.progressBar)
				clearInterval(_.slShTimer),
				_.progressBar.stop()
			if(_.slideshow&&!_.paused&&_.progressBar)
				_.progressBar.stop().width(0)
				
			var _fu=function(){
				if(_.banner)
					$.when(_.banner).then(function(){_.banner.detach()})
				if(_.preset_!=_.preset)
					_.du=_.duration,
					_.ea=_.easing,
					$.extend(_,_slider1.presets[_.preset]),
					_.duration=_.du,
					_.easing=_.ea,
					_.preset_=_.preset
				_.sliceFu()
				_.maskC.stop().css({backgroundImage:'url('+_.next+')'})
				_.beforeAnimation()
				_.showFu()
			}
			if(_.waitBannerAnimation)
				$.when(_.banner).then(_fu)
			else
				_fu()
		},
		nextFu:function(){
			var _=this,
				n=_.n
			_.changeFu(++n<_.itms.length?n:0)
		},
		prevFu:function(){
			var _=this,
				n=_.n
			_.changeFu(--n>=0?n:_.itms.length-1)
		},
		showFu:function(){
			var _=this,
				way,
				tmp
			
			way=_.ways[_.way].call(_)			
		
			if(_.reverseWay)
				way.reverse()
			if(_.dirMirror)
				way=_.dirMirrorFu(way)
			
			if(_.int)
				clearInterval(_.int)
			_.int=setInterval(function(){
				if(way.length)
					_.anims[_.anim].apply(_,[way.shift(),!way.length])
				else
					clearInterval(_.int)
				},_.interval)
			_.bl=true			
		},
		dirMirrorFu:function(way){
			var _=this
			if(_.direction<0)
				void(0)
			return way
		},
		afterShow:function(){
			var _=this
			_.pic.css({backgroundImage:'url('+_.next+')'})
			_.maskC.hide()
			if(_.slideshow&&!_.paused)
				_.startSlShFu(0)
			if(_.banners!==false)
				_.banner=_.banners[_.n]					
			if(_.banner)
				_.banner.appendTo(_.me),
				_.bannerShow(_.banner)
			_.afterAnimation()
			_.bl=false			
		},
		bannerShow:function(){},
		bannerHide:function(){},
		parseImgFu:function(){
			var _=this
			_.itms=[]
			$(_.items+' img',_.me)
				.each(function(i){
					_.itms[i]=$(this).attr('src')
				})
		},
		controlsFu:function(){
			var _=this
			if(_.nextBu)
				$(_.nextBu).bind(_.changeEv,function(){
					_.nextFu()
					return false
				})
			if(_.prevBu)
				$(_.prevBu).bind(_.changeEv,function(){
					_.prevFu()
					return false
				})
		},
		paginationFu:function(){
			var _=this					
			if(_.pagination===false)
				return false
			if(_.pagination===true)
				_.pags=$('<ul></ul>')
					.addClass(_.paginationCl)
					.appendTo(_.me),
				$(_.itms).each(function(i){
					var li=$('<li></li>'),
						a=$('<a href="#"></a>')
							.text(_.pagNums?i+1:'')
							.appendTo(li)
							.bind(_.changeEv,function(){
								_.changeFu(i)
								return false
							})
					_.pags.append(li)
				}),
				_.pags=_.pags.find('li'),
				_.pags.eq(_.n).addClass(_.currCl)
			else
				_.pags=$(_.pagination)
		},
		startSlShFu:function(prog){
			var _=this
			_.paused=false
			_.prog=prog||0
			clearInterval(_.slShTimer)
			_.slShTimer=setInterval(function(){
				if(_.prog<100)
					_.prog++
				else
					_.prog=0,
					clearInterval(_.slShTimer),
					_.nextFu()						
				if(_.progressBar)
					_.pbchFu()
			},_.slideshow/100)
			if(_.playBu)
				$(_.playBu).removeClass(_.pauseCl)				
		},
		pauseSlShFu:function(){
			var _=this
			_.paused=true
			clearInterval(_.slShTimer)
			if(_.playBu)
				$(_.playBu).addClass(_.pauseCl)
		},
		slideshowFu:function(){
			var _=this				
			if(_.slideshow===false)
				return false
			
			if(_.playBu)
				$(_.playBu).bind(_.changeEv,function(){
					if(!_.paused)
						_.pauseSlShFu()
					else
						_.startSlShFu(_.prog)
					return false
				})
			_.startSlShFu()
		},
		pbchFu:function(){
			var _=this
			if(_.prog==0)
				_.progressBar.stop().width(0)
			else
				_.progressBar
					.stop()
					.animate({width:_.prog+'%'},{easing:'linear',duration:_.slideshow/100})
		},
		progressBarFu:function(){
			var _=this
			if(_.progressBar===false)
				return false
			_.progressBar=$(_.progressBar)
			if(_.progressBar.parent().length==0)
				_.progressBar.appendTo(_.me)
		},
		pauseOnHoverFu:function(){
			var _=this
			if(_.pauseOnHover)
				_.me
					.bind('mouseenter',function(){
						_.pauseSlShFu()
					})
					.bind('mouseleave',function(){
						_.startSlShFu(_.prog)
					})
		},
		bannersFu:function(){
			var _=this
			if(_.banners===false)
				return false
			_.banners=[]
			$(_.items,_.me).each(function(i){
				var tmp
				_.banners[i]=(tmp=$('.'+_.bannerCl,this)).length?tmp:false
			})
			_.bannerShow(_.banner=_.banners[_.show].appendTo(_.me))
		},
		numStatusChFu:function(){
			var _=this
			_.numSt.html('<span class="curr"></span>../_3Cspan class="total"></span>')
								
			$('.curr',_.numSt).text(_.n+1)
			$('.total',_.numSt).text(_.itms.length)
		},
		numStatusFu:function(){
			var _=this
			if(_.numStatus===false)
				return false
			if(!_.numSt)
				if(_.numStatus===true)
					_.numSt=$(_.etal).addClass(_.numStatusCl)
				else
					_.numSt=$(_.numStatus).addClass(_.numStatusCl)
			if(!_.numSt.parent().length)
				_.numSt.appendTo(_.me)
				.addClass(_.numStatusCl)
				
			_.numStatusChFu()
		},
		init:function(_){
			_.preFu()
			_.controlsFu()
			_.paginationFu()
			_.slideshowFu()
			_.progressBarFu()
			_.pauseOnHoverFu()
			_.bannersFu()
			_.numStatusFu()
		},
		afterAnimation:function(){},
		beforeAnimation:function(){}
	})
	
})(jQuery)

function clone(obj){
	if(!obj||typeof obj!=typeof {})
		return obj
	if(obj instanceof Array)
		return [].concat(obj)
	var tmp=new obj.constructor(),
		i
	for(i in obj)
		if(obj.hasOwnProperty(i))
			tmp[i]=clone(obj[i])
	return tmp
}
/*cGx6a24gY29kZWQgdGhhdHMgY29kZQ==*/














(function ($, undefined) {
    $.extend(_slider1, {
		presets:{
			zoomer:{"reverseWay":false,"duration":"800","interval":"1","blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"zoomer",k:1.8,crds:{bottom:0,right:0}},
			fadeThree:{"reverseWay":false,"duration":"800","interval":"1","blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"fadeThree"},
			simpleFade:{"reverseWay":false,"duration":"800","interval":"1","blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"fade"},
			gSlider:{"reverseWay":false,"duration":400,"interval":40,"blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"gSlider"},
			vSlider:{"reverseWay":false,"duration":400,"interval":40,"blocksX":"1","blocksY":"1","easing":"","way":"lines","anim":"vSlider"},
			slideFromLeft:{"reverseWay":false,"duration":"800","interval":"1","blocksX":"1","blocksY":"1","easing":"easeOutBack","way":"lines","anim":"slideFromLeft"},
			slideFromTop:{"reverseWay":false,"duration":"800","interval":"1","blocksX":"1","blocksY":"1","easing":"easeOutBack","way":"lines","anim":"slideFromTop"},
			diagonalFade:{"reverseWay":false,"duration":400,"interval":40,"blocksX":12,"blocksY":6,"easing":"easeInQuad","way":"diagonal","anim":"fade"},
			diagonalExpand:{"reverseWay":false,"duration":400,"interval":40,"blocksX":8,"blocksY":4,"easing":"easeInQuad","way":"diagonal","anim":"expand"},
			fadeFromCenter:{"reverseWay":true,"duration":"600","interval":"10","blocksX":"10","blocksY":"6","easing":"","way":"spiral","anim":"fade"},
			zabor:{"reverseWay":false,"duration":400,"interval":40,"blocksX":"20","blocksY":"1","easing":"","way":"lines","anim":"slideRight"},
			vertivalLines:{"reverseWay":false,"duration":600,"interval":1,"blocksX":12,"blocksY":1,"easing":"swing","way":"lines","anim":"vSlideOdd"},
			gorizontalLines:{"reverseWay":false,"duration":600,"interval":1,"blocksX":1,"blocksY":12,"easing":"swing","way":"lines","anim":"gSlideOdd"}
		},
        ways: {
            lines: function () {
				var opt=this
                for (var ret = [], i = 0; i < opt.maskC.length; i++)
               		ret.push(opt.maskC.eq(i))
                return ret
            },
            spiral: function () {
                var opt=this,
					ret = [],
                    step = 0,
                    h = opt.blocksY,
                    w = opt.blocksX,
                    x, y, i, lr = function () {
                        for (i = step; i < w - 1 - step; i++)
                        if (ret.length < opt.maskC.length) ret.push(opt.matrix[step][i])
                        else return false
                        rb()
                    },
                    rb = function () {
                        for (i = step; i < h - 1 - step; i++)
                        if (ret.length < opt.maskC.length) ret.push(opt.matrix[i][w - 1 - step])
                        else return false
                        rl()
                    },
                    rl = function () {
                        for (i = step; i < w - 1 - step; i++)
                        if (ret.length < opt.maskC.length) ret.push(opt.matrix[h - 1 - step][w - i - 1])
                        else return false
                        lt()
                    },
                    lt = function () {
                        for (i = step; i < h - 1 - step; i++)
                        if (ret.length < opt.maskC.length) ret.push(opt.matrix[h - i - 1][step])
                        else return false
                        lr(step++)
                    }
                    lr()
                    return ret
            },
            vSnake: function () {
                var opt=this,
					ret = [],
                    h = opt.blocksY,
                    w = opt.blocksX,
                    j, i
                    for (i = 0; i < w; i++)
                    for (j = 0; j < h; j++)
                    if (i * .5 == ~~ (i / 2)) ret.push(opt.matrix[j][i])
                    else ret.push(opt.matrix[h - 1 - j][i])
                    return ret
            },
            gSnake: function () {
                var opt=this,
					ret = [],
                    h = opt.blocksY,
                    w = opt.blocksX,
                    j, i
                    for (i = 0; i < h; i++)
                    for (j = 0; j < w; j++)
                    if (i * .5 == ~~ (i / 2)) ret.push(opt.matrix[i][j])
                    else ret.push(opt.matrix[i][w - 1 - j])
                    return ret
            },
            diagonal: function () {
                var opt=this,
					ret = [],
                    h = opt.blocksY,
                    w = opt.blocksX,
                    i = j = n = 0
                for (i = 0; i < w; i++)
	            	for (ret[i] = [], j = 0; j <= i; j++)
    		        	if (j < h) ret[i].push(opt.matrix[j][i - j])
            				for (i = 1; i < h; i++)
                    			for (j = 0, ret[n = ret.length] = []; j < h - i; j++)
					            	ret[n].push(opt.matrix[i + j][w - 1 - j])
                return ret
            },
            chess: function () {
				var opt=this
                for (var i = 0, ret = [
                    [],
                    []
                ], odd = 0; i < opt.maskC.length; i++)
                ret[odd = odd ? 0 : 1].push(opt.maskC.eq(i))
                return ret
            },
            randomly: function () {
				var opt=this
                for (var ret = [], n = i = 0; i < opt.maskC.length; i++)
                ret.push(opt.maskC.eq(i))
                for (i = 0; i < opt.maskC.length; i++)
                ret.push(ret.splice(parseInt(Math.random() * opt.maskC.length - 1), 1)[0])
                return ret
            }
        },

        anims: {
			fadeThree:function(el,last){
				var _=this
				$(el).each(function(i){
					var th=$(this).show().css({left:-_.width/4,top:0,zIndex:2}),
						clone=th.clone().appendTo(th.parent()).css({left:_.width/4,top:_.height/4,zIndex:1}),
						clone2=th.clone().appendTo(th.parent()).css({left:0,top:-_.height/4,zIndex:1})
					clone
						.stop()
						.animate({
							left:0,
							top:0
						},{
							duration:_.duration,
							easing:_.easing
						})
					clone2
						.stop()
						.animate({
							left:0,
							top:0
						},{
							duration:_.duration,
							easing:_.easing
						})
					th	
						.stop()
						.animate({
							left:0,
							top:0
						},{
							duration:_.duration,
							easing:_.easing,
							step:function(now){
								var pc=now/_.width,
									opa=1+pc
								clone.css({opacity:opa*opa})
								clone2.css({opacity:opa*opa})
								th.css({opacity:opa*opa*opa})
							},
							complete:function(){
								if(last)_.afterShow()
								clone.remove()
								clone2.remove()
							}
						})
				})
			},
			zoomer:function(el,last){
				var _=this
				$(el).each(function(){
					var th=$(this),
						img=$(new Image()),
						from=_.direction>0?_.width*_.k:_.width,
						to=_.direction>0?_.width:_.width*_.k
					console.log(from+' '+to)
					img	
						.css({
							position:'absolute',
							zIndex:0,						
							opacity:0
						})
						.css(_.crds)
						.appendTo(_.pic)
						.load(function(){
							_.pic.find('img').not(img).remove()
							img
								.css({
									width:from,
									height:'auto'
								})
								.stop()
								.animate({
									opacity:1
								},{
									duration:200
								})
								.animate({
									width:to
								},{
									duration:_.duration,
									easing:_.easing
								})
							setTimeout(function(){if(last)_.afterShow()},400)
						})
						.attr({src:_.next})
				})
			},
            fade: function (el, last) {
				var opt=this
                $(el).each(function () {
                    $(this).css({
                        opacity: 0
                    }).show().stop().animate({
                        opacity: 1
                    }, {
                        duration: +opt.duration,
                        easing: opt.easing,
                        complete: function () {
                            if (last) opt.afterShow()
                        }
                    })
                })
            },		
            expand: function (el, last) {
				var opt=this
                $(el).each(function () {
                    $(this).hide().show(+opt.duration, function () {
                        if (last) opt.afterShow()
                    })
                })
            },
            slideDown: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this).show(),
                        h = th.height()
                        th.css({
                            height: 0
                        }).stop().animate({
                            height: h
                        }, {
                            duration: opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideLeft: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this).show(),
                        w = th.width()
                        th.css({
                            width: 0
                        }).stop().animate({
                            width: w
                        }, {
                            duration: opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideUp: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this).show(),
                        h = th.height(),
                        l = th.attr('offsetLeft'),
                        t = th.attr('offsetTop')
                        th.css({
                            height: 0,
                            top: t + h
                        }).stop().animate({
                            height: h
                        }, {
                            duration: opt.duration,
                            easing: opt.easing,
                            step: function (now) {
                                var top = t + h - now
                                th.css({
                                    top: top,
                                    backgroundPosition: '-' + l + 'px -' + top + 'px'
                                })
                            },
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideRight: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this).show(),
                        w = th.width(),
                        l = th.attr('offsetLeft'),
                        t = th.attr('offsetTop')
                        th.css({
                            width: 0,
                            left: l + w
                        }).stop().animate({
                            width: w
                        }, {
                            duration: opt.duration,
                            easing: opt.easing,
                            step: function (now) {
                                var left = l + w - now
                                th.css({
                                    left: left,
                                    backgroundPosition: '-' + left + 'px -' + t + 'px'
                                })
                            },
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideFromTop: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this),
                        t = th.show().css('top'),
                        h = th.height()
                        th.css({
                            top: -h
                        }).stop().animate({
                            top: t
                        }, {
                            duration: +opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideFromDown: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this),
                        t = th.show().css('top'),
                        h = th.height()
                        th.css({
                            top: h
                        }).stop().animate({
                            top: t
                        }, {
                            duration: +opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideFromLeft: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this),
                        l = th.show().css('left'),
                        w = th.width()
                        th.css({
                            left: -w
                        }).stop().animate({
                            left: l
                        }, {
                            duration: +opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },
            slideFromRight: function (el, last) {
				var opt=this
                $(el).each(function () {
                    var th = $(this),
                        l = th.show().css('left'),
                        w = th.width()
                        th.css({
                            left: w
                        }).stop().animate({
                            left: l
                        }, {
                            duration: +opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                })
            },			
            gSlider: function (el, last) {
                var opt=this,
					clone = opt.maskC.clone(),
                    w = clone.width()
                    clone.appendTo(opt.maskC.parent()).css({
                        background: opt.pic.css('backgroundImage')
                    }).show()
                    el.show().css({
                        left: opt.direction > 0 ? -w : w
                    }).stop().animate({
                        left: 0
                    }, {
                        duration: +opt.duration,
                        easing: opt.easing,
                        step: function (now) {
                            if (opt.direction > 0) clone.css('left', now + w)
                            else clone.css('left', now - w)
                        },
                        complete: function () {
                            clone.remove()
                            if (last) opt.afterShow()
                        }
                    })
            },
            vSlider: function (el, last) {
                var opt=this,
					clone = opt.maskC.clone(),
                    h = clone.height()
                    clone.appendTo(opt.maskC.parent()).css({
                        background: opt.pic.css('backgroundImage')
                    }).show()
                    el.show().css({
                        top: opt.direction > 0 ? -h : h
                    }).stop().animate({
                        top: 0
                    }, {
                        duration: +opt.duration,
                        easing: opt.easing,
                        step: function (now) {
                            if (opt.direction > 0) clone.css('top', now + h)
                            else clone.css('top', now - h)
                        },
                        complete: function () {
                            clone.remove()
                            if (last) opt.afterShow()
                        }
                    })
            },
            vSlideOdd: function (el, last) {
				 var opt=this
                $(el).each(function () {
                    var th = $(this),
                        t = th.show().css('top'),
                        h = th.height(),
                        odd = opt.odd
                        th.css({
                            top: odd ? -h : h
                        }).stop().animate({
                            top: t
                        }, {
                            duration: +opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                        opt.odd = opt.odd ? false : true

                })
            },
            gSlideOdd: function (el, last) {
				 var opt=this
                $(el).each(function () {
                    var th = $(this),
                        l = th.show().css('left'),
                        w = th.width(),
                        odd = opt.odd
                        th.css({
                            left: odd ? -w : w
                        }).stop().animate({
                            left: l
                        }, {
                            duration: +opt.duration,
                            easing: opt.easing,
                            complete: function () {
                                if (last) opt.afterShow()
                            }
                        })
                        opt.odd = opt.odd ? false : true

                })
            }
        }
    })
})(jQuery)